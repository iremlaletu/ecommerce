import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const Loading = () => {
  const { loading } = useSelector((store) => store.product);

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
