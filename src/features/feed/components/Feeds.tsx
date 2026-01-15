import PostCard from "./PostCard";

const posts = {
  __v: 0,
  _id: "649fe0cfc4a9507d1220eeee",
  author: {
    __v: 0,
    _id: "649fe0cfc4a9507d1220ec2a",
    account: {
      _id: "649fe0cec4a9507d1220eb7a",
      avatar: {
        _id: "649fe0cec4a9507d1220eb7b",
        localPath: "",
        url: "https://i.pravatar.cc/300",
      },
      email: "brant_rippin21@hotmail.com",
      username: "hilda_simonis75",
    },
    bio: "milk junkie",
    countryCode: "+91",
    coverImage: {
      _id: "649fe0cfc4a9507d1220ec29",
      localPath: "",
      url: "https://via.placeholder.com/800x450.png",
    },
    createdAt: "2023-07-01T08:16:15.063Z",
    dob: "2020-08-11T12:21:20.809Z",
    firstName: "Jerel",
    lastName: "Witting",
    location: "Kundecester, France",
    owner: "649fe0cec4a9507d1220eb7a",
    phoneNumber: "9360290409",
    updatedAt: "2023-07-01T08:16:15.847Z",
  },
  comments: 16,
  content:
    "Quidem ut dolores.\nPossimus rem ali qu am expedita harum similique illo voluptatibus possimus Quidem ut dolores.\nPossimus rem ali qu am expedita harum similique illo voluptatibus possimus odit.",
  createdAt: "2023-07-01T08:16:15.909Z",
  images: [
    {
      _id: "649fe0cfc4a9507d1220eeef",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=897609019424768",
    },
    {
      _id: "649fe0cfc4a9507d1220eef0",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=2895110803030016",
    },
    {
      _id: "649fe0cfc4a9507d1220eef1",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=7434201863290880",
    },
    {
      _id: "649fe0cfc4a9507d1220eef2",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=2145901894172672",
    },
    {
      _id: "649fe0cfc4a9507d1220eef3",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=2603549741547520",
    },
    {
      _id: "649fe0cfc4a9507d1220eef4",
      localPath: "",
      url: "https://loremflickr.com/640/480/food?lock=8585818058784768",
    },
  ],
  isBookmarked: false,
  isLiked: false,
  likes: 25,
  tags: ["expedita", "commodi", "fugiat"],
  updatedAt: "2023-07-01T08:16:15.909Z",
};

function Feeds() {
  return (
    <div className="flex flex-col  gap-6">
      <PostCard post={posts} />
      <PostCard post={posts} />
      <PostCard post={posts} />
      <PostCard post={posts} />
    </div>
  );
}

export default Feeds;
