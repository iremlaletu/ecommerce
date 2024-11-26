import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../css/Header.css";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((store) => store.cart);
  return (
    <div className="headerContainer">
      <div
        onClick={() => navigate("/")}
        className="flex-row"
        style={{ cursor: "pointer" }}
      >
        <p>e-commerce</p>
      </div>
      <div className="flex-row">
        <input
          className="search-input"
          type="text"
          placeholder="Search Products..."
        />
        <div>
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={productsInCart.length}
            color="error"
          >
            <FaShoppingCart className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
