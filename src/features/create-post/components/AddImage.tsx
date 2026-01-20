import { useFormContext } from "react-hook-form";
import { useState } from "react";
import PostImagePreview from "./PostImagePreview";

interface AddImagePropTypes {
  onNext: () => void;
  onImagesSelected: (images: File[]) => void;
}

function AddImage({ onNext, onImagesSelected }: AddImagePropTypes) {
  const {
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();

  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to File array
      const fileArray = Array.from(files);
      setPreviewImages(fileArray);
      setValue("images", fileArray, { shouldValidate: false });
      onImagesSelected(fileArray);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger("images");
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {previewImages.length === 0 ? (
        <div className="flex flex-col gap-3 justify-center items-center h-96">
          <span className="heading-2-regular">Add photos</span>
          <label
            htmlFor="add-image"
            className="bg-primary-500 text-white px-4 py-2 hover:bg-primary-600 cursor-pointer rounded-md"
          >
            Select from computer
          </label>
          <input
            id="add-image"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <>
          <div className="lg:aspect-square  h-96 overflow-hidden">
            <PostImagePreview images={previewImages} forAddImage />
          </div>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="add-image-change"
              className="text-gray-800 hover:text-gray-600 cursor-pointer text-sm"
            >
              Change images
            </label>
            <input
              id="add-image-change"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </>
      )}

      {errors.images && (
        <p className="text-red-500 text-sm">
          {errors.images.message as string}
        </p>
      )}

      {previewImages.length > 0 && (
        <button
          className="self-end cursor-pointer bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default AddImage;
