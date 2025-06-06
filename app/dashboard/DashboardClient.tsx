'use client';

import List from "@/components/List";
import { Animal } from "@/types/Animal";
import { addAnimalsClient, getAnimalsClient, removeAnimalClient, searchAnimalByIdClient, updateAnimalClient } from "@/service/client/AnimalService";
import { useEffect, useState } from "react";

export default function DashboardClient({
    animals: animalsData,
}: {
    animals: Animal[];
}) {
    const [animals, setAnimals] = useState<Animal[]>(animalsData);
    // const [users, setUsers] = useState<User[]>([]);
    // const [tasks, setTasks] = useState<Task[]>([]);
    return (
        <div className="mx-auto flex flex-col items-center">
            <div className="grid xl:grid-cols-3 p-4 gap-8 w-full">
                <List<Animal>
                    title="Animals"
                    add={addAnimalsClient}
                    remove={removeAnimalClient}
                    data={animals}
                    setData={setAnimals}
                    get={getAnimalsClient}
                    searchById={searchAnimalByIdClient}
                    update={updateAnimalClient}
                />
            </div>
        </div>
    );
}
