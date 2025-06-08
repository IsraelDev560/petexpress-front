import { apiClient } from "@/lib/apiClient";
import { Animal } from "@/types/Animal";
import { ApiResponse } from "@/types/ApiResponse";

const API = '/api/animals';

export async function getAnimalsClient(): Promise<ApiResponse<Animal[]>> {
  try {
    const { res, data } = await apiClient('/api/animals/all', { method: 'GET' });

    return {
      success: true,
      data: res.ok ? (data as Animal[]) : [],
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao listar animais:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao listar animais.",
        status: 500,
        timeStamp: new Date().toISOString(),
      },
    };
  }
}

export async function addAnimalsClient(dataAnimal: Animal): Promise<ApiResponse<Animal>> {
  try {
    const { res, data } = await apiClient(API, {
      method: 'POST',
      body: dataAnimal,
    });

    return {
      success: true,
      data: data as Animal,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao adicionar animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao adicionar um animal.",
        status: 500,
        timeStamp: new Date().toISOString(),
      },
    };
  }
}

export async function updateAnimalClient(id: string, item: Animal): Promise<ApiResponse<Animal>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'PATCH',
      body: item,
    });

    return {
      success: true,
      data: data as Animal,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao atualizar animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao atualizar um animal.",
        status: 500,
        timeStamp: new Date().toISOString(),
      },
    };
  }
}

export async function removeAnimalClient(id: string): Promise<ApiResponse<null>> {
  try {
    const { res } = await apiClient(`${API}/${id}`, {
      method: 'DELETE',
    });

    return {
      success: true,
      data: null,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao remover animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        status: 500,
        message: "Erro ao remover animal.",
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function searchAnimalByIdClient(id: string): Promise<ApiResponse<Animal | null>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'GET',
    });

    return {
      success: true,
      data: res.ok ? (data as Animal) : null,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao buscar animal por ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        status: 500,
        timeStamp: new Date().toISOString(),
        message: "Erro ao buscar animal por ID.",
      },
    };
  }
}

