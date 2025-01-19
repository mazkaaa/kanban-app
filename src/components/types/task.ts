export type TeamType = "frontend" | "backend" | "design";
export type StatusType = "to do" | "doing" | "done";

export interface ITaskResponse {
  id: string;
  name: string;
  description: string;
  team: TeamType[];
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskRequest {
  name: string;
  description: string;
  team: TeamType[];
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}
