USE QLY_NHAHANG
GO

-- Tính điểm phục vụ của nhân viên trong khoảng thời gian
CREATE OR ALTER FUNCTION fn_DiemPhucVuNhanVien (@MaNV INT)
RETURNS DECIMAL(18, 2)
AS
BEGIN
    RETURN (SELECT AVG(DiemPhucVu)
            FROM PHIEUDANHGIA PDG
            JOIN HOADON HD ON PDG.MaHD = HD.MaHD
            JOIN PHIEUDATMON PDM ON HD.MaHD = PDM.MaHD
            WHERE PDM.MaNV = @MaNV);
END;
GO

-- ĐỔI chi nhánh
CREATE PROCEDURE sp_DoiChiNhanh
    @MaNV INT,
    @MaCN INT,
    @NgayBatDau DATE
AS
BEGIN
    UPDATE DOICN
    SET NgayKetThuc = @NgayBatDau
    WHERE MaNV = @MaNV
      AND NgayKetThuc IS NULL;

    UPDATE NHANVIEN
    SET CN_Hientai = @MaCN
    WHERE MaNV = @MaNV;

    INSERT INTO DOICN (MaNV, MaCN, NgayBatDau, NgayKetThuc)
    VALUES (@MaNV, @MaCN, @NgayBatDau, NULL);
END
GO

-- Danh sách nhân viên theo chi nhánh
CREATE PROCEDURE sp_DSNhanVienTheoChiNhanh
    @MaCN INT
AS
BEGIN
    SELECT *
    FROM NHANVIEN
    WHERE @MaCN = CN_Hientai
    AND NgayNghiViec IS NULL;
END;
GO

-- Danh sách nhân viên theo bộ phận
CREATE PROCEDURE sp_DSNhanVienTheoBoPhan
    @MaCN INT,
    @MaBP INT
AS
BEGIN
    SELECT *
    FROM NHANVIEN
    WHERE @MaCN = CN_Hientai 
    AND @MaBP = MaBP
    AND NgayNghiViec IS NULL;
END;
GO

-- Thêm nhân viên
CREATE PROCEDURE sp_ThemNhanVien
    @HoTen NVARCHAR(100),
    @NgaySinh DATE,
    @NgayVaoLam DATE,
    @Username NVARCHAR(50),
    @MaBP INT,
    @MaCN INT
AS
BEGIN
    DECLARE @MaNV INT;

    INSERT INTO NHANVIEN (HoTen, NgaySinh, NgayVaoLam, Username, MaBP, CN_Hientai)
    VALUES (@HoTen, @NgaySinh, @NgayVaoLam, @Username, @MaBP, @MaCN);

    SET @MaNV = SCOPE_IDENTITY();

    INSERT INTO DOICN (MaNV, MaCN, NgayBatDau, NgayKetThuc)
    VALUES (@MaNV, @MaCN, @NgayVaoLam, NULL);
END
GO

-- Cập nhật nhân viên
CREATE PROCEDURE sp_CapNhatNhanVien
    @MaNV INT,
    @HoTen NVARCHAR(100),
    @NgaySinh DATE,
    @NgayVaoLam DATE,
    @Username NVARCHAR(50),
    @MaBP INT
AS
BEGIN
    UPDATE NHANVIEN
    SET HoTen = @HoTen, NgaySinh = @NgaySinh, NgayVaoLam = @NgayVaoLam, 
        Username = @Username, MaBP = @MaBP
    WHERE MaNV = @MaNV;
END
GO

-- Xóa nhân viên
CREATE PROCEDURE sp_XoaNhanVien
    @MaNV INT,
    @NgayKetThuc DATE NULL
AS
BEGIN
    IF @NgayKetThuc IS NULL
    BEGIN
        SET @NgayKetThuc = GETDATE();
    END

    UPDATE DOICN
    SET NgayKetThuc = @NgayKetThuc
    WHERE MaNV = @MaNV
      AND NgayKetThuc IS NULL;

    UPDATE TAIKHOAN
    SET IsActive = 0
    WHERE Username = (SELECT Username FROM NHANVIEN WHERE MaNV = @MaNV);

    UPDATE NHANVIEN
    SET NgayNghiViec = @NgayKetThuc
    WHERE MaNV = @MaNV;
END
GO

CREATE PROCEDURE sp_GetNhanVienByMaNV
    @MaNV INT
AS
BEGIN
    SELECT *
    FROM NHANVIEN NV
    WHERE NV.MaNV = @MaNV;
END
GO