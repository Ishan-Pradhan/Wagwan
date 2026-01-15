export type Post = {
  __v: number;
  _id: string;
  author: {
    __v: number;
    _id: string;
    account: {
      _id: string;
      avatar: {
        _id: string;
        localPath: string;
        url: string;
      };
      email: string;
      username: string;
    };
    bio: string;
    countryCode: string;
    coverImage: {
      _id: string;
      localPath: string;
      url: string;
    };
    createdAt: string;
    dob: string;
    firstName: string;
    lastName: string;
    location: string;
    owner: string;
    phoneNumber: string;
    updatedAt: string;
  };
  comments: number;
  content: string;
  createdAt: string;
  images: {
    _id: string;
    localPath: string;
    url: string;
  }[];
  isBookmarked: boolean;
  isLiked: boolean;
  likes: number;
  tags: string[];
  updatedAt: string;
};

export type FeedType = {
  posts: Post[];
  totalPosts: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
};
