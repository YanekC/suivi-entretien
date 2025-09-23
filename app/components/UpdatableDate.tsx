export default function UpdatableDate({
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
    return (
      <span>
        {value
          ? new Date(value).toLocaleDateString(navigator.languages)
          : "N/A"}
      </span>
    );
  }
}
