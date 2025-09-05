import { database } from "~/database/context";

import { VehiculesList } from "~/vehicule/list_vehicules";
import type { Route } from "./+types/list";

export function meta() {
  return [
    { title: "Liste des véhicules" },
    {
      name: "description",
      content: "Ensemble des véhicules que vous possedez",
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const vehicules = await db.query.vehicules.findMany({
    columns: {
      id: true,
      brand: true,
      kilometers: true,
      model: true,
      year: true,
    },
  });

  return {
    vehicules,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function Vehicules({ loaderData }: Route.ComponentProps) {
  return <VehiculesList vehicules={loaderData.vehicules} />;
}
