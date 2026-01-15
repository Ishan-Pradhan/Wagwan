import Feeds from "./components/Feeds";
import RightSideNav from "./components/RightSideNav";

function FeedPage() {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 mt-10">
      <div className="lg:col-span-4  items-center ">
        <Feeds />
      </div>
      <div className="lg:col-span-1 hidden lg:flex">
        <RightSideNav />
      </div>
    </div>
  );
}

export default FeedPage;
