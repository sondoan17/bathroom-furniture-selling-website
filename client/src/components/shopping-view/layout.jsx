import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import FloatingIcon from "./floatingIcon";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <FloatingIcon />
    </div>
  );
}

export default ShoppingLayout;
