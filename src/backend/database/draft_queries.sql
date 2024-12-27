----update phieudatmon set TongTien = (select)

--update phieudatmon set TongTien = (select sum(giatien*Soluong) from chonmon join monan on chonmon.MaMon = monan.MaMon where CHONMON.MaPhieu = PHIEUDATMON.MaPhieu)

--UPDATE HOADON
--SET TONGHOADON = (
--    SELECT SUM(TONGTIEN)
--    FROM PHIEUDATMON
--    WHERE PHIEUDATMON.MAHD = HOADON.MaHD
--);

--UPDATE HOADON SET TongHoaDon = TongHoaDon * (1 - GiamGia/100);

--SELECT PHIEUDATMON.MAHD, TONGTIEN, GIAMGIA, TONGHOADON FROM PHIEUDATMON JOIN HOADON ON PHIEUDATMON.MAHD = HOADON.MAHD ORDER BY PHIEUDATMON.MAHD ASC

--UPDATE PHIEUDATMON SET NgayLap = (SELECT HOADON.NGAYLAP FROM HOADON WHERE HOADON.MAHD = PHIEUDATMON.MAHD)

select * from KHACHHANG

declare @x  Nvarchar(255);
set @x = '12'

select top 10 * from hoadon where mahd LIKE '%' + @x + '%'
or mathe like '%' + @x + '%'
or NgayLap like '%' + @x +'%'
order by ngaylap desc