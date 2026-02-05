import { useLottie } from "lottie-react";

// import loadingAnimation from "@assets/lottie/loading.json";
// import loadingAnimation from "@assets/lottie/custom_lottie_loader.json";
import loadingAnimation from "@assets/lottie/Trail_loading.json";

export default function LottieLoading() {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div className="flex h-full items-center justify-center">{View}</div>;
}
