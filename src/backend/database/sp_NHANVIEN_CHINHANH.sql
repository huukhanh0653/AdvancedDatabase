USE QLY_NHAHANG
GO

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

    INSERT INTO DOICN (MaNV, MaCN, NgayBatDau, NgayKetThuc)
    VALUES (@MaNV, @MaCN, @NgayBatDau, NULL);
END
GO

CREATE PROCEDURE sp_DSNhanVien
    @MaCN INT
AS
BEGIN
    SELECT NV.*
    FROM NHANVIEN NV
    JOIN DOICN DCN
    ON NV.MaNV = DCN.MaNV
    WHERE DCN.MaCN = @MaCN
      AND DCN.NgayKetThuc IS NULL;
END;
GO

CREATE PROCEDURE sp_DSNhanVienTheoBoPhan
    @MaCN INT,
    @MaBP INT
AS
BEGIN
    SELECT NV.*
    FROM NHANVIEN NV
    JOIN DOICN DCN
    ON NV.MaNV = DCN.MaNV
    JOIN BOPHAN BP
    ON NV.MaBP = BP.MaBP
    WHERE DCN.MaCN = @MaCN
      AND DCN.NgayKetThuc IS NULL
      AND BP.MaBP = @MaBP;
END;
GO

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

    INSERT INTO NHANVIEN (HoTen, NgaySinh, NgayVaoLam, Username, MaBP)
    VALUES (@HoTen, @NgaySinh, @NgayVaoLam, @Username, @MaBP);

    SET @MaNV = SCOPE_IDENTITY();

    INSERT INTO DOICN (MaNV, MaCN, NgayBatDau, NgayKetThuc)
    VALUES (@MaNV, @MaCN, @NgayVaoLam, NULL);
END
GO

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

CREATE PROCEDURE sp_XoaNhanVien
    @MaNV INT,
    @NgayKetThuc DATE
AS
BEGIN
    UPDATE DOICN
    SET NgayKetThuc = @NgayKetThuc
    WHERE MaNV = @MaNV
      AND NgayKetThuc IS NULL;

    UPDATE TAIKHOAN
    SET IsActive = 0
    WHERE Username = (SELECT Username FROM NHANVIEN WHERE MaNV = @MaNV);

    -- UPDATE NHANVIEN
    -- SET NgayNghiViec = @NgayKetThuc, Username = NULL
    -- WHERE MaNV = @MaNV;
END
GO

CREATE PROCEDURE sp_GetNhanVienByMaNV
    @MaNV INT
AS
BEGIN
    SELECT *
    FROM NHANVIEN
    WHERE NV.MaNV = @MaNV;
END
GO