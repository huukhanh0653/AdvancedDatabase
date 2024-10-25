-- Create Database
IF DB_ID('QLY_NHAHANG') IS NOT NULL
	DROP DATABASE QLY_NHAHANG
CREATE DATABASE QLY_NHAHANG
GO
-- Sử dụng CSDL đã tạo
USE QLY_NHAHANG
GO

CREATE TABLE TAIKHOAN (
    Username NVARCHAR(50) PRIMARY KEY,
    Password NVARCHAR(100),
    isActive bit
);
GO

CREATE TABLE KHACHHANG (
    MaKH INT identity(1,1) PRIMARY KEY,
	Username NVARCHAR(50),
    HoTen NVARCHAR(100),
    SDT VARCHAR(10),
    Email NVARCHAR(100),
    CCCD VARCHAR(12),
    GioiTinh NVARCHAR(10)

	constraint CK_KHACHHANG_GioiTinh
	check (GioiTinh = 'Male' or Gioitinh = 'Female'),

	CONSTRAINT CK_KHACHHANG_CCCD
	CHECK (LEN(CCCD) = 12 AND CCCD NOT LIKE '%[^0-9]%'),

	CONSTRAINT CK_KHACHHANG_SDT
	CHECK (LEN(SDT) = 10 AND SDT NOT LIKE '%[^0-9]%'),
);
GO

CREATE TABLE BOPHAN (
    MaBP INT IDENTITY(1, 1)  PRIMARY KEY,
    TenBoPhan NVARCHAR(100),
    Luong DECIMAL(18, 2)

);
GO

CREATE TABLE NHANVIEN (
    MaNV INT IDENTITY(1, 1)  PRIMARY KEY,
    HoTen NVARCHAR(100),
    NgaySinh DATE,
    NgayVaoLam DATE,
    NgayNghiViec DATE, 
	Username NVARCHAR(50),
	MaBP INT

	FOREIGN KEY (MaBP) REFERENCES BOPHAN(MaBP)
);
GO

CREATE TABLE THETHANHVIEN (
    MaThe CHAR(8) PRIMARY KEY,
    NgayLap DATE,
    LoaiThe NVARCHAR(50),
    DiemTichLuy INT,
    isActive BIT,
    MaKH INT,

    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),

	constraint CK_THETHANHVIEN_LoaiThe
	check (LoaiThe = 'Silver' or LoaiThe = 'Gold' or LoaiThe = 'Normal'),
);
GO

CREATE TABLE HOADON (
    MaHoaDon INT IDENTITY(1, 1) PRIMARY KEY,
    GiamGia DECIMAL(18, 2),
    TongHoaDon DECIMAL(18, 2),
    MaThe char(8),

    FOREIGN KEY (MaThe) REFERENCES THETHANHVIEN (MaThe)
);
GO

CREATE TABLE PHIEUDANHGIA (
    MaPhieuDG INT IDENTITY(1, 1)  PRIMARY KEY,
    DiemPhucVu INT,
    DiemViTri INT,
    DiemMonAn INT,
    DiemKhongGian INT,
    DiemGiaCa INT,
    MaHoaDon INT,

    FOREIGN KEY (MaHoaDon) REFERENCES HOADON(MaHoaDon)
);
GO

CREATE TABLE ChiNhanh (
    MaCN INT IDENTITY(1, 1) PRIMARY KEY,
    TenCN NVARCHAR(100),
    DiaChi NVARCHAR(255),
    KhuVuc NVARCHAR(100),
    tgMoCua NVARCHAR(10),
    tgDongCua NVARCHAR(10),
    SDT VARCHAR(10),
    coXeMay BIT,
    coXeHoi BIT,
    hasDelivery BIT --XEM LẠI
);
GO

CREATE TABLE Doi_CN (
    MaNV INT,
    MaCN INT,
    NgayBatDau DATE,
    NgayKetThuc DATE,

    PRIMARY KEY (MaNV, MaCN, NgayBatDau, NgayKetThuc),

    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaCN) REFERENCES ChiNhanh(MaCN)
);
GO

CREATE TABLE KhuVuc (
    MaKV INT IDENTITY(1, 1) PRIMARY KEY,
    TenKhuVuc NVARCHAR(100)
);
GO

CREATE TABLE ThucDon (
    MaTD INT PRIMARY KEY,
    MaKV INT,

    FOREIGN KEY (MaKV) REFERENCES KhuVuc(MaKV)
);
GO

CREATE TABLE MonAn (
    MaMon INT PRIMARY KEY,
    TenMon NVARCHAR(100),
    PhanLoai NVARCHAR(50),
    GiaTien DECIMAL(18, 2)
);
GO

CREATE TABLE PhucVu (
    MaTD INT,
    MaMon INT,
    isServed BIT,
    PRIMARY KEY (MaTD, MaMon),
    FOREIGN KEY (MaTD) REFERENCES ThucDon(MaTD),
    FOREIGN KEY (MaMon) REFERENCES MonAn(MaMon)
);
GO

CREATE TABLE PhieuDatMon (
    MaPhieu INT IDENTITY(1,1) PRIMARY KEY,
    NgayLap DATE,
    MaBan NVARCHAR(50),
    TongTien DECIMAL(18, 2),
    MaKH INT,

    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
);
GO

CREATE TABLE ChonMon (
    MaPhieu INT,
    MaMon INT,
    SoLuong INT,
    TongTien DECIMAL(18, 2),

    PRIMARY KEY (MaPhieu, MaMon),

    FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATMON(MaPhieu),
    FOREIGN KEY (MaMon) REFERENCES MonAn(MaMon)
);
GO

CREATE TABLE DatBan (
    MaDatBan INT IDENTITY(1, 1) PRIMARY KEY,
    NgayDat DATE,
    GioDat TIME,
    SoLuong INT,
    CuaHang NVARCHAR(100),
    GhiChu NVARCHAR(255),
    MaKH INT,
	MaPhieu INT,

    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
	FOREIGN KEY (MaPhieu) REFERENCES PHIEUDATMON(MaPhieu)
);
GO



