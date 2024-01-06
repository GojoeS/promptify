export interface Post {
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
  };
  prompt: string;
  tag: string;
  __v: number;
  _id: string;
}
