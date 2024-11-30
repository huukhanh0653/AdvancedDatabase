import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='w-[555px] h-[450px] bg-white m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>Đăng nhập</h3>
        <div className='flex flex-col gap-4 mt-7'>
          <input type="text" placeholder='Tên đăng nhập' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type="password" placeholder='Mật khẩu' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
        </div>
        <button className='btn_dark_rounded my-5 w-full !rounded-md'>Đăng nhập</button>
        <p className='flexCenter text-black font-bold gap-1'>Chưa có tài khoản?<Link to={'/signup'} className={'flex'}><span className='text-secondary underline cursor-pointer'>Đăng ký</span> </Link> </p> 
      </div>
    </section>
  )
}

export default Login