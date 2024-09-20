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
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatPrice } from "@/lib/utils";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();
  const productImages = [
    productDetails?.image1,
    productDetails?.image2,
    productDetails?.image3,
    productDetails?.image4,
    productDetails?.image5,
  ];
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
          <Carousel plugins={[Autoplay({ delay: 5000 })]}>
            <CarouselContent>
              {productImages.map((image, index) => (
                image ? (<CarouselItem key={index}>
                  <img
                    src={image}
                    alt={productDetails?.title}
                    className="aspect-square w-full object-cover rounded-lg"
                  />
                </CarouselItem>) : null
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
              className={`text-xl sm:text-2xl md:text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
            >
              {productDetails?.price == 0 ? "Liên hệ" : formatPrice(productDetails?.price)}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground mt-1 sm:mt-0">
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
