import { Form, NavLink } from "react-router";
import type { Maintenance, Vehicule } from "~/database/schema";

export default function VehiculeDetails({
  vehicule,
  maintenances,
}: {
  vehicule: Vehicule;
  maintenances: Maintenance[] | null;
}) {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
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
      <section className="flex flex-row gap-8 p-6 rounded shadow">
        <div>
          <span className="font-semibold">Année:</span> {vehicule.year}
        </div>
        <div>
          <span className="font-semibold">Kilométrage: </span>
          {vehicule.kilometers} km
        </div>
      </section>
      <div className="flex border-b border-gray-200  dark:border-gray-700">
        <h1 className="text-3xl flex-2 m-4">Maintenance</h1>
        <Form action={`/vehicules/${vehicule.id}/maintenance/`} method="put">
          <button className=" m-4 text-3xl text-blue-200 bg-blue-500 rounded-md size-9 ">
            +
          </button>
        </Form>
      </div>
      <div className="items-center gap-16 min-h-0">
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
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold">
                      {title} - {done ? "Fait" : "À faire"}
                    </span>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
