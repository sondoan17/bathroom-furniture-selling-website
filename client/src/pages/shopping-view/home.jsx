import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import {
  toilet,
  basincabinet,
  lavabo,
  stonetable,
  shower,
  accesories,
} from "@/assets/index";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const categoriesWithIcon = [
  {
    id: "basincabinet",
    label: "Tủ chậu",
    image: basincabinet,
  },
  { id: "stonetable", label: "Bàn đá", image: stonetable },
  { id: "lavabo", label: "Lavabo", image: lavabo },
  {
    id: "faucet",
    label: "Sen - Vòi",
    image: shower,
  },
  { id: "toilet", label: "Bồn cầu", image: toilet },
  { id: "accesories", label: "Phụ kiện", image: accesories },
];

const featuredCategories = [
  "basincabinet",
  "stonetable",
  "toilet",
  "lavabo",
  "faucet",
  "urinal",
  "accesories",
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing?category=${getCurrentItem.id}`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    if (productList.length > 0) {
      const featuredProducts = getRandomProductsByCategory(
        productList,
        featuredCategories,
        3
      );
      setRandomProducts(featuredProducts);
    }
  }, [productList]);

  function getRandomProductsByCategory(productList, categories, count) {
    const result = [];
    categories.forEach((category) => {
      const filteredProducts = productList.filter(
        (product) => product.category === category
      );
      const randomProducts = filteredProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      result.push(...randomProducts);
    });
    return result;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[600px] overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
                <motion.img
                  key={slide.id || index}
                  src={slide?.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ))
            : null}
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Danh mục sản phẩm
          </h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          >
            {categoriesWithIcon.map((categoryItem) => (
              <motion.div
                key={categoryItem.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="aspect-square"
              >
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col justify-between"
                >
                  <CardContent className="flex flex-col items-center justify-center p-2 sm:p-4 flex-grow">
                    <div className="w-full h-0 pb-[75%] relative mb-2 sm:mb-4">
                      <img 
                        src={categoryItem.image} 
                        alt={categoryItem.label} 
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-bold text-center text-sm sm:text-base">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Sản phẩm nổi bật
          </h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {randomProducts && randomProducts.length > 0
              ? randomProducts.map((productItem, index) => (
                  <motion.div
                    key={productItem.id || index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="w-full min-h-[550px] max-w-sm mx-auto hover:shadow-lg transition-shadow flex flex-col justify-between cursor-pointer">
                      <div
                        onClick={() =>
                          handleGetProductDetails(productItem?._id)
                        }
                        className="flex-grow"
                      >
                        <div className="relative">
                          <img
                            src={productItem?.image1}
                            alt={productItem?.title}
                            className="w-full h-[300px] object-cover rounded-t-lg"
                          />
                          {productItem?.totalStock === 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
                              Hết hàng
                            </Badge>
                          ) : productItem?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
                              Sale
                            </Badge>
                          ) : null}
                        </div>
                        <CardContent className="p-2 sm:p-4">
                          <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 break-words">
                            {productItem?.title}
                          </h2>
                        </CardContent>
                      </div>
                      <CardFooter className=" pt-0 sm:p-4 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span
                            className={`${
                              productItem?.salePrice > 0 ? "line-through" : ""
                            } text-base sm:text-lg font-semibold text-primary`}
                          >
                            {productItem?.price == 0
                              ? "Liên hệ"
                              : formatPrice(productItem?.price)}
                          </span>
                          {productItem?.salePrice > 0 ? (
                            <span className="text-base sm:text-lg font-semibold text-red-500">
                              {formatPrice(productItem?.salePrice)}
                            </span>
                          ) : null}
                        </div>
                        {productItem?.totalStock === 0 ? (
                          <Button className="opacity-60 cursor-not-allowed text-sm sm:text-base">
                            Hết hàng
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAddtoCart(productItem?._id)}
                            className="text-sm sm:text-base"
                          >
                            <ShoppingCart />
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              : null}
          </motion.div>
        </div>
      </motion.section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </motion.div>
  );
}

export default ShoppingHome;
