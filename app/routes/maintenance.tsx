import type { Route } from "./+types/maintenance";
import MaintenanceDetails from "~/components/maintenance/maintenance_details";
import { type Maintenance } from "~/database/schema";
import { redirect } from "react-router";
import {
  createMaintenance,
  deleteMaintenance,
  getMaintenanceOrDefault,
  updateMaintenance,
} from "~/database/maintenanceDao";
import { getVehiculeOrDefault } from "~/database/vehiculeDao";

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

  const vehiculeData = await getVehiculeOrDefault(vehiculeId);

  const maintenanceData = await getMaintenanceOrDefault(maintenanceId);

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
      await deleteMaintenance(maintenanceId);
      return redirect(`/vehicules/${vehiculeId}`);
    case "POST":
      const maintenance: Maintenance = {
        id: maintenanceId,
        vehiculeId: vehiculeId,
        title: (formData.get("title") as string) || "",
        done: formData.get("done") === "on",
        dateToDo: (formData.get("dateToDo") as string) || "",
        dateDone: (formData.get("dateDone") as string) || "",
        description: (formData.get("description") as string) || "",
        cost: parseInt(formData.get("cost") as string) || 0,
      };
      updateMaintenance(maintenance);
      break;
    case "PUT":
      const newMaintenanceId = await createMaintenance(vehiculeId);
      return redirect(
        `/vehicules/${vehiculeId}/maintenance/${newMaintenanceId}`,
      );
  }
}

export default function MaintenanceContainer({
  loaderData,
}: Route.ComponentProps) {
  return (
    <MaintenanceDetails
      maintenanceParam={loaderData.maintenanceData}
      vehicule={loaderData.vehiculeData}
    />
  );
}
