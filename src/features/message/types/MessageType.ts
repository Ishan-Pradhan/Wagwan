export interface MessageSender {
  _id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    localPath: string;
    _id: string;
  };
}

export interface MessageAttachment {
  _id?: string;
  url: string;
  type?: "image" | "video" | "file";
}

export interface Message {
  _id: string;
  sender: MessageSender;
  content: string;
  attachments: MessageAttachment[];
  chat: string; // chatId
  createdAt: string;
  updatedAt: string;
  __v: number;
}
