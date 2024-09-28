import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState, useRef, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay";
import { addReview, getReviews } from "@/store/shop/review-slice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  const productImages = [
    productDetails?.image1,
    productDetails?.image2,
    productDetails?.image3,
    productDetails?.image4,
    productDetails?.image5,
  ].filter(Boolean);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi, setCurrentSlide]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleThumbnailClick = useCallback((index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Sản phẩm đã được thêm vào giỏ hàng",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  // function handleAddReview() {
  //   dispatch(
  //     addReview({
  //       productId: productDetails?._id,
  //       userId: user?.id,
  //       userName: user?.userName,
  //       reviewMessage: reviewMsg,
  //       reviewValue: rating,
  //     })
  //   ).then((data) => {
  //     if (data.payload.success) {
  //       setRating(0);
  //       setReviewMsg("");
  //       dispatch(getReviews(productDetails?._id));
  //       toast({
  //         title: "Review added successfully!",
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  // const averageReview =
  //   reviews && reviews.length > 0
  //     ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
  //       reviews.length
  //     : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 md:p-8 lg:p-12 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[90vw] lg:min-h-[70vh]">
        <div className="relative rounded-lg md:max-w-[650px] md:mx-auto">
          <div className="overflow-hidden relative" ref={emblaRef}>
            <div className="flex">
              {productImages.map((image, index) => (
                <div className="flex-[0_0_100%]" key={index}>
                  <img
                    src={image}
                    alt={`${productDetails?.title} - Ảnh ${index + 1}`}
                    className="aspect-square w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            <Button 
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              size="icon"
              variant="ghost"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              size="icon"
              variant="ghost"
              onClick={scrollNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 mt-4">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`${productDetails?.title} - Ảnh nhỏ ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-primary transition-all duration-300 ease-in-out ${
                      currentSlide === index ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2">{productDetails?.title}</h1>
            <p
              className="
                text-muted-foreground text-sm sm:text-base md:text-lg 
                mb-3 sm:mb-4 md:mb-5 
                overflow-x-auto overflow-y-auto 
                max-h-[150px] sm:max-h-[200px] md:max-h-[300px] lg:max-h-[400px]
                whitespace-pre-wrap
                scrollbar-rounded
              "
            >
              {productDetails?.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4">
            <p
              className={`text-xl sm:text-2xl md:text-3xl font-thin text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
            >
              {productDetails?.price == 0 ? "Liên hệ" : formatPrice(productDetails?.price)}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1 sm:mt-0">
                {formatPrice(productDetails?.salePrice)}
              </p>
            )}
          </div>
          <div className="mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed text-sm sm:text-base">
                Hết hàng
              </Button>
            ) : (
              <Button
                className="w-full text-sm sm:text-base"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                disabled={productDetails?.price === 0}
              >
                Thêm vào giỏ hàng
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;