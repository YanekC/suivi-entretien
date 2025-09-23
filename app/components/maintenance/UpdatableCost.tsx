export default function UpdatableCost({
  name,
  updating,
  className,
  value,
  onChange,
}: {
  name: string;
  className?: string;
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
    comp = <span className={className ? className : ""}>{value}</span>;
  }
  return (
    <>
      <label htmlFor={name} className="font-semibold">
        Coût:
      </label>
      <div className="inline">
        {comp}
        <span> €</span>
      </div>
    </>
  );
}
