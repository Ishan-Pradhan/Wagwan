export interface ChatUserType {
  _id: string;
  avatar: {
    _id: string;
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
}
