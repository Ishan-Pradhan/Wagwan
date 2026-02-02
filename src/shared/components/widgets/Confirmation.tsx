import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

function Confirmation({
  isSuccess,
  message,
}: {
  isSuccess: boolean;
  message: string;
}) {
  return (
    <div className="pop-up flex max-w-sm items-center gap-3 rounded-lg border-2 border-gray-300 p-3">
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
