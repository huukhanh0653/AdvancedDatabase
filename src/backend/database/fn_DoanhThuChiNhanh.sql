use QLY_NHAHANG

GO

CREATE OR ALTER FUNCTION fn_DoanhThuChiNhanhTheoNgay (@MaCN CHAR(2), @Ngay DATE)
RETURNS INT 
AS
BEGIN 
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE MaCN = @MaCN AND NgayLap = @Ngay
    RETURN @DoanhThu
END
GO

SELECT dbo.fn_DoanhThuChiNhanhTheoNgay ('1', '2024-12-19');
go

CREATE OR ALTER FUNCTION fn_DoanhThuChiNhanhTheoThang (@MaCN CHAR(2), @Thang INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE MaCN = @MaCN AND MONTH(NgayLap) = @Thang AND YEAR(NgayLap) = @Nam 
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuChiNhanhTheoNam (@MaCN CHAR(2), @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE MaCN = @MaCN AND YEAR(NgayLap) = @Nam
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuChiNhanhTheoQuy (@MaCN CHAR(2), @Quy INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE MaCN = @MaCN AND (MONTH(NgayLap) - 1) / 3 + 1 = @Quy AND YEAR(NgayLap) = @Nam

    RETURN @DoanhThu
END

GO

CREATE OR ALTER FUNCTION fn_DoanhThuCapCongTyTheoNgay (@Ngay DATE)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE NgayLap = @Ngay
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuCapCongTyTheoThang (@Thang INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE MONTH(NgayLap) = @Thang AND YEAR(NgayLap) = @Nam
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuCapCongTyTheoNam (@Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE YEAR(NgayLap) = @Nam
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuCapCongTyTheoQuy (@Quy INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(TongHoaDon)
    FROM HOADON
    WHERE (MONTH(NgayLap) - 1) / 3 + 1 = @Quy AND YEAR(NgayLap) = @Nam
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuTheoMonAn (@MaMon INT)
RETURNS INT
AS
BEGIN  
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(CHONMON.SoLuong * MONAN.GiaTien)
    FROM CHONMON
    JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
    WHERE MONAN.MaMon = @MaMon
    RETURN @DoanhThu
END

GO
CREATE OR ALTER FUNCTION fn_DoanhThuTheoMonAnTheoNgay (@MaMon INT, @Ngay DATE)
RETURNS INT
AS
BEGIN  
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(CHONMON.SoLuong * MONAN.GiaTien)
    FROM CHONMON
    JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
    JOIN PHIEUDATMON ON CHONMON.MaPhieu = PHIEUDATMON.MaPhieu
    WHERE MONAN.MaMon = @MaMon AND PHIEUDATMON.NgayLap = @Ngay
    RETURN @DoanhThu
END

GO

CREATE OR ALTER FUNCTION fn_DoanhThuTheoMonAnTheoThang (@MaMon INT, @Thang INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(CHONMON.SoLuong * MONAN.GiaTien)
    FROM CHONMON
    JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
    JOIN PHIEUDATMON ON CHONMON.MaPhieu = PHIEUDATMON.MaPhieu
    WHERE MONAN.MaMon = @MaMon AND MONTH(PHIEUDATMON.NgayLap) = @Thang AND YEAR(PHIEUDATMON.NgayLap) = @Nam
    RETURN @DoanhThu
END

GO

CREATE OR ALTER FUNCTION fn_DoanhThuTheoMonAnTheoNam (@MaMon INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(CHONMON.SoLuong * MONAN.GiaTien)
    FROM CHONMON
    JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
    JOIN PHIEUDATMON ON CHONMON.MaPhieu = PHIEUDATMON.MaPhieu
    WHERE MONAN.MaMon = @MaMon AND YEAR(PHIEUDATMON.NgayLap) = @Nam
    RETURN @DoanhThu
END

GO

CREATE OR ALTER FUNCTION fn_DoanhThuTheoMonAnTheoQuy (@MaMon INT, @Quy INT, @Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @DoanhThu INT
    SELECT @DoanhThu = SUM(CHONMON.SoLuong * MONAN.GiaTien)
    FROM CHONMON
    JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
    JOIN PHIEUDATMON ON CHONMON.MaPhieu = PHIEUDATMON.MaPhieu
    WHERE MONAN.MaMon = @MaMon AND (MONTH(PHIEUDATMON.NgayLap) - 1) / 3 + 1 = @Quy AND YEAR(PHIEUDATMON.NgayLap) = @Nam
    RETURN @DoanhThu
END
