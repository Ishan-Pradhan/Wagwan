import { useLottie } from "lottie-react";

// import loadingAnimation from "@assets/lottie/loading.json";
import loadingAnimation from "@assets/lottie/custom_lottie_loader.json";

export default function LottieLoading() {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div className="h-lvh flex justify-center items-center">{View}</div>;
}
