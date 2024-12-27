CREATE OR ALTER PROCEDURE SP_SEARCH_HOADON @TUKHOA NVARCHAR(255)
AS BEGIN

select top 5 * from hoadon where mahd LIKE '%' +@TUKHOA + '%'
or mathe like '%' + @TUKHOA + '%'
or NgayLap like '%' + @TUKHOA +'%'
order by ngaylap desc

END;
GO

CREATE OR ALTER PROCEDURE SP_SEARCH_KHACHHANG @TUKHOA NVARCHAR(255)
AS BEGIN

select top 5 * from KHACHHANG where MAKH LIKE '%' + @TUKHOA + '%'
or USERNAME like '%' + @TUKHOA + '%'
or EMAIL like '%' + @TUKHOA +'%'
OR HOTEN like '%' + @TUKHOA +'%'
OR CCCD like '%' + @TUKHOA +'%'
OR SDT like '%' + @TUKHOA +'%'
order by MAKH desc

END;
GO

CREATE OR ALTER PROCEDURE SP_SEARCH_MONAN @TUKHOA NVARCHAR(255)
AS BEGIN

select top 5 * from MONAN where MAMON LIKE '%' + @TUKHOA + '%'
or TENMON like '%' + @TUKHOA + '%'
or PHANLOAI like '%' + @TUKHOA + '%'
order by MAMON ASC

END;
GO