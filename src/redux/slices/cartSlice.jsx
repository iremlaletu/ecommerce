import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  }
  return [];
};

const initialState = {
  productsInCart: loadFromLocalStorage(),
  drawer: false,
  totalAmount: 0,
};

const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const currentProduct =
        state.productsInCart &&
        state.productsInCart.find(
          (product) => product.id === action.payload.id
        );
      if (currentProduct) {
        // already in cart
        const extractedProducts = state.productsInCart.filter(
          (product) => product.id != action.payload.id
        );
        currentProduct.itemCount += action.payload.itemCount;
        state.productsInCart = [...extractedProducts, currentProduct];
        saveToLocalStorage(state.productsInCart);
      } else {
        state.productsInCart = [...state.productsInCart, action.payload];
        saveToLocalStorage(state.productsInCart);
      }
    },
    removeFromCart: (state, action) => {
      // Filter out the product with the given ID
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      saveToLocalStorage(state.productsInCart);
      state.totalAmount = state.productsInCart.reduce(
        (total, product) => total + product.price * product.itemCount,
        0
      );
      state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    cartTotal: (state) => {
      state.totalAmount = state.productsInCart.reduce(
        (total, product) => total + product.price * product.itemCount,
        0
      );
      state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
    },
  },
});

export const { addToCart, setDrawer, cartTotal, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
