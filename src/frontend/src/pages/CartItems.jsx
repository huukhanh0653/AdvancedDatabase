import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from "react-router-dom";

const CartItems = () => {

    const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    const [cardID, setCard] = useState('');
    const [total, setTotal] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:5000/customer/cart-page", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cartItems, cardID // Use the cartItems from context
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Order placed successfully! Order ID: ${data.MaPhieu}`);
                setDiscount(data.GiamGia); 
                setTotal(data.TongTien);
                // window.location.replace("/cart-page");

            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Failed to place order. Please try again later.");
        }
    };

    const handleCheckCard = async () => {
        if (!cardID) {
            alert("Please provide a card ID!");
            return;
        }

        try {
            // Make the API request using fetch
            const response = await fetch("http://localhost:5000/customer/check-card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cardID }),
            });

            // Check if the response is OK
            const data = await response.json();
            if (response.ok) {
                alert(data.message); // "Mã thẻ hợp lệ!"
            } else {
                // Handle errors returned by the server
                alert(data.message); // "Mã thẻ không hợp lệ!" or other errors
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Unexpected Error: ", error);
            alert("Something went wrong, please try again.");
        }
    };

    return (
        <main className="bg-primary text-tertiary">
            <section className='max_padd_container pt-28'>
                <table className='w-full mx-auto'>
                    <thead>
                        <tr className='bg-slate-900/10 regular-18 sm:regular-22 text-start py-12'>
                            <th className='p-1 py-2'> Hình ảnh </th>
                            <th className='p-1 py-2'> Sản phẩm </th>
                            <th className='p-1 py-2'> Đơn giá </th>
                            <th className='p-1 py-2'> Số lượng </th>
                            <th className='p-1 py-2'> Thành tiền </th>
                            <th className='p-1 py-2'> Hủy </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(cartItems).map((item) => {
                            if (item.quantity > 0) {
                                return (
                                    <tr key={item.MaMon} className='border-b border-slate-900/20 p-6 medium-14 text-center'>
                                        <td className='flexCenter'>
                                            <img src={item.HinhAnh} alt="prdctImg" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 my-1' />
                                        </td>
                                        <td>
                                            <div className='line-clamp-3'>{item.TenMon}</div>
                                        </td>
                                        <td>
                                            {item.GiaTien.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </td>
                                        <td className='w-16 h-16'>{item.quantity}</td>
                                        <td>{(item.GiaTien * item.quantity).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</td>
                                        <td>
                                            <div className='bold-22 pl-14'>
                                                <TbTrash onClick={() => removeFromCart(item.MaMon)} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        })}

                    </tbody>
                </table>
                {/* cart details */}
                <div className='flexCenter'>
                    <div className='flexCenter flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[800px]'>
                        <div className='flex flex-col gap-10'>
                            <h4 className='bold-20'>Hóa đơn</h4>
                            <div>
                                <div className='flexBetween py-4'>
                                    <h4 className='medium-16'>Tạm tính:</h4>
                                    <h4 className='text-gray-30 font-semibold'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getTotalCartAmount())}</h4>
                                    {/* <h4 className='text-gray-30 font-semibold'>${getTotalCartAmount()}</h4> */}
                                </div>
                                <hr />
                                <div className='flexBetween py-4'>
                                    <h4 className='medium-16'>Phí vận chuyển:</h4>
                                    <h4 className='text-gray-30 font-semibold'>Free</h4>
                                </div>
                                <hr />
                                <div className='flexBetween py-4'>
                                    <h4 className='medium-16'>Giảm giá:</h4>
                                    <h4 className='text-gray-30 font-semibold'>{discount.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }) || '0'}</h4>
                                </div>
                                <hr />
                                <div className='flexBetween py-4'>
                                    <h4 className='bold-18'>Tổng tiền: </h4>
                                    <h4 className='bold-18'>{total.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }) || '0'}</h4>
                                </div>
                            </div>
                            <button onClick={handleCheckout} className='btn_dark_rounded w-44'>Thanh toán</button>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <h4 className='bold-20'>Mã thẻ thành viên: </h4>
                            <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
                                <input type="text" placeholder='CardID' className='bg-transparent border-none outline-none' value={cardID} onChange={(e) => setCard(e.target.value)} />
                                <button onClick={handleCheckCard} className='btn_dark_rounded' >Kiểm tra hợp lệ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CartItems