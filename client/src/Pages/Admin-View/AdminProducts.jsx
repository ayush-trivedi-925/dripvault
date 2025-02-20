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
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./AdminProductTIle";
import { data } from "react-router-dom";

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

  // Getting current edit id
  const [currentEditId, setCurrentEditId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditId !== null
      ? dispatch(
          editProduct({
            id: currentEditId,
            formData,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditId(null);
          }
        })
      : dispatch(
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

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentId) {
    dispatch(
      deleteProduct({
        id: getCurrentId,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
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
                <AdminProductTile
                  setCurrentEditId={setCurrentEditId}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setFormData={setFormData}
                  key={productItemIdx}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setCurrentEditId(null);
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            isEditMode={currentEditId !== null}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId ? "Edit" : "Add"}
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
