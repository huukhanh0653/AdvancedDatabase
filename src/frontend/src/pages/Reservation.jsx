import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const CustomerReservation = () => {
    const [areas, setAreas] = useState([]);
    const [branches, setBranches] = useState([]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [rdate, setRdate] = useState('');
    const [ppl, setPpl] = useState('');
    const [note, setNote] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [selectedArea, setSelectedArea] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");

    // Fetch areas
    useEffect(() => {
        fetch("http://localhost:5000/customer/get-all-khuvuc")
            .then((res) => res.json())
            .then((data) => {
                const uniqueAreas = [...new Set(data.map((item) => ({ id: item.MaKV, name: item.TenKhuVuc })))];
                setAreas(uniqueAreas);
            });
    }, []);

    // Fetch branches when area changes
    useEffect(() => {
        if (selectedArea) {
            fetch(`http://localhost:5000/customer/get-chinhanh/${selectedArea}`)
                .then((res) => res.json())
                .then((data) => {
                    const uniqueBranches = [...new Set(data.map((item) => ({ id: item.MaCN, name: item.TenCN })))];
                    setBranches(uniqueBranches);
                });
        } else {
            setBranches([]);
        }
    }, [selectedArea]);

    const handleAreaChange = (event) => {
        const areaId = event.target.value;
        setSelectedArea(areaId);
        setSelectedBranch("");
    };

    const handleBranchChange = (event) => {
        const branchId = event.target.value;
        setSelectedBranch(branchId);
    };

    const handleReservation = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/customer/customer-reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, rdate, ppl, note, selectedBranch }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }

            const result = await response.json();
            alert(`Đặt bàn thành công!`);

            setTimeout(() => {
                // Redirect to home page
                window.location.replace('/');
            }, 2000); // Delay of 2 seconds 

        } catch (error) {
            console.error(error);
            setErrorMessage('Có lỗi xảy ra!');
        }
    };

    return (
        <main className="bg-primary text-tertiary">
            <section className='max_padd_container flexCenter flex-col pt-32'>
                <div className='w-[700px] h-[620px] bg-white m-auto px-14 py-10 rounded-md'>
                    <h3 className='h3'>Thông tin đặt bàn</h3>
                    <form onSubmit={handleReservation} className='flex flex-col gap-4 mt-7'>
                        <div className='flex flex-col gap-4 mt-5'>
                            <div className='flex gap-4'>
                                <input type="text" placeholder="Tên khách đặt" className="h-16 w-full pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="tel" placeholder='SDT' className='h-16 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className='flex gap-4'>
                                <input type="datetime-local" placeholder="Ngày giờ đặt" className="h-16 w-full pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl" value={rdate} onChange={(e) => setRdate(e.target.value)} />
                                <input type="number" placeholder='Số lượng khách' className='h-16 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={ppl} onChange={(e) => setPpl(e.target.value)} />
                            </div>
                            <div className='flex gap-4'>
                                {/* Area Dropdown */}
                                <select
                                    value={selectedArea}
                                    onChange={handleAreaChange}
                                    className="h-16 w-fit pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl"
                                >
                                    <option value="">Chọn khu vực</option>
                                    {areas.map((area) => (
                                        <option key={area.id} value={area.id}>
                                            {area.name}
                                        </option>
                                    ))}
                                </select>
                                {/* Branch Dropdown */}
                                <select
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                    className="h-16 w-full pl-5 pr-3 bg-slate-900/5 outline-none rounded-xl"
                                    disabled={!selectedArea}
                                >
                                    <option value="">Chọn chi nhánh</option>
                                    {branches.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input type="text" placeholder='Ghi chú' className='h-16 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>
                        <div className="flex mt-6 gap-5">
                            <button type='submit' className='btn_dark_outline my-5 w-full !rounded-md'>Đặt bàn</button>
                            
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default CustomerReservation