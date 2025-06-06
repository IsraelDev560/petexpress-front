import { apiClient } from "@/lib/apiClient";
import { Animal } from "@/types/Animal";
import { ApiResponse } from "@/types/ApiResponse";

const API = '/api/animals';

export async function getAnimalsClient(): Promise<ApiResponse<Animal[]>> {
  try {
    const { res, data } = await apiClient('/api/animals/all', { method: 'GET' });

    return {
      data: res.ok ? (data as Animal[]) : [],
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao listar animais:", e);
    return {
      success: false,
      data: [],
      status: 500,
      message: "Erro ao listar animais.",
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
      data: data as Animal,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao adicionar animal:", e);
    return {
      success: false,
      status: 500,
      message: "Erro ao adicionar animal.",
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
      data: data as Animal,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao atualizar animal:", e);
    return {
      success: false,
      status: 500,
      message: "Erro ao atualizar animal.",
    };
  }
}

export async function removeAnimalClient(id: string): Promise<ApiResponse<null>> {
  try {
    const { res } = await apiClient(`${API}/${id}`, {
      method: 'DELETE',
    });

    return {
      data: null,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao remover animal:", e);
    return {
      success: false,
      status: 500,
      message: "Erro ao remover animal.",
    };
  }
}

export async function searchAnimalByIdClient(id: string): Promise<ApiResponse<Animal | null>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'GET',
    });

    return {
      data: res.ok ? (data as Animal) : null,
      status: res.status,
    };
  } catch (e) {
    console.error("Erro ao buscar animal por ID:", e);
    return {
      success: false,
      data: null,
      status: 500,
      message: "Erro ao buscar animal por ID.",
    };
  }
}
