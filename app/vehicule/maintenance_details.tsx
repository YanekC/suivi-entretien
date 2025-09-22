import { useState } from "react";
import { useFetcher } from "react-router";
import type { Maintenance, Vehicule } from "~/database/schema";

function UpdatableToggle({
  updating,
  maintenance,
  onChange,
  name,
}: {
  updating: boolean;
  maintenance: Maintenance;
  onChange: (newStatus: boolean) => void;
  name: string;
}) {
  if (updating) {
    return (
      <input
        name={name}
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

function ModifyButton({
  updating,
  setUpdateing,
  onValidate,
}: {
  updating: boolean;
  setUpdateing: (updating: boolean) => void;
  onValidate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  if (!updating) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        type="button"
        onClick={() => setUpdateing(true)}
      >
        Modifier
      </button>
    );
  } else {
    return (
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
        onClick={(event) => {
          setUpdateing(false);
          onValidate(event);
        }}
        type="button"
      >
        Valider
      </button>
    );
  }
}

function UpdatableDate({
  name,
  updating,
  value,
  onChange,
}: {
  name: string;
  updating: boolean;
  value: string | null;
  onChange: (newDate: string) => void;
}) {
  if (updating) {
    return (
      <input
        name={name}
        type="date"
        value={value ? value : "2025-01-01"}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
    );
  } else {
    return <span>{value ? new Date(value).toLocaleDateString() : "N/A"}</span>;
  }
}

function UpdatableNumberField({
  name,
  updating,
  className,
  type,
  value,
  onChange,
}: {
  name: string;
  type: string;
  className?: string;
  updating: boolean;
  value: string;
  onChange: (newValue: string) => void;
}) {
  if (updating) {
    return (
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
    );
  } else {
    return <span className={className ? className : ""}>{value}</span>;
  }
}

export default function MaintenanceDetails({
  maintenanceParam,
  vehicule,
}: {
  maintenanceParam: Maintenance;
  vehicule: Vehicule;
}) {
  let fetcher = useFetcher();
  const [updating, setUpdating] = useState(false);
  const [maintenance, setMaintenance] = useState(maintenanceParam);

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <fetcher.Form method="post" className="w-full flex flex-col items-center">
        <header className="mb-6 flex flex-col items-center">
          <UpdatableNumberField
            name="title"
            updating={updating}
            type="text"
            className="mt-4 text-2xl font-bold"
            value={maintenance.title}
            onChange={(newValue) => {
              setMaintenance({ ...maintenance, title: newValue });
            }}
          />
          <p className="text-gray-500">
            {vehicule.brand} {vehicule.model}
          </p>
        </header>

        <section className="flex flex-col gap-4 p-6 rounded shadow w-full max-w-md">
          <div className="flex justify-between">
            <span className="font-semibold">Statut:</span>
            <UpdatableToggle
              name="done"
              updating={updating}
              maintenance={maintenance}
              onChange={(newStatus) => {
                setMaintenance({ ...maintenance, done: newStatus });
              }}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Date réalisée:</span>
            <UpdatableDate
              name="dateDone"
              updating={updating}
              value={maintenance.dateDone}
              onChange={(newDate) => {
                setMaintenance({ ...maintenance, dateDone: newDate });
              }}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Date prévue:</span>
            <UpdatableDate
              name="dateToDo"
              updating={updating}
              value={maintenance.dateToDo}
              onChange={(newDate) => {
                setMaintenance({ ...maintenance, dateToDo: newDate });
              }}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Coût:</span>
            <UpdatableNumberField
              name="cost"
              updating={updating}
              type="number"
              value={maintenance.cost.toString()}
              onChange={(newValue) => {
                setMaintenance({ ...maintenance, cost: parseFloat(newValue) });
              }}
            />
          </div>
        </section>

        <div className="mt-6 flex gap-4">
          <ModifyButton
            updating={updating}
            setUpdateing={setUpdating}
            onValidate={(event) => {
              event.preventDefault();
              fetcher.submit(event.currentTarget.form);
            }}
          />
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={(event) => {
              event.preventDefault();
              fetcher.submit(event.currentTarget.form, { method: "delete" });
            }}
            type="button"
          >
            Supprimer
          </button>
        </div>
      </fetcher.Form>
    </main>
  );
}
