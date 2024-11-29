 
DELETE FROM ChiNhanh 
GO 

SET IDENTITY_INSERT ChiNhanh ON 

INSERT INTO ChiNhanh (MaCN, TenCN, DiaChi, KhuVuc, tgMoCua, tgDongCua, SDT, coXeMay, coXeHoi, hasDelivery) VALUES 
(1, N'Chi nhánh Đường Lê Lợi, Bà Rịa', N'560 Đường Lê Lợi, Bà Rịa', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 1, 1),
(2, N'Chi nhánh Đường Nguyễn Lương Bằng, Đà Lạt', N'230 Đường Nguyễn Lương Bằng, Đà Lạt', N'Miền Trung', '09:00', '22:00', N'0123456789', 1, 1, 0),
(3, N'Chi nhánh Đường Lê Duẩn, Vũng Tàu', N'466 Đường Lê Duẩn, Vũng Tàu', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 0, 0),
(4, N'Chi nhánh Đường Tôn Đức Thắng, Hồ Chí Minh', N'555 Đường Tôn Đức Thắng, Hồ Chí Minh', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 0, 0),
(5, N'Chi nhánh Đường Thái Hà, Hà Nội', N'425 Đường Thái Hà, Hà Nội', N'Miền Bắc', '09:00', '22:00', N'0123456789', 0, 0, 0),
(6, N'Chi nhánh Đường Chùa Bộc, Hồ Chí Minh', N'126 Đường Chùa Bộc, Hồ Chí Minh', N'Miền Nam', '09:00', '22:00', N'0123456789', 0, 1, 1),
(7, N'Chi nhánh Đường Láng Hạ, Đà Nẵng', N'46 Đường Láng Hạ, Đà Nẵng', N'Miền Trung', '09:00', '22:00', N'0123456789', 0, 1, 0),
(8, N'Chi nhánh Đường Hai Bà Trưng, Vũng Tàu', N'548 Đường Hai Bà Trưng, Vũng Tàu', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 1, 1),
(9, N'Chi nhánh Đường Phạm Văn Đồng, Hà Nội', N'108 Đường Phạm Văn Đồng, Hà Nội', N'Miền Bắc', '09:00', '22:00', N'0123456789', 0, 1, 1),
(10, N'Chi nhánh Đường Đại Cồ Việt, Đà Lạt', N'478 Đường Đại Cồ Việt, Đà Lạt', N'Miền Trung', '09:00', '22:00', N'0123456789', 0, 1, 0),
(11, N'Chi nhánh Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'194 Đường Nam Kỳ Khởi Nghĩa, Hà Nội', N'Miền Bắc', '09:00', '22:00', N'0123456789', 1, 1, 1),
(12, N'Chi nhánh Đường Pasteur, Bà Rịa', N'24 Đường Pasteur, Bà Rịa', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 0, 1),
(13, N'Chi nhánh Đường Đồng Khởi, Hải Dương', N'293 Đường Đồng Khởi, Hải Dương', N'Miền Bắc', '09:00', '22:00', N'0123456789', 1, 1, 0),
(14, N'Chi nhánh Đường Láng Hạ, Cần Thơ', N'332 Đường Láng Hạ, Cần Thơ', N'Miền Nam', '09:00', '22:00', N'0123456789', 1, 1, 1),
(15, N'Chi nhánh Đường Đồng Khởi, Đà Nẵng', N'104 Đường Đồng Khởi, Đà Nẵng', N'Miền Trung', '09:00', '22:00', N'0123456789', 0, 1, 1);