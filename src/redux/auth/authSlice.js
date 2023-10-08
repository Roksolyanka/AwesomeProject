import { createSlice } from "@reduxjs/toolkit";
import {
  addPhotoUserThunk,
  deletePhotoUserThunk,
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from "./authOperations";

const authInitialState = {
  userData: {
    displayName: null,
    email: null,
    photoURL: "",
    password: null,
  },
  isLoading: false,
  errorLogin: null,
  errorRegister: null,
  errorRefresh: null,
  errorLogOut: null,
  errorAddPhotoUser: null,
  errorDeletePhotoUser: null,
};

export const updateUser = (user) => ({
  type: "auth/updateUser",
  payload: {
    displayName: user ? user.displayName : null,
    email: user ? user.email : null,
    photoURL: user ? user.photoURL : "",
  },
});

const authSlice = createSlice({
  name: "user",
  initialState: authInitialState,

  // !--------------------------------UPDATE USER INFORMATION --------------------------------

  reducers: {
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
  },

  // !----------------------------------------------------------------------------------------

  extraReducers: (builder) => {
    builder

      // !--------------------------------REGISTER --------------------------------

      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorRegister = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRegister = action.error.message;
      })

      // !-----------------------------LOGIN-----------------------------------

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorLogin = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.errorRegister = null;
        state.errorDeleteAvatar = null;
        state.errorAddAvatar = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogin = action.error.message;
      })

      // !-----------------------------REFRESH-----------------------------------

      .addCase(refreshUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorRefresh = null;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRefresh = action.error.message;
      })

      // !-----------------------------LOGOUT-----------------------------------

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorLogOut = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = {
          displayName: null,
          email: null,
          photoURL: "",
          password: null,
        };
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogOut = action.payload;
      })

      // !-------------------------------addPhotoUser--------------------------------

      .addCase(addPhotoUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorAddPhotoUser = null;
      })
      .addCase(addPhotoUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorAddPhotoUser = null;
        state.userData.photoURL = action.payload;
      })
      .addCase(addPhotoUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddPhotoUser = action.payload;
      })

      // !-------------------------------deletePhotoUser--------------------------------

      .addCase(deletePhotoUserThunk.pending, (state) => {
        state.isLoading = true;
        state.errorDeletePhotoUser = null;
      })
      .addCase(deletePhotoUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.errorDeletePhotoUser = null;
        state.userData.photoURL = "";
      })
      .addCase(deletePhotoUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorDeletePhotoUser = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
