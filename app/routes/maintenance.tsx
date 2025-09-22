import { database } from "~/database/context";
import type { Route } from "./+types/maintenance";
import MaintenanceDetails from "~/vehicule/maintenance_details";
import { maintenances, vehicules } from "~/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "react-router";

const db = database();

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
  const vehiculeId = parseInt(params.vehiculeId);
  const maintenanceId = parseInt(
    params.maintenanceId ? params.maintenanceId : "-1",
  );

  const vehiculeData = await db
    .select()
    .from(vehicules)
    .where(eq(vehicules.id, vehiculeId));

  const maintenanceData = await getMaintenance(maintenanceId);

  return {
    vehiculeData,
    maintenanceData,
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  const maintenanceId = parseInt(
    params.maintenanceId ? params.maintenanceId : "-1",
  );
  const vehiculeId = parseInt(params.vehiculeId);

  switch (request.method) {
    case "DELETE":
      deleteMaintenance(maintenanceId);
      return redirect(`/vehicules/${vehiculeId}`);
    case "POST":
      updateMaintenance(maintenanceId, formData);
      break;
    case "PUT":
      const newMaintenanceId = await createMaintenance(vehiculeId);
      return redirect(
        `/vehicules/${vehiculeId}/maintenance/${newMaintenanceId}`,
      );
  }
}

async function deleteMaintenance(maintenanceId: number) {
  await db.delete(maintenances).where(eq(maintenances.id, maintenanceId));
}

async function getMaintenance(maintenanceId: number) {
  if (maintenanceId === -1) {
    return { id: -1, title: "", description: "", dateToDo: "", done: false };
  }

  return await db
    .select()
    .from(maintenances)
    .where(eq(maintenances.id, maintenanceId));
}

async function createMaintenance(vehiculeId: number) {
  const newMaintenance = await db
    .insert(maintenances)
    .values({
      vehiculeId: vehiculeId,
      title: "Nouvelle maintenance",
      description: "Description de la maintenance",
      dateToDo: new Date().toISOString().split("T")[0],
      cost: 0,
      done: false,
    })
    .returning();
  return newMaintenance[0].id;
}

async function updateMaintenance(maintenanceId: number, formData: FormData) {
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
