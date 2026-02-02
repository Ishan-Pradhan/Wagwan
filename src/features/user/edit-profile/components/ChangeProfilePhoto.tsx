import type { User } from "types/LoginTypes";
import { useUpdatePhoto } from "../hooks/useUpdatePhoto";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/custom-ui/Spinner";
import { useDispatch } from "react-redux";
import { setUser } from "stores/auth/authSlice";

function ChangeProfilePhoto({ user }: { user: User }) {
  const updatePhotoMutation = useUpdatePhoto();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return null;
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append("avatar", file);

    updatePhotoMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Profile Picture changed");
        dispatch(setUser({ ...user, avatar: data.avatar }));

        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="flex flex-col items-center gap-4 rounded-md bg-gray-100 p-3 lg:flex-row lg:justify-between dark:bg-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar.url}
          alt="user avatar"
          className="h-15 w-15 rounded-full"
        />

        <div className="flex flex-col">
          <span className="body-m-semibold">{user?.username}</span>
          <span className="body-s-regular text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>
        {user.isEmailVerified ? (
          <div className="caption-regular rounded-full border border-green-500 bg-green-50 px-2 py-1 text-green-500 dark:bg-gray-800">
            Verified
          </div>
        ) : (
          <div className="border-warning-500 bg-warning-50 text-warning-500 caption-regular rounded-full border px-2 py-1">
            Not Verified
          </div>
        )}
      </div>
      <form>
        <label
          className="bg-primary-700 hover:bg-primary-500 w-full cursor-pointer rounded-sm px-4 py-2 text-white"
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
