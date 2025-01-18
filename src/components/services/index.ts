import { ITaskRequest, ITaskResponse } from "../types";

const API_URL = "https://678bd5581a6b89b27a2b9955.mockapi.io/api/v1/";
export const taskService = () => {
  return {
    getTasks: async () => {
      const response = await fetch(`${API_URL}task`);
      if (response.ok) {
        const data: ITaskResponse[] = await response.json();
        return data;
      }
      Promise.reject(new Error("Failed to fetch data"));
    },
    getTask: async (id: string) => {
      const response = await fetch(`${API_URL}task/${id}`);
      if (response.ok) {
        const data: ITaskResponse = await response.json();
        return data;
      }
      Promise.reject(new Error("Failed to fetch data"));
    },
    createTask: async (task: ITaskRequest) => {
      const response = await fetch(`${API_URL}task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      Promise.reject(new Error("Failed to create task"));
    },
    updateTask: async (id: string, task: ITaskRequest) => {
      const response = await fetch(`${API_URL}task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      Promise.reject(new Error("Failed to update task"));
    },
    deleteTask: async (id: string) => {
      const response = await fetch(`${API_URL}task/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      Promise.reject(new Error("Failed to delete task"));
    },
  };
};
