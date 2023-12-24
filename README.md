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
```
