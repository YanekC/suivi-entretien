import { database } from "~/database/context";
import type { Route } from "./+types/vehicule";
import VehiculeDetails from "~/vehicule/vehicule_details";
import { maintenances, vehicules } from "~/database/schema";
import { eq } from "drizzle-orm";

export function meta() {
  return [
    { title: "Ajouter un véhicule" },
    {
      name: "description",
      content: "Ajouter un véhicule",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const db = database();

  var id = parseInt(params.vehiculeId);

  const vehiculesData = await db
    .select()
    .from(vehicules)
    .where(eq(vehicules.id, id));
  const maintenancesData = await db
    .select()
    .from(maintenances)
    .where(eq(maintenances.vehiculeId, id));

  return {
    vehiculesData,
    maintenancesData,
  };
}

export default function Vehicules({ loaderData }: Route.ComponentProps) {
  return (
    <VehiculeDetails
      vehicule={loaderData.vehiculesData[0]}
      maintenances={loaderData.maintenancesData}
    />
  );
}
