import { useFormContext, type FieldError } from "react-hook-form";
import PostImagePreview from "./PostImagePreview";
import { ImageIcon } from "@phosphor-icons/react";
import type { AddImagePropTypes, ImageItem } from "../types/CreatePostTypes";
import { useRef } from "react";

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

  console.log(errors);

  const hasImages =
    mode === "edit" ? true : images.some((i) => i.type === "new");

  const triggerInput = useRef<HTMLInputElement>(null);

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
    <div className="flex w-full flex-col gap-4">
      {!hasImages ? (
        <div className="flex h-96 flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-gray-200 p-4">
              <ImageIcon size={40} />
            </div>
            <span className="heading-2-medium">Add Photos</span>
          </div>

          <label
            htmlFor="add-image"
            className="bg-primary-500 hover:bg-primary-600 cursor-pointer rounded-md px-4 py-2 text-white"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") triggerInput.current?.click();
            }}
            aria-label="upload images"
          >
            Select from device
          </label>

          <input
            ref={triggerInput}
            id="add-image"
            type="file"
            multiple
            // accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <>
          <div className="h-96 overflow-hidden lg:aspect-square">
            <PostImagePreview
              images={images}
              forAddImage
              setImages={setImages}
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="add-image-change"
              onKeyDown={(e) => {
                if (e.key === "Enter") triggerInput.current?.click();
              }}
              tabIndex={0}
              className="cursor-pointer text-sm text-gray-800 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-600"
            >
              Add more images
            </label>

            <input
              id="add-image-change"
              ref={triggerInput}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </>
      )}

      {errors.images && Array.isArray(errors.images) && (
        <div className="text-sm text-red-500">
          {errors.images.map((error: FieldError, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      )}

      {hasImages && (
        <button
          type="button"
          onClick={handleNext}
          className="bg-primary-500 hover:bg-primary-600 cursor-pointer self-end rounded-md px-6 py-2 text-white"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default AddImage;
