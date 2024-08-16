<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import { getSimulation, startSimulation } from "@/api/simulation";
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
import { SimulationBadgeType } from "@/utils";
import { Icon } from "@iconify/vue";
import { onMounted, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VueApexCharts from "vue3-apexcharts";

const route = useRoute();
const { makeToast } = useToasts();

const simulationDetail: Ref<SimulationWithEnvName | undefined> = ref();

// IDEA: initial fetch out first, then subscribe to SSE on new cycles and new cycle events
const simulationDetails: SimulationWithEnvName = {
  ID: 1,
  EnvironmentID: 1,
  EnvironmentName: "Environment Alpha",
  BusinessID: 1,
  SimulationCycles: [
    {
      ID: 1,
      SimulationEvents: [
        {
          ID: 1,
          Prompt: "Initializing simulation environment",
          EventType: 3, // SIMULATION
          EventDescription: "Environment setup and initial conditions applied.",
        },
        {
          ID: 2,
          Prompt: "Agent 1 takes action",
          EventType: 0, // BUY
          EventDescription: "Agent 1 buys Product A.",
          Agent: {
            ID: 1,
            Name: "Agent Alpha",
            Attributes: [],
            BusinessID: 1,
          },
        },
        {
          ID: 3,
          Prompt: "Simulation cycle complete",
          EventType: 4, // ACTION_RESP
          EventDescription: "Results of Agent 1's actions processed.",
        },
      ],
    },
    {
      ID: 2,
      SimulationEvents: [
        {
          ID: 4,
          Prompt: "Agent 2 takes action",
          EventType: 2, // TALK
          EventDescription: "Agent 2 communicates with Agent 3.",
          Agent: {
            ID: 2,
            Name: "Agent Beta",
            Attributes: [],
            BusinessID: 1,
          },
        },
        {
          ID: 5,
          Prompt: "Agent 3 decides to skip",
          EventType: 1, // SKIP
          EventDescription: "Agent 3 skips the current opportunity.",
          Agent: {
            ID: 3,
            Name: "Agent Gamma",
            Attributes: [],
            BusinessID: 1,
          },
        },
      ],
    },
    {
      ID: 2,
      SimulationEvents: [
        {
          ID: 4,
          Prompt: "Agent 2 takes action",
          EventType: 2, // TALK
          EventDescription: "Agent 2 communicates with Agent 3.",
          Agent: {
            ID: 2,
            Name: "Agent Beta",
            Attributes: [],
            BusinessID: 1,
          },
        },
        {
          ID: 5,
          Prompt: "Agent 3 decides to skip",
          EventType: 1, // SKIP
          EventDescription: "Agent 3 skips the current opportunity.",
          Agent: {
            ID: 3,
            Name: "Agent Gamma",
            Attributes: [],
            BusinessID: 1,
          },
        },
      ],
    },
  ],
  Name: "Simulation Alpha",
  MaxCycleCount: 10,
  IsPriceOptEnabled: true,
  Status: 1,
};

// le chart stuff (maybe migrate into own component)
const chartOptions = {
  chart: {
    id: "simulation-cycle-details",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = ref([
  {
    name: "Product 1",
    data: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    name: "Product 2",
    data: [30, 40, 35, 50, 49, 60, 70, 0],
  },
]);

const currentActiveCycle = ref(1); // ID of the active cycle

const toggleSimulationStatus = async () => {
  if (simulationDetail.value) {
    if (SimulationStatus[simulationDetail.value.Status] === "IDLE") {
      const res = await startSimulation(simulationDetail.value.ID);
      if (!res) {
        return;
      }
      makeToast(res.Message);
      // maybe subscribe to the event source for stream updates
    }
  }
};

// TODO fetch simulation from backend
onMounted(async () => {
  const res = await getSimulation(parseInt(route.params?.id as string));
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
        <span>Cycle Events - Cycle {{ currentActiveCycle }}</span>
        <div class="flex flex-col gap-2 mt-2 h-full overflow-auto">
          <!-- event type of SIMULATION wouldnt get their badge -->
          <SimulationEventCard
            v-for="e in simulationDetail?.SimulationCycles?.find((s) => s.ID === currentActiveCycle)
              ?.SimulationEvents ?? []"
            :key="e.ID"
            :title="e.Agent ? e.Agent.Name : 'Simulation Engine'"
            :event-detail="e.EventDescription"
            v-bind="e.EventType === 3 ? {} : { eventType: SimulationEventType[e.EventType] }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
