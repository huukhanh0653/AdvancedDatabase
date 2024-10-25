import React from 'react'

const Reservation = () => {
    return (
        <section className='max_padd_container flexCenter flex-col pt-32'>
            <div className='max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md'>
                <h3 className='h3'>Reservation</h3>
                <div className='flex flex-col gap-4 mt-7'>
                    <input type="text" placeholder='Area' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <input type="text" placeholder='Branch' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <div className="flex space-x-4">
                        <input type="date" placeholder="Date" className="h-14 w-1/2 pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" />
                        <input type="time" placeholder="Time" className="h-14 w-1/2 pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" />
                    </div>
                    <input type="number" placeholder='Number of customers' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                    <input type="text" placeholder='Note' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                </div>
                <div className="flex mt-6 gap-5">
                    <button className='btn_dark_outline my-5 w-1/2 !rounded-md'>Book Without Food</button>
                    <button className='btn_secondary_rounded  my-5 w-1/2 !rounded-md'>Food Order</button>
                </div>
            </div>
        </section>
    )
}

export default Reservation