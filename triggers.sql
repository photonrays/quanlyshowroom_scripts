USE QuanLyShowroomOto;

DROP TRIGGER IF EXISTS update_khi_nhap;

DELIMITER //
-- Tăng số lượng xe khi có ct phiếu nhập
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

        INSERT INTO XE (TenXe, MaLX, MaHX, Gia, SoLuong)
        VALUES (NEW.TenXe, @MaLX, @MaHX, NEW.Gia, NEW.SoLuong);
    END IF;
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS update_thongsoxe;

DELIMITER //
-- Cập nhật giá trị thông số khi nhập thông số xe
CREATE TRIGGER update_thongsoxe
BEFORE INSERT ON THONGSOXENHAP
FOR EACH ROW
BEGIN
    set @MaXe = (SELECT MaXe FROM Xe WHERE TenXe = (SELECT TenXe FROM ctphieunhap WHERE MaCTPN = NEW.MaCTPN));
    IF @MaXe IS NOT NULL THEN
        INSERT IGNORE INTO tenthongso (TTS) VALUES (NEW.TenTS);
        set @MaTTS = (SELECT MaTTS FROM tenthongso WHERE TTS = NEW.TenTS);
        
        INSERT IGNORE INTO giatrithongso (MaXe, MaTTS, GiaTri, DonVi) VALUES (@MaXe, @MaTTS, NEW.GiaTri, NEW.DonVi);
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Xe không tồn tại.';
    END IF;
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS update_khi_xuat;
DELIMITER //
-- Giảm số lượng xe khi có phiếu xuất
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
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS check_truoc_datcoc;
DELIMITER //
-- Kiểm tra số lượng xe trong kho trước khi đặt cọc
CREATE TRIGGER check_truoc_datcoc
BEFORE INSERT ON THONGTINDATCOC
FOR EACH ROW
BEGIN
  DECLARE xe_count INT;

  SELECT COUNT(*) INTO xe_count FROM XE WHERE MaXe = NEW.MaXe AND SoLuong > 0;
  
  IF xe_count = 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Mã xe không tồn tại hoặc số lượng xe không đủ';
  END IF;
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS check_truoc_thanhtoan;
DELIMITER //
-- Kiểm tra số lượng xe trong kho trước khi thanh toán
CREATE TRIGGER check_truoc_thanhtoan
BEFORE INSERT ON HOADON
FOR EACH ROW
BEGIN
  DECLARE xe_count INT;

  SELECT COUNT(*) INTO xe_count FROM XE WHERE MaXe = NEW.MaXe AND SoLuong > 0;
  
  IF xe_count = 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Mã xe không tồn tại hoặc số lượng xe không đủ';
  END IF;
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS check_KHUYENMAI_insert;
DELIMITER //
-- Kiểm tra phần trăm và ngày của khuyến mãi
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
END;//
DELIMITER ;

DROP TRIGGER IF EXISTS update_kh_sauthanhtoan;
DELIMITER //
-- Cập nhật tổng chi tiêu của khách sau khi thanh toán thành công
CREATE TRIGGER update_kh_sauthanhtoan
AFTER INSERT ON HOADON
FOR EACH ROW
BEGIN
    SELECT MaKH, SoTienDC INTO @MaKH, @SoTienDC FROM HOADON WHERE MaHD = NEW.MaHD;
    IF @MaKH IS NOT NULL AND @SoTienDC IS NOT NULL THEN
        UPDATE KHACHHANG
        SET TongChiTieu = TongChiTieu + NEW.TongGiaTri + @SoTienDC
        WHERE MaKH = @MaKH;

        SELECT TongChiTieu INTO @TongChiTieu FROM KHACHHANG WHERE MaKH = @MaKH;
  
        IF @TongChiTieu > 1000000000 THEN
            UPDATE KHACHHANG
            SET KhachVip = 1
            WHERE MaKH = @MaKH;
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Khách hàng không tồn tại';
    END IF;
END;//
DELIMITER ;

