import Button from "@components/custom-ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import toast from "react-hot-toast";
import Spinner from "@components/custom-ui/Spinner";
import type { UserProfile } from "shared/features/user-profile/types/UserDetailsTypes";

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
    <form action="" className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-1 gap-3">
        <div className="flex w-full flex-1 flex-col gap-1">
          <label htmlFor="firstName" className="body-m-medium">
            First Name
          </label>
          <input
            id="firstName"
            placeholder="firstName"
            className="w-full rounded-md border border-gray-300 p-2"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-1 flex-col gap-1">
          <label htmlFor="lastName" className="body-m-medium">
            Last Name
          </label>
          <input
            id="lastName"
            placeholder="lastName"
            className="w-full rounded-md border border-gray-300 p-2"
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
          className="rounded-md border border-gray-300 p-2"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <Button
        type="button"
        className="body-l-medium flex items-center justify-center gap-2 px-20 lg:self-end"
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
