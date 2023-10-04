import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentThunk,
  addLikeThunk,
  createPostThunk,
  getAllPostsThunk,
  getCommentThunk,
  getMyPostThunk,
} from "./postOperations";

const postInitialState = {
  myPosts: [],
  allPosts: [],
  comments: [],
  isLoading: false,
  errorCreatePost: null,
  errorGetMyPost: null,
  errorGetAllPosts: null,
  errorAddComment: null,
  errorGetCommentForCurrentPost: null,
  errorAddLike: null,
};

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  extraReducers: (builder) => {
    builder

      // !--------------------------------CREATE POST --------------------------------

      .addCase(createPostThunk.pending, (state) => {
        state.isLoading = true;
        state.errorCreatePost = null;
      })
      .addCase(createPostThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.errorCreatePost = null;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorCreatePost = action.payload;
      })

      // !--------------------------------MY POSTS--------------------------------------

      .addCase(getMyPostThunk.pending, (state) => {
        state.isLoading = true;
        state.errorGetMyPost = null;
      })
      .addCase(getMyPostThunk.fulfilled, (state, action) => {
        state.myPosts = action.payload;
        state.isLoading = false;
        state.errorGetMyPost = null;
      })
      .addCase(getMyPostThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetMyPost = action.payload;
      })

      // !--------------------------------ALL POSTS --------------------------------

      .addCase(getAllPostsThunk.pending, (state) => {
        state.isLoading = true;
        state.errorGetAllPosts = null;
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.isLoading = false;
        state.errorGetAllPosts = null;
      })
      .addCase(getAllPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetAllPosts = action.payload;
      })

      // !--------------------------------ADD LIKE --------------------------------

      .addCase(addLikeThunk.pending, (state) => {
        state.isLoading = true;
        state.errorAddLike = null;
      })
      .addCase(addLikeThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.errorAddLike = null;
      })
      .addCase(addLikeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddLike = action.payload;
      })

      // !--------------------------------ADD COMMENT --------------------------------

      .addCase(addCommentThunk.pending, (state) => {
        state.isLoading = true;
        state.errorAddComment = null;
      })
      .addCase(addCommentThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.errorAddComment = null;
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddComment = action.payload;
      })

      // !--------------------------------GET COMMENT --------------------------------

      .addCase(getCommentThunk.pending, (state) => {
        state.isLoading = true;
        state.errorGetCommentForCurrentPost = null;
      })
      .addCase(getCommentThunk.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
        state.errorGetCommentForCurrentPost = null;
      })
      .addCase(getCommentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetCommentForCurrentPost = action.payload;
      });
  },
});

export const postsReducer = postSlice.reducer;
