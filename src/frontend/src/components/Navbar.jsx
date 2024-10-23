import { NavLink } from "react-router-dom"
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md"

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"> <MdHomeFilled />Home</div></NavLink>
      <NavLink to={'/menu'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"> <MdCategory />Menu </div></NavLink>
      <NavLink to={'/reservation'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"> <MdContacts />Reservation</div></NavLink>
      <NavLink to={'/kids'} className={({isActive}) => isActive ? "active_link" : ""}> <div className="flexCenter gap-x-1"> <MdShop2 />Kid</div></NavLink>
    </nav>
  )
}

export default Navbar