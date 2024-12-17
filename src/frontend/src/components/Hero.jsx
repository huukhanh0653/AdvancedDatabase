import { NavLink } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section className='relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full'>
        <div className="max_padd_container relative top-32 xs:top-52">
            <h1 className='h1 capitalize max-w-[37rem]'> Hệ thống cửa hàng SushiX </h1>
            <p className='text-gray-50 regular-16 mt-6 max-w-[33rem]'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam veritatis sapiente ullam animi nisi. Molestiae, nesciunt. Impedit rerum, quibusdam odit dolorem iste, aut illum aliquid facere nobis nostrum dolore exercitationem!
            </p>
            <div className='flexStart !items-center gap-x-4 my-10'>
                <div className='!regular-24 flexCenter gap-x-3'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <div className='bold-16 sm:bold-20'> 176k <span className='regular-16 sm:regular-20'>Excellent Reviews </span></div>
            </div>
            <div className='max-xs:flex-col flex gap-2'>
                <NavLink to='/menu' className={"btn_dark_rounded flexCenter"}> Xem thực đơn </NavLink>
                <NavLink to='/reservation' className={"btn_dark_rounded flexCenter gap-x-1"}> <MdOutlineLocalOffer className='text-2x1'/> Đặt bàn ngay </NavLink>
            </div>
        </div>
    </section>
  )
}

export default Hero