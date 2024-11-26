import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal, setDrawer } from "../redux/slices/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { productsInCart, totalAmount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartTotal());
  }, []);

  return (
    <>
      <Button
        onClick={() => dispatch(setDrawer())}
        color="error"
        size="small"
        sx={{
          minWidth: "30px",
          display: "flex",
          placeSelf: "end",
          padding: 2,
        }}
      >
        close
      </Button>

      <Stack
        spacing={2}
        sx={{
          width: { xs: "100%", sm: "500px" },
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        {productsInCart &&
          productsInCart.map((product) => (
            <Stack
              key={product.id}
              spacing={2}
              sx={{
                width: "100%",
              }}
            >
              {/* Resim */}
              <Box
                component="img"
                src={product.image}
                sx={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                }}
              />

              {/* Başlık, Fiyat ve Buton */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: "100%",
                }}
              >
                {/* Başlık */}
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "1rem" }}
                  component="span"
                >
                  x {product.itemCount}
                </Typography>

                {/* Fiyat */}
                <Typography variant="body2" sx={{ marginLeft: "auto" }}>
                  {product.price * product.itemCount} $
                </Typography>

                {/* Silme Butonu */}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{
                    minWidth: "30px",
                    padding: 0,
                    marginLeft: 2,
                  }}
                >
                  &times;
                </Button>
              </Stack>
            </Stack>
          ))}
        <h2> Total Amount: {totalAmount} </h2>
      </Stack>
    </>
  );
};

export default Cart;
