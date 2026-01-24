import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { EditIcon } from "lucide-react";
import type { User } from "types/LoginTypes";

function MessageSideMenu({ user }: { user: User }) {
  return (
    <div className="col-span-1 p-4 border-r border-gray-200 h-lvh">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="body-m-semibold">{user?.username}</span>
          <EditIcon />
        </div>
        <div className="flex  items-center focus-within:outline focus-within:outline-primary-500 px-2 py-1 border border-gray-300 rounded-full">
          <label htmlFor="searchPeople" className="text-gray-500">
            <MagnifyingGlassIcon />
          </label>
          <input
            id="searchPeople"
            type="search"
            className="w-full px-2 focus:outline-0"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="body-m-bold">Messages</span>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <img
                src={`https://picsum.photos/200/300`}
                alt="user avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <span className="body-m-medium">{`Hari Chandra`}</span>
                <p className="caption-regular">{`Eh lala`}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <img
                src={`https://picsum.photos/200/300`}
                alt="user avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <span className="body-m-medium">{`Ram Lal`}</span>
                <p className="caption-regular">{`Eh Horaaa`}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <img
                src={`https://picsum.photos/200/300`}
                alt="user avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <span className="body-m-medium">{`John Rai`}</span>
                <p className="caption-regular">{`Haha`}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <img
                src={`https://picsum.photos/200/300`}
                alt="user avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <span className="body-m-medium">{`Mr. Beast`}</span>
                <p className="caption-regular">{`6000`}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <img
                src={`https://picsum.photos/200/300`}
                alt="user avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <span className="body-m-medium">{`Dean`}</span>
                <p className="caption-regular">{`wagwan`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSideMenu;
