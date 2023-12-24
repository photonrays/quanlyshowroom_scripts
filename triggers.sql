USE QuanLyShowroomOto;

CREATE TEMPORARY TABLE IF NOT EXISTS debug_table (info varchar(200));

SELECT * FROM debug_table dt;

-- TRIGGERS --
DROP TRIGGER IF EXISTS update_khi_nhap;

DELIMITER //
-- Tăng số lượng xe khi có ct phiếu nhập
CREATE TRIGGER update_khi_nhap
BEFORE INSERT ON CTPHIEUNHAP
FOR EACH ROW
BEGIN
    DECLARE countXe INT;

    SELECT COUNT(*) INTO countXe FROM XE WHERE TenXe = NEW.TenXe;
    INSERT INTO debug_table (info) VALUES (CONCAT('tenXe: ', NEW.TenXe, countXe));


    IF countXe > 0 THEN
        UPDATE XE
        SET SoLuong = SoLuong + NEW.SoLuong
        WHERE TenXe = NEW.TenXe;
    ELSE
        INSERT INTO XE (TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo)
        VALUES (NEW.TenXe, NEW.LoaiXe, NEW.Hang, NEW.Gia, NEW.SoLuong, NEW.ThongSo);
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

INSERT INTO CTPHIEUNHAP (MaPN, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo, ThanhTien)
VALUES ('PN001', 'Xe A', 'Sedan', 'Honda', 50000, 2, 'Thong so A', 100000);

