import { useSelector } from "react-redux";
import {
  selectErroRefresh,
  selectErrorAddPhotoUser,
  selectErrorDeletePhotoUser,
  selectErrorLogOut,
  selectErrorLogin,
  selectErrorRegister,
  selectIsLoading,
  selectUser,
} from "../redux/auth/authSelector";

const useUser = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const errorLogin = useSelector(selectErrorLogin);
  const errorRegister = useSelector(selectErrorRegister);
  const errorRefresh = useSelector(selectErroRefresh);
  const errorLogOut = useSelector(selectErrorLogOut);
  const errorAddPhotoUser = useSelector(selectErrorAddPhotoUser);
  const errorDeletePhotoUser = useSelector(selectErrorDeletePhotoUser);

  return {
    user,
    isLoading,
    errorLogin,
    errorRegister,
    errorRefresh,
    errorLogOut,
    errorAddPhotoUser,
    errorDeletePhotoUser,
  };
};

export default useUser;
