USE quanlyshowroomoto;
DELIMITER //
CREATE PROCEDURE GetPhieuNhapInfo(IN MaPhieuNhap VARCHAR(10))
BEGIN
    SELECT
        PN.NgayNhap,
        CTPN.MaPN,
        CTPN.TenXe,
        CTPN.HangXe,
        CTPN.LoaiXe,
        CTPN.Gia,
        CTPN.SoLuong,
        CTPN.ThanhTien,
        NCC.TenNCC,
        NCC.DiaChi,
        NV.TenNV
    FROM
        CTPHIEUNHAP CTPN
    JOIN
        PHIEUNHAP PN ON CTPN.MaPN = PN.MaPN
    JOIN
        NHACUNGCAP NCC ON PN.MaNCC = NCC.MaNCC
    JOIN
        NHANVIEN NV ON PN.MaNV = NV.MaNV
    WHERE
        CTPN.MaPN = MaPhieuNhap;
END //
DELIMITER ;

-- Tạo thông tin đặt cọc
DELIMITER //
CREATE PROCEDURE CreateDepositInfo(
    IN p_MaKH VARCHAR(10),
    IN p_MaXe VARCHAR(10),
    IN p_MaNV VARCHAR(10),
    IN p_PercentageDeposit FLOAT,
    IN p_PTTT VARCHAR(10),
    IN p_MaKM VARCHAR(10)
)
BEGIN
    set @DepositAmount = (SELECT Gia * p_PercentageDeposit / 100 FROM XE WHERE MaXe = p_MaXe);

    IF p_MaKM IS NOT NULL THEN
        set @Percentage = (SELECT PhanTram FROM KHUYENMAI WHERE MaKM = p_MaKM);
        SET @DepositAmount = @DepositAmount - (@DepositAmount * @Percentage / 100);
    END IF;


    INSERT INTO THONGTINDATCOC (MaKH, MaXe, MaNV, SoTienDC, NgayNhanXe, NgayKy, PTTT, MaKM)
    VALUES (p_MaKH, p_MaXe, p_MaNV, @DepositAmount, CURRENT_DATE(), CURRENT_DATE(), p_PTTT, p_MaKM);

END //
DELIMITER ;

-- Tạo hóa đơn
DELIMITER //
CREATE PROCEDURE CreateInvoice(
    IN p_MaTTDC VARCHAR(10),
    IN p_MaXe VARCHAR(10),
    IN p_MaNV VARCHAR(10),
    IN p_MaKH VARCHAR(10),
    IN p_MaKM varchar(10),
    IN p_PTTT varchar(10)
)
BEGIN
    SET @TotalAmount = (SELECT Gia FROM XE WHERE MaXe = p_MaXe);

    IF p_MaTTDC IS NOT NULL THEN

        IF p_MaKM IS NULL THEN
            SET @isMatch = (SELECT COUNT(*) FROM thongtindatcoc WHERE MaXe = p_MaXe AND MaKH = p_MaKH AND MaKM IS NULL AND MaTTDC = p_MaTTDC);
        ELSE
            SET @isMatch = (SELECT COUNT(*) FROM thongtindatcoc WHERE MaXe = p_MaXe AND MaKH = p_MaKH AND MaKM = p_MaKM AND MaTTDC = p_MaTTDC);
        END IF;
    
        IF @isMatch = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Thông tin hóa đơn không khớp với thông tin đặt cọc';
        END IF;
        
        SET @DepositAmount = (SELECT SoTienDC FROM THONGTINDATCOC WHERE MaTTDC = p_MaTTDC);

        SET @Percentage = (SELECT k.PhanTram FROM khuyenmai k JOIN thongtindatcoc t ON k.MaKM = t.MaKM WHERE t.MaTTDC = p_MaTTDC);
        IF @Percentage IS NOT NULL THEN
            SET @TotalAmount = @TotalAmount - (@TotalAmount * @Percentage / 100) - @DepositAmount;
        ELSE
           SET @TotalAmount = @TotalAmount - @DepositAmount;
        END IF;
    ELSE
        IF p_MaKM IS NOT NULL THEN
            SET @Percentage = (SELECT PhanTram FROM KHUYENMAI WHERE MaKM = p_MaKM);
            SET @TotalAmount = @TotalAmount - (@TotalAmount * @Percentage / 100);
        END IF;
    END IF;

    INSERT INTO HOADON (MaTTDC, MaXe, MaNV, MaKH, MaKM, NgayKy, TongGiaTri, PTTT)
    VALUES (p_MaTTDC, p_MaXe, p_MaNV, p_MaKH, p_MaKM, CURRENT_DATE(), @TotalAmount, p_PTTT);

END //
DELIMITER ;