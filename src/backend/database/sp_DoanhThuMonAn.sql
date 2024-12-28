USE QLY_NHAHANG;
GO

-- Tìm kiếm doanh thu món ăn của chi nhánh
CREATE OR ALTER PROCEDURE sp_SearchDoanhThuMonAnCN (@TenMon NVARCHAR(50), @MaCN CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT TOP 5 MA.TenMon,
			   MA.HinhAnh, 
			   MA.GiaTien, 
			   SUM(CM.SoLuong) AS SoLuong, 
			   SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    WHERE HD.MaCN = @MaCN
    AND MA.TenMon LIKE '%' + @TenMon + '%'
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
END;
GO

-- Tìm kiếm doanh thu món ăn của khu vực
CREATE OR ALTER PROCEDURE sp_SearchDoanhThuMonAnKV (@TenMon NVARCHAR(50), @MaKV CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT MA.TenMon,
           MA.HinhAnh, 
           MA.GiaTien, 
           SUM(CM.SoLuong) AS SoLuong, 
           SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    JOIN CHINHANH CN ON HD.MaCN = CN.MaCN
    WHERE CN.MaKV = @MaKV
    AND MA.TenMon LIKE '%' + @TenMon + '%'
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
END;
GO

-- Tìm kiếm  top 5 món ăn bán chạy nhất của chi nhánh
CREATE OR ALTER PROCEDURE sp_Top5MonAnChayNhatCN (@MaCN CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT TOP 5 MA.TenMon, 
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    WHERE HD.MaCN = @MaCN
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu DESC;
END;
GO

-- Tìm kiếm top 5 món ăn bán chạy nhất của khu vực
CREATE OR ALTER PROCEDURE sp_Top5MonAnChayNhatKV (@MaKV CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT TOP 5 MA.TenMon,
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
                 
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    JOIN CHINHANH CN ON HD.MaCN = CN.MaCN
    WHERE CN.MaKV = @MaKV
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu DESC;
END;
GO


CREATE OR ALTER PROCEDURE sp_TopMonAnChayNhatChiNhanh (@MaCN CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT       MA.TenMon, 
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    WHERE HD.MaCN = @MaCN
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu DESC;
END;
GO

CREATE OR ALTER PROCEDURE sp_TopMonAnChayNhatCty (@NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT       MA.TenMon,
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
                 
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu DESC;
END;
GO

-- Tìm kiếm top 5 món ăn bán chạy nhất của khu vực
CREATE OR ALTER PROCEDURE sp_TopMonAnChayNhatKhuVuc (@MaKV CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT       MA.TenMon,
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
                 
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    JOIN CHINHANH CN ON HD.MaCN = CN.MaCN
    WHERE CN.MaKV = @MaKV
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu DESC;
END;
GO

-- Tìm kiếm top 5 món ăn bán chậm nhất của chi nhánh
CREATE OR ALTER PROCEDURE sp_TOP5MonAnChamNhatCN (@MaCN CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT TOP 5 MA.TenMon,
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong,
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    WHERE HD.MaCN = @MaCN
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu ASC;
END;
GO




-- Tìm kiếm top 5 món ăn bán chậm nhất của khu vực
CREATE OR ALTER PROCEDURE sp_TOP5MonAnChamNhatKV (@MaKV CHAR(2), @NgayBatDau DATE, @NgayKetThuc DATE)
AS
BEGIN
    SELECT TOP 5 MA.TenMon, 
                 MA.HinhAnh, 
                 MA.GiaTien, 
                 SUM(CM.SoLuong) AS SoLuong, 
                 SUM(CM.SoLuong * MA.GiaTien) AS DoanhThu
    FROM CHONMON CM
    JOIN PHIEUDATMON PDM ON CM.MaPhieu = PDM.MaPhieu
    JOIN MONAN MA ON CM.MaMon = MA.MaMon
    JOIN HOADON HD ON PDM.MaHD = HD.MaHD
    JOIN CHINHANH CN ON HD.MaCN = CN.MaCN
    WHERE CN.MaKV = @MaKV
    AND @NgayBatDau <= HD.NgayLap AND HD.NgayLap <= @NgayKetThuc
    GROUP BY MA.TenMon, MA.HinhAnh, MA.GiaTien
    ORDER BY DoanhThu ASC;
END;
GO