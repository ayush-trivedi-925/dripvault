import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/ediproduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async ({ id }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "AdminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productList = action?.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
