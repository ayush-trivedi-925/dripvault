import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getProductById = createAsyncThunk(
  "/products/getproductbyid",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    return response?.data;
  }
);

export const fetchAllFilteredProduct = createAsyncThunk(
  "/products/fetchallfilteredproduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
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
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action?.payload?.data;
      })
      .addCase(getProductById.rejected, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductsSlice.reducer;
