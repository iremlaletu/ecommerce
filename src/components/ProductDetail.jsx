import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { addToCart, cartTotal } from "../redux/slices/cartSlice";
import { showAlert } from "../redux/slices/appSlice";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Box, Button } from "@mui/material";
import Rating from "./Rating";

const ProductDetail = () => {
  const [itemCount, setItemCount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const { productsInCart } = useSelector((store) => store.cart);

  useEffect(() => {
    const storedProduct = localStorage.getItem(`product-${id}`);

    // stored in local for preventing the loss of information on page reloads WHY? because ->
    // When navigating between pages with React Router,
    // the product data is only fetched during a route change.
    // However, when the page is refreshed (for example, when manually entering the URL /product-details/:id),
    // useEffect is triggered, but the previous fetch request is not made again, and the state is reset.

    if (storedProduct) {
      dispatch(setSelectedProduct(JSON.parse(storedProduct)));
    } else {
      const product = products.find((product) => product.id == id);
      if (product) {
        dispatch(setSelectedProduct(product));
        localStorage.setItem(`product-${id}`, JSON.stringify(product));
      }
    }
  }, [id, products, dispatch]);

  const getCartItemCount = () => {
    const productInCart = productsInCart.find((product) => product.id == id);
    return productInCart ? productInCart.itemCount : 0;
  };

  const handleIncrease = () => {
    setItemCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setItemCount((prev) => Math.max(prev - 1, 0));
  };
  const addCart = () => {
    if (itemCount > 0) {
      const payload = {
        id,
        title,
        price,
        image,
        itemCount,
      };
      dispatch(addToCart(payload));
      dispatch(cartTotal());
      dispatch(showAlert("Added to Cart"));
    }
  };

  const {
    title = "",
    image = "",
    price = 0,
    description = "",
    rating: { rate = 0, count = 0 } = {},
  } = selectedProduct || {};

  return (
    <>
      <Box
        sx={{
          marginTop: "50px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box sx={{ marginRight: { sm: "50px", xs: "0" }, textAlign: "center" }}>
          <img src={image} width={300} height={400} alt="Product" />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto auto auto 1fr",
            gap: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <h3>{title}</h3>
          <h5>{description}</h5>
          <h1>{price}$</h1>
          <h6 style={{ placeSelf: "end" }}> {count} are left </h6>

          {getCartItemCount() > 0 && (
            <Box
              component="p"
              sx={{
                placeSelf: {
                  xs: "center",
                  sm: "end",
                },
              }}
            >
              Already In Cart: X {getCartItemCount()}
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Rating rate={rate} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", sm: "start" },
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CiCirclePlus onClick={handleIncrease} size={"30px"} />
                <span style={{ fontSize: "20px", paddingBottom: "20px" }}>
                  {itemCount}
                </span>
                <CiCircleMinus onClick={handleDecrease} size={"30px"} />
              </Box>

              <Button
                onClick={addCart}
                variant="outlined"
                startIcon={<MdOutlineAddShoppingCart />}
              >
                Add item
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Link to="/">Back</Link>
    </>
  );
};

export default ProductDetail;
