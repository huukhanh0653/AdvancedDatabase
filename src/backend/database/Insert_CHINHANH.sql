DELETE
FROM ChiNhanh GO

SET IDENTITY_INSERT ChiNhanh
ON
INSERT INTO ChiNhanh
    (MaCN, TenCN, DiaChi, KhuVuc, tgMoCua, tgDongCua, SDT, coXeMay, coXeHoi, hasDelivery)
VALUES
    (1, N'Chi nhánh Đường Lê Lợi, Đà Lạt', N'380 Đường Lê Lợi, Đà Lạt', N'Miền Trung', '09:00', '22:00', N'0123456789', 1, 1, 1),
    (2, N'Chi nhánh Đường Tôn Đức Thắng, Hải Phòng', N'504 Đường Tôn Đức Thắng, Hải Phòng', N'Miền Bắc', '09:00', '22:00', N'0123456789', 1, 1, 1),
    (3, N'Chi nhánh Đường Tôn Đức Thắng, Đà Nẵng', N'67 Đường Tôn Đức Thắng, Đà Nẵng', N'Miền Trung', '09:00', '22:00', N'0123456789', 1, 0, 0),
    (4, N'Chi nhánh Đường Chùa Bộc, Đà Lạt', N'127 Đường Chùa Bộc, Đà Lạt', N'Miền Trung', '09:00', '22:00', N'0123456789', 1, 0, 0),
    (5, N'Chi nhánh Đường Thái Hà, Hồ Chí Minh', N'124 Đường Thái Hà, Hồ Chí Minh', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 1, 0),
    (6, N'Chi nhánh Đường Xuân Thủy, Hải Phòng', N'79 Đường Xuân Thủy, Hải Phòng', N'Miền Bắc', '09:00', '22:00', N'0123456789', 1, 0, 0),
    (7, N'Chi nhánh Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'166 Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'Miền Bắc', '09:00', '22:00', N'0123456789', 1, 0, 0),
    (8, N'Chi nhánh Đường Thái Hà, Vũng Tàu', N'594 Đường Thái Hà, Vũng Tàu', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 1, 1),
    (9, N'Chi nhánh Đường Láng Hạ, Bà Rịa', N'48 Đường Láng Hạ, Bà Rịa', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 1, 1),
    (10, N'Chi nhánh Đường Trường Chinh, Bà Rịa', N'160 Đường Trường Chinh, Bà Rịa', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 1, 1),
    (11, N'Chi nhánh Đường Lê Lợi, Cần Thơ', N'229 Đường Lê Lợi, Cần Thơ', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 1, 1),
    (12, N'Chi nhánh Đường Nguyễn Chí Thanh, Bà Rịa', N'344 Đường Nguyễn Chí Thanh, Bà Rịa', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 0, 0),
    (13, N'Chi nhánh Đường Đồng Khởi, Đà Nẵng', N'567 Đường Đồng Khởi, Đà Nẵng', N'Miền Trung', '09:00', '22:00', N'0123456789', 0, 1, 0),
    (14, N'Chi nhánh Đường Hai Bà Trưng, Cần Thơ', N'310 Đường Hai Bà Trưng, Cần Thơ', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 0, 0),
    (15, N'Chi nhánh Đường Pasteur, Vũng Tàu', N'175 Đường Pasteur, Vũng Tàu', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 0, 1);