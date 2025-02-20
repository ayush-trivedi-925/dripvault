import ProductImageUpload from "@/components/Admin-View/ProductImageUpload";
import CommonForm from "@/components/Common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./AdminProductTIle";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // State for image upload file
  const [imageFile, setImageFile] = useState(null);

  // State to get url of last uploaded image
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // State for setting loading while image is getting uploaded
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        dispatch(fetchAllProducts());
        toast({
          title: "Product added successfully",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, productItemIdx) => {
              console.log(productItem);
              return (
                <AdminProductTile key={productItemIdx} product={productItem} />
              );
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              formControls={addProductFormElements}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
