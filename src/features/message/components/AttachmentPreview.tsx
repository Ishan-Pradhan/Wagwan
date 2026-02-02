import { XIcon } from "@phosphor-icons/react";
import type { Dispatch, SetStateAction } from "react";

function AttachmentPreview({
  index,
  file,
  setAttachments,
}: {
  index: number;
  file: File;
  setAttachments: Dispatch<SetStateAction<File[]>>;
}) {
  return (
    <div key={index} className="relative">
      <img
        src={URL.createObjectURL(file)}
        className="h-16 w-16 rounded object-cover"
      />
      <button
        className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-gray-800 p-1 text-xs text-white hover:bg-gray-600"
        onClick={() =>
          setAttachments((prev) => prev.filter((_, i) => i !== index))
        }
      >
        <XIcon />
      </button>
    </div>
  );
}

export default AttachmentPreview;
