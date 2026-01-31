export type Avatar = {
  url: string;
  localPath: string;
  _id: string;
};

export type Participant = {
  _id: string;
  username: string;
  email: string;
  avatar: Avatar;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Chat = {
  _id: string;
  name: string;
  isGroupChat: boolean;
  participants: Participant[];
  admin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage?: {
    sender: { username: string };
    content: string;
    createdAt: string;
  };
  hasUnread: boolean;
};
