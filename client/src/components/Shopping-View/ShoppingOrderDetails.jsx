import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

export default function ShoppingOrderDetails({ open, setOpen, orderDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const initialFormData = {
    status: "",
  };

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
              <Label>₹{orderDetails?.totalAmount}</Label>
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

                          <span>Price: ₹{item.price}</span>
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
                <span>{user?.userName}</span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
