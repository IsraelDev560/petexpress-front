import { API_URL } from "@/lib/ApiUrl";
import { Animal } from "@/types/Animal";
import { Task } from "@/types/Task";
import { TaskType } from "@/types/Task-Type";
import { User } from "@/types/User";
import { redirect } from "next/navigation";

function headersFunction(token: string) {
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}

export async function getAnimalsServer(token: string): Promise<Animal[]> {
    try {
        const res = await fetch(`${API_URL}/animals`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['animals']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar animais")
        if (res.status === 401) {
            redirect("/api/auth/logout");
        }

        const data = await res.json();
        return data as Animal[];
    } catch (e) {
        return [];
    }
}

// export async function addAnimalsServer(token: string, dataAnimal: Animal): Promise<PromiseResponse> {
//     try {
//         const res = await fetch(`${API_URL}/animals`, {
//             method: 'POST',
//             headers: headersFunction(token),
//             body: JSON.stringify(dataAnimal)
//         })

//         console.log(res, res.body)
//         if (!res.ok) throw new Error("Erro ao tentar criar um animal")

//         const data = await res.json();

//         return {
//             success: true,
//             data: data as Animal,
//             status: 200
//         }
//     } catch (e) {
//         return {
//             success: false,
//             status: 500
//         }
//     }
// }

// export async function removeAnimalsServer(token: string, id: string): Promise<{
//     success: boolean,
//     status: number
// }> {
//     try {
//         const res = await fetch(`${API_URL}/animals/${id}`, {
//             method: 'DELETE',
//             headers: headersFunction(token)
//         })

//         if (!res.ok) throw new Error("Erro ao tentar excluir um animal")

//         return {
//             success: true,
//             status: 200
//         }
//     } catch (e) {
//         return {
//             success: false,
//             status: 500
//         }
//     }
// }

// export async function searchAnimalByIdServer(token: string, id: string): Promise<Animal> {
//     try {
//         const res = await fetch(`${API_URL}/animals/${id}`, {
//             method: 'GET',
//             headers: headersFunction(token)
//         })

//         if (!res.ok) throw new Error("Erro ao tentar buscar um animal por id");

//         const data = await res.json();

//         return data
//     } catch (e) {
//         throw new Error("Animal not found");
//     }
// }

// export async function updateAnimalServer(token: string, id: string, dataAnimal: Animal): Promise<PromiseResponse> {
//     try {
//         const res = await fetch(`${API_URL}/animals/${id}`, {
//             method: 'PATCH',
//             headers: headersFunction(token),
//             body: JSON.stringify(dataAnimal)
//         })

//         if (!res.ok) throw new Error("Erro ao tentar atualizar um animal");

//         const data = await res.json();

//         return {
//             success: true,
//             data: data as Animal,
//             status: 200
//         }
//     } catch (e) {
//         return {
//             success: false,
//             status: 500
//         }
//     }
// }

export async function getTasksServer(token: string): Promise<Task[]> {
    try {
        const res = await fetch(`${API_URL}/task`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['tasks']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar tasks")

        if (res.status === 401) {
            redirect("/api/auth/logout");
        }

        const data = await res.json();
        return data as Task[];
    } catch (e) {
        return [];
    }
}

export async function getTasksTypesServer(token: string): Promise<TaskType[]> {
    try {
        const res = await fetch(`${API_URL}/task-types`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['tasks-types']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar tasks-types")

        if (res.status === 401) {
            redirect("/api/auth/logout");
        }

        const data = await res.json();
        return data as TaskType[];
    } catch (e) {
        return [];
    }
}

export async function getUsersServer(token: string): Promise<User[]> {
    try {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['users']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar USERS")

        if (res.status === 401) {
            redirect("/api/auth/logout");
        }

        const data = await res.json();
        return data as User[];
    } catch (e) {
        return [];
    }
}

export async function getMyInfoUserServer(token: string): Promise<User | null> {
    try {
        const res = await fetch(`${API_URL}/users/myinfo`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['myinfo']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar my info")

        if (res.status === 401) {
            redirect("/api/auth/logout");
        }

        const data = await res.json();
        return {
            username: data.username,
            role: data.role,
        } as User;
    } catch (e: any) {
        return null;
    }
}
