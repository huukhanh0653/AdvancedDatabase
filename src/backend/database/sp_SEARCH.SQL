use QLY_NHAHANG
go

CREATE OR ALTER PROCEDURE SP_SEARCH_HOADON @TUKHOA NVARCHAR(255)
AS BEGIN

select top 10 * from HOADON where MaHD LIKE '%' + @TUKHOA + '%'
or MaThe like '%' + @TUKHOA + '%'
or NgayLap like '%' + @TUKHOA +'%'
order by NgayLap desc

END;
GO

CREATE OR ALTER PROCEDURE SP_SEARCH_KHACHHANG @TUKHOA NVARCHAR(255)
AS BEGIN

select top 10 * from KHACHHANG where SDT like '%' + @TUKHOA +'%' OR
MAKH LIKE '%' + @TUKHOA + '%'
or USERNAME like '%' + @TUKHOA + '%'
or EMAIL like '%' + @TUKHOA +'%'
OR HOTEN like '%' + @TUKHOA +'%'
OR CCCD like '%' + @TUKHOA +'%'
order by MAKH desc

END;
GO

CREATE OR ALTER PROCEDURE SP_SEARCH_MONAN @TUKHOA NVARCHAR(255)
AS BEGIN

select top 10 * from MONAN where MAMON LIKE '%' + @TUKHOA + '%'
or TENMON like '%' + @TUKHOA + '%'
or PHANLOAI like '%' + @TUKHOA + '%'
order by MAMON ASC

END;
GO