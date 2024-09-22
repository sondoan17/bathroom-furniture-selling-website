export const registerFormControls = [
  {
    name: "userName",
    label: "Tên đăng nhập",
    placeholder: "Nhập tên đăng nhập",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập địa chỉ email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập địa chỉ email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Tên sản phẩm",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phẩm",
  },
  {
    label: "Danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "basincabinet", label: "Tủ chậu", type: ["PVC", "Nhôm"] },
      { id: "stonetable", label: "Bàn đá", type: ["Không"] },
      { id: "lavabo", label: "Lavabo", type: ["Tròn/Elip", "Vuông/Chữ nhật"] },
      { id: "faucet", label: "Sen/vòi", type: ["Không"] },
      { id: "toilet", label: "Bồn cầu/Tiểu treo", type: ["Không"] },
      { id: "accessory", label: "Phụ kiện", type: ["Không"] },
    ],
  },
  {
    label: "Loại",
    name: "type",
    componentType: "select",
    options: [],
    dependsOn: "category",
  },
  {
    label: "Thương hiệu",
    name: "brand",
    componentType: "select",
    options: [{ id: "no", label: "Không" }],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá khuyến mãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá khuyến mãi (tùy chọn)",
  },
  {
    label: "Tồn kho",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập tồn kho",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Trang chủ",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/shop/listing",
  },
  {
    id: "basincabinet",
    label: "Tủ chậu",
    path: "/shop/listing?category=basincabinet",
  },
  {
    id: "stonetable",
    label: "Bàn đá",
    path: "/shop/listing?category=stonetable",
  },
  {
    id: "lavabo",
    label: "Lavabo",
    path: "/shop/listing?category=lavabo",
  },
  {
    id: "faucet",
    label: "Sen/vòi",
    path: "/shop/listing?category=faucet",
  },
  {
    id: "toilet",
    label: "Bồn cầu/Tiểu treo",
    path: "/shop/listing?category=toilet",
  },
  {
    id: "accessory",
    label: "Phụ kiện",
    path: "/shop/listing?category=accessory",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  basincabinet: "Tủ chậu",
  stonetable: "Bàn đá",
  lavabo: "Lavabo",
  faucet: "Sen/vòi",
  toilet: "Bồn cầu/Tiểu treo",
  accessory: "Phụ kiện",
};

export const brandOptionsMap = {
  no: "Không",
};

export const filterTitle = ["Danh mục", "Thương hiệu"];
export const filterOptions = {
  category: [
    { id: "basincabinet", label: "Tủ chậu", type: ["PVC", "Nhôm"] },
    { id: "stonetable", label: "Bàn đá" },
    { id: "lavabo", label: "Lavabo", type: ["Tròn/Elip", "Vuông/Chữ nhật"] },
    { id: "faucet", label: "Sen/vòi" },
    { id: "toilet", label: "Bồn cầu/Tiểu treo" },
    { id: "accessory", label: "Phụ kiện" },
  ],
  brand: [{ id: "no", label: "Không" }],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến cao" },
  { id: "price-hightolow", label: "Giá: Cao đến thấp" },
  { id: "title-atoz", label: "Tên: A đến Z" },
  { id: "title-ztoa", label: "Tên: Z đến A" },
];

export const addressFormControls = [
  {
    label: "Tên",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên",
  },
  {
    label: "Địa chỉ",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Nhập địa chỉ",
  },
  {
    label: "Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập thành phố",
  },
  {
    label: "Mã bưu điện",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Nhập mã bưu điện",
  },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại",
  },
  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú",
  },
];
