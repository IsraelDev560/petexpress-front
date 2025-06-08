import { cookies } from "next/headers";
import { getAnimalsServer, getTasksServer, getTasksTypesServer, getUsersServer } from "@/service/server/GetDatasService";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
    const token = (await cookies()).get('token')?.value ?? "";
    const animals = await getAnimalsServer(token);
    const tasks = await getTasksServer(token);
    const tasksTypes = await getTasksTypesServer(token);
    const users = await getUsersServer(token);
    return <DashboardClient animals={animals} tasks={tasks} tasksTypes={tasksTypes} users={users} />
}