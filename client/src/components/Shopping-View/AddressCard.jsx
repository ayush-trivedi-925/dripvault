import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

export default function AddressCard({
  addressInfo,
  handleAddressDelete,
  setCurrentEditId,
  setFormData,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
    >
      <CardContent className="grid p-4 gap-4 ">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          onClick={() => {
            setCurrentEditId(addressInfo._id);
            setFormData(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => handleAddressDelete(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
