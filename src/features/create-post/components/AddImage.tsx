import { useFormContext } from "react-hook-form";

interface AddImagePropTypes {
  onNext: () => void;
}

function AddImage({ onNext }: AddImagePropTypes) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext();

  const handleNext = async () => {
    const images = getValues("images");
    console.log("images:", images);
    const isValid = await trigger("images");
    if (isValid) onNext();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        {...register("images")}
      />

      {errors.images && (
        <p className="text-red-500 text-sm">
          {errors.images.message as string}
        </p>
      )}

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default AddImage;
