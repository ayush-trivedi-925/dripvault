import { useState } from "react";
import CommonForm from "../Common/CommonForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { addNewAddress } from "@/store/shop/address-slice";

export default function Address() {
  const dispatch = useDispatch();
  const initialFormData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  function handleManageAddress(event) {
    event.preventDefault();
  }
  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Add"}
            onSubmit={handleManageAddress}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
