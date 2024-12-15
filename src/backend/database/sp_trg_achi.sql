USE QLY_NHAHANG
GO
-- Tạo trigger

--1. Proc cập nhật hang thành viên.
--2. Trigger xuất hoá đơn
--3. Trigger để tính thời gian duyệt web của khách

-----1. Proc cập nhật hang thành viên.
CREATE PROCEDURE sp_UpdateMembershipRanks
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

INSERT INTO TAIKHOAN (Username, Password, IsActive)
VALUES
-- Active accounts
('john.doe', 'password123', 1),
('jane.smith', 'jane2024!', 1),
('pham.vinh', 'vinhSecure#1', 1),
('nguyen.thao', 'Thao*2023', 1);
-- Inactive accounts
('le.minh', 'minhInactive$', 0),
('tran.hoai', 'hoaiPaused&7', 0);

INSERT INTO TAIKHOAN (Username, Password, IsActive)
VALUES
-- Active employees with assigned usernames
('an.nguyen', 'AnhPass@2024', 1),   -- Maps to MaNV = 1
('hong.le', 'Minh123#Secure', 1), -- Maps to MaNV = 2
('binh.tran', 'Quoc!78Access', 1),    -- Maps to MaNV = 3
('tuyet.pham', 'LanPassword#01', 1),  -- Maps to MaNV = 4
('phat.hoang', 'HungSecure*99', 1);    -- Maps to MaNV = 5

INSERT INTO TAIKHOAN (Username, Password, IsActive)
VALUES
-- Active employees with assigned usernames
('john.doe', 'AnhPass@2024', 1),   -- Maps to MaNV = 1
('pham.vinh', 'Minh123#Secure', 1), -- Maps to MaNV = 2
('jane.smith', 'Quoc!78Access', 1),
('nguyen.thao', 'Quoc!78Access', 1);

SELECT * FROM KHACHHANG;
SELECT * FROM TAIKHOAN;

INSERT INTO KHACHHANG (Username, HoTen, SDT, Email, CCCD, GioiTinh)
VALUES
-- Male customers
('john.doe', N'John Doe', '0901234567', 'john.doe@example.com', '012345678901', 'Male'),
('pham.vinh', N'Phạm Vinh', '0912345678', 'vinh.pham@example.com', '123456789012', 'Male'),
-- Female customers
('jane.smith', N'Jane Smith', '0987654321', 'jane.smith@example.com', '987654321098', 'Female'),
('nguyen.thao', N'Nguyễn Thảo', '0976543210', 'thao.nguyen@example.com', '345678901234', 'Female');

INSERT INTO BOPHAN (MaBP, TenBoPhan, Luong)
VALUES 
('BV', N'Bảo Vệ', 7000000),    -- Security department
('TN', N'Thu Ngân', 8000000),  -- Cashier department
('PV', N'Phục Vụ', 6000000),   -- Service department
('BP', N'Bếp', 9000000),       -- Kitchen department
('GD', N'Giám Đốc', 20000000), -- Director department
('QL', N'Quản Lý', 15000000),  -- Management department
('TV', N'Tư Vấn', 8500000);    -- Consultation department

INSERT INTO KHUVUC (MaKV, TenKhuVuc)
VALUES
('MB', N'Miền Bắc'),
('MT', N'Miền Trung'),
('MN', N'Miền Nam');

INSERT INTO CHINHANH (MaCN, TenCN, DiaChi, ThoiGianMo, ThoiGianDong, SDT, CoXeMay, CoXeHoi, MaKV)
VALUES
-- Branches in Miền Bắc
('HN', N'Chi Nhánh Hà Nội', N'123 Phố Huế, Hai Bà Trưng, Hà Nội', '07:30', '22:00', '0241234567', 1, 1, 'MB'),

-- Branches in Miền Trung
('DN', N'Chi Nhánh Đà Nẵng', N'789 Bạch Đằng, Hải Châu, Đà Nẵng', '08:00', '22:00', '0236123456', 1, 1, 'MT'),

-- Branches in Miền Nam
('CT', N'Chi Nhánh Cần Thơ', N'456 Đường 3 Tháng 2, Ninh Kiều, Cần Thơ', '08:00', '22:00', '0292123456', 1, 0, 'MN');


INSERT INTO NHANVIEN (HoTen, NgaySinh, NgayVaoLam, NgayNghiViec, Username, MaBP, CN_Hientai)
VALUES 
-- Security staff
(N'Nguyễn Văn An', '1985-03-10', '2020-01-15', NULL, 'an.nguyen', 'BV', 'HN'),
(N'Lê Thị Hồng', '1990-06-20', '2021-04-01', NULL, 'hong.le', 'BV', 'HN'),
-- Cashier staff
(N'Trần Văn Bình', '1992-09-12', '2018-10-05', NULL, 'binh.tran', 'TN', 'DN'),
(N'Phạm Minh Tuyết', '1995-12-18', '2019-11-25', NULL, 'tuyet.pham', 'TN', 'CT'),
-- Service staff
(N'Hoàng Đức Phát', '1993-01-22', '2020-07-12', NULL, 'phat.hoang', 'PV', 'DN');

SELECT * FROM CHINHANH;

INSERT INTO THETHANHVIEN (NgayLap, NgayDatThe, LoaiThe, DiemTichLuy, IsActive, MaKH, MaNV)
VALUES
('2023-01-01', '2023-01-01', 'Silver', 50, 1, 2, 3), -- Silver card with 50 points
('2023-01-01', '2023-01-01', 'Gold', 150, 1, 3, 4), -- Gold card with 150 points
('2023-01-01', '2023-01-01', 'Normal', 0, 1, 4, 5); -- Normal card with 0 points

SELECT * FROM MONAN
SELECT * FROM PHIEUDATMON
SELECT * FROM BAN
SELECT * FROM HOADON 

INSERT INTO BAN
    (MaBan, MACN, TinhTrang)
VALUES
    ('A01', 'CT', 0),
    ('A02', 'CT' , 0),
    ('B03', 'DN', 0),
    ('B04', 'HN', 0);

INSERT INTO MonAn
    (TenMon, PhanLoai, GiaTien, GiaoHang)
VALUES
    ('AKAGAI SASHIMI', 'Sashimi', 179000, 1),
    ('AKAGAI SUSHI', 'Sushi', 89000, 1),
    ('AYU SHIO YAKI', 'Yakimono', 129000, 1),
    ('BEEF SALAD', 'Salad', 149000, 0);

SELECT * FROM MONAN

UPDATE BAN
SET TinhTrang = 1
WHERE MaCN = 'CT' AND MaBan = 'A02';

UPDATE BAN
SET TinhTrang = 1
WHERE MaCN = 'DN' and MaBan = 'B03';

INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaCN, MaKH, MaNV) VALUES ('2023-01-01', 'A02', 'CT',  NULL, '3'); -- Silver card with 50 points
INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaCN, MaKH, MaNV) VALUES ('2023-01-01', 'A02', 'CT', '2', '4'); -- Gold card with 150 points
INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaCN, MaKH, MaNV) VALUES ('2023-01-01', 'B03', 'DN', '3', '5'); -- Normal card with 0 points
GO

INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaCN, MaKH, MaNV, MaHD) VALUES ('2023-01-01', 'A02', 'CT', '2', '4', 5);

INSERT INTO CHONMON(MaPhieu, MaMon, SoLuong) VALUES ('7', '1', 2); 
INSERT INTO CHONMON(MaPhieu, MaMon, SoLuong) VALUES ('7', '2', 3);
INSERT INTO CHONMON(MaPhieu, MaMon, SoLuong) VALUES ('8', '2', 1);
INSERT INTO CHONMON(MaPhieu, MaMon, SoLuong) VALUES ('9', '3', 2);
GO

--Proc trả về MaHD mới tạo
CREATE OR ALTER PROCEDURE sp_TaoHDMoi
AS 
BEGIN	
	DECLARE @MaHD int;
	INSERT INTO HOADON (MaThe, NgayLap, isEatIn, TongHoaDon)
    VALUES (NULL, GETDATE(), 1, 0);

    SET @MaHD = SCOPE_IDENTITY(); -- Retrieve the newly created invoice ID

	RETURN @MaHD;
END;
GO

CREATE OR ALTER PROCEDURE sp_TaoPDM_Moi(@MaBan CHAR(3), @MaCN CHAR(2), @MaNV int, @MaHD int)
AS 
BEGIN 
	DECLARE @MaPhieu int;
	INSERT INTO PHIEUDATMON(NgayLap, MaBan, MaCN, MaNV, MaHD)
    VALUES (GETDATE(), @MaBan, @MaCN, @MaNV, @MaHD);

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
	WHERE MaHD = @MaHD AND TinhTrang = 1

	IF (@MaBan is not NULL AND @MaCN is not NULL)
	BEGIN 
		UPDATE BAN
		SET TinhTrang = 0, MaHD = NULL
		WHERE MaBan = @MaBan AND MaCN = @MaCN
	END;
END;
GO 

--Thanh toán, gọi lên khi chọn vào button 'Thanh toán' trên web
CREATE OR ALTER PROCEDURE sp_Checkout(@MaHD int, @MaThe char(8))
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
SELECT * FROM TAIKHOAN