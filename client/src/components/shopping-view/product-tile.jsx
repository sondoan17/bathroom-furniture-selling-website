import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/utils";
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  console.log(product);
  return (
    <Card className="w-full max-w-sm mx-auto ">
      <div onClick={() => handleGetProductDetails(product?._id)}>
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
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              {`Còn ${product?.totalStock}`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-2 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-sm sm:text-base text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm sm:text-base text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 sm:mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-base sm:text-lg font-semibold text-primary`}
            >
              {product?.price==0 ? "Liên hệ" : formatPrice(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-base sm:text-lg font-semibold text-primary">
                {formatPrice(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-2 sm:p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-sm sm:text-base">
            Hết hàng
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-sm sm:text-base"
          >
            Thêm vào giỏ hàng
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
