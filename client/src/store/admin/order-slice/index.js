import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersOfAllUser = createAsyncThunk(
  "/order/getallordersofallusers",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/get`
    );
    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "/order/getorderdetails",
  async (orderId) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/details/${orderId}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateorderstatus",
  async ({ orderId, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/order/update/${orderId}`,
      {
        orderStatus,
      }
    );
    return response.data;
  }
);
const adminOrderSlice = createSlice({
  name: "AdminOrders",
  initialState,
  reducers: {
    resetOrderDetailsAdmin: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orderList = action?.payload?.data;
      })
      .addCase(getAllOrdersOfAllUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetailsAdmin } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
