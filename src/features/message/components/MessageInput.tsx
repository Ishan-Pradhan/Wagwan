import { PlusIcon } from "@phosphor-icons/react";
import Button from "@components/custom-ui/Button";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

function MessageInput({
  setAttachments,
  messageToBeSent,
  sendMessage,
  handleTypingInput,
}: {
  setAttachments: Dispatch<SetStateAction<File[]>>;
  messageToBeSent: string;
  sendMessage: () => void;
  handleTypingInput: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-4 p-4">
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        id="attachment-input"
        onChange={(e) => {
          if (!e.target.files) return;
          setAttachments(Array.from(e.target.files).slice(0, 5));
        }}
      />
      <label htmlFor="attachment-input" className="cursor-pointer">
        <PlusIcon size={22} className="hover:text-gray-500" />
      </label>
      <div className="w-full">
        <input
          type="text"
          className="h-full w-full rounded-full border border-gray-200 px-3 py-3"
          placeholder="Message"
          value={messageToBeSent}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          onChange={handleTypingInput}
        />
      </div>
      <Button type="button" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
}

export default MessageInput;
