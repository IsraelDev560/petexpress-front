import { cookies } from "next/headers";
import { getAnimalsServer, getTasksServer, getTasksTypesServer, getUsersServer } from "@/service/server/GetDatasService";
import TablesClient from "./TablesClient";

export default async function Tables() {
    const token = (await cookies()).get('token')?.value ?? "";
    const [animals, tasks, tasksTypes, users] = await Promise.all([
        getAnimalsServer(token),
        getTasksServer(token),
        getTasksTypesServer(token),
        getUsersServer(token),
    ]);
    return <TablesClient animals={animals} tasks={tasks} tasksTypes={tasksTypes} users={users} />
}