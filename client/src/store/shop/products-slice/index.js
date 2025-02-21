import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProduct = createAsyncThunk(
  "/products/fetchallfilteredproduct",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );
    return response?.data;
  }
);

const shopProductsSlice = createSlice({
  name: "ShoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productList = action?.payload?.products;
      })
      .addCase(fetchAllFilteredProduct.rejected, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shopProductsSlice.reducer;
