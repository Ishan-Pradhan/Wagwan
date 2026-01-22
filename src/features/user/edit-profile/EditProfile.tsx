import { useAuth } from "context/auth/AuthContext";
import { useGetProfile } from "../profile/hooks/useGetProfile";
import LottieLoading from "@components/ui/LottieLoading";
import EditProfileForm from "./components/EditProfileForm";
import ChangeProfilePhoto from "./components/ChangeProfilePhoto";
import api from "api/api";
import toast from "react-hot-toast";

function EditProfile() {
  const { user, setUser } = useAuth();
  const { data: profile, isLoading } = useGetProfile(user?.username);

  if (!profile) {
    return isLoading ? <LottieLoading /> : null;
  }

  const handleVerifyingUser = async () => {
    const res = await api.post("/users/resend-email-verification");
    if (res.data.success) {
      toast.success(res.data.message);
    }
    if (!res.data.success) {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-5  container px-40 py-10 ">
      {!user?.isEmailVerified && (
        <div className="bg-warning-50 rounded-md p-3 flex justify-between gap-2 border border-warning-200">
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
            className="bg-warning-500 hover:bg-warning-700 cursor-pointer text-white px-4 body-m-semibold rounded-md flex items-center"
          >
            Verify Email
          </button>
        </div>
      )}
      <ChangeProfilePhoto user={user!} setUser={setUser} />
      <EditProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
