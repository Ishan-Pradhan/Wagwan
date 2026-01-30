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
        className="h-16 w-16 object-cover rounded"
      />
      <button
        className="absolute -top-1 -right-1 bg-gray-800 cursor-pointer hover:bg-gray-600 text-white rounded-full text-xs p-1"
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
