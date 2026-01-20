import { useLottie } from "lottie-react";
// If the above still fails, try: import { Lottie } from "lottie-react";

import loadingAnimation from "@assets/lottie/loading.json";

export default function LottieLoading() {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div className="h-lvh flex justify-center items-center">{View}</div>;
}
