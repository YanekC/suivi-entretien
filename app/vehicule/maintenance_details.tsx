import { useState } from "react";
import type { Maintenance, Vehicule } from "~/database/schema";

function StatusToggle({
  updating,
  maintenance,
  onChange,
}: {
  updating: boolean;
  maintenance: Maintenance;
  onChange: (newStatus: boolean) => void;
}) {
  if (updating) {
    return (
      <input
        type="checkbox"
        checked={maintenance.done}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  } else {
    return (
      <span className={maintenance.done ? "text-green-600" : "text-orange-600"}>
        {maintenance.done ? "Terminé" : "À faire"}
      </span>
    );
  }
}

function DateUpdate({
  updating,
  maintenance,
  onChange,
}: {
  updating: boolean;
  maintenance: Maintenance;
  onChange: (newDate: string) => void;
}) {
  if (updating) {
    return (
      <input
        type="date"
        value={maintenance.dateToDo}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
    );
  } else {
    return (
      <span>
        {maintenance.dateToDo
          ? new Date(maintenance.dateToDo).toLocaleDateString()
          : "N/A"}
      </span>
    );
  }
}

export default function MaintenanceDetails({
  maintenanceParam,
  vehicule,
}: {
  maintenanceParam: Maintenance;
  vehicule: Vehicule;
}) {
  const [updating, setUpdating] = useState(false);
  const [maintenance, setMaintenance] = useState(maintenanceParam);
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold">{maintenance.title}</h1>
        <p className="text-gray-500">
          {vehicule.brand} {vehicule.model}
        </p>
      </header>

      <section className="flex flex-col gap-4 p-6 rounded shadow w-full max-w-md">
        <div className="flex justify-between">
          <span className="font-semibold">Statut:</span>
          <StatusToggle
            updating={updating}
            maintenance={maintenance}
            onChange={(newStatus) => {
              setMaintenance({ ...maintenance, done: newStatus });
            }}
          />
        </div>

        {maintenance.dateDone && (
          <div className="flex justify-between">
            <span className="font-semibold">Date réalisée:</span>
            <DateUpdate
              updating={updating}
              maintenance={maintenance}
              onChange={(newDate) => {
                setMaintenance({ ...maintenance, dateDone: newDate });
              }}
            />
          </div>
        )}

        {maintenance.dateToDo && (
          <div className="flex justify-between">
            <span className="font-semibold">Date prévue:</span>
            <DateUpdate
              updating={updating}
              maintenance={maintenance}
              onChange={(newDate) => {
                setMaintenance({ ...maintenance, dateToDo: newDate });
              }}
            />
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
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setUpdating(!updating)}
        >
          Modifier
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Supprimer
        </button>
      </div>
    </main>
  );
}
