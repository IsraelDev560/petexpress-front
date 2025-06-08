"use client";

import List from "@/components/List";
import { Animal } from "@/types/Animal";
import { addAnimalsClient, getAnimalsClient, removeAnimalClient, searchAnimalByIdClient, updateAnimalClient } from "@/service/client/AnimalService";
import { useState } from "react";
import { Task } from "@/types/Task";
import { addTasksClient, getTasksClient, removeTaskClient, searchTaskByIdClient, updateTaskClient } from "@/service/client/TasksService";
import { TaskType } from "@/types/Task-Type";
import { addTaskTypesClient, getTasksTypesClient, removeTaskTypeClient, searchTaskTypeByIdClient, updateTaskTypeClient } from "@/service/client/TasksTypesService";
import { User } from "@/types/User";
import { addUsersClient, getUsersClient, removeUserClient, searchUserByIdClient, updateUserClient } from "@/service/client/UserService";

export default function DashboardClient({
    animals: animalsData,
    tasks: tasksData,
    tasksTypes,
    users: usersData,
}: {
    animals: Animal[];
    tasks: Task[];
    tasksTypes: TaskType[],
    users: User[]
}) {
    const [animals, setAnimals] = useState<Animal[]>(animalsData);
    const [tasks, setTasks] = useState<Task[]>(tasksData);
    const [tasksType, setTasksType] = useState<TaskType[]>(tasksTypes);
    const [users, setUsers] = useState<User[]>(usersData);
    return (
        <div className="w-full flex justify-center">
            <div className="grid xl:grid-cols-2 gap-4 p-4 w-full ">
                <List<User>
                    title="Users"
                    add={addUsersClient}
                    remove={removeUserClient}
                    data={users}
                    setData={setUsers}
                    get={getUsersClient}
                    searchById={searchUserByIdClient}
                    update={updateUserClient}
                />
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
                <List<TaskType>
                    title="Tasks-Types"
                    add={addTaskTypesClient}
                    remove={removeTaskTypeClient}
                    data={tasksType}
                    setData={setTasksType}
                    get={getTasksTypesClient}
                    searchById={searchTaskTypeByIdClient}
                    update={updateTaskTypeClient}
                />
                <List<Task>
                    title="Tasks"
                    add={addTasksClient}
                    remove={removeTaskClient}
                    data={tasks}
                    setData={setTasks}
                    get={getTasksClient}
                    searchById={searchTaskByIdClient}
                    update={updateTaskClient}
                />
            </div>
        </div>
    );
}
