import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>Đăng ký</h3>
        <div className='flex flex-col gap-4 mt-7'>
          <input type="text" placeholder='Họ tên'className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="text" placeholder='CCCD'className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="email" placeholder='Email' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="tel" placeholder='Số điện thoại' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="text" placeholder='Tên đăng nhập' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="password" placeholder='Mật khẩu' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
        </div>
        <button className='btn_dark_rounded my-5 w-full !rounded-md'>Tiếp tục</button>
        <p className='flexCenter text-black font-bold gap-1'>Đã có tài khoản? <Link to={'/login'} className={'flex'}><span className='text-secondary underline cursor-pointer'>Đăng nhập</span> </Link> </p> 
        <div className='flexCenter mt-6 gap-3'>
          <input type="checkbox" name="" id="" />
          <p>Bằng cách tiếp tục, tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật.</p>
        </div>
      </div>
    </section>
  )
}

export default Signup