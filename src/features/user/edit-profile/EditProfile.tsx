import { useGetProfile } from "../profile/hooks/useGetProfile";
import LottieLoading from "@components/ui/LottieLoading";
import EditProfileForm from "./components/EditProfileForm";
import ChangeProfilePhoto from "./components/ChangeProfilePhoto";
import api from "api/api";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "@components/ui/Spinner";
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
    <div className="flex flex-col gap-5  container lg:px-40 lg:py-10 py-5">
      {!user?.isEmailVerified && (
        <div className="bg-warning-50 rounded-md p-3 flex flex-col lg:flex-row lg:justify-between gap-2 border border-warning-200">
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
            className="bg-warning-500 hover:bg-warning-700  cursor-pointer text-white px-4 body-m-semibold rounded-sm flex items-center justify-center py-2"
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
