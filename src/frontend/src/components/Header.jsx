import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg"
import Navbar from "./Navbar"
import { useState, useContext } from "react";
import { MdClose, MdMenu } from "react-icons/md"
import { FaOpencart } from "react-icons/fa"
import user from "../assets/user.svg"
import { ShopContext } from "../Context/ShopContext";

const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { getTotalCartItems } = useContext(ShopContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = localStorage.getItem("username"); // Check if user is logged in

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.replace("/");
  };


  return (
    <header className="fixed top-0 left-0 m-auto max_padd_container w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="px-4 flexBetween py-3 max-xs:px-2">
        {/*logo*/}
        <div>
          <Link> <img src={logo} alt="" height={66} width={66} /></Link>
        </div>
        {/* navbar desktop*/}
        <div>
          <Navbar containerStyles={"hidden md:flex gap-x-5 x1:gap-x-10 medium-15"} />
        </div>
        {/* navbar mobile*/}
        <div>
          <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-10 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
            : "flex items-start flex-col gap-y-10 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"}`} />
        </div>
        {/* buttons */}
        <div className="flexBetween sm:gap-x-4 bold-16">
          {!menuOpened ? (
            <MdMenu className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu} />
          ) : (
            <MdClose className="md:hidden cursor-pointer 
            hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu} />
          )
          }
          <div className="flexBetween sm:gap-x-4">
            <NavLink to={"/cart-page"} className={"flex"}><FaOpencart
              className="p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full" />
              <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">{getTotalCartItems()}</span>
            </NavLink>
            {username ? (
              // If user is logged in, show the dropdown menu
              <div className="">
                <button onClick={handleToggleDropdown} className="btn_secondary_rounded flexCenter gap-1">
                 <img src={user} alt="userIcon" height={19} width={19} />{username}
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-200">
                    <NavLink
                      to=""
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
                    >
                      My Account
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    > Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If user is not logged in, show the login button
              <NavLink
                to="/login"
                className="btn_secondary_rounded flexCenter gap-1"
              >
                <img src={user} alt="userIcon" height={19} width={19} />
                Login
              </NavLink>
            )}

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header