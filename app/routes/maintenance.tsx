import { database } from "~/database/context";
import type { Route } from "./+types/maintenance";
import MaintenanceDetails from "~/vehicule/maintenance_details";
import { maintenances, vehicules } from "~/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "react-router";

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

export async function action({ request, params }: Route.ActionArgs) {
  const db = database();
  const formData = await request.formData();
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  const maintenanceId = parseInt(params.maintenanceId);

  switch (request.method) {
    case "DELETE":
      return redirect(`/vehicules/${params.vehiculeId}`);
    case "POST":
      updateMaintenance(db, maintenanceId, formData);
  }
}

async function updateMaintenance(
  db: any,
  maintenanceId: number,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const done = formData.get("done") === "on";
  const dateToDo = formData.get("dateToDo") as string;
  const dateDone = formData.get("dateDone") as string;

  await db
    .update(maintenances)
    .set({
      title,
      done,
      dateToDo: dateToDo,
      dateDone: dateDone,
    })
    .where(eq(maintenances.id, maintenanceId));
}

export default function Maintenance({ loaderData }: Route.ComponentProps) {
  return (
    <MaintenanceDetails
      maintenanceParam={loaderData.maintenanceData[0]}
      vehicule={loaderData.vehiculeData[0]}
    />
  );
}
