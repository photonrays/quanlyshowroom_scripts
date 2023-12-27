﻿USE QuanLyShowroomOto;


-- Tăng số lượng xe khi có ct phiếu nhập
DELIMITER //
DROP TRIGGER IF EXISTS update_khi_nhap;
CREATE TRIGGER update_khi_nhap
BEFORE INSERT ON CTPHIEUNHAP
FOR EACH ROW
BEGIN
    DECLARE countXe int;

    SELECT COUNT(*) INTO countXe FROM XE WHERE TenXe = NEW.TenXe;

    IF countXe > 0 THEN
        UPDATE XE
        SET SoLuong = SoLuong + NEW.SoLuong
        WHERE TenXe = NEW.TenXe;
    ELSE
        set @MaLX = (SELECT MaLX FROM LOAIXE WHERE TenLX = NEW.LoaiXe);

        IF @MaLX IS NULL THEN
            INSERT INTO LOAIXE (TenLX) VALUES (NEW.LoaiXe);
            set @MaLX = LAST_INSERT_ID();
        END IF;

        set @MaHX = (SELECT MaHX FROM hangxe WHERE TenHang = NEW.HangXe); 
        
        IF @MaHX IS NULL THEN
            INSERT INTO hangxe (TenHang) VALUES (NEW.HangXe);
            set @MaHX = LAST_INSERT_ID();
        END IF; 

        INSERT INTO debug_table (info) VALUES (@MaHX);
        INSERT INTO debug_table (info) VALUES (@MaLX);

        INSERT INTO XE (TenXe, MaLX, MaHX, Gia, SoLuong)
        VALUES (NEW.TenXe, @MaLX, @MaHX, NEW.Gia, NEW.SoLuong);
    END IF;
END;
//
DELIMITER ;



-- Giảm số lượng xe khi có phiếu xuất
DELIMITER //
DROP TRIGGER IF EXISTS update_khi_xuat;
CREATE TRIGGER update_khi_xuat
AFTER INSERT ON PHIEUXUAT
FOR EACH ROW
BEGIN
    SET @SoLuong = (SELECT SoLuong FROM Xe WHERE MaXe = NEW.MaXe);

    IF @SoLuong > 0 THEN
        UPDATE XE
        SET SoLuong = SoLuong - 1
        WHERE MaXe = NEW.MaXe;
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Không thể xuất kho. Xe không tồn tại hoặc số lượng đã hết.';
    END IF;
END;
//

-- Kiểm tra số lượng xe trong kho trước khi đặt cọc
DROP TRIGGER IF EXISTS check_truoc_datcoc;

CREATE TRIGGER check_truoc_datcoc
BEFORE INSERT ON HOPDONGDATCOC
FOR EACH ROW
BEGIN
  DECLARE xe_count INT;

  SELECT COUNT(*) INTO xe_count FROM XE WHERE MaXe = NEW.MaXe AND SoLuong > 0;
  
  IF xe_count = 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Mã xe không tồn tại hoặc số lượng xe không đủ';
  END IF;
END;
//

-- Kiểm tra phần trăm và ngày của khuyến mãi
DROP TRIGGER IF EXISTS check_KHUYENMAI_insert;

CREATE TRIGGER check_KHUYENMAI_insert
BEFORE INSERT ON KHUYENMAI
FOR EACH ROW
BEGIN
  IF NEW.PhanTram <= 0 OR NEW.PhanTram > 100 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Giá trị PhanTram phải lớn hơn 0 và nhỏ hơn hoặc bằng 100';
  END IF;

  IF NEW.NgayBD >= NEW.NgayKT THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Ngày bắt đầu khuyến mãi phải nhỏ hơn ngày kết thúc';
  END IF;
END;
//

DELIMITER ;

