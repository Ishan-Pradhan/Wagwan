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

type PostMode = "create" | "edit";

interface CreatePostDialogPropTypes {
  open: boolean;
  onClose: () => void;
  mode?: PostMode;
  post?: {
    _id: string;
    content: string;
    images: { _id: string; url: string }[];
    tags: string[];
  };
}
export type ImageItem =
  | { type: "existing"; _id: string; url: string }
  | {
      type: "new";
      file: File;
      preview: string;
    };

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
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new post
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="w-full">{renderStep(currentStep)}</form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
