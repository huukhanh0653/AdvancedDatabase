import React from 'react'

const Reservation = () => {
    return (
        <section className='max_padd_container flexCenter flex-col pt-32'>
            <div className='max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md'>
                <h3 className='h3'>Thông tin đặt bàn</h3>
                <div className='flex flex-col gap-4 mt-7'>
                    <input type="text" placeholder='Khu vực' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <input type="text" placeholder='Chi nhánh' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <div className="flex space-x-4">
                        <input type="date" placeholder="Ngày đặt" className="h-14 w-1/2 pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" />
                        <input type="time" placeholder="Giờ đặt" className="h-14 w-1/2 pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" />
                    </div>
                    <input type="number" placeholder='Số lượng khách' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <input type="text" placeholder='Ghi chú' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                </div>
                <div className="flex mt-6 gap-5">
                    <button className='btn_dark_outline my-5 w-1/2 !rounded-md'>Đặt bàn</button>
                    <button className='btn_secondary_rounded  my-5 w-1/2 !rounded-md'>Gọi món</button>
                </div>
            </div>
        </section>
    )
}

export default Reservation