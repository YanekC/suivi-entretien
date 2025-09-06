import { database } from "~/database/context";
import type { Route } from "./+types/maintenance";
import MaintenanceDetails from "~/vehicule/maintenance_details";
import { maintenances, vehicules } from "~/database/schema";
import { eq } from "drizzle-orm";

export function meta() {
  return [
    { title: "Détails de la maintenance" },
    {
      name: "description",
      content: "Détails de la maintenance",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const db = database();

  const vehiculeId = parseInt(params.vehiculeId);
  const maintenanceId = parseInt(params.maintenanceId);

  const vehiculeData = await db
    .select()
    .from(vehicules)
    .where(eq(vehicules.id, vehiculeId));

  const maintenanceData = await db
    .select()
    .from(maintenances)
    .where(eq(maintenances.id, maintenanceId));

  return {
    vehiculeData,
    maintenanceData,
  };
}

export default function Maintenance({ loaderData }: Route.ComponentProps) {
  return (
    <MaintenanceDetails
      maintenanceParam={loaderData.maintenanceData[0]}
      vehicule={loaderData.vehiculeData[0]}
    />
  );
}
