DELETE
FROM BoPhan GO

SET IDENTITY_INSERT BoPhan
ON
INSERT INTO BoPhan
    (MaBP, TenBoPhan, Luong)
VALUES
    (1, N'Quản lý', 20000000),
    (2, N'Phục vụ', 10000000),
    (3, N'Kế toán', 15000000),
    (4, N'Bảo vệ', 8000000),
    (5, N'Bếp', 15000000),
    (6, N'Thu ngân', 12000000);