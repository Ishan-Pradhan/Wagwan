import { useFormContext } from "react-hook-form";
import PostImagePreview from "./PostImagePreview";
import { ImageIcon } from "@phosphor-icons/react";
import type { AddImagePropTypes, ImageItem } from "../types/CreatePostTypes";
import { useEffect } from "react";

function AddImage({
  images,
  setImages,
  onNext,
  mode = "create",
}: AddImagePropTypes) {
  const {
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();

  const hasImages =
    mode === "edit" ? true : images.some((i) => i.type === "new");

  // to remove persisted url in the memory
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.type === "new") URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      type: "new",
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    setValue(
      "images",
      [...images, ...newImages]
        .filter((img) => img.type === "new")
        .map((img) => img.file),
      { shouldValidate: false },
    );
  };

  const handleNext = async () => {
    if (mode === "edit") {
      onNext();
      return;
    }

    const isValid = await trigger("images");
    if (isValid) onNext();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {!hasImages ? (
        <div className="flex flex-col gap-10 justify-center items-center h-96">
          <div className="flex flex-col gap-2 items-center">
            <div className="p-4 bg-gray-200 rounded-full">
              <ImageIcon size={40} />
            </div>
            <span className="heading-2-medium">Add Photos</span>
          </div>

          <label
            htmlFor="add-image"
            className="bg-primary-500 text-white px-4 py-2 hover:bg-primary-600 cursor-pointer rounded-md"
          >
            Select from device
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
          <div className="lg:aspect-square h-96 overflow-hidden">
            <PostImagePreview
              images={images}
              forAddImage
              setImages={setImages}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="add-image-change"
              className="text-gray-800 dark:text-gray-500 dark:hover:text-gray-600 hover:text-gray-600 cursor-pointer text-sm"
            >
              Add more images
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

      {hasImages && (
        <button
          type="button"
          onClick={handleNext}
          className="self-end cursor-pointer bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default AddImage;
