import { useSelector } from "react-redux";
import {
  selectAllPosts,
  selectComments,
  selectErrorAddComment,
  selectErrorAddLike,
  selectErrorCreatePost,
  selectErrorGetAllPost,
  selectErrorGetCommentForCurrentPost,
  selectErrorGetPost,
  selectIsloading,
  selectMyPosts,
} from "../redux/posts/postSelector";

const usePost = () => {
  const myPosts = useSelector(selectMyPosts);
  const allPosts = useSelector(selectAllPosts);
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectIsloading);
  const errorCreatePost = useSelector(selectErrorCreatePost);
  const errorGetPost = useSelector(selectErrorGetPost);
  const errorGetAllPost = useSelector(selectErrorGetAllPost);
  const errorAddComment = useSelector(selectErrorAddComment);
  const errorGetCommentForCurrentPost = useSelector(
    selectErrorGetCommentForCurrentPost
  );
  const errorAddLike = useSelector(selectErrorAddLike);

  return {
    myPosts,
    allPosts,
    comments,
    isLoading,
    errorCreatePost,
    errorGetPost,
    errorGetAllPost,
    errorAddComment,
    errorGetCommentForCurrentPost,
    errorAddLike,
  };
};

export default usePost;
