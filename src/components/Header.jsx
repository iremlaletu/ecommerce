import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Button, TextField, useMediaQuery } from "@mui/material";
import { setDrawer } from "../redux/slices/cartSlice";
import { setSearchTerm } from "../redux/slices/productSlice";
import { IoIosSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { productsInCart } = useSelector((store) => store.cart);

  const handleSearchClick = () => {
    dispatch(setSearchTerm(searchInput));
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
        <p>e-commerce</p>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          maxWidth: isMobile ? "80%" : "500px",
          flexGrow: 1,
        }}
      >
        <TextField
          variant="standard"
          placeholder="Search Products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiInput-underline:before": { borderBottom: "1px solid gray" },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "1px solid black",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Button
            onClick={handleSearchClick}
            variant="text"
            size="small"
            color="success"
            startIcon={<IoIosSearch />}
          >
            Search
          </Button>
          <Button
            onClick={handleClearSearch}
            variant="text"
            color="error"
            size="small"
            startIcon={<MdClear />}
            sx={{ whiteSpace: "nowrap" }}
          >
            Clear Filter
          </Button>
        </Box>
      </Box>

      <Badge
        onClick={() => dispatch(setDrawer())}
        badgeContent={productsInCart.length}
        color="error"
      >
        <FaShoppingCart
          style={{
            fontSize: "25px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        />
      </Badge>
    </Box>
  );
};

export default Header;
