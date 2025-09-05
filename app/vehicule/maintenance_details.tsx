import type { Maintenance, Vehicule } from "~/database/schema";

export default function MaintenanceDetails({
  maintenance,
  vehicule,
}: {
  maintenance: Maintenance;
  vehicule: Vehicule;
}) {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <header className="mb-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            className="text-gray-500"
          >
            <path
              d="M12 6v6l4 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold">{maintenance.title}</h1>
        <p className="text-gray-500">
          {vehicule.brand} {vehicule.model}
        </p>
      </header>

      <section className="flex flex-col gap-4 p-6 rounded shadow w-full max-w-md">
        <div className="flex justify-between">
          <span className="font-semibold">Statut:</span>
          <span
            className={maintenance.done ? "text-green-600" : "text-orange-600"}
          >
            {maintenance.done ? "Terminé" : "À faire"}
          </span>
        </div>

        {maintenance.dateDone && (
          <div className="flex justify-between">
            <span className="font-semibold">Date réalisée:</span>
            <span>{new Date(maintenance.dateDone).toLocaleDateString()}</span>
          </div>
        )}

        {maintenance.dateToDo && (
          <div className="flex justify-between">
            <span className="font-semibold">Date prévue:</span>
            <span>{new Date(maintenance.dateToDo).toLocaleDateString()}</span>
          </div>
        )}

        {maintenance.cost && (
          <div className="flex justify-between">
            <span className="font-semibold">Coût:</span>
            <span className="text-green-600 font-semibold">
              {maintenance.cost}€
            </span>
          </div>
        )}
      </section>

      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Modifier
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Supprimer
        </button>
      </div>
    </main>
  );
}
