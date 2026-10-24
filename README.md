## 23731341_NguyenNgocHuy



# PC Store - Demo đăng nhập, đăng ký

## Chạy
1. Vào Đăng ký, tạo tài khoản giả, chọn Đăng nhập ngay rồi đăng nhập.
2. Đăng nhập thành công sẽ hiển thị họ tên, email và nút Đăng xuất ngay trên trang.

## Phạm vi
- Hai giao diện đáp ứng trên máy tính và điện thoại.
- Regex kiểm tra tên, điện thoại, email, mật khẩu; xác nhận mật khẩu.
- Hiện lỗi từng trường, kiểm tra email trùng không phân biệt hoa/thường.
- Hiện/ẩn mật khẩu; lưu tài khoản và phiên bằng localStorage.

## File chính
- html/login.html, html/register.html: giao diện.
- css/auth-demo.css
- js/validation.js: kiểm tra dữ liệu (đã bỏ hàm của liên hệ/thanh toán).
- js/storage.js: đọc/ghi dữ liệu và xử lý lỗi lưu trữ.
- js/auth.js: đăng ký, đối chiếu tài khoản, hiển thị phiên, đăng xuất.
- img/pc.svg: ảnh minh họa thay thế ảnh chưa được cung cấp.

## Quy ước tạm
Khóa localStorage: pcstore_auth_demo_users và pcstore_auth_demo_currentUser.
Tài khoản: { id, name, phone, email, password, createdAt }.
Phiên: { id, name, email }; không chép mật khẩu vào phiên.
Chưa tích hợp trang chủ/navbar/footer của các phần nội dung khác

## Quy tắc nhập
- Họ tên: 2–70 ký tự, cho phép chữ Unicode, khoảng trắng, nháy và gạch nối giữa từ.
- Điện thoại: 10 số; đầu 03, 05, 07, 08 hoặc 09.
- Email: tối đa 120 ký tự, chuẩn hóa bỏ khoảng trắng ngoài và chuyển chữ thường.
- Mật khẩu: 8–64 ký tự, có chữ hoa, chữ thường, số; không có khoảng trắng.
- Xác nhận: trùng mật khẩu.

## Lưu ý demo
Dữ liệu phụ thuộc trình duyệt và địa chỉ Live Server đang dùng; xóa dữ liệu trình duyệt sẽ mất tài khoản.

## Kiểm tra thủ công
- Bỏ trống tất cả: hiện lỗi từng trường.
- Sai tên, điện thoại, email, mật khẩu yếu: chặn đăng ký.
- Xác nhận không khớp: hiện lỗi.
- Đăng ký hợp lệ: báo thành công và có liên kết đăng nhập.
- Đăng ký lại email với chữ hoa hoặc khoảng trắng ngoài: chặn trùng.
- Sai mật khẩu hoặc email chưa đăng ký: không tạo phiên.
- Đăng nhập đúng: hiện tên/email; tải lại vẫn giữ phiên.
- Đăng xuất: trở lại form và vẫn giữ tài khoản.
- Thử hiện/ẩn mật khẩu, màn hình nhỏ và thao tác bàn phím.

## Commit đề xuất
feat: add standalone login and registration demo
