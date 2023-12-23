﻿CREATE DATABASE IF NOT EXISTS `QuanLyShowroomOto`;

USE QuanLyShowroomOto;

CREATE TABLE `QuanLyShowroomOto`.`NHACUNGCAP` (
	`MaNCC` VARCHAR(10) PRIMARY KEY,
	`TenNCC` VARCHAR(50) NOT NULL,
	`DiaChi` VARCHAR(40),
	`SDT` VARCHAR(10) NOT NULL
);

CREATE TABLE `QuanLyShowroomOto`.`PHIEUNHAP` (
	`MaPN` VARCHAR(10) PRIMARY KEY,
	`NgayNhap` DATE,
	`MaNCC` VARCHAR(10),
	CONSTRAINT `fk PHIEUNHAP.MaNCC to NHACUNGCAP.MaNCC` FOREIGN KEY (`MaNCC`) REFERENCES `QuanLyShowroomOto`.`NHACUNGCAP`(`MaNCC`)
);

CREATE TABLE `QuanLyShowroomOto`.`XE` (
	`MaXe` VARCHAR(10) PRIMARY KEY,
    `TenXe` VARCHAR(20) NOT NULL,
	`LoaiXe` VARCHAR(10) NOT NULL,
	`Hang` VARCHAR(10) NOT NULL,
	`Gia` FLOAT NOT NULL,
	`SoLuong` INT NOT NULL,
    `ThongSo` text
);


CREATE TABLE `QuanLyShowroomOto`.`CTPHIEUNHAP` (
	`MaCTPN` VARCHAR(10) PRIMARY KEY,
	`MaPN` VARCHAR(10),
	`MaXe` varchar(10) NOT NULL,
  `TenXe` VARCHAR(20) NOT NULL,
	`LoaiXe` VARCHAR(10) NOT NULL,
	`Hang` VARCHAR(10) NOT NULL,
	`Gia` FLOAT NOT NULL,
	`SoLuong` INT NOT NULL,
  `ThongSo` text,
	`ThanhTien` FLOAT NOT NULL,
	CONSTRAINT `fk CTPHIEUNHAP.MaPhieuNhap to PHIEUNHAP.MaPhieuNhap` FOREIGN KEY (`MaPN`) REFERENCES `QuanLyShowroomOto`.`PHIEUNHAP`(`MaPN`),
	CONSTRAINT `fk CTPHIEUNHAP.MaXe to Xe.MaXe` FOREIGN KEY (`MaXe`) REFERENCES `QuanLyShowroomOto`.`XE`(`MaXe`)
);

CREATE TABLE `QuanLyShowroomOto`.`KHACHHANG` (
	`MaKH` VARCHAR(10) PRIMARY KEY,
	`TenKH` VARCHAR(20),
	`SDT` VARCHAR(10),
	`Email` VARCHAR(20),
	`LoaiKH` VARCHAR(10)
);


CREATE TABLE `QuanLyShowroomOto`.`NHANVIEN` (
	`MaNV` VARCHAR(10) PRIMARY KEY,
	`TenNV` VARCHAR(20) NOT NULL,
	`DiaChi` VARCHAR(10) NOT NULL,
	`SDT` VARCHAR(10) NOT NULL,
	`Email` VARCHAR(20),
	`BangCap` VARCHAR(10),
	`ViTri` VARCHAR(10) NOT NULL,
	`NgayVL` DATE NOT NULL,
    `NgaySinh` DATE NOT NULL
);

CREATE TABLE `QuanLyShowroomOto`.`PHIEUBAOGIA` (
	`MaPBG` VARCHAR(10) PRIMARY KEY,
	`MaKH` VARCHAR(10),
	`MaXe` VARCHAR(10),
	`NgayBG` DATE NOT NULL,
	`TongGiaTri` FLOAT NOT NULL,
	`MaNV` VARCHAR(10),
	CONSTRAINT `fk PHIEUBAOGIA.MaKH to KHACHHANG.MaKH` FOREIGN KEY (`MaKH`) REFERENCES `QuanLyShowroomOto`.`KHACHHANG`(`MaKH`),
	CONSTRAINT `fk PHIEUBAOGIA.MaXe to Xe.MaXe` FOREIGN KEY (`MaXe`) REFERENCES `QuanLyShowroomOto`.`XE`(`MaXe`),
	CONSTRAINT `fk PHIEUBAOGIA.MaNV to NHANVIEN.MaNV` FOREIGN KEY (`MaNV`) REFERENCES `QuanLyShowroomOto`.`NHANVIEN`(`MaNV`)
);

CREATE TABLE `QuanLyShowroomOto`.`CTPHIEUBAOGIA` (
	`MaCTPBG` VARCHAR(10) PRIMARY KEY,
	`MaPBG` VARCHAR(10),
	`ThanhPhan` VARCHAR(20) NOT NULL,
	`DonGia` FLOAT NOT NULL,
    `MoTa` VARCHAR(50),
	CONSTRAINT `fk CTPHIEUBAOGIA.MaPBG to PHIEUBAOGIA.MaPBG` FOREIGN KEY (`MaPBG`) REFERENCES `QuanLyShowroomOto`.`PHIEUBAOGIA`(`MaPBG`)
);

CREATE TABLE `QuanLyShowroomOto`.`HOPDONGDATCOC` (
	`MaHDDC` VARCHAR(10) PRIMARY KEY,
	`MaKH` VARCHAR(10),
	`MaXe` VARCHAR(10),
	`DieuKien` VARCHAR(40),
	`SoTienDC` FLOAT NOT NULL,
	`NgayNhanXe` DATE NOT NULL,
	CONSTRAINT `fk HOPDONGDATCOC.MaKH to KHACHHANG.MaKH` FOREIGN KEY (`MaKH`) REFERENCES `QuanLyShowroomOto`.`KHACHHANG`(`MaKH`),
	CONSTRAINT `fk HOPDONGDATCOC.MaXe to XE.MaXe` FOREIGN KEY (`MaXe`) REFERENCES `QuanLyShowroomOto`.`XE`(`MaXe`)
);

CREATE TABLE `QuanLyShowroomOto`.`KHUYENMAI` (
	`MaKM` VARCHAR(10) PRIMARY KEY,
	`TenKM` VARCHAR(20),
	`PhanTram` INT NOT NULL,
	`MoTa` VARCHAR(40),
	`NgayBD` DATE NOT NULL,
	`NgayKT` DATE NOT NULL
);

CREATE TABLE `QuanLyShowroomOto`.`HOPDONGMUAXE` (
	`MaHDMX` VARCHAR(10) PRIMARY KEY,
	`MaPBG` VARCHAR(10),
	`NgayKy` DATE NOT NULL,
	`TongGiaTri` FLOAT NOT NULL,
	`PTTT` VARCHAR(10) NOT NULL,
	`MaKM` VARCHAR(10),
	CONSTRAINT `fk HOPDONGMUAXE.MaPBG to PHIEUBAOGIA.MaPBG` FOREIGN KEY (`MaPBG`) REFERENCES `QuanLyShowroomOto`.`PHIEUBAOGIA`(`MaPBG`),
	CONSTRAINT `fk HOPDONGMUAXE.MaKM to KHUYENMAI.MaKM` FOREIGN KEY (`MaKM`) REFERENCES `QuanLyShowroomOto`.`KHUYENMAI`(`MaKM`)
);

CREATE TABLE `QuanLyShowroomOto`.`PHIEUXUAT` (
	`MaPX` VARCHAR(10) PRIMARY KEY,
	`MaXe` VARCHAR(10),
	`NgayXuat` DATE NOT NULL,
	CONSTRAINT `fk PHIEUXUAT.MaXe to XE.MaXe` FOREIGN KEY (`MaXe`) REFERENCES `QuanLyShowroomOto`.`XE`(`MaXe`)
);

CREATE TABLE `QuanLyShowroomOto`.`PHIEUBAOHANH` (
	`MaPBH` VARCHAR(10) PRIMARY KEY,
	`MaKH` VARCHAR(10),
	`MaXe` VARCHAR(10),
	`NgayLap` DATE NOT NULL,
	CONSTRAINT `fk PHIEUBAOHANH.MaXe to XE.MaXe` FOREIGN KEY (`MaXe`) REFERENCES `QuanLyShowroomOto`.`XE`(`MaXe`),
	CONSTRAINT `fk PHIEUBAOHANH.MaKH to KHACHHANG.MaKH` FOREIGN KEY (`MaKH`) REFERENCES `QuanLyShowroomOto`.`KHACHHANG`(`MaKH`)
);

CREATE TABLE `QuanLyShowroomOto`.`CTPHIEUBAOHANH` (
	`MaCTPBH` VARCHAR(10) PRIMARY KEY,
	`MaPBH` VARCHAR(10),
	`ThanhPhan` VARCHAR(20) NOT NULL,
	`MoTaLoi` VARCHAR(30),
	CONSTRAINT `fk CTPHIEUBAOHANH.MaPBH to PHIEUBAOHANH.MaPBH` FOREIGN KEY (`MaPBH`) REFERENCES `QuanLyShowroomOto`.`PHIEUBAOHANH`(`MaPBH`)
);

INSERT INTO NHACUNGCAP (MaNCC, TenNCC, DiaChi, SDT)
VALUES ('NCC001', 'Nhà cung cấp A', 'Địa chỉ A', '0123456789');

INSERT INTO NHACUNGCAP (MaNCC, TenNCC, DiaChi, SDT)
VALUES ('NCC002', 'Nhà cung cấp B', 'Địa chỉ B', '0987654321');

INSERT INTO PHIEUNHAP (MaPN, NgayNhap, MaNCC)
VALUES ('PN001', '2023-01-01', 'NCC001');

INSERT INTO PHIEUNHAP (MaPN, NgayNhap, MaNCC)
VALUES ('PN002', '2023-02-01', 'NCC002');

INSERT INTO XE (MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo)
VALUES ('X001', 'Xe A', 'Sedan', 'Honda', 50000, 10, 'Thông số A');

INSERT INTO XE (MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo)
VALUES ('X002', 'Xe B', 'SUV', 'Toyota', 60000, 8, 'Thông số B');

INSERT INTO CTPHIEUNHAP (MaCTPN, MaPN, MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo, ThanhTien)
VALUES ('CTPN001', 'PN001', 'X001', 'Xe A', 'Sedan', 'Honda', 50000, 3, 'Thông số A', 150000);

INSERT INTO CTPHIEUNHAP (MaCTPN, MaPN, MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo, ThanhTien)
VALUES ('CTPN002', 'PN002', 'X002', 'Xe B', 'SUV', 'Toyota', 60000, 8, 'Thông số B', 180000);

INSERT INTO KHACHHANG (MaKH, TenKH, SDT, Email, LoaiKH)
VALUES ('KH001', 'Khách hàng A', '0123456789', 'khachA@email.com', 'Loại A');

INSERT INTO KHACHHANG (MaKH, TenKH, SDT, Email, LoaiKH)
VALUES ('KH002', 'Khách hàng B', '0987654321', 'khachB@email.com', 'Loại B');

CREATE TEMPORARY TABLE IF NOT EXISTS debug_table (info varchar(200));
DROP TABLE debug_table;

SELECT * FROM xe;

SELECT * FROM CTPHIEUNHAP;

SELECT * FROM debug_table;

DROP TRIGGER IF EXISTS update_khi_nhap;

-- Tăng số lượng xe khi có ct phiếu nhập
DELIMITER //
  
CREATE TRIGGER update_khi_nhap
AFTER INSERT ON CTPHIEUNHAP
FOR EACH ROW
BEGIN
    DECLARE soLuong INT;

    -- Lấy số lượng hiện tại của loại xe trong bảng XE
    SELECT SoLuong INTO soLuong FROM XE WHERE MaXe = NEW.MaXe;

    -- Log the value of MaXe and soLuong to the debug_table
    INSERT INTO debug_table (info) VALUES (CONCAT('MaXe: ', NEW.MaXe, ', soLuong: ', soLuong));

    -- Nếu loại xe đã tồn tại, cập nhật số lượng, ngược lại thêm mới
    IF soLuong IS NOT NULL THEN
        UPDATE XE
        SET SoLuong = soLuong + NEW.SoLuong
        WHERE MaXe = NEW.MaXe;
    ELSE
        INSERT INTO XE (MaXe, TenXe, LoaiXe, Hang, Gia, SoLuong, ThongSo)
        VALUES (NEW.MaXe, NEW.TenXe, NEW.LoaiXe, NEW.Hang, NEW.Gia, NEW.SoLuong, NEW.ThongSo);
    END IF;
END;
//

CREATE TRIGGER update_khi_xuat
AFTER INSERT ON PHIEUXUAT
FOR EACH ROW
BEGIN
    DECLARE soLuong INT;

    -- Lấy số lượng hiện tại của loại xe trong bảng XE
    SELECT SoLuong INTO soLuong FROM XE WHERE MaXe = NEW.MaXe;

    -- Nếu loại xe đã tồn tại, cập nhật số lượng, ngược lại báo lỗi
    IF soLuong IS NOT NULL THEN
        UPDATE XE
        SET SoLuong = soLuong - 1
        WHERE MaXe = NEW.MaXe;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Mã xe không tồn tại trong bảng XE.';
    END IF;
END;
//
DELIMITER ;


