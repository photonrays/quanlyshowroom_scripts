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