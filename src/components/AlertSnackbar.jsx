import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../redux/slices/appSlice";
import { Alert, Snackbar } from "@mui/material";

const AlertSnackbar = () => {
  const dispatch = useDispatch();
  const { message, open } = useSelector((state) => state.app);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert());
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertSnackbar;
