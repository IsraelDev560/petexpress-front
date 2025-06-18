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
    console.error("An error occurred while fetching the list of animals:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to fetch the list of animals.",
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
    console.error("An error occurred while adding an animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to add animal.",
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
    console.error("An error occurred while updating the animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to update animal.",
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
    console.error("An error occurred while deleting the animal:", e);
    return {
      success: false,
      status: 500,
      data: {
        status: 500,
        message: "Failed to delete animal.",
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
    console.error("An error occurred while fetching animal by ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        status: 500,
        timeStamp: new Date().toISOString(),
        message: "Failed to fetch animal by ID.",
      },
    };
  }
}

