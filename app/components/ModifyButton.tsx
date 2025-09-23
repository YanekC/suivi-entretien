export default function ModifyButton({
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
        className="px-4 py-2 w-30 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        type="button"
        onClick={() => setUpdateing(true)}
      >
        Modifier
      </button>
    );
  } else {
    return (
      <button
        className="px-4 py-2 w-30 bg-green-600 text-white rounded-md hover:bg-green-800"
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
