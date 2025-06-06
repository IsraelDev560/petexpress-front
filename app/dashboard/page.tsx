import { cookies } from "next/headers";
import { getAnimalsServer } from "@/service/server/AnimalService";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
    const token = (await cookies()).get('token')?.value ?? "";
    const animals = await getAnimalsServer(token);

    return <DashboardClient animals={animals} />
}