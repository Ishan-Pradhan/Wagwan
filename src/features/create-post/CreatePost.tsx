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

interface CreatePostDialogPropTypes {
  open: boolean;
  onClose: () => void;
}

function CreatePost({ open, onClose }: CreatePostDialogPropTypes) {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    shouldUnregister: false,
    defaultValues: {
      images: [],
      content: "",
      tags: [],
    },
  });

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <AddImage onNext={() => setCurrentStep(1)} />;
      case 1:
        return <AddContent onBack={() => setCurrentStep(0)} />;
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
      <DialogContent className="w-full p-5 ">
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
