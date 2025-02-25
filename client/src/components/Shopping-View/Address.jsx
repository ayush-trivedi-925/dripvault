import { useEffect, useState } from "react";
import CommonForm from "../Common/CommonForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";
import { toast } from "@/hooks/use-toast";

export default function Address() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditId, setCurrentEditId] = useState(null);
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
    if (addressList.length >= 3 && currentEditId === null) {
      setFormData(initialFormData);
      toast({
        title: "You can only add upto 3 Addresses",
        variant: "destructive",
      });
      return;
    }

    dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialFormData);
        toast({
          title: "Address added successfully",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleAddressDelete(addressInfo) {
    console.log(addressInfo);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: addressInfo._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  const sanitizedFormData = {
    address: formData?.address || "",
    city: formData?.city || "",
    pincode: formData?.pincode || "",
    phone: formData?.phone || "",
    notes: formData?.notes || "",
  };

  function handleAddressEdit(event) {
    event.preventDefault();
    dispatch(
      editAddress({
        formData: sanitizedFormData,
        userId: user?.id,
        addressId: currentEditId,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user.id));
        setFormData(initialFormData);
        setCurrentEditId(null);
        toast({
          title: "Address updated successfully",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address, addressIdx) => {
              return (
                <AddressCard
                  key={addressIdx}
                  addressInfo={address}
                  handleAddressDelete={handleAddressDelete}
                  setCurrentEditId={setCurrentEditId}
                  setFormData={setFormData}
                />
              );
            })
          : null}
      </div>
      <CardHeader>
        <CardTitle className="mb-3">
          {currentEditId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditId !== null ? "Edit" : "Add"}
            onSubmit={
              currentEditId !== null ? handleAddressEdit : handleManageAddress
            }
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
