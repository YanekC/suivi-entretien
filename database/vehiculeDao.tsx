import { eq } from "drizzle-orm";
import { database } from "./context";
import {
  maintenances,
  vehicules,
  type Maintenance,
  type Vehicule,
} from "./schema";
import assert from "assert";

const db = database();

export async function getVehiculeOrDefault(
  vehiculeId: number,
): Promise<Vehicule> {
  const foundVehicules = await db
    .select()
    .from(vehicules)
    .where(eq(vehicules.id, vehiculeId));
  if (foundVehicules.length === 0) {
    return getDefaultVehicule();
  }
  return foundVehicules[0];
}

function getDefaultVehicule(): Vehicule {
  return {
    id: -1,
    brand: "Marque",
    model: "Modèle",
    year: 2000,
    kilometers: 0,
  } as Vehicule;
}
