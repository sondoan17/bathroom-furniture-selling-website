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
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [imageFile4, setImageFile4] = useState(null);
  const [imageFile5, setImageFile5] = useState(null);
  const [uploadedImageUrl1, setUploadedImageUrl1] = useState("");
  const [uploadedImageUrl2, setUploadedImageUrl2] = useState("");
  const [uploadedImageUrl3, setUploadedImageUrl3] = useState("");
  const [uploadedImageUrl4, setUploadedImageUrl4] = useState("");
  const [uploadedImageUrl5, setUploadedImageUrl5] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image1: uploadedImageUrl1,
            image2: uploadedImageUrl2,
            image3: uploadedImageUrl3,
            image4: uploadedImageUrl4,
            image5: uploadedImageUrl5,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile1(null);
            setImageFile2(null);
            setImageFile3(null);
            setImageFile4(null);
            setImageFile5(null);
            setFormData(initialFormData);
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
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
                key={productItem.id}
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
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile1={imageFile1}
            imageFile2={imageFile2}
            imageFile3={imageFile3}
            imageFile4={imageFile4}
            imageFile5={imageFile5}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            setImageFile1={setImageFile1}
            setImageFile2={setImageFile2}
            setImageFile3={setImageFile3}
            setImageFile4={setImageFile4}
            setImageFile5={setImageFile5}
            setImageLoadingState={setImageLoadingState}
            setUploadedImageUrl1={setUploadedImageUrl1}
            setUploadedImageUrl2={setUploadedImageUrl2}
            setUploadedImageUrl3={setUploadedImageUrl3}
            setUploadedImageUrl4={setUploadedImageUrl4}
            setUploadedImageUrl5={setUploadedImageUrl5}
            uploadedImageUrl1={uploadedImageUrl1}
            uploadedImageUrl2={uploadedImageUrl2}
            uploadedImageUrl3={uploadedImageUrl3}
            uploadedImageUrl4={uploadedImageUrl4}
            uploadedImageUrl5={uploadedImageUrl5}
            isDashboard={false}
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
