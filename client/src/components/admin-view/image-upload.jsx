import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile1,
  imageFile2,
  imageFile3,
  imageFile4,
  imageFile5,
  setImageFile1,
  setImageFile2,
  setImageFile3,
  setImageFile4,
  setImageFile5,
  imageLoadingState,
  uploadedImageUrl1,
  uploadedImageUrl2,
  uploadedImageUrl3,
  uploadedImageUrl4,
  uploadedImageUrl5,
  setUploadedImageUrl1,
  setUploadedImageUrl2,
  setUploadedImageUrl3,
  setUploadedImageUrl4,
  setUploadedImageUrl5,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const backendUrl = import.meta.env.BACKEND_URL;

  function handleImageFileChange(event, setImageFile) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, setImageFile) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(setImageFile, inputRef) {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary(imageFile, setUploadedImageUrl) {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${backendUrl}/api/admin/products/upload-image`,
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile1) uploadImageToCloudinary(imageFile1, setUploadedImageUrl1);
  }, [imageFile1]);

  useEffect(() => {
    if (imageFile2) uploadImageToCloudinary(imageFile2, setUploadedImageUrl2);
  }, [imageFile2]);

  useEffect(() => {
    if (imageFile3) uploadImageToCloudinary(imageFile3, setUploadedImageUrl3);
  }, [imageFile3]);

  useEffect(() => {
    if (imageFile4) uploadImageToCloudinary(imageFile4, setUploadedImageUrl4);
  }, [imageFile4]);

  useEffect(() => {
    if (imageFile5) uploadImageToCloudinary(imageFile5, setUploadedImageUrl5);
  }, [imageFile5]);

  const renderImageUploadField = (imageFile, setImageFile, uploadedImageUrl, inputRef, index) => (
    <div
      key={index}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, setImageFile)}
      className={`${
        isEditMode ? "opacity-60" : ""
      } border-2 border-dashed rounded-lg p-4 mb-4`}
    >
      <Input
        id={`image-upload-${index}`}
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleImageFileChange(e, setImageFile)}
        disabled={isEditMode}
      />
      {!imageFile ? (
        <Label
          htmlFor={`image-upload-${index}`}
          className={`${
            isEditMode ? "cursor-not-allowed" : "cursor-pointer"
          } flex flex-col items-center justify-center h-32 `}
        >
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
          <span>Drag & drop or click to upload image {index}</span>
        </Label>
      ) : imageLoadingState ? (
        <Skeleton className="h-10 bg-gray-100" />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileIcon className="w-8 text-primary mr-2 h-8" />
          </div>
          <p className="text-sm font-medium">{imageFile.name}</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => handleRemoveImage(setImageFile, inputRef)}
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove File</span>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
      {renderImageUploadField(imageFile1, setImageFile1, uploadedImageUrl1, inputRef1, 1)}
      {renderImageUploadField(imageFile2, setImageFile2, uploadedImageUrl2, inputRef2, 2)}
      {renderImageUploadField(imageFile3, setImageFile3, uploadedImageUrl3, inputRef3, 3)}
      {renderImageUploadField(imageFile4, setImageFile4, uploadedImageUrl4, inputRef4, 4)}
      {renderImageUploadField(imageFile5, setImageFile5, uploadedImageUrl5, inputRef5, 5)}
    </div>
  );
}

export default ProductImageUpload;