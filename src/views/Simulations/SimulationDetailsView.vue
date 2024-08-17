<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import {
  getSimulation,
  getSimulationCycle,
  getSimulationCycles,
  startSimulation,
} from "@/api/simulation";
import BadgeGeneral from "@/components/BadgeGeneral.vue";
import SimulationCycleCard from "@/components/simulation/SimulationCycleCard.vue";
import SimulationEventCard from "@/components/simulation/SimulationEventCard.vue";
import SimulationStatusToggleButton from "@/components/simulation/SimulationStatusToggleButton.vue";
import { useToasts } from "@/composable/toasts";
import {
  SimulationEventType,
  SimulationStatus,
  type SimulationWithEnvName,
} from "@/types/Simulations";
import {
  SimulationBadgeType,
  transformSimulationEventAPIToDetail,
  type SimulationEventDetail,
} from "@/utils/simulations";
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VueApexCharts from "vue3-apexcharts";
import { EventSource } from "extended-eventsource";
import type { EnvironmentListData } from "@/types/Environments";

type ComplexSimulationEvent = SimulationEventDetail & {
  CycleId: number;
};

const route = useRoute();
const { makeToast } = useToasts();

// save a copy, no need keep going back and forth to get the things needed
const envDetail: Ref<EnvironmentListData | undefined> = ref();
const simulationDetail: Ref<SimulationWithEnvName | undefined> = ref();

// le chart stuff (maybe migrate into own component)
const chartOptions = computed(() => ({
  chart: {
    id: "simulation-cycle-details",
  },
  xaxis: {
    // first cycle has ntg to do with agent actions
    categories:
      simulationDetail.value?.SimulationCycles?.slice(1)?.map((c) => `Cycle ${c.CycleNumber}`) ??
      [],
  },
}));

const updateSeries = () => {
  return (
    envDetail.value?.Products?.map((p) => {
      return {
        name: p.Name,
        // get profit of every cycle (profit defined as Price for each product bought)
        data:
          simulationDetail.value?.SimulationCycles?.slice(1)?.map((c) => {
            // reduce all the events such that for events that have a product, it should be BUY, and then can reduce how many agents bought that product
            return (
              c.SimulationEvents?.reduce((acc, e) => {
                const prod = (e as SimulationEventDetail).Product;
                if (prod && prod.ID === p.ID) {
                  return acc + prod.Price;
                }
                return acc;
              }, 0) ?? 0
            );
          }) ?? [],
      };
    }) ?? []
  );
};

const series: Ref<
  {
    name: string;
    data: number[];
  }[]
> = ref([]);

const currentActiveCycle = ref(1); // ID of the active cycle

const toggleSimulationStatus = async () => {
  if (simulationDetail.value) {
    if (SimulationStatus[simulationDetail.value.Status] === "IDLE") {
      const res = await startSimulation(simulationDetail.value.ID);
      if (!res) {
        return;
      }
      makeToast(res.Message);
      // refetch simulation and update simulation status
      const sim = await getSimulation(simulationDetail.value.ID);
      if (!sim) {
        return;
      }
      simulationDetail.value.Status = sim.Status;

      // possible got stuffs already happen before event source start listening, fetch all the events and cycles out first
      updateSimulationCycles(simulationDetail.value.ID);

      // maybe subscribe to the event source for stream updates
      makeListenerForUpdate(simulationDetail.value.ID);
    }
  }
};

let simulationUpdateEventSource: EventSource;
const makeListenerForUpdate = (id: number) => {
  simulationUpdateEventSource = new EventSource(
    `${import.meta.env.VITE_SERVER_URL}/simulations/listen-for-event/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
  simulationUpdateEventSource.onmessage = (event) => {
    console.log(event);
  };
  simulationUpdateEventSource.onerror = (e) => {
    console.log(e, simulationUpdateEventSource);
    if (simulationUpdateEventSource.readyState === 2) {
      simulationUpdateEventSource.close();
    }
  };
  simulationUpdateEventSource.addEventListener("simulation-event", async (event) => {
    console.log(event.data);
    const data: ComplexSimulationEvent = JSON.parse(event.data);
    if (simulationDetail.value) {
      // access the cycle for which this event belongs to
      const { CycleId, ...rest } = data;
      const cycle = simulationDetail.value.SimulationCycles?.find((cycle) => cycle.ID === CycleId);
      if (cycle) {
        if (cycle.SimulationEvents) {
          cycle.SimulationEvents.push(
            transformSimulationEventAPIToDetail(
              rest,
              envDetail.value?.Agents ?? [],
              envDetail.value?.Products ?? [],
            ) ?? rest,
          );
        } else {
          cycle.SimulationEvents = [
            transformSimulationEventAPIToDetail(
              rest,
              envDetail.value?.Agents ?? [],
              envDetail.value?.Products ?? [],
            ) ?? rest,
          ];
        }
      } else {
        const cycle = await getSimulationCycle(CycleId);
        if (cycle) {
          cycle.SimulationEvents = [
            transformSimulationEventAPIToDetail(
              rest,
              envDetail.value?.Agents ?? [],
              envDetail.value?.Products ?? [],
            ) ?? rest,
          ];
          // new cycle should obviously be behind d right
          if (simulationDetail.value.SimulationCycles) {
            simulationDetail.value.SimulationCycles.push(cycle);
          } else {
            simulationDetail.value.SimulationCycles = [cycle];
          }
        }
      }
      series.value = updateSeries();
    }
  });
  simulationUpdateEventSource.addEventListener("simulation-complete", (event) => {
    console.log("simulation end signal received", event.data);
    makeToast("Simulation completed");
    simulationUpdateEventSource.close();
  });
};

const updateSimulationCycles = async (id: number) => {
  if (simulationDetail.value) {
    const cycleRes = await getSimulationCycles(id);
    console.log(cycleRes);
    cycleRes.map(
      (cycle) =>
        (cycle.SimulationEvents = cycle.SimulationEvents?.map(
          (ev) =>
            transformSimulationEventAPIToDetail(
              ev,
              envDetail.value?.Agents ?? [],
              envDetail.value?.Products ?? [],
            ) ?? ev,
        )),
    );
    simulationDetail.value.SimulationCycles = cycleRes;
    series.value = updateSeries();
    // always focus on the last cycle
    currentActiveCycle.value =
      simulationDetail.value.SimulationCycles[simulationDetail.value.SimulationCycles.length - 1]
        ?.ID ?? -1;
  }
};

onMounted(async () => {
  const id = parseInt(route.params?.id as string);
  const res = await getSimulation(id);
  const router = useRouter();
  if (!res) {
    router.push({ name: "simulation-list" });
    return;
  }
  const envRes = await getEnvironment(res.EnvironmentID);
  if (!envRes) {
    router.push({ name: "simulation-list" });
    return;
  }
  simulationDetail.value = { ...res, EnvironmentName: envRes.Name };
  envDetail.value = envRes;

  await updateSimulationCycles(id);
  console.log(simulationDetail.value.SimulationCycles);

  // can return early if is not running (so only make listener when it is running)
  if (SimulationStatus[res.Status] !== "RUNNING") return;
  makeListenerForUpdate(id);
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4 flex flex-col">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'simulation-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ simulationDetail?.Name }} Details</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2">
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-simulation', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2">
          Delete
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 flex-1 h-full">
      <!-- left -->
      <div class="flex flex-col h-full">
        <div class="flex items-center gap-8">
          <h2 class="text-3xl">{{ simulationDetail?.Name }}</h2>
          <div class="flex items-center gap-2">
            <BadgeGeneral
              :type="
                SimulationBadgeType[
                  SimulationStatus[
                    simulationDetail?.Status ?? 0
                  ] as keyof typeof SimulationBadgeType
                ]
              "
              :text="SimulationStatus[simulationDetail?.Status ?? 0]"
            />
            <SimulationStatusToggleButton
              :current-state="simulationDetail?.Status ?? 0"
              v-if="simulationDetail && !(SimulationStatus[simulationDetail.Status] === 'COMPLETE')"
              @click="toggleSimulationStatus"
            />
          </div>
        </div>
        <div class="flex items-center gap-6 mt-2">
          <div class="text-neutral-400 flex items-center gap-2">
            <Icon icon="ri:building-fill" />
            <span class="text-xs font-medium"> {{ simulationDetail?.EnvironmentName }} </span>
          </div>
          <div class="text-neutral-400 flex items-center gap-2">
            <Icon icon="grommet-icons:cycle" />
            <span class="text-xs font-medium">
              {{ simulationDetail?.SimulationCycles?.length ?? 0 }} Cycles
            </span>
          </div>
        </div>
        <!-- le graph -->
        <div class="w-full border border-neutral-400 rounded-[15px] mt-2 p-2 pb-0">
          <VueApexCharts type="bar" :options="chartOptions" :series="series" />
        </div>
        <!-- le cycles -->
        <div class="w-full h-full overflow-auto border border-neutral-400 rounded-[15px] mt-2 p-2">
          <span>Cycles</span>
          <div class="flex flex-col gap-2 mt-2 h-full overflow-auto">
            <SimulationCycleCard
              v-for="(s, i) in simulationDetail?.SimulationCycles ?? []"
              :key="s.ID"
              :index="i"
              :event-count="s.SimulationEvents?.length ?? 0"
              :is-active="currentActiveCycle === s.ID"
              @clicked="currentActiveCycle = s.ID"
            />
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="w-full flex-grow h-full border border-neutral-400 rounded-[15px] p-2">
        <span
          >Cycle Events - Cycle
          {{
            simulationDetail?.SimulationCycles?.find((s) => s.ID === currentActiveCycle)
              ?.CycleNumber
          }}</span
        >
        <div class="flex flex-col gap-2 mt-2 h-full overflow-auto">
          <!-- event type of SIMULATION wouldnt get their badge -->
          <SimulationEventCard
            v-for="e in simulationDetail?.SimulationCycles?.find((s) => s.ID === currentActiveCycle)
              ?.SimulationEvents ?? []"
            :key="e.ID"
            :title="e.Agent ? e.Agent.Name : 'Simulation Engine'"
            :event-detail="(e as SimulationEventDetail)?.ActualContent ?? e.EventDescription"
            v-bind="e.EventType === 3 ? {} : { eventType: SimulationEventType[e.EventType] }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
