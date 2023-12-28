# quanlyshowroom_scripts

## Thư mục helper_script

Chứa script insert dữ liệu và script test. Đầu tiên  tạo file .env mẫu:
```
DB_HOST=localhost
DB_USER=qltt
DB_PASSWORD=password
DB_DATABASE=QuanLyShowroomOto
```
Cài đặt các thư viện, sau đó test kết nối đến csdl.
```sh
npm install
node test-connection.js
```
Insert dữ liệu vào các bảng:
```sh
node insertKHACHHANG.js
node insertNHACUNGCAP.js 
node insertNHANVIEN.js
node insertLOAIXE.js
node insertHANGXE.js
```

## Conventions

| Name | Length |
| ------ | ------ |
| `Ma` | VARCHAR(10) |
| `DiaChi` | VARCHAR(100) |
| `SDT` | VARCHAR(16) |
| `Ten` (Người) | VARCHAR(50) |
| `Email` | VARCHAR(100) |

## Đang làm
  Phân quyền cho db: 
- admin: thêm xóa sửa tất cả bảng
- nhanvien: thêm được tất cả bảng
- khachhang: xem được xe  

  Tạo các procedure
