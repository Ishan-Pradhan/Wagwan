import Feeds from "./components/Feeds";
import RightSideNav from "./components/RightSideNav";

function FeedPage() {
  return (
    <div className="grid lg:grid-cols-6 grid-cols-1 mt-10">
      <div className="lg:col-span-4 ">
        <Feeds />
      </div>
      <div className="lg:col-span-2 items-start justify-start hidden lg:flex">
        <RightSideNav />
      </div>
    </div>
  );
}

export default FeedPage;
