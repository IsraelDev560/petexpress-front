import { cookies } from "next/headers";
import { getAnimalsServer, getTasksServer, getTasksTypesServer, getUsersServer } from "@/service/server/GetDatasService";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
    const token = (await cookies()).get('token')?.value ?? "";
    const [animals, tasks, tasksTypes, users] = await Promise.all([
        getAnimalsServer(token),
        getTasksServer(token),
        getTasksTypesServer(token),
        getUsersServer(token),
    ]);
    return <DashboardClient animals={animals} tasks={tasks} tasksTypes={tasksTypes} users={users} />
}