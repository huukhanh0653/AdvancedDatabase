IF DB_ID('Draft') IS NOT null USE master
DROP DATABASE Draft
CREATE DATABASE Draft 
GO
USE Draft 
GO

CREATE TABLE ChiNhanh
(
    MaCN INT IDENTITY(1, 1) PRIMARY KEY,
    TenCN NVARCHAR(50) NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL,
    KhuVuc NVARCHAR(50) NOT NULL,
    tgMoCua TIME NOT NULL,
    tgDongCua TIME NOT NULL,
    SDT VARCHAR(12) NOT NULL,
    coXeMay BIT NOT NULL,
    coXeHoi BIT NOT NULL,
    hasDelivery BIT NOT NULL
); 
GO

SET IDENTITY_INSERT ChiNhanh
ON
INSERT INTO ChiNhanh
    (MaCN, TenCN, DiaChi, KhuVuc, tgMoCua, tgDongCua, SDT, coXeMay, coXeHoi, hasDelivery)
VALUES
    (1, N'Chi nhánh Đường Lê Lợi, Đà Lạt', N'380 Đường Lê Lợi, Đà Lạt', N'Miền Trung', N'09:00', N'22:00', N'0123456789', 1, 1, 1),
    (2, N'Chi nhánh Đường Tôn Đức Thắng, Hải Phòng', N'504 Đường Tôn Đức Thắng, Hải Phòng', N'Miền Bắc', N'09:00', N'22:00', N'0123456789', 1, 1, 1),
    (3, N'Chi nhánh Đường Tôn Đức Thắng, Đà Nẵng', N'67 Đường Tôn Đức Thắng, Đà Nẵng', N'Miền Trung', N'09:00', N'22:00', N'0123456789', 1, 0, 0),
    (4, N'Chi nhánh Đường Chùa Bộc, Đà Lạt', N'127 Đường Chùa Bộc, Đà Lạt', N'Miền Trung', N'09:00', N'22:00', N'0123456789', 1, 0, 0),
    (5, N'Chi nhánh Đường Thái Hà, Hồ Chí Minh', N'124 Đường Thái Hà, Hồ Chí Minh', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 0, 1, 0),
    (6, N'Chi nhánh Đường Xuân Thủy, Hải Phòng', N'79 Đường Xuân Thủy, Hải Phòng', N'Miền Bắc', N'09:00', N'22:00', N'0123456789', 1, 0, 0),
    (7, N'Chi nhánh Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'166 Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'Miền Bắc', N'09:00', N'22:00', N'0123456789', 1, 0, 0),
    (8, N'Chi nhánh Đường Thái Hà, Vũng Tàu', N'594 Đường Thái Hà, Vũng Tàu', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 1, 1, 1),
    (9, N'Chi nhánh Đường Láng Hạ, Bà Rịa', N'48 Đường Láng Hạ, Bà Rịa', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 0, 1, 1),
    (10, N'Chi nhánh Đường Trường Chinh, Bà Rịa', N'160 Đường Trường Chinh, Bà Rịa', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 0, 1, 1),
    (11, N'Chi nhánh Đường Lê Lợi, Cần Thơ', N'229 Đường Lê Lợi, Cần Thơ', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 0, 1, 1),
    (12, N'Chi nhánh Đường Nguyễn Chí Thanh, Bà Rịa', N'344 Đường Nguyễn Chí Thanh, Bà Rịa', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 0, 0, 0),
    (13, N'Chi nhánh Đường Đồng Khởi, Đà Nẵng', N'567 Đường Đồng Khởi, Đà Nẵng', N'Miền Trung', N'09:00', N'22:00', N'0123456789', 0, 1, 0),
    (14, N'Chi nhánh Đường Hai Bà Trưng, Cần Thơ', N'310 Đường Hai Bà Trưng, Cần Thơ', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 1, 0, 0),
    (15, N'Chi nhánh Đường Pasteur, Vũng Tàu', N'175 Đường Pasteur, Vũng Tàu', N'Miền Nam', N'09:00', N'22:00', N'0123456789', 1, 0, 1); 
GO

CREATE TABLE TAIKHOAN
(
    Username VARCHAR(30) PRIMARY KEY,
    Password VARCHAR(30) NOT NULL,
    IsActive bit NOT NULL
); 
GO

INSERT INTO TaiKhoan
    (Username, Password, isActive)
VALUES
    ('user0', '123456', 1),
    ('user1', '123456', 1),
    ('user2', '123456', 1),
    ('user3', '123456', 0),
    ('user4', '123456', 0),
    ('user5', '123456', 1),
    ('user6', '123456', 1),
    ('user7', '123456', 1),
    ('user8', '123456', 1),
    ('user9', '123456', 0),
    ('user10', '123456', 1),
    ('employee1', '123456', 0),
    ('employee2', '123456', 0),
    ('employee3', '123456', 0),
    ('employee4', '123456', 0),
    ('employee5', '123456', 0); 
GO

CREATE TABLE BoPhan
(
    MaBP CHAR(2) PRIMARY KEY,
    TenBoPhan NVARCHAR(50) NOT NULL,
    Luong DECIMAL(18, 2) NOT NULL DEFAULT(0)
); 
GO

INSERT INTO BoPhan
    (MaBP, TenBoPhan, Luong)
VALUES
    (1, N'Quản lý', 20000000),
    (2, N'Phục vụ', 10000000),
    (3, N'Kế toán', 15000000),
    (4, N'Bảo vệ', 8000000),
    (5, N'Bếp', 15000000),
    (6, N'Thu ngân', 12000000); 
GO

CREATE TABLE NHANVIEN
(
    MaNV INT IDENTITY(1, 1) PRIMARY KEY,
    HoTen NVARCHAR(50) NOT NULL,
    NgaySinh DATE NOT NULL,
    NgayVaoLam DATE NOT NULL,
    NgayNghiViec DATE,
    Username VARCHAR(30),
    MaBP CHAR(2) NOT NULL,
    CN_Hientai INT NOT NULL,
    CONSTRAINT CK_NHANVIEN_NgayVaoLam_NgayNghiViec
    CHECK (NgayNghiViec IS NULL OR NgayVaoLam <= NgayNghiViec),
    CONSTRAINT FK_NHANVIEN_TAIKHOAN
    FOREIGN KEY (Username) REFERENCES TAIKHOAN(Username),
    CONSTRAINT FK_NHANVIEN_BOPHAN
    FOREIGN KEY (MaBP) REFERENCES BOPHAN(MaBP),
    CONSTRAINT FK_NHANVIEN_CHINHANH
    FOREIGN KEY (CN_Hientai) REFERENCES CHINHANH(MaCN)
); 
GO

SET IDENTITY_INSERT NhanVien ON
INSERT INTO NhanVien
    (MaNV, HoTen, NgaySinh, NgayVaoLam, Username, MaBP)
VALUES
    (1, N'Bùi Thị Tuyết', '02-04-2000', '07-01-2016', 'employee1', 2),
    (2, N'Hoàng Văn Đức', '26-07-1994', '04-03-2020' , 'employee2', 3),
    (3, N'Đỗ Thị Lan', '09-06-1986', '30-07-2015', 'employee3', 1),
    (4, N'Hoàng Thị Thanh', '05-01-1982', '10-07-2015', 'employee4', 4),
    (5, N'Trần Văn Tuấn', '24-09-1984', '26-12-2019', 'employee5', 2); 
GO

CREATE TABLE DoiCN
(
    MaNV INT,
    MaCN INT,
    NgayBatDau DATE,
    NgayKetThuc DATE,
    PRIMARY KEY (MaNV, MaCN, NgayBatDau),
    CONSTRAINT FK_DOICN_NHANVIEN FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV),
    CONSTRAINT FK_DOICN_CHINHANH FOREIGN KEY (MaCN) REFERENCES CHINHANH(MaCN)
); 
GO




