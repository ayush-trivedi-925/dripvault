import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ShoppingOrderDetails({ open, setOpen }) {
  const initialFormData = {
    status: "",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center">Order Insight</DialogTitle>
        <div className="grid gap-6">
          <div className="grid  gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>123456</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>25-02-2025</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>In Transit</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>₹1500</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3 ">
                <li className="flex items-center justify-between">
                  <span>Product One</span>
                  <span>₹500</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Product Two</span>
                  <span>₹1000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>John Doe</span>
                <span>Address</span>
                <span>City</span>
                <span>Phone</span>
                <span>Pincode</span>
                <span>Notes</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
