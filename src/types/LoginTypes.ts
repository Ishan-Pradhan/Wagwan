export type User = {
  _id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  loginType: "EMAIL_PASSWORD" | "GOOGLE" | "FACEBOOK";
  avatar: {
    url: string;
    localPath: string;
  };
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseUser = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
