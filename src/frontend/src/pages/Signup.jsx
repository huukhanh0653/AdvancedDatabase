import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const [fullname, setFullname] = useState('');
  const [cccd, setCccd] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, cccd, email, phone, gender, username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || 'Đăng kí thất bại!');
        return;
      }

      const result = await response.json();
      setSuccessMessage(result.message);
      setErrorMessage('');

      

      // Delay navigation for a moment to allow users to see the message
      setTimeout(() => {
        // Redirect to login page
        window.location.replace('/login');
      }, 3000); // Delay of 4 seconds 

    } catch (error) {
      console.error(error);
      setErrorMessage('Có lỗi xảy ra!');
    }
  };

  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='max-w-[555px] h-[900px] bg-white m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>Đăng ký</h3>
        <form onSubmit={handleSignup} className='flex flex-col gap-4 mt-7'>
          <input type="text" placeholder='Họ tên' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={fullname} onChange={(e) => setFullname(e.target.value)} />
          <div className='flex flex-col gap-2'>
            <label className='font-bold'>Giới tính:</label>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2'>
                <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} /> Nam
              </label>
              <label className='flex items-center gap-2'>
                <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} /> Nữ
              </label>
            </div>
          </div>
          <input type="text" placeholder='CCCD' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={cccd} onChange={(e) => setCccd(e.target.value)} />
          <input type="email" placeholder='Email' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder='Số điện thoại' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="text" placeholder='Tên đăng nhập' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Mật khẩu' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type='submit' className='btn_dark_rounded my-5 w-full !rounded-md'>Tiếp tục</button>
          <p className='flexCenter text-black font-bold gap-1'>Đã có tài khoản? <Link to={'/login'} className={'flex'}><span className='text-secondary underline cursor-pointer'>Đăng nhập</span> </Link> </p>
          <div className='flexCenter mt-6 gap-3'>
            <input type="checkbox" name="" id="" />
            <p>Bằng cách tiếp tục, tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật.</p>
          </div>
        </form>
        {errorMessage && <p className='flexCenter text-base py-5 text-red-500'>{errorMessage}</p>}
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
      </div>
    </section>
  )
}

export default Signup