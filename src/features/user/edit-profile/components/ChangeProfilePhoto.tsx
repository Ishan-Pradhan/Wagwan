import type { User } from "types/LoginTypes";
import { useUpdatePhoto } from "../hooks/useUpdatePhoto";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/ui/Spinner";

function ChangeProfilePhoto({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  const updatePhotoMutation = useUpdatePhoto();
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return null;
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append("avatar", file);

    updatePhotoMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Profile Picture changed");
        setUser({ ...user, avatar: data.avatar });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between items-center bg-gray-100 p-3 rounded-md">
      <div className="flex gap-4 items-center ">
        <img
          src={user?.avatar.url}
          alt="user avatar"
          className="w-15 h-15 rounded-full"
        />

        <div className="flex flex-col ">
          <span className="body-m-semibold ">{user?.username}</span>
          <span className="body-s-regular text-gray-500">{user?.email}</span>
        </div>
        {user.isEmailVerified ? (
          <div className="border border-green-500 bg-green-50 text-green-500 px-2 py-1 caption-regular rounded-full">
            Verified
          </div>
        ) : (
          <div className="border border-warning-500 bg-warning-50 text-warning-500 px-2 py-1 caption-regular rounded-full">
            Not Verified
          </div>
        )}
      </div>
      <form action="" className="">
        <label
          className="rounded-sm w-full bg-primary-700 text-white px-4 py-2 cursor-pointer hover:bg-primary-500"
          htmlFor="avatar"
        >
          <span>Change Photo</span>
          {updatePhotoMutation.isPending && <Spinner />}
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="hidden"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}

export default ChangeProfilePhoto;
