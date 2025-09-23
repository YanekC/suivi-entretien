export default function UpdatableTextArea({
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
  if (updating) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1 w-full max-w-md resize-none"
        rows={3}
        placeholder="Description de la maintenance..."
      />
    );
  } else {
    return (
      <p className="text-white max-w-md p-2 whitespace-pre">
        {value || "Aucune description"}
      </p>
    );
  }
}
