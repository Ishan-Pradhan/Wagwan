import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

function Confirmation({
  isSuccess,
  message,
}: {
  isSuccess: boolean;
  message: string;
}) {
  return (
    <div className="flex gap-3 max-w-sm items-center  p-3 border-2 border-gray-300 rounded-lg pop-up ">
      {isSuccess && (
        <div>
          <CheckCircleIcon size={32} fill="green" weight="duotone" />
        </div>
      )}
      {!isSuccess && (
        <div>
          <XCircleIcon size={32} fill="green" weight="duotone" />
        </div>
      )}

      <p className="body-m-semibold">{message}</p>
    </div>
  );
}

export default Confirmation;
