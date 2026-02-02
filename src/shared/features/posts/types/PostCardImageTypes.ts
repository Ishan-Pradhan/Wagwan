export type Image = {
  _id: string;
  url: string;
  localPath: string;
};

export type ImagesProps = {
  images: Image[];
};
