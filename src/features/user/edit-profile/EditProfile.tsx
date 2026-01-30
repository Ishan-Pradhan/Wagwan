import { useGetProfile } from "../profile/hooks/useGetProfile";
import LottieLoading from "@components/custom-ui/LottieLoading";
import EditProfileForm from "./components/EditProfileForm";
import ChangeProfilePhoto from "./components/ChangeProfilePhoto";
import api from "api/api";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "@components/custom-ui/Spinner";
import { useAppSelector } from "stores/hooks";

function EditProfile() {
  const { user } = useAppSelector((state) => state.auth);

  const { data: profile, isLoading } = useGetProfile(user?.username);
  const [loading, setLoading] = useState(false);

  if (!profile) {
    return isLoading ? <LottieLoading /> : null;
  }

  const handleVerifyingUser = async () => {
    setLoading(true);
    const res = await api.post("/users/resend-email-verification");
    if (res.data.success) {
      setLoading(false);
      toast.success(res.data.message);
    }
    if (!res.data.success) {
      setLoading(false);
      toast.error(res.data.message);
    }
  };

  return (
    <div className="container flex flex-col gap-5 py-5 lg:px-40 lg:py-10">
      {!user?.isEmailVerified && (
        <div className="bg-warning-50 border-warning-200 flex flex-col gap-2 rounded-md border p-3 lg:flex-row lg:justify-between">
          <div className="flex flex-col">
            <span className="body-m-semibold">
              You have not verified your email.{" "}
            </span>
            <p className="body-s-regular text-gray-700">
              Please verify your email to gain access to messaging and posting.
            </p>
          </div>
          <button
            onClick={handleVerifyingUser}
            disabled={loading}
            className="bg-warning-500 hover:bg-warning-700 body-m-semibold flex cursor-pointer items-center justify-center rounded-sm px-4 py-2 text-white"
          >
            Verify Email
            {loading && <Spinner />}
          </button>
        </div>
      )}
      <ChangeProfilePhoto user={user!} />
      <EditProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
