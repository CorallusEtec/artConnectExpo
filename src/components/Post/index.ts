import { PostActions } from "./PostActions";
import { PostContentText } from "./PostContentText";
import { PostHeader } from "./PostHeader";
import { PostHeaderActions } from "./PostHeaderActions";
import { PostImage } from "./PostImage";
import { PostRoot } from "./PostRoot";

export const Post = {
  root: PostRoot,
  header: PostHeader,
  headerActions: PostHeaderActions,
  legend: PostContentText,
  image: PostImage,
  actions: PostActions,
};
