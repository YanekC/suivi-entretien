import { useState } from "react";
import { Form, NavLink } from "react-router";
import AddButton from "~/components/AddButton";
import ModifyDeleteButtons from "~/components/ModifyDeleteButtons";
import ReturnButton from "~/components/ReturnButton";
import SvgRightArrow from "~/components/SvgRightArrow";
import UpdatableKilometers from "~/components/vehicule/UpdatableKilometers";
import UpdatableYear from "~/components/vehicule/UpdatableYear";
import type { Maintenance, Vehicule } from "~/database/schema";

export default function VehiculeDetails({
  vehiculeParam,
  maintenances,
}: {
  vehiculeParam: Vehicule;
  maintenances: Maintenance[] | null;
}) {
  const [updating, setUpdating] = useState(false);
  const [vehicule, setVehicule] = useState(vehiculeParam);

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <ReturnButton url="/" />
      <header className="mb-6 flex flex-col items-center">
        <img
          src="/car-placeholder.jpg"
          alt={`${vehicule.brand} ${vehicule.model}`}
          className="w-32 h-32 object-cover rounded-full shadow"
        />
        <h1 className="mt-4 text-2xl font-bold">
          {vehicule.brand} {vehicule.model}
        </h1>
      </header>
      <section className="flex flex-row gap-8 pl-6 pr-6 pt-6 rounded shadow">
        <div>
          <UpdatableYear
            name="year"
            updating={updating}
            value={vehicule.year.toString()}
            onChange={(newValue) => {
              setVehicule({ ...vehicule, year: parseInt(newValue) });
            }}
          />
        </div>
        <div>
          <UpdatableKilometers
            name="kilometers"
            updating={updating}
            value={vehicule.kilometers.toString()}
            onChange={(newValue) => {
              setVehicule({ ...vehicule, kilometers: parseInt(newValue) });
            }}
          />
        </div>
      </section>
      <ModifyDeleteButtons
        updating={updating}
        setUpdating={setUpdating}
        onValidate={(event) => {
          event.preventDefault();
        }}
        onDelete={(event) => {
          event.preventDefault();
        }}
      />
      <div className="flex w-full pt-4 max-w-md border-b border-gray-200  dark:border-gray-700">
        <h2 className="text-3xl flex-2 m-4">Entretiens</h2>
        <Form action={`/vehicules/${vehicule.id}/maintenance/`} method="put">
          <AddButton />
        </Form>
      </div>
      <div className="items-center w-full max-w-md gap-16 min-h-0">
        <div className="w-full space-y-6">
          <ul className="">
            {maintenances?.map(({ id, title, done }) => (
              <NavLink
                to={`/vehicules/${vehicule.id}/maintenance/${id}`}
                key={id}
              >
                <li
                  key={id}
                  className="border-b border-gray-200  dark:border-gray-700 p-3 flex flex-row gap-4 max-h-40"
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold"> {title} </span>
                    <span>{done ? "✅" : "❌"}</span>
                  </div>
                  <SvgRightArrow />
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
