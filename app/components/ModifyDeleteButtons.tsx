import ModifyButton from "./maintenance/ModifyButton";

export default function ModifyDeleteButtons({
  updating,
  setUpdating,
  onValidate,
  onDelete,
}: {
  updating: boolean;
  setUpdating: (updating: boolean) => void;
  onValidate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <div className="mt-5 flex justify-between w-full max-w-md">
      <ModifyButton
        updating={updating}
        setUpdating={setUpdating}
        onValidate={onValidate}
      />
      <button
        className="px-4 py-2 w-30 bg-red-500 text-white rounded-md hover:bg-red-700"
        onClick={onDelete}
        type="button"
      >
        Supprimer
      </button>
    </div>
  );
}
