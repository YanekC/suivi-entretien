import { useState } from "react";
import { useFetcher, NavLink } from "react-router";
import ModifyButton from "~/components/maintenance/ModifyButton";
import UpdatableCost from "~/components/maintenance/UpdatableCost";
import UpdatableDate from "~/components/maintenance/UpdatableDate";
import UpdatableMaintenanceStatus from "~/components/maintenance/UpdatableMaintenanceStatus";
import UpdatableTextArea from "~/components/maintenance/UpdatableTextArea";
import UpdatableTextField from "~/components/maintenance/UpdatableTextField";
import type { Maintenance, Vehicule } from "~/database/schema";
import ReturnButton from "../ReturnButton";

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
      <ReturnButton url={`/vehicules/${vehicule.id}`} />
      <fetcher.Form method="post" className="w-full flex flex-col items-center">
        <header className="mb-6 flex flex-col items-center relative w-full max-w-md">
          <UpdatableTextField
            name="title"
            updating={updating}
            type="text"
            value={maintenance.title}
            onChange={(newValue) => {
              setMaintenance({ ...maintenance, title: newValue });
            }}
          />
          <p className="text-gray-500">
            {vehicule.brand} {vehicule.model}
          </p>
        </header>

        <section className="flex flex-col p-6 rounded shadow w-full max-w-md">
          <div className="flex justify-between mb-4 ">
            <span className="font-semibold">Statut:</span>
            <UpdatableMaintenanceStatus
              name="done"
              updating={updating}
              maintenance={maintenance}
              onChange={(newStatus) => {
                setMaintenance({ ...maintenance, done: newStatus });
              }}
            />
          </div>

          <div className="flex justify-between mb-4">
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

          <div className="flex justify-between mb-4">
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

          <div className="flex justify-between mb-4">
            <UpdatableCost
              name="cost"
              updating={updating}
              value={maintenance.cost.toString()}
              onChange={(newValue) => {
                setMaintenance({ ...maintenance, cost: parseFloat(newValue) });
              }}
            />
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Description : </span>
          </div>
          <div className="border-t-1 border-gray-600 pt-1">
            <UpdatableTextArea
              name="description"
              updating={updating}
              value={maintenance.description || ""}
              onChange={(newValue) => {
                setMaintenance({ ...maintenance, description: newValue });
              }}
            />
          </div>
        </section>

        <div className="mt-5 flex justify-between w-full max-w-md">
          <ModifyButton
            updating={updating}
            setUpdating={setUpdating}
            onValidate={(event) => {
              event.preventDefault();
              fetcher.submit(event.currentTarget.form);
            }}
          />
          <button
            className="px-4 py-2 w-30 bg-red-500 text-white rounded-md hover:bg-red-700"
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
