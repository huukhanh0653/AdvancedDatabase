USE QLY_NHAHANG
GO
-- Tạo trigger

--1. Proc cập nhật hang thành viên.
--2. Trigger xuất hoá đơn
--3. Trigger để tính thời gian duyệt web của khách

-----1. Proc cập nhật hang thành viên.
CREATE or alter PROCEDURE sp_UpdateMembershipRanks
AS
BEGIN
    DECLARE @CurrentDate DATE = GETDATE();

    -- Downgrade GOLD to SILVER if total points < 100 in the last 1 year
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Silver'
    WHERE LoaiThe = 'Gold'
      AND DiemTichLuy < 100
      AND DATEADD(YEAR, -1, @CurrentDate) <= NgayDatThe;

    -- Maintain GOLD if total points >= 100 in the last 1 year
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Gold'
    WHERE LoaiThe = 'Gold'
      AND DiemTichLuy >= 100
      AND DATEADD(YEAR, -1, @CurrentDate) <= NgayDatThe;

    -- Downgrade SILVER to Membership if total points < 50 in the last 1 year
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Normal'
    WHERE LoaiThe = 'Silver'
      AND DiemTichLuy < 50
      AND DATEADD(YEAR, -1, @CurrentDate) <= NgayDatThe;

    -- Maintain SILVER if total points >= 50 in the last 1 year
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Silver'
    WHERE LoaiThe = 'Silver'
      AND DiemTichLuy >= 50
      AND DATEADD(YEAR, -1, @CurrentDate) <= NgayDatThe;

    -- Upgrade from SILVER to GOLD if total points >= 100 in the last 1 year
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Gold',
        NgayDatThe = @CurrentDate -- Update the date of achieving GOLD
    WHERE LoaiThe = 'Silver'
      AND DiemTichLuy >= 100
      AND DATEADD(YEAR, -1, @CurrentDate) <= NgayDatThe;

    -- Upgrade from Membership to SILVER if total points >= 100
    UPDATE THETHANHVIEN
    SET LoaiThe = 'Silver',
        NgayDatThe = @CurrentDate -- Update the date of achieving SILVER
    WHERE LoaiThe = 'Normal'
      AND DiemTichLuy >= 100;
END;
GO

--Proc trả về MaHD mới tạo
CREATE OR ALTER PROCEDURE sp_TaoHDMoi
AS 
BEGIN	
	DECLARE @MaHD int;
	INSERT INTO HOADON (MaThe, MaCN, NgayLap, isEatIn, TongHoaDon)
    VALUES (NULL, 1, GETDATE(), 1, 0);

    SET @MaHD = SCOPE_IDENTITY(); -- Retrieve the newly created invoice ID

	RETURN @MaHD;
END;
GO

CREATE OR ALTER PROCEDURE sp_TaoHDMoi_Delivery
AS 
BEGIN	
	DECLARE @MaHD int;
	INSERT INTO HOADON (MaThe, MaCN, NgayLap, isEatIn, TongHoaDon)
    VALUES (NULL, 1, GETDATE(), 0, 0);

    SET @MaHD = SCOPE_IDENTITY(); -- Retrieve the newly created invoice ID

	RETURN @MaHD;
END;
GO

CREATE OR ALTER PROCEDURE sp_TaoPDM_Moi(@MaBan CHAR(3), @MaNV int, @MaHD int)
AS 
BEGIN 
	DECLARE @MaPhieu int;
	INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaNV, MaHD)
    VALUES (GETDATE(), @MaBan, @MaNV, @MaHD);

	SET @MaPhieu = SCOPE_IDENTITY(); -- Retrieve the newly created invoice ID

	RETURN @MaPhieu;
END;
GO

CREATE OR ALTER PROCEDURE sp_TaoPDM_Customer(@MaHD int)
AS 
BEGIN 
	DECLARE @MaPhieu int;
	INSERT INTO PHIEUDATMON(NgayLap, MaHD)
    VALUES (GETDATE(), @MaHD);

	SET @MaPhieu = SCOPE_IDENTITY(); -- Retrieve the newly created invoice ID

	RETURN @MaPhieu;
END;
GO

----INSERT CHONMON 

--CREATE OR ALTER PROCEDURE sp_ChonMon(@ListMon array)
--AS
--BEGIN 
--	DECLARE @MaHD int;
--END;
--GO

--Tính tổng hóa đơn (đã gọi trong sp_Checkout ở dưới)
CREATE OR ALTER PROCEDURE sp_Subtotal(@MaHD int)
AS 
BEGIN
	--DECLARE @TongTien DECIMAL(18, 2)
	
	DECLARE @MaPhieu INT; -- Declare a variable to hold the current value

	DECLARE myCursor CURSOR FOR
	SELECT MaPhieu 
	FROM PHIEUDATMON
	WHERE MaHD = @MaHD; -- Define the dataset to iterate over

	OPEN myCursor;

	FETCH NEXT FROM myCursor INTO @MaPhieu; -- Fetch the first row

	WHILE @@FETCH_STATUS = 0
	BEGIN
		-- Perform your operation for each row
		UPDATE PHIEUDATMON
		SET TongTien = (
			SELECT SUM(CM.SoLuong * MA.GiaTien)
			FROM CHONMON CM
			INNER JOIN MONAN MA ON CM.MaMon = MA.MaMon
			WHERE CM.MaPhieu = @MaPhieu
		)
		WHERE MaPhieu = @MaPhieu;

		FETCH NEXT FROM myCursor INTO @MaPhieu; -- Fetch the next row
	END;

	CLOSE myCursor; -- Close the cursor
	DEALLOCATE myCursor; -- Deallocate the cursor

END;
GO

--Update tình trạng bàn (đã gọi trong sp_Checkout ở dưới)
CREATE OR ALTER PROCEDURE sp_UpdateBanToEmpty(@MaHD int)
AS 
BEGIN
	DECLARE @MaBan char(3), @MaCN char(2);

	SELECT @MaBan = MaBan, @MaCN = MaCN
	FROM BAN
	WHERE MaHD = @MaHD AND TinhTrang = 0

	IF (@MaBan is not NULL AND @MaCN is not NULL)
	BEGIN 
		UPDATE BAN
		SET TinhTrang = 1, MaHD = NULL
		WHERE MaBan = @MaBan AND MaCN = @MaCN
	END;
END;
GO 

--Thanh toán, gọi lên khi chọn vào button 'Thanh toán' trên web
CREATE OR ALTER PROCEDURE sp_Checkout(@MaHD int, @MaThe char(6))
AS 
BEGIN 
	DECLARE @TongTien DECIMAL(18, 2);
	DECLARE @LoaiThe CHAR(6);
	DECLARE @GiamGia DECIMAL(18, 2);
	DECLARE @DiemTichLuy INT;

	IF EXISTS (SELECT * FROM HOADON WHERE MaHD = @MaHD)
	BEGIN

		EXEC sp_Subtotal @MaHD = @MaHD

		UPDATE HOADON
		SET TongHoaDon = (SELECT SUM(TongTien)
						  FROM PhieuDatMon pd
						  WHERE pd.MaHD = @MaHD), MaThe = @MaThe
		WHERE MaHD = @MaHD;

		-- Fetch the final total and membership card details
		SELECT @TongTien = TongHoaDon
		FROM HOADON
		WHERE MaHD = @MaHD;

		-- If a membership card is used, calculate points
		IF (@MaThe IS NOT NULL AND @TongTien > 0)
		BEGIN
		-- Retrieve membership type
			SELECT @LoaiThe = LoaiThe
			FROM THETHANHVIEN
			WHERE MaThe = @MaThe;

			-- Determine the discount rate based on membership type
			IF (@LoaiThe = 'Silver') 
				SET @GiamGia = @TongTien * 0.05; -- 5% discount
			ELSE IF (@LoaiThe = 'Gold') 
				SET @GiamGia = @TongTien * 0.10; -- 10% discount
			ELSE 
				SET @GiamGia = 0; -- No discount for other types

			-- Update the invoice with the discount
			UPDATE HOADON
			SET GiamGia = @GiamGia,
				TongHoaDon = @TongTien - @GiamGia
			WHERE MaHD = @MaHD;

			-- Update membership points (1 point per 100,000 VND of the final total)
			SET @DiemTichLuy = FLOOR(@TongTien / 100000); -- 1 point per 100,000 VND

			-- Update membership card points
			UPDATE THETHANHVIEN
			SET DiemTichLuy = DiemTichLuy + @DiemTichLuy
			WHERE MaThe = @MaThe;
		END;

		EXEC sp_UpdateBanToEmpty @MaHD = @MaHD;
	END;
END;
GO

CREATE OR ALTER PROCEDURE sp_Checkout_Customer(@MaHD int, @MaThe char(8))
AS 
BEGIN 
	DECLARE @TongTien DECIMAL(18, 2);
	DECLARE @LoaiThe CHAR(6);
	DECLARE @GiamGia DECIMAL(18, 2);
	DECLARE @DiemTichLuy INT;

	IF EXISTS (SELECT * FROM HOADON WHERE MaHD = @MaHD)
	BEGIN

		EXEC sp_Subtotal @MaHD = @MaHD

		UPDATE HOADON
		SET TongHoaDon = (SELECT SUM(TongTien)
						  FROM PhieuDatMon pd
						  WHERE pd.MaHD = @MaHD), MaThe = @MaThe
		WHERE MaHD = @MaHD;

		-- Fetch the final total and membership card details
		SELECT @TongTien = TongHoaDon
		FROM HOADON
		WHERE MaHD = @MaHD;

		-- If a membership card is used, calculate points
		IF (@MaThe IS NOT NULL AND @TongTien > 0)
		BEGIN
		-- Retrieve membership type
			SELECT @LoaiThe = LoaiThe
			FROM THETHANHVIEN
			WHERE MaThe = @MaThe;

			-- Determine the discount rate based on membership type
			IF (@LoaiThe = 'Silver') 
				SET @GiamGia = @TongTien * 0.05; -- 5% discount
			ELSE IF (@LoaiThe = 'Gold') 
				SET @GiamGia = @TongTien * 0.10; -- 10% discount
			ELSE 
				SET @GiamGia = 0; -- No discount for other types

			-- Update the invoice with the discount
			UPDATE HOADON
			SET GiamGia = @GiamGia,
				TongHoaDon = @TongTien - @GiamGia
			WHERE MaHD = @MaHD;

			-- Update membership points (1 point per 100,000 VND of the final total)
			SET @DiemTichLuy = FLOOR(@TongTien / 100000); -- 1 point per 100,000 VND

			-- Update membership card points
			UPDATE THETHANHVIEN
			SET DiemTichLuy = DiemTichLuy + @DiemTichLuy
			WHERE MaThe = @MaThe;
		END;
	END;
	
	RETURN @GiamGia;
END;
GO



--EXEC sp_XemHD @TinhTrang = 0

--Proc để xem HD thanh toán hoặc chưa thanh toán (1 là đã thanh toán, 0 là ngược lại)
CREATE OR ALTER PROCEDURE sp_XemHD(@TinhTrang bit)
AS 
BEGIN 
	IF @TinhTrang = 1 --Đã thanh toán
	BEGIN
		SELECT HD.*
		FROM HOADON HD
		WHERE NOT EXISTS (
			SELECT 1
			FROM BAN B
			WHERE B.MaHD = HD.MaHD AND B.TinhTrang = 1
		);
	END;
	
	IF @TinhTrang = 0 --Chưa thanh toán
	BEGIN
		SELECT HD.*
		FROM HOADON HD
		WHERE EXISTS (
			SELECT 1
			FROM BAN B
			WHERE B.MaHD = HD.MaHD AND B.TinhTrang = 1
		);
	END;
	
END;

--SELECT * FROM PHIEUDATMON
--SELECT * FROM CHONMON
--SELECT * FROM hoadon
--SELECT * FROM BAN

--SELECT * FROM THETHANHVIEN

SELECT * FROM KHACHHANG
SELECT * FROM TAIKHOAN;
GO

CREATE OR ALTER PROCEDURE sp_DatBanMoi(@hoten nvarchar(50), @sdt VARCHAR(12), @ngaygiodat DATETIME,  @sl INT, @macn CHAR(2), @ghichu NVARCHAR(255))
AS
BEGIN 
	DECLARE @MaDatBan int;
	INSERT INTO DATBAN (HoTen, SDT, NgayGioDat, SoLuong, ChiNhanh, GhiChu) VALUES
	(@hoten, @sdt, @ngaygiodat, @sl, @macn, @ghichu)

	SET @MaDatBan = SCOPE_IDENTITY(); -- Retrieve the newly created table_booking ID

	RETURN @MaDatBan;

END;
GO

CREATE OR ALTER PROCEDURE sp_XemMenuTheoKV (@makv char(2))
AS
BEGIN 
	SELECT MA.* 
	FROM MONAN MA, THUCDON TD
    WHERE TD.MaMon = MA.MaMon AND TD.MaKV = @makv
END;
GO

exec sp_XemMenuTheoKV @makv = 'MB'

CREATE OR ALTER PROCEDURE sp_XemMenuTheoCN (@macn int)
AS
BEGIN 
	SELECT MA.* 
	FROM MONAN MA, PHUCVU PV
    WHERE PV.MaMon = MA.MaMon AND PV.MaCN = @macn
END;
GO

CREATE OR ALTER PROCEDURE sp_XemMenuTheoCate (@phanloai nvarchar(50), @macn int)
AS
BEGIN 
	SELECT MA.* 
    FROM MONAN MA, PHUCVU PV
    WHERE PV.MaMon = MA.MaMon AND PV.MaCN = @macn AND MA.PhanLoai = @phanloai
END;
GO


SELECT * FROM HOADON 
ORDER BY MaHD DESC

SELECT * FROM DATBAN 
ORDER BY MaDatBan DESC

UPDATE DATBAN
SET MaHD = 300029
WHERE MaDatBan = 1017;

SELECT * FROM MONAN

DELETE FROM MONAN WHERE TenMon = 'testing'

SELECT * FROM THETHANHVIEN

SELECT * FROM HOADON