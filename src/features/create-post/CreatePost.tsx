import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import AddContent from "./components/AddContent";
import AddImage from "./components/AddImage";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreatePostSchema,
  type CreatePostInput,
} from "./schema/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type {
  CreatePostDialogPropTypes,
  ImageItem,
} from "./types/CreatePostTypes";

function CreatePost({
  open,
  onClose,
  mode = "create",
  post,
}: CreatePostDialogPropTypes) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>(() => {
    if (mode === "edit" && post) {
      return post.images.map((img) => ({
        type: "existing",
        _id: img._id,
        url: img.url,
      }));
    }
    return [];
  });
  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema(mode)),
    shouldUnregister: false,
    defaultValues: {
      images: [],
      content: post?.content ?? "",
      tags: post?.tags ?? [],
    },
  });

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddImage
            mode={mode}
            images={selectedImages}
            setImages={setSelectedImages}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <AddContent
            onBack={() => setCurrentStep(0)}
            setImages={setSelectedImages}
            images={selectedImages}
            mode={mode}
            postId={post?._id}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-5xl p-5 ">
        <DialogHeader className="sr-only">
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Create a new post</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="w-full">{renderStep(currentStep)}</form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
