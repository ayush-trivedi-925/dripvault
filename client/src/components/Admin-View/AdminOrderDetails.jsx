import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import CommonForm from "../Common/CommonForm";
import { useState } from "react";
import {
  getAllOrdersOfAllUser,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingOrderDetails({ open, setOpen, orderDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const initialFormData = {
    status: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  function handleOrderStatusUpdate(event) {
    event.preventDefault();
    console.log(formData.status);
    dispatch(
      updateOrderStatus({
        orderId: orderDetails._id,
        orderStatus: formData.status,
      })
    ).then((data) => {
      dispatch(getOrderDetails(orderDetails._id));
      dispatch(getAllOrdersOfAllUser());
      setFormData(initialFormData);
      toast({
        title: "Order status updated successfully",
      });
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        dispatch(resetOrderDetails());
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center">Order Insight</DialogTitle>
        <div className="grid gap-6">
          <div className="grid  gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                {" "}
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-600"
                      : ""
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Payment Method</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>

              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => {
                    return (
                      <ul className="grid gap-3 ">
                        <li className="flex items-center justify-between">
                          <span>Title: {item.title}</span>

                          <span>Price: ${item.price}</span>
                        </li>
                      </ul>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{user?.username}</span>
                <span>
                  {orderDetails?.addressInfo?.address
                    ? orderDetails?.addressInfo?.address
                    : "Address"}
                </span>
                <span>
                  {" "}
                  {orderDetails?.addressInfo?.city
                    ? orderDetails?.addressInfo?.city
                    : "City"}
                </span>
                <span>
                  {orderDetails?.addressInfo?.phone
                    ? orderDetails?.addressInfo?.phone
                    : "Phone"}
                </span>
                <span>
                  {orderDetails?.addressInfo?.pincode
                    ? orderDetails?.addressInfo?.pincode
                    : "Pincode"}
                </span>
                <span>
                  {orderDetails?.addressInfo?.notes
                    ? orderDetails?.addressInfo?.notes
                    : "Notes"}
                </span>
              </div>
            </div>
          </div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "pickedup", label: "Picked Up" },
                  { id: "intransit", label: "In Transit" },
                  { id: "outfordelivery", label: "Out for Delivery" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleOrderStatusUpdate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
