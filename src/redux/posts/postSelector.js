export const selectMyPosts = (state) => state.posts.myPosts;
export const selectAllPosts = (state) => state.posts.allPosts;
export const selectComments = (state) => state.posts.comments;
export const selectIsloading = (state) => state.posts.isLoading;
export const selectErrorCreatePost = (state) => state.posts.errorCreatePost;
export const selectErrorGetPost = (state) => state.posts.errorGetPost;
export const selectErrorGetAllPost = (state) => state.posts.errorGetAllPost;
export const selectErrorAddComment = (state) => state.posts.errorAddComment;
export const selectErrorGetCommentForCurrentPost = (state) =>
  state.posts.errorGetCommentForCurrentPost;
export const selectErrorAddLike = (state) => state.posts.errorAddLike;
