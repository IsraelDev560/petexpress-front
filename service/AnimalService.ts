import { apiClient } from "@/lib/apiClient";
import { Animal } from "@/types/Animal";

export type GetAnimalsResponse = {
  success: boolean;
  data: Animal[];
  status: number;
};

export async function getAnimalsService(): Promise<GetAnimalsResponse> {
  try {
    const { res, data } = await apiClient('/api/animals', {
      method: 'GET',
    });

    if (!res.ok) {
      return {
        success: false,
        data: [],
        status: res.status,
      };
    }

    return {
      success: true,
      data: data as Animal[],
      status: res.status,
    };
  } catch (e) {
    console.log("Ocorreu um erro tentar listar os animais:", e);
    return {
      success: false,
      data: [],
      status: 500,
    };
  }
}

export async function addAnimalsService(dataAnimal: Animal): Promise<GetAnimalsResponse> {
try {
    const { res, data } = await apiClient('/api/animals', {
      method: 'POST',
      body: dataAnimal,
    });

    if (!res.ok) {
      return {
        success: false,
        data: [],
        status: res.status,
      };
    }

    return {
      success: true,
      data: data as Animal[],
      status: res.status,
    };
  } catch (e) {
    console.log("Ocorreu um erro tentar listar os animais:", e);
    return {
      success: false,
      data: [],
      status: 500,
    };
  }
}