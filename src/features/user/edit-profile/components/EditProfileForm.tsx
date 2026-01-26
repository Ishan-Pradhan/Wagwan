import Button from "@components/custom-ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import toast from "react-hot-toast";
import type { UserProfile } from "features/user/profile/components/UserDetail";
import Spinner from "@components/ui/Spinner";

function EditProfileForm({ profile }: { profile: UserProfile }) {
  const [bio, setBio] = useState(profile.bio);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);

  const updateProfileMutation = useUpdateProfile();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },

      onError: () => {
        toast.error("Please don't leave the field empty");
      },
    });
  };

  return (
    <form action="" className="flex flex-col  gap-3 w-full">
      <div className="flex-1 flex gap-3 w-full ">
        <div className="flex flex-1 flex-col gap-1 w-full">
          <label htmlFor="firstName" className="body-m-medium">
            First Name
          </label>
          <input
            id="firstName"
            placeholder="firstName"
            className="p-2 border w-full border-gray-300 rounded-md"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 w-full">
          <label htmlFor="lastName" className="body-m-medium">
            Last Name
          </label>
          <input
            id="lastName"
            placeholder="lastName"
            className="p-2 border w-full border-gray-300 rounded-md"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="bio" className="body-m-medium">
          Bio
        </label>
        <textarea
          id="bio"
          placeholder="Bio"
          className="p-2 border border-gray-300 rounded-md"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <Button
        type="button"
        className="lg:self-end px-20 body-l-medium flex gap-2 items-center justify-center"
        onClick={handleSubmit}
        disabled={updateProfileMutation.isPending}
      >
        <span className="">Submit</span>
        {updateProfileMutation.isPending && <Spinner />}
      </Button>
    </form>
  );
}

export default EditProfileForm;
