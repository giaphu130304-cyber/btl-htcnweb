# PC Store – Bài tập lớn Lập trình Web

Website giới thiệu và mô phỏng bán PC. Giao diện dùng vàng `#FFD400`, header tìm kiếm, thanh danh mục và lưới sản phẩm, tham khảo bố cục mua sắm tại [Thế Giới Di Động](https://www.thegioididong.com/may-tinh-de-ban). Logo, nội dung và hình PC trong dự án được thiết kế riêng, không lấy tài sản thương hiệu của website tham khảo.

## 1. Công nghệ

HTML5, CSS3, Bootstrap **5.3.3**, JavaScript thuần, jQuery **3.7.1**, localStorage. Bootstrap và jQuery được tải từ bản phân phối chính thức và lưu cục bộ, giữ thông tin bản quyền trong file. Không có backend, cơ sở dữ liệu hoặc công cụ build bắt buộc.

## 2. Chạy bằng VS Code Live Server

1. Mở thư mục dự án này bằng VS Code.
2. Cài extension **Live Server** nếu chưa có.
3. Nhấp phải `html/index.html` → **Open with Live Server**.
4. Giữ nguyên host và cổng trong suốt quá trình thử nghiệm để dùng chung localStorage.

File `index.html` ở thư mục gốc tự chuyển sang `html/index.html`. Sau khi tải dự án, website không cần kết nối CDN. Nên chạy qua HTTP/Live Server; không dùng `file://` vì cách chia sẻ localStorage giữa file phụ thuộc trình duyệt.

Bản bàn giao là website tĩnh; không cần cài Node.js, npm hoặc chạy lệnh build. Mở trực tiếp các file HTML/CSS/JS để chỉnh sửa, Live Server sẽ phục vụ các file này.

## 3. Cấu trúc

```text
html/     index, products, product-detail, compare, cart,
          checkout, login, register, contact (.html)
css/      bootstrap.min.css, style.css
js/       jquery-3.7.1.min.js, bootstrap.bundle.min.js
          products-data.js, common.js, validation.js, products.js
          auth.js, cart.js, compare.js, checkout.js, contact.js
img/      favicon.svg, banner/hero-pc.svg, products/*.svg
tests/    my-part.html, my-part-tests.js
README.md
MY-PART.md
TEST-REPORT.md
index.html
```

`common.js` chèn header/footer dùng chung, cung cấp xử lý dữ liệu, định dạng tiền, thông báo. Các trang ở `html/` dùng đường dẫn `../css/`, `../js/`, `../img/`. Ảnh SVG là hình minh họa tự tạo, được phép sử dụng và chỉnh sửa trong bài tập này; có 6 biến thể PC và 1 banner cục bộ. Nhiều sản phẩm dùng chung ảnh đại diện theo dòng máy.

## 4. Chức năng

| Trang | Chức năng |
|---|---|
| Trang chủ | Banner, danh mục, PC nổi bật, ưu đãi, sản phẩm mới |
| Sản phẩm | Tìm tên, lọc danh mục/nền tảng CPU/khoảng giá, sắp xếp, phân trang 8 PC/trang, đếm kết quả |
| Chi tiết | Nhận `?id=1`, ảnh, cấu hình, mô tả, tồn kho, PC liên quan, mua/so sánh |
| So sánh | 2–3 PC, bảng giá và thông số, xóa/chọn thêm, giới hạn tối đa 3 |
| Giỏ hàng | Thêm, đổi số lượng theo tồn kho, xóa, thành tiền/tổng, lưu lại |
| Thanh toán | Kiểm tra người nhận, COD/chuyển khoản giả lập, lưu đơn và xóa giỏ sau thành công |
| Đăng ký | Kiểm tra từng input, Regex, mật khẩu khớp, email không phân biệt hoa thường và không trùng |
| Đăng nhập | Đối chiếu tài khoản đã đăng ký, lưu phiên demo, chuyển trang, đăng xuất |
| Liên hệ | Thông tin demo, chủ đề, kiểm tra 5 trường, lưu lời nhắn, thông báo thành công |

Chưa có tài khoản mặc định. Hãy đăng ký bằng email giả và mật khẩu demo, ví dụ `Demo12345`. Không nhập mật khẩu bạn đang sử dụng ở dịch vụ thật.

## 5. Dữ liệu sản phẩm

`js/products-data.js` khai báo trực tiếp mảng 24 đối tượng PC: 8 Gaming, 8 Văn phòng, 8 Đồ họa. Có thể sửa riêng từng máy mà không phải tính vòng lặp. Mỗi đối tượng có:

```js
{
  id: 1, name: 'PC Gaming Nova 1', category: 'gaming', brand: 'Intel',
  price: 13990000, oldPrice: 15990000,
  image: '../img/products/gaming-0.svg',
  cpu: 'Intel Core i5-12400F', ram: '16GB DDR4', gpu: 'RTX 3050 8GB',
  storage: 'SSD NVMe 512GB', motherboard: 'B660 DDR4',
  psu: '650W 80 Plus Bronze', stock: 8,
  description: '...', featured: true, isNew: false
}
```

`brand` biểu thị **nền tảng CPU Intel/AMD**, không phải hãng lắp ráp bộ PC. Giá là số nguyên VND, chỉ định dạng khi hiển thị. `featured` và `isNew` là thuộc tính bổ sung. Giỏ/so sánh tham chiếu bằng ID; đơn hàng chụp lại tên và đơn giá tại thời điểm đặt. Các PC có ID 8, 16, 24 hết hàng để kiểm tra trạng thái.

## 6. localStorage

| Key | Cấu trúc |
|---|---|
| `users` | `[{id, name, phone, email, password, createdAt}]` – tài khoản demo; tài khoản cũ chưa có createdAt vẫn đọc được |
| `currentUser` | `{id, name, email}` – không sao chép mật khẩu vào phiên |
| `cart` | `[{id, quantity}]` |
| `compare` | `[1,2,3]` |
| `orders` | `[{id, userId, recipient, items, total, payment, status, createdAt}]` |
| `contacts` | `[{id, userId, name, phone, email, subject, message, status, createdAt}]` |

Các key được tạo khi người dùng thao tác. Không bắt buộc phải có cả 6 key ngay lần mở đầu tiên.

```js
// localStorage chỉ lưu chuỗi. stringify đổi mảng/đối tượng sang chuỗi JSON.
localStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }]));
// getItem đọc chuỗi (hoặc null nếu chưa có); parse đổi JSON về dữ liệu JS.
const cart = JSON.parse(localStorage.getItem('cart')) || [];
```

`Store.get()` bọc `JSON.parse()` bằng `try/catch` để dùng giá trị mặc định khi JSON hỏng. `Store.set()` bọc `setItem()` và `JSON.stringify()`. `localStorage.removeItem('currentUser')` đăng xuất, không xóa giỏ. Có thể xem dữ liệu tại DevTools → Application → Local Storage. Xóa riêng các key của dự án để làm lại bài demo. Cổng 5500 và 5501 là hai vùng lưu trữ khác nhau; `localhost` cũng khác `127.0.0.1`.

## 7. Kết quả kiểm thử ngày 22/10/2026

Đã thực hiện bằng trình duyệt trên máy chủ HTTP cục bộ, không chỉ đọc mã nguồn:

| Trường hợp | Kết quả quan sát |
|---|---|
| Đăng ký rỗng | Cả 5 trường cùng báo lỗi |
| Họ tên số, điện thoại/email sai, mật khẩu ngắn, xác nhận khác | 5 lỗi; nhập lại họ tên thì xóa lỗi của trường đó |
| Đăng ký hợp lệ | Thông báo thành công |
| Email trùng viết hoa | Báo trùng ngay dưới email |
| Đăng nhập sai/đúng | Báo sai / chuyển trang và hiện tên |
| Tải lại khi đăng nhập, sau đó đăng xuất | Tên còn hiển thị sau tải lại; đăng xuất về trang login |
| Liên hệ trống/hợp lệ | 5 lỗi / thông báo lưu thành công |
| Danh sách và trang 2 | 24 kết quả, 8 thẻ/trang; trang 2 bắt đầu từ PC Văn phòng |
| Lọc Đồ họa + AMD | 4 kết quả |
| Sắp xếp giảm dần | 31.990.000 → 31.090.000 → 26.590.000 → 25.690.000 |
| Tìm `Nova 1`, từ không tồn tại | 3 kết quả / trạng thái không tìm thấy |
| Chi tiết ID 1/2, ID 999 | Cấu hình đúng / trạng thái không tồn tại |
| PC hết hàng ID 8 | Nút mua bị vô hiệu hóa |
| So sánh 2 PC, xóa PC, thêm PC thứ 4 | Bảng 2 PC; xóa còn 1; cảnh báo giới hạn 3 |
| Thêm/xóa giỏ | Hiện sản phẩm; xóa về giỏ trống |
| Đổi số lượng 2 rồi tải lại | Tổng 27.980.000đ và số lượng 2 còn giữ |
| Số lượng 99 vượt tồn kho 8 | Hiện cảnh báo, rời input trả về số lượng đã lưu hợp lệ |
| Thanh toán bỏ trống | 3 trường báo lỗi |
| Thanh toán chuyển khoản mô phỏng | Hiện hướng dẫn giả lập, xác nhận có mã đơn và tổng tiền |
| Thanh toán COD | Đặt thành công đơn 27.980.000đ; giỏ được xóa |
| Thanh toán khi giỏ trống | Hiện liên kết quay về sản phẩm |
| Responsive | Đã xem trang chủ tại 390/768/1440 px; kiểm tra danh sách/giỏ tại 390 px, không tràn ngang toàn trang |
| Console | Không ghi nhận lỗi JavaScript trong các phiên thao tác đã chạy |

Đã sửa lỗi cập nhật tổng khi đổi số lượng và thu gọn banner mobile trong quá trình thử. Lần kiểm tra tĩnh mới nhất xác nhận: 10 trang HTML (9 trang cửa hàng và 1 trang test), 151 tham chiếu cục bộ tồn tại, ID HTML không trùng, 24 PC đủ thuộc tính và ảnh. Toàn bộ file JavaScript đã qua kiểm tra cú pháp. Máy chủ tạm dùng lúc phát triển đã được gỡ khỏi bản bàn giao; bộ kiểm thử HTML/JavaScript được giữ lại để chạy bằng Live Server.

Lần rà soát chuyên sâu 5 phần phụ trách: **77/77 kiểm tra tự động trên trình duyệt đạt**. Mở `tests/my-part.html` bằng Live Server và bấm **Chạy kiểm thử** để tự chạy lại. Bộ kiểm tra dùng key `pcstore_test_...` riêng, không sửa các key đang dùng của cửa hàng. Có kiểm tra giả lập lỗi lưu trữ, JSON hỏng/sai kiểu, phiên không còn tài khoản, Regex và tính nhất quán dữ liệu PC.

Đã chạy thêm thao tác thực tế: đăng ký liên kết đăng nhập kèm sẵn email; đăng nhập quay lại trang PC trước đó; giữ trạng thái sau tải lại; trang tài khoản nhận biết đã đăng nhập; đồng bộ đăng xuất giữa hai tab; liên hệ khách/thành viên; lọc Gaming dưới 15 triệu. Xem **TEST-REPORT.md** để phân biệt kết quả tự động, thao tác thực tế và những trường hợp chưa kiểm tra.

Chưa kiểm thử toàn bộ tổ hợp bộ lọc, mọi trình duyệt/thiết bị, hoặc chặn localStorage thật bằng cài đặt trình duyệt. Chưa đọc Application panel sau mỗi thao tác. Mô phỏng lỗi ghi trong bộ test không tương đương kiểm thử mọi chính sách lưu trữ của trình duyệt.

## 8. Giới hạn frontend

- Mật khẩu demo lưu **dạng văn bản** trong localStorage; bất kỳ ai có DevTools đều xem/sửa được. Kiểm tra phía trình duyệt chỉ hỗ trợ trải nghiệm, không bảo vệ tài khoản. Không dùng cho người dùng thật.
- `currentUser` có thể bị giả mạo. Không có phân quyền, xác thực server, mã hóa mật khẩu, chống gian lận hay đồng bộ nhiều thiết bị.
- Trạng thái tài khoản và nút đăng xuất đồng bộ giữa các tab cùng origin qua sự kiện `storage`; việc này không tạo ra xác thực bảo mật hoặc đồng bộ dữ liệu với server.
- Đơn hàng/liên hệ chỉ tồn tại trên cùng trình duyệt và origin. Xóa dữ liệu trình duyệt sẽ mất. Không có email, thanh toán, vận chuyển thực tế.
- Tồn kho là dữ liệu mẫu cố định; không trừ kho sau đặt hàng, không giữ kho giữa nhiều tab. Website không quản lý nghiệp vụ cửa hàng thực tế.
- Thông số, hình ảnh và giá minh họa cần xác nhận độc lập nếu áp dụng vào bán hàng thật.

Đọc **MY-PART.md** để hiểu sâu các phần đăng ký, đăng nhập, liên hệ, dữ liệu và kiểm thử.
