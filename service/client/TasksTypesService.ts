import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { TaskType } from "@/types/Task-Type";

const API = '/api/tasks-type';

export async function getTasksTypesClient(): Promise<ApiResponse<TaskType[]>> {
  try {
    const { res, data } = await apiClient(`${API}/all`, { method: 'GET' });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as TaskType[]) : [],
    };
  } catch (e) {
    console.error("An error occurred while listing task types:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to list task types.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function addTaskTypesClient(dataTaskType: TaskType): Promise<ApiResponse<TaskType>> {
  try {
    const { res, data } = await apiClient(API, {
      method: 'POST',
      body: dataTaskType,
    });

    return {
      success: true,
      status: res.status,
      data: data as TaskType,
    };
  } catch (e) {
    console.error("An error occurred while adding a task type:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to add task type.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function updateTaskTypeClient(id: string, item: TaskType): Promise<ApiResponse<TaskType>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'PATCH',
      body: item,
    });

    return {
      success: true,
      status: res.status,
      data: data as TaskType,
    };
  } catch (e) {
    console.error("An error occurred while updating the task type:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to update task type.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function removeTaskTypeClient(id: string): Promise<ApiResponse<null>> {
  try {
    const { res } = await apiClient(`${API}/${id}`, {
      method: 'DELETE',
    });

    return {
      success: true,
      status: res.status,
      data: null,
    };
  } catch (e) {
    console.error("An error occurred while deleting the task type:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to delete task type.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function searchTaskTypeByIdClient(id: string): Promise<ApiResponse<TaskType | null>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'GET',
    });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as TaskType) : null,
    };
  } catch (e) {
    console.error("An error occurred while fetching task type by ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to fetch task type by ID.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}
