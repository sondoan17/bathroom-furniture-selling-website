import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import FloatingIcon from "./floatingIcon";
import Footer from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <FloatingIcon />
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
