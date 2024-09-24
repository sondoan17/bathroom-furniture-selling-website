import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full min-h-[400px] max-w-sm mx-auto hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="flex-grow"
      >
        <div className="relative">
          <img
            src={product?.image1}
            alt={product?.title}
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
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
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
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
