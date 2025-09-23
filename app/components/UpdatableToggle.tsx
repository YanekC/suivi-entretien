import type { Maintenance } from "~/database/schema";

export default function UpdatableMaintenanceStatus({
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
        {maintenance.done ? "Faite" : "À faire"}
      </span>
    );
  }
}
