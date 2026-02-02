import Feeds from "./components/Feeds";
import RightSideNav from "./components/RightSideNav";
import Stories from "./components/Stories";

function FeedPage() {
  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-6">
      <div className="lg:col-span-4">
        <Stories />
        <Feeds />
      </div>
      <div className="hidden items-start justify-start lg:col-span-2 lg:flex">
        <RightSideNav />
      </div>
    </div>
  );
}

export default FeedPage;
