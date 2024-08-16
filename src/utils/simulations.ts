import type { GetAgent } from "@/types/Agents";
import { BadgeType } from "@/types/Badge";
import type { GetProduct } from "@/types/Products";
import { SimulationEventType, type SimulationEvent } from "@/types/Simulations";

export const SimulationBadgeType = {
  IDLE: BadgeType.NEUTRAL,
  RUNNING: BadgeType.WARN,
  COMPLETE: BadgeType.SUCCESS,
};

export const SimulationEventBadgeType = {
  SKIP: BadgeType.NEUTRAL,
  ACTION_RESP: BadgeType.WARN,
  BUY: BadgeType.SUCCESS,
  MESSAGE: BadgeType.PRIMARY,
  SIMULATION: BadgeType.WARN,
};

export type SimulationEventDetail = SimulationEvent & {
  Product?: GetProduct;
  ActualContent: string; // convert into format (for BUY: Bought {product_name} with the reason "{reason}"), (for MESSAGE: Sent a message to {agent_name}: {message}), (for SKIP: Skipped the cycle with the reason "{reason}")
};

export const transformSimulationEventAPIToDetail = (
  ev: SimulationEvent,
  agents: GetAgent[],
  products: GetProduct[],
): SimulationEventDetail | undefined => {
  const typeStr = SimulationEventType[ev.EventType];
  if (typeStr === "SIMULATION" || typeStr === "ACTION_RESP")
    return { ...ev, ActualContent: ev.EventDescription };

  const split = ev.EventDescription.split(":");
  if (split.length !== 2) {
    // impossible, otherwise smtg wrong alrd
    return;
  }
  if (typeStr === "BUY") {
    // find the product in the array
    const prod = products.find((p) => p.ID === parseInt(split[0]));
    return {
      ...ev,
      Product: prod,
      ActualContent: `Bought ${prod?.Name ?? "unable to find the product"} with the reason "${split[1]}"`,
    };
  } else if (typeStr === "MESSAGE") {
    const agent = agents.find((a) => a.ID === parseInt(split[0]));
    return {
      ...ev,
      ActualContent: `Sent a message to ${agent?.Name ?? "unable to find the agent"}: ${split[1]}`,
    };
  } else if (typeStr === "SKIP") {
    return {
      ...ev,
      ActualContent: `Skipped the cycle with the reason "${split[1]}"`,
    };
  }
};
