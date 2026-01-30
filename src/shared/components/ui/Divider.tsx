function Divider({ word }: { word: string }) {
  return (
    <div className="relative flex items-center">
      <div className="h-[1.5px] w-full bg-gray-300"></div>
      <span className="body-m-medium px-2 text-gray-500">{word}</span>
      <div className="h-[1.5px] w-full bg-gray-300"></div>
    </div>
  );
}

export default Divider;
