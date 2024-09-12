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
      { id: "toilet", label: "Bồn cầu" },
      { id: "lavabo", label: "Chậu Lavabo" },
      { id: "kitchensink", label: "Chậu rửa bát" },
      { id: "bathroommirror", label: "Gương phòng tắm" },
      { id: "shower", label: "Sen tắm" },
    ],
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
    id: "toilet",
    label: "Bồn cầu",
    path: "/shop/listing",
  },
  {
    id: "lavabo",
    label: "Chậu Lavabo",
    path: "/shop/listing",
  },
  {
    id: "kitchensink",
    label: "Chậu rửa bát",
    path: "/shop/listing",
  },
  {
    id: "bathroommirror",
    label: "Gương phòng tắm",
    path: "/shop/listing",
  },
  {
    id: "shower",
    label: "Sen tắm",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  toilet: "Bồn cầu",
  lavabo: "Chậu Lavabo",
  kitchensink: "Chậu rửa bát",
  bathroommirror: "Gương phòng tắm",
  shower: "Sen tắm",
};

export const brandOptionsMap = {
  no: "Không",
};
export const filterTitle = ["Danh mục", "Thương hiệu"];
export const filterOptions = {
  category: [
    { id: "toilet", label: "Bồn cầu" },
    { id: "lavabo", label: "Chậu Lavabo" },
    { id: "kitchensink", label: "Chậu rửa bát" },
    { id: "bathroommirror", label: "Gương phòng tắm" },
    { id: "shower", label: "Sen tắm" },
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
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
