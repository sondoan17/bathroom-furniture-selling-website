import { useState, useEffect, useRef } from "react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFiles = [],
  setImageFiles,
  uploadedImageUrls = [],
  setUploadedImageUrls,
  isEditMode,
  isCustomStyling = false,
  isDashboard,
  productImages = [],
  setProductImages,
  onTempImageChange,
}) {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [deletedIndexes, setDeletedIndexes] = useState(new Set());
  const [loadingStates, setLoadingStates] = useState([false, false, false, false, false]);

  function handleImageFileChange(event, index) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = selectedFile;
      setImageFiles(newImageFiles);
      uploadImageToCloudinary(selectedFile, index);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, index) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = droppedFile;
      setImageFiles(newImageFiles);
      uploadImageToCloudinary(droppedFile, index);
    }
  }

  function handleRemoveImage(index) {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);

    const newUploadedImageUrls = [...uploadedImageUrls];
    newUploadedImageUrls[index] = '';
    setUploadedImageUrls(newUploadedImageUrls);

    if (isEditMode && productImages) {
      const newProductImages = [...productImages];
      newProductImages[index] = null;
      setProductImages(newProductImages);
    }

    if (inputRefs[index].current) {
      inputRefs[index].current.value = "";
    }

    setDeletedIndexes(prev => new Set(prev).add(index));

    // Thông báo thay đổi tạm thời
    onTempImageChange(index, null);
  }

  async function uploadImageToCloudinary(imageFile, index) {
    setLoadingStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });

    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/products/upload-image`,
        data
      );

      if (response?.data?.success) {
        const newUploadedImageUrls = [...uploadedImageUrls];
        newUploadedImageUrls[index] = response.data.result.url;
        setUploadedImageUrls(newUploadedImageUrls);

        // Thông báo thay đổi tạm thời
        onTempImageChange(index, response.data.result.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoadingStates(prev => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
    }
  }

  const renderImageUploadField = (index) => {
    const isDeleted = deletedIndexes.has(index);
    const hasImage = !isDeleted && (
      (imageFiles && imageFiles[index]) || 
      (uploadedImageUrls && uploadedImageUrls[index]) || 
      (isEditMode && productImages && productImages[index])
    );
    const isLoading = loadingStates[index];
    
    return (
      <div
        key={index}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        className="border-2 border-dashed rounded-lg p-4 mb-4"
      >
        <Input
          id={`image-upload-${index}`}
          type="file"
          className="hidden"
          ref={inputRefs[index]}
          onChange={(e) => handleImageFileChange(e, index)}
        />
        <Label
          htmlFor={`image-upload-${index}`}
          className="flex flex-col items-center justify-center h-32 cursor-pointer"
        >
          {!hasImage ? (
            <>
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Kéo và thả hoặc click để tải lên hình ảnh</span>
            </>
          ) : isLoading ? (
            <Skeleton className="h-20 w-full bg-gray-100" />
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={uploadedImageUrls[index] || (isEditMode && productImages[index]) || URL.createObjectURL(imageFiles[index])} 
                alt="img" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Click để thay đổi ảnh</span>
              </div>
            </div>
          )}
        </Label>
        {hasImage && !isLoading && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-red-500 hover:text-red-700"
            onClick={() => handleRemoveImage(index)}
          >
            <XIcon className="w-4 h-4 mr-2" />
            Xóa ảnh
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">
        Tải lên hình ảnh
      </Label>

      {renderImageUploadField(0)}
      {!isDashboard && (
        <>
          {renderImageUploadField(1)}
          {renderImageUploadField(2)}
          {renderImageUploadField(3)}
          {renderImageUploadField(4)}
        </>
      )}
    </div>
  );
}

export default ProductImageUpload;
