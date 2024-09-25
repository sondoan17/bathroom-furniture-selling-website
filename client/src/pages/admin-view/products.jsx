import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  image5: null,
  title: "",
  description: "",
  category: "",
  type: "",
  subtype: "",
  // brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [tempImageChanges, setTempImageChanges] = useState({});

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleTempImageChange = (index, newImageUrl) => {
    setTempImageChanges(prev => ({
      ...prev,
      [index]: newImageUrl
    }));
  };

  function onSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      image1:
        tempImageChanges[0] !== undefined
          ? tempImageChanges[0]
          : formData.image1,
      image2:
        tempImageChanges[1] !== undefined
          ? tempImageChanges[1]
          : formData.image2,
      image3:
        tempImageChanges[2] !== undefined
          ? tempImageChanges[2]
          : formData.image3,
      image4:
        tempImageChanges[3] !== undefined
          ? tempImageChanges[3]
          : formData.image4,
      image5:
        tempImageChanges[4] !== undefined
          ? tempImageChanges[4]
          : formData.image5,
    };

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: updatedFormData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            resetFormData();
            setTempImageChanges({}); // Reset temp changes
            toast({
              title: "Sửa sản phẩm thành công",
            });
          }
        })
      : dispatch(addNewProduct(updatedFormData)).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            resetFormData();
            setTempImageChanges({}); // Reset temp changes
            toast({
              title: "Thêm sản phẩm thành công",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Xóa sản phẩm thành công",
        });
      }
    });
  }

  function isFormValid() {
    const keysToCheck = Object.keys(formData).filter(
      (currentKey) =>
        currentKey !== "averageReview" && !currentKey.startsWith("image")
    );

    const validationResults = keysToCheck.map((key) => {
      const isValid =
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== "";

      return isValid;
    });

    return validationResults.every((item) => item);
  }
  function resetFormData() {
    setFormData(initialFormData);
    setImageFiles([null, null, null, null, null]);
    setUploadedImageUrls(["", "", "", "", ""]);
    setProductImages([null, null, null, null, null]);
    setTempImageChanges({}); // Reset temp changes
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            resetFormData();
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
                key={`${productItem.id}-${index}`}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          resetFormData();
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImageUrls={uploadedImageUrls}
            setUploadedImageUrls={setUploadedImageUrls}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
            productImages={[
              formData.image1,
              formData.image2,
              formData.image3,
              formData.image4,
              formData.image5,
            ].filter(Boolean)}
            setProductImages={setProductImages}
            isDashboard={false}
            onTempImageChange={handleTempImageChange}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Sửa" : "Thêm"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
