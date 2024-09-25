import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleAddToCartClick = () => {
    if (user) {
      handleAddtoCart(product?._id, product?.totalStock);
    } else {
      toast({
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="w-full min-h-[550px] max-w-sm mx-auto hover:shadow-lg transition-shadow flex flex-col justify-between cursor-pointer">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="flex-grow"
      >
        <div className="relative">
          <img
            src={product?.image1}
            alt={product?.title}
            className="w-full h-[300px] sm:h-[300px] md:h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              Hết hàng
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-2 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 break-words">
            {product?.title}
          </h2>
        </CardContent>
      </div>
      <CardFooter className="p-2 sm:p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-base sm:text-lg font-semibold text-primary`}
          >
            {product?.price == 0 ? "Liên hệ" : formatPrice(product?.price)}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-base sm:text-lg font-semibold text-red-500">
              {formatPrice(product?.salePrice)}
            </span>
          ) : null}
        </div>
        {product?.totalStock === 0 ? (
          <Button className="opacity-60 cursor-not-allowed text-sm sm:text-base">
            Hết hàng
          </Button>
        ) : (
          <Button
            onClick={handleAddToCartClick}
            className="text-sm sm:text-base"
          >
            <ShoppingCart />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
