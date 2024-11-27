import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Cart from "./components/Cart";
import PageWrapper from "./Layouts/PageWrapper";
import RouterConfig from "./config/RouterConfig";
import { lightTheme, darkTheme } from "./config/theme";
import { ThemeProvider, CssBaseline, Drawer } from "@mui/material";
import { setDrawer } from "./redux/slices/cartSlice";
import { MdOutlineLightMode } from "react-icons/md";
import { FaCloudMoon } from "react-icons/fa";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { drawer } = useSelector((store) => store.cart);
  const changeTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <div style={{ padding: "10px", justifySelf: "end" }}>
        {isDarkMode ? (
          <MdOutlineLightMode onClick={changeTheme} className="icon" />
        ) : (
          <FaCloudMoon onClick={changeTheme} className="icon" />
        )}
      </div>
      <PageWrapper>
        <Loading />
        <Header />
        <RouterConfig />
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => dispatch(setDrawer())}
          ModalProps={{
            keepMounted: true,
            "aria-hidden": false,
          }}
        >
          <Cart />
        </Drawer>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
