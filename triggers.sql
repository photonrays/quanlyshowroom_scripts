USE QuanLyShowroomOto;

-- TRIGGERS --
DROP TRIGGER IF EXISTS update_khi_nhap;

DELIMITER //
-- Tăng số lượng xe khi có ct phiếu nhập
CREATE TRIGGER update_khi_nhap
BEFORE INSERT ON CTPHIEUNHAP
FOR EACH ROW
BEGIN
    DECLARE countMaXe INT;

    SELECT COUNT(*) INTO countMaXe FROM XE WHERE MaXe = NEW.MaXe;

    IF countMaXe > 0 THEN
        UPDATE XE
        SET SoLuong = SoLuong + NEW.SoLuong
        WHERE MaXe = NEW.MaXe;
    ELSE
        INSERT INTO XE (MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo)
        VALUES (NEW.MaXe, NEW.TenXe, NEW.LoaiXe, NEW.Hang, NEW.Gia, NEW.SoLuong, NEW.ThongSo);
    END IF;
END;
//

DROP TRIGGER IF EXISTS update_khi_xuat;

-- Tăng số lượng xe khi có phiếu xuất
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
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không thể xuất kho. Xe không tồn tại hoặc số lượng đã hết.';
    END IF;
END;
//

DELIMITER ;
