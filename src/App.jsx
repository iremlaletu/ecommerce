import { MdOutlineLightMode } from "react-icons/md";
import Header from "./components/Header";
import { FaCloudMoon } from "react-icons/fa";
import { useState } from "react";
import PageWrapper from "./Layouts/PageWrapper";
import RouterConfig from "./config/RouterConfig";
import "./App.css";
import { ThemeProvider, CssBaseline, Drawer } from "@mui/material";
import { lightTheme, darkTheme } from "./config/theme";
import Loading from "./components/Loading";
import Cart from "./components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "./redux/slices/cartSlice";

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
