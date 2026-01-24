import Button from "@components/ui/Button";
import { CircleIcon } from "@phosphor-icons/react";

function MessageSection() {
  return (
    <div className="flex flex-col  w-full col-span-4">
      <div className="py-3 flex gap-4 items-center border-b border-gray-200 w-full px-4">
        <img
          src={`https://picsum.photos/200/300`}
          alt="user profile avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="body-l-semibold">Hari Chandra</span>
          <span className="caption-regular text-gray-500">hari_chandra</span>
        </div>
      </div>
      <div className=" flex-1">
        <div className=" overflow-y-auto flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img
              src={`https://picsum.photos/200/300`}
              alt="user profile avatar"
              className="w-15 h-15 rounded-full"
            />
            <div className="flex gap-2 items-center">
              <span className="body-s-regular text-gray-500">{`Hari Chandra`}</span>
              <CircleIcon weight="fill" fill="gray" size={4} />
              <span className="body-s-regular text-gray-500">{`Wagwan`}</span>
            </div>
            <Button type="button" className="body-s-medium">
              View Profile
            </Button>
          </div>
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4">
        <div className="w-full">
          <input
            type="text"
            className="border border-gray-200 rounded-full w-full h-full py-3 px-3"
            placeholder="Message"
          />
        </div>
        <Button type="button">Send</Button>
      </div>
    </div>
  );
}

export default MessageSection;
