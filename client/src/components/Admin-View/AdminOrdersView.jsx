import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetails from "./AdminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersOfAllUser,
  getOrderDetailsAdmin,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

export default function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetailsAdmin(orderId)).then((data) => {
      console.log(data?.payload?.data);
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersOfAllUser()).then((data) => {
      console.log(data);
    });
  }, [dispatch]);

  console.log(orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => {
                  return (
                    <TableRow>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "delivered"
                              ? "bg-green-600"
                              : ""
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleFetchOrderDetails(orderItem._id);
                            setOpenDetailsDialog(true);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </CardContent>
      {openDetailsDialog && (
        <AdminOrderDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          orderDetails={orderDetails}
        />
      )}
    </Card>
  );
}
