import { API_URL } from "@/lib/ApiUrl";
import { Animal } from "@/types/Animal";

function headersFunction(token: string) {
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}

interface PromiseResponse {
    success: boolean;
    data?: Animal;
    status: number;
}

export async function getAnimalsServer(token: string): Promise<Animal[]> {
    try {
        const res = await fetch(`${API_URL}/animals`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                tags: ['animals']
            }
        })

        if (!res.ok) throw new Error("Erro ao buscar animais")

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