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
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    cartTotal: (state) => {
      state.totalAmount = 0;
      state.productsInCart &&
        state.productsInCart.map((product) => {
          state.totalAmount += product.price * product.itemCount;
        });
      state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
    },
  },
});

export const { addToCart, setDrawer, cartTotal } = cartSlice.actions;

export default cartSlice.reducer;
