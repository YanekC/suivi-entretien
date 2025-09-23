export default function UpdatableTextField({
  name,
  updating,
  type,
  value,
  onChange,
}: {
  name: string;
  type: string;
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
    return <span className="mt-4 text-2xl font-bold">{value}</span>;
  }
}
