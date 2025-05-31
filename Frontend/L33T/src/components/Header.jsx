import React from "react";
import MboaConnectLogo from "./MboaConnectLogo";
import CustomButton from "../Common/CutomButton";
import NavBar from "../Layouts/NavBar";
// import { ShoppingCartIcon, Bell } from "lucide-react";

const Header = () => {
  return (
    <NavBar />
    // <header className="w-full bg-[#F2F8F4] px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm border-b border-[#E1EFE6]">
    //   Left: Logo and Navigation
    //   <div className="flex items-center space-x-3 sm:space-x-6">
    //     <MboaConnectLogo />

    //     {/* Navigation - hidden on small, flex on md+ */}
    //     <nav className="hidden md:flex space-x-4 lg:space-x-6 text-sm">
    //       {["Home", "Features", "Listings", "Get Mentor", "Contact"].map(
    //         (item, idx) => (
    //           <a
    //             key={idx}
    //             href="#"
    //             className="text-[#646C6F] hover:text-[#AEB7B3] transition"
    //           >
    //             {item}
    //           </a>
    //         )
    //       )}
    //     </nav>
    //   </div>

    //   {/* Right: Icons and Buttons */}
    //   <div className="flex items-center space-x-2 sm:space-x-4">
    //     {/* Hide icons on really small, show from sm upwards
    //     <Bell className="hidden sm:block w-5 h-5 text-[#646C6F] hover:text-[#AEB7B3] cursor-pointer transition" />
    //     <ShoppingCartIcon className="hidden sm:block w-5 h-5 text-[#646C6F] hover:text-[#AEB7B3] cursor-pointer transition" /> */}

    //     {/* Buttons: smaller and stacked on very small, inline on sm+ */}
    //     <div className="flex flex-col space-y-2 xs:flex-row xs:space-y-0 xs:space-x-3">
    //       <CustomButton
    //         text="Login"
    //         route="/login"
    //         as="link"
    //         variant="primary"
    //       />
    //       <CustomButton
    //         text="Sign Up"
    //         route="/signup"
    //         as="link"
    //         variant="accent"
    //       />
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
