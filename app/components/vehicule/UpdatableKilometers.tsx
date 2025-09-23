export default function UpdatableKilometers({
  name,
  updating,
  value,
  onChange,
}: {
  name: string;
  updating: boolean;
  value: string;
  onChange: (newValue: string) => void;
}) {
  var comp;
  if (updating) {
    comp = (
      <input
        name={name}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
    );
  } else {
    comp = <span>{value}</span>;
  }
  return (
    <>
      <label htmlFor={name} className="font-semibold">
        {"Kilométrage: "}
      </label>
      <div className="inline">
        {comp}
        <span> km</span>
      </div>
    </>
  );
}
