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
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-3 justify-center items-center h-50">
        <span className="heading-2-regular">Add photos</span>
        <label
          htmlFor="add-image"
          className="bg-primary-500 text-white px-4 py-1 hover:bg-primary-600 cursor-pointer rounded-sm"
        >
          Add Images
        </label>
        <input
          id="add-image"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          {...register("images")}
        />
      </div>
      {errors.images && (
        <p className="text-red-500 text-sm">
          {errors.images.message as string}
        </p>
      )}
      <button
        className="self-end bg-primary-500 text-white px-4 py-1 rounded-sm"
        type="button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default AddImage;
