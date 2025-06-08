import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { Task } from "@/types/Task";

const API = '/api/tasks';

export async function getTasksClient(): Promise<ApiResponse<Task[]>> {
  try {
    const { res, data } = await apiClient('/api/tasks/all', { method: 'GET' });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as Task[]) : [],
    };
  } catch (e) {
    console.error("Erro ao listar tasks:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao listar tasks.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function addTasksClient(dataTask: Task): Promise<ApiResponse<Task>> {
  try {
    const { res, data } = await apiClient(API, {
      method: 'POST',
      body: dataTask,
    });

    return {
      success: true,
      status: res.status,
      data: data as Task,
    };
  } catch (e) {
    console.error("Erro ao adicionar Task:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao adicionar Task.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function updateTaskClient(id: string, item: Task): Promise<ApiResponse<Task>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'PATCH',
      body: item,
    });

    return {
      success: true,
      status: res.status,
      data: data as Task,
    };
  } catch (e) {
    console.error("Erro ao atualizar Task:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao atualizar Task.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function removeTaskClient(id: string): Promise<ApiResponse<null>> {
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
    console.error("Erro ao remover Task:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao remover Task.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function searchTaskByIdClient(id: string): Promise<ApiResponse<Task | null>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'GET',
    });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as Task) : null,
    };
  } catch (e) {
    console.error("Erro ao buscar Task por ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao buscar Task por ID.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}
