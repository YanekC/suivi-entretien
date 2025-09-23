import { eq } from "drizzle-orm";
import { database } from "./context";
import { maintenances, type Maintenance } from "./schema";
import assert from "assert";

const db = database();

export async function deleteMaintenance(maintenanceId: number) {
  return db.delete(maintenances).where(eq(maintenances.id, maintenanceId));
}

function getDefaultMaintenance(vehiculeId: number = -1) {
  return {
    vehiculeId: vehiculeId,
    title: "Nouvelle maintenance",
    description: "Description de la maintenance",
    dateToDo: new Date().toISOString().split("T")[0],
    dateDone: new Date().toISOString().split("T")[0],
    cost: 0,
    done: false,
  } as Maintenance;
}

export async function getMaintenanceOrDefault(
  maintenanceId: number,
): Promise<Maintenance> {
  if (maintenanceId === -1) {
    return getDefaultMaintenance();
  }

  const foundMaintenances = await db
    .select()
    .from(maintenances)
    .where(eq(maintenances.id, maintenanceId));
  assert(
    foundMaintenances.length === 1,
    `Maintenance with id ${maintenanceId} not found or multiple found`,
  );

  return foundMaintenances[0];
}

export async function createMaintenance(vehiculeId: number): Promise<number> {
  const newMaintenance = await db
    .insert(maintenances)
    .values(getDefaultMaintenance(vehiculeId))
    .returning();
  return newMaintenance[0].id;
}

export async function updateMaintenance(maintenance: Maintenance) {
  await db
    .update(maintenances)
    .set({
      title: maintenance.title,
      description: maintenance.description,
      dateToDo: maintenance.dateToDo,
      dateDone: maintenance.dateDone,
      cost: maintenance.cost,
      done: maintenance.done,
    })
    .where(eq(maintenances.id, maintenance.id));
}
