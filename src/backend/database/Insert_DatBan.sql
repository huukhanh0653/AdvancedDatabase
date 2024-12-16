SET IDENTITY_INSERT datban ON

INSERT INTO DATBAN (MaDatBan,HoTen,SDT,NgayGioDat,SoLuong,ChiNhanh) VALUES 
  (1,'Nguyen Van A','0123456789',GETDATE(),5,1)
, (2, 'Tran Thi B', '0987654321', GETDATE(), 3, 2)
, (3, 'Le Van C', '0912345678', GETDATE(), 4, 1)
, (4, 'Pham Thi D', '0908765432', GETDATE(), 2, 3)
, (5, 'Hoang Van E', '0934567890', GETDATE(), 6, 2)
, (6, 'Nguyen Thi F', '0923456789', GETDATE(), 8, 1)
, (7, 'Tran Van G', '0910987654', GETDATE(), 7, 3)
, (8, 'Le Thi H', '0945678901', GETDATE(), 5, 2)
, (9, 'Pham Van I', '0956789012', GETDATE(), 3, 1)
, (10, 'Hoang Thi J', '0967890123', GETDATE(), 4, 3)