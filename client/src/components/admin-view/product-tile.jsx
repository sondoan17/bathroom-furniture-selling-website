import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit, Trash2, EyeOff, Eye } from "lucide-react"; // Import icons

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
  handleToggleVisibility,
}) {
  return (
    <Card className={`w-full min-h-[400px] max-w-sm mx-auto hover:shadow-lg transition-shadow flex flex-col justify-between ${product.isHidden ? 'opacity-50' : ''}`}>
      <div>
        <div className="relative">
          <img
            src={product?.image1}
            alt={product?.title}
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-2 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 break-words">
            {product?.title}
          </h2>
        </CardContent>
      </div>
      <CardFooter className="p-2 sm:p-4 flex justify-between">
        <Button
          size="sm"
          className="px-3"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Sửa
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="px-3"
          onClick={() => handleToggleVisibility(product?._id)}
        >
          {product.isHidden ? (
            <Eye className="h-4 w-4 mr-2" />
          ) : (
            <EyeOff className="h-4 w-4 mr-2" />
          )}
          {product.isHidden ? "Hiện" : "Ẩn"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="px-3"
          onClick={() => handleDelete(product?._id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
