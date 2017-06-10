Project 3
=========

## Đề tài
Thiết kế website xem comic online, lấy nguồn ảnh từ http://xkcd.com.
Sử dụng NodeJS và MongoDB.

## Sinh viên thực hiện
* Họ và tên: **Phạm Tuấn Sang**
* MSSV: 20146596

## Giảng viên hướng dẫn
* **T.S Trần Vĩnh Đức**

## Các công cụ và kỹ thuật sử dụng
* NodeJS
* ExpressJS
* MongoDB
* JQuery
* Bootstrap
* AJAX
* Pug

## Môi trường lập trình
Để đơn giản hóa quá trình cài đặt môi trường lập trình và deploy, em sử dụng cloud IDE trên trang https://c9.io/

## Hướng dẫn cài đặt

Download source code về máy
```sh
$ git clone https://github.com/sangpt/xkcd
```

Khởi động MongoDB server
$ ./mongod

Nếu chạy lệnh trên bị lỗi (do c9.io force close), chạy lần lượt 2 lệnh sau
```sh
$ mongod --dbpath data/ --repair;
$ mongod --dbpath data/ --smallfiles
```
Ở lần khởi động đầu tiên, chạy lệnh sau để lấy dữ liệu vào db
```sh
$ node /myapp/getcomic.js
```

Khởi động node server
```sh
$ node /myapp/bin/www
```

## Live demo
```
https://nodejs-sangpt.c9users.io/
```
Do chính sách của c9.io sau 8h không sử dụng sẽ tự tắt server. Nếu không xem được live demo thầy có thể liên hệ cho em để bật lại server.

## Giấy phép
Project này sử dụng giấy phép [MIT License](https://opensource.org/licenses/MIT)