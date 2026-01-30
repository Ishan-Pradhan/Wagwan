type PostMode = "create" | "edit";

export interface CreatePostDialogPropTypes {
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

export interface AddContentPropTypes {
  images: ImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  mode: "create" | "edit";
  postId?: string;
  onBack: () => void;
  onClose: () => void;
}

export interface AddImagePropTypes {
  images: ImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  onNext: () => void;
  mode: "edit" | "create";
}

export interface PostImagePreviewProps {
  images: ImageItem[];
  forAddImage?: boolean;
  postId?: string;
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

export interface DeleteImageVars {
  image: Extract<ImageItem, { type: "existing" }>;
  postId: string;
}
