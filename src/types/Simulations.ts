import type { GetAgent } from "./Agents";

export interface SimulationEvent {
  Agent?: GetAgent;
  ID: number;
  Prompt: string;
  EventType: number;
  EventDescription: string;
}
// (BUY/SKIP/TALK): agent takes action, SIMULATION: high level simulation related events, like initializing agent, ACTION_RESP: response to BUY actions of an agent
// helper to convert the int status to more specific items
export const SimulationEventType = ["BUY", "SKIP", "TALK", "SIMULATION", "ACTION_RESP"];

// first cycle is always simulation environment initialisation
// SimulationCycle is assumed to be according to order
export interface SimulationCycle {
  ID: number;
  Profit: number;
  SimulationEvents: SimulationEvent[];
}

export interface CreateSimulation {
  EnvironmentID: number;
  BusinessID: number;
  Name: string;
  MaxCycleCount: number;
  IsPriceOptEnabled: boolean;
  Status: number; // enums in go are just ints, so may need to create a function that returns that specific status
}

// helper to convert the int status to more specific items
export const SimulationStatus = ["IDLE", "RUNNING", "COMPLETE"];

export type EditSimulation = CreateSimulation & { ID: number };
export type GetSimulation = EditSimulation & { SimulationCycles: SimulationCycle[] };
export type SimulationWithEnvName = GetSimulation & { EnvironmentName: string };
