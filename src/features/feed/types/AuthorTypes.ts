export type Author = {
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
