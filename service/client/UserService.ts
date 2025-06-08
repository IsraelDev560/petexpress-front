import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";

const API = '/api/users';

export async function getUsersClient(): Promise<ApiResponse<User[]>> {
  try {
    const { res, data } = await apiClient(`${API}/all`, { method: 'GET' });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as User[]) : [],
    };
  } catch (e) {
    console.error("Erro ao listar users:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao listar users.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function addUsersClient(dataUser: User): Promise<ApiResponse<User>> {
  try {
    const { res, data } = await apiClient(API, {
      method: 'POST',
      body: dataUser,
    });

    return {
      success: true,
      status: res.status,
      data: data as User,
    };
  } catch (e) {
    console.error("Erro ao adicionar User:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao adicionar User.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function updateUserClient(id: string, item: User): Promise<ApiResponse<User>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'PATCH',
      body: item,
    });

    return {
      success: true,
      status: res.status,
      data: data as User,
    };
  } catch (e) {
    console.error("Erro ao atualizar User:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao atualizar User.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function removeUserClient(id: string): Promise<ApiResponse<null>> {
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
    console.error("Erro ao remover User:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao remover User.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}

export async function searchUserByIdClient(id: string): Promise<ApiResponse<User | null>> {
  try {
    const { res, data } = await apiClient(`${API}/${id}`, {
      method: 'GET',
    });

    return {
      success: true,
      status: res.status,
      data: res.ok ? (data as User) : null,
    };
  } catch (e) {
    console.error("Erro ao buscar User por ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Erro ao buscar User por ID.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}
