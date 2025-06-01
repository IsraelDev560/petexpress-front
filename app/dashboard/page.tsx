'use client'

import List from "@/components/List";
import { apiClient } from "@/lib/apiClient";
import { addAnimalsService, getAnimalsService } from "@/service/AnimalService";
import { Animal } from "@/types/Animal";

export default function Dashboard() {
    async function logout() {
        try {
            const { res } = await apiClient('/api/auth/logout', {
                method: 'POST'
            })
            if (!res.ok) {
                return {
                    success: false,
                    status: res.status
                }
            }
            window.location.reload();
            return { success: true }
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <div className="mx-auto flex flex-col items-center">
            {/* <button onClick={logout}>Logout</button> */}
            <div className="grid grid-cols-4 items-center p-4 w-full">
                <List<Animal>
                    title="Animais"
                    add={addAnimalsService}
                    remove={(id) => console.log('Delete', id)}
                    get={async () => {
                        const response = await getAnimalsService();
                        return response.data;
                    }}
                    searchById={async (id) => ({ id, name: 'Rex', specie: 'Dog' })}
                    update={(id, item) => console.log('Update', id, item)}
                />
            </div>
        </div>
    )
}