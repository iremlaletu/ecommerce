import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../redux/slices/productSlice";
import Product from "./Product";
import { Box } from "@mui/material";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, searchTerm } = useSelector((store) => store.product);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductsList;
