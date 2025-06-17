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
    console.error("An error occurred while listing users:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to list users.",
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
    console.error("An error occurred while adding a user:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to add user.",
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
    console.error("An error occurred while updating the user:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to update user.",
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
    console.error("An error occurred while deleting the user:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to delete user.",
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
    console.error("An error occurred while fetching user by ID:", e);
    return {
      success: false,
      status: 500,
      data: {
        message: "Failed to fetch user by ID.",
        status: 500,
        timeStamp: new Date().toISOString(),
      }
    };
  }
}
