# Phần phụ trách – PC Store

Tài liệu này bám theo mã nguồn hiện tại của 5 phần: Đăng ký, Đăng nhập, Liên hệ, Dữ liệu PC và Kiểm thử. Website là bài tập frontend, chạy bằng Live Server, không có backend.

## 1. Tổ chức code theo luồng website thông thường

| Tầng công việc | File | Trách nhiệm |
|---|---|---|
| Giao diện | `html/register.html`, `html/login.html`, `html/contact.html` | Form, label, vùng lỗi, nút và thông báo |
| Kiểm tra đầu vào | `js/validation.js` | Chuẩn hóa, Regex, một hàm kiểm tra cho từng trường |
| Nghiệp vụ tài khoản | `js/auth.js` | Kiểm tra trùng, tạo tài khoản, đối chiếu đăng nhập, điều hướng |
| Nghiệp vụ liên hệ | `js/contact.js` | Điền sẵn thông tin, tạo và lưu yêu cầu tư vấn |
| Tiện ích dùng chung | `js/common.js` | Đọc/ghi JSON, lấy tài khoản hiện tại, header, đăng xuất |
| Dữ liệu | `js/products-data.js` | Khai báo 24 PC với ID ổn định và cấu hình chi tiết |
| Kiểm thử | `tests/my-part.html`, `tests/my-part-tests.js`, `TEST-REPORT.md` | Chạy lại hàm thật và ghi nhận các thao tác thực tế |

Mỗi luồng form đều có thứ tự: **nhận sự kiện → chặn submit mặc định → kiểm tra tất cả trường → chuẩn hóa dữ liệu → xử lý nghiệp vụ → lưu → thông báo hoặc điều hướng**. Không ghi dữ liệu khi đầu vào sai; không báo thành công hoặc reset form khi lưu thất bại.

Thứ tự script ở trang đăng ký/đăng nhập: jQuery → Bootstrap → dữ liệu PC → common → validation → auth. Trang liên hệ thay auth bằng contact. Không cần tải code lọc sản phẩm hoặc thanh toán vào các trang form này. Dữ liệu PC được common sử dụng để tính huy hiệu giỏ.

## 2. Đăng ký

### Luồng xử lý

1. Người dùng mở `register.html`, nhập 5 trường và bấm **Tạo tài khoản**.
2. Handler `#register-form` gọi `event.preventDefault()` để ngăn tải lại trang.
3. `validateAll()` gọi đủ `validateName`, `validatePhone`, `validateRegistrationEmail`, `validatePassword`, `validateConfirmPassword`.
4. `validateRegistrationEmail()` kiểm tra định dạng rồi tìm email đã tồn tại trong cùng mảng `users` mà đăng nhập sẽ sử dụng.
5. Sai bất kỳ trường nào: hiển thị lỗi dưới trường đó, thêm `is-invalid`, focus vào lỗi đầu tiên, dừng xử lý lưu.
6. Đúng: tạo đối tượng tài khoản có `id`, `name`, `phone`, `email`, `password`, `createdAt`. Không lưu xác nhận mật khẩu.
7. Đọc mảng tài khoản bằng `Store.users()`, thêm tài khoản bằng `push()`, ghi lại bằng `saveFormData('users', users)`.
8. Ghi thất bại: giữ nguyên input và thông báo lỗi lưu trữ. Ghi thành công: reset form, ẩn lại mật khẩu, thông báo và tạo liên kết **Đăng nhập ngay**.
9. Liên kết mang email đã đăng ký và trang cần quay lại, ví dụ `login.html?email=demo%40example.com&next=contact.html`.

Đăng ký không tự đăng nhập. Bước tạo tài khoản kết thúc trước bước xác thực; điều này làm rõ sự liên kết giữa hai chức năng.

### Hàm cần giải thích

| Hàm | Công việc |
|---|---|
| `normalizeName(value)` | Bỏ khoảng trắng đầu/cuối, gộp các khoảng trắng liên tiếp thành một |
| `normalizeEmail(value)` | Bỏ khoảng trắng đầu/cuối, chuyển email về chữ thường |
| `findRegisteredUser(email)` | Dùng `find()` để tìm tài khoản theo email đã chuẩn hóa |
| `validateRegistrationEmail()` | Kiểm tra định dạng và email trùng, trả boolean |
| `saveFormData(key, value)` | Thử ghi dữ liệu, trả true/false và báo lỗi nếu ghi thất bại |

Chuẩn hóa email ở cả đăng ký và đăng nhập giúp `DEMO@EXAMPLE.COM` và `demo@example.com` được hiểu là cùng một tài khoản theo quy ước của bài tập. Mật khẩu không dùng `trim()`: không tự thay đổi nội dung người dùng nhập; luật đăng ký sẽ từ chối khoảng trắng.

`Date.now()` tạo ID đơn giản cho bài tập. Nó không bảo đảm duy nhất trong hệ thống nhiều máy/người dùng đồng thời. `createdAt` lưu ISO UTC để ghi nhận thời điểm tạo.

## 3. Đăng nhập và quản lý trạng thái

### Đăng nhập

1. Trang login nhận email từ liên kết đăng ký để điền sẵn; người dùng chỉ cần nhập mật khẩu.
2. Submit gọi `preventDefault()`, kiểm tra email và mật khẩu không rỗng.
3. `authenticateUser(email, password)` tìm trong users rồi so sánh mật khẩu bằng `===`.
4. Sai: thông báo chung **Email hoặc mật khẩu chưa đúng**, xóa mật khẩu sai và focus vào ô mật khẩu; email vẫn giữ để sửa nếu cần.
5. Đúng: tạo phiên `{id, name, email}` và lưu dưới key `currentUser`. Không chép password hoặc phone vào phiên.
6. Chỉ điều hướng sau khi lưu phiên thành công.
7. `getSafeNextPage()` chọn trang quay lại từ tham số `next`; chỉ cho phép tên trang nội bộ trong danh sách. URL ngoài như `https://example.com` hoặc `//example.com` được thay bằng `index.html`.

Ví dụ liên kết thực tế: đang xem `product-detail.html?id=3` → bấm Tài khoản → đăng nhập thành công → quay về đúng PC ID 3. Tham số query được giữ bằng `encodeURIComponent()` khi xây dựng liên kết.

`validateLoginPassword()` chỉ kiểm tra có nhập. Quy tắc tạo mật khẩu thuộc bước đăng ký; ở bước đăng nhập, việc quyết định đúng/sai dựa trên đối chiếu với dữ liệu đã lưu.

### Khôi phục trạng thái

`Store.currentUser()` đọc currentUser, sau đó tìm tài khoản có cùng ID và email trong users. Nếu phiên sai kiểu, thiếu dữ liệu hoặc tài khoản không còn tồn tại thì trả `null`. Nếu hợp lệ, hàm trả thông tin công khai từ tài khoản gốc. Bước này giữ dữ liệu demo nhất quán, **không phải xác thực bảo mật** vì users cũng nằm ở phía client.

Header gọi `Store.currentUser()` để hiển thị tên. Nếu người đã đăng nhập truy cập login/register, `renderAuthState()` hiện khung **Bạn đang đăng nhập**, nút tiếp tục mua sắm và đăng xuất; không hiện form tạo/đăng nhập tài khoản khác chồng lên trạng thái hiện có.

### Đăng xuất và nhiều tab

Nút đăng xuất trong header hoặc khung tài khoản dùng chung handler ở common. Handler chỉ gọi `localStorage.removeItem('currentUser')`, sau đó về login. Không xóa users, cart, compare, orders hay contacts.

Sự kiện `storage` cập nhật tên/nút tài khoản và khung login/register khi tab khác đăng nhập hoặc đăng xuất. Sự kiện `pageshow` làm mới trạng thái khi quay lại trang qua lịch sử trình duyệt. Cùng tab không nhận storage event do chính nó ghi, nên sau đăng nhập/đăng xuất ta chủ động chuyển trang. Các cơ chế này chỉ hoạt động trong cùng origin, không đồng bộ sang thiết bị khác.

## 4. Kiểm tra form và Regex

### Cơ chế lỗi thống nhất

Mỗi trường có `label for`, `id`, `name`, vùng `id-error` và `aria-describedby`. HTML có `required` để mô tả trường bắt buộc; `novalidate` giúp dùng thông báo JavaScript thống nhất thay cho popup mặc định của trình duyệt.

`validateField(id, valid, message)` cập nhật `is-invalid`, `aria-invalid` và `textContent` của vùng lỗi, rồi trả về boolean. `validateAll()` dùng map gọi **mọi** hàm kiểm tra trước khi dùng every để tổng hợp. Không viết chuỗi `validateName() && validatePhone() && ...` vì toán tử && dừng sớm, làm các trường sau chưa được kiểm tra.

Khi đang nhập: bỏ lỗi của trường đang sửa. Khi rời input: chạy lại hàm kiểm tra trường đó. Khi submit: kiểm tra toàn bộ lại. Riêng xác nhận mật khẩu được kiểm tra lại khi người dùng đổi mật khẩu gốc để không giữ một xác nhận đã hết khớp.

### Regex chính xác trong mã

| Trường | Regex | Quy tắc |
|---|---|---|
| Họ tên | `/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u` | Chữ Unicode và dấu tổ hợp; khoảng trắng/gạch nối/nháy giữa các từ; thêm điều kiện dài 2–70 |
| Điện thoại | `/^0[35789]\d{8}$/` | Đúng 10 chữ số, đầu 03/05/07/08/09 |
| Email | `/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i` | Kiểm tra cấu trúc tổng quát; thêm kiểm tra độ dài, dấu chấm và nhãn tên miền |
| Mật khẩu đăng ký | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,64}$/` | 8–64 ký tự, có chữ thường, chữ hoa, số, không có khoảng trắng |

`^` đầu chuỗi; `$` cuối chuỗi; `\d` chữ số; `\s` khoảng trắng; `\.` dấu chấm thật; `{8}` đúng 8 lần; `+` ít nhất một; `(?=...)` lookahead kiểm tra sự có mặt. Cờ `u` hỗ trợ Unicode, cờ `i` không phân biệt hoa/thường.

Email còn được kiểm tra: tối đa 120 ký tự; phần trước @ tối đa 64; không có hai dấu chấm liên tiếp; không có dấu chấm ở đầu/cuối phần tên; mỗi nhãn tên miền không bắt đầu/kết thúc bằng dấu gạch nối. Đây là kiểm tra hình thức cho bài tập, không chứng minh email tồn tại và không bao phủ toàn bộ chuẩn email quốc tế.

Xác nhận mật khẩu dùng `===`, không cần Regex. Chủ đề đối chiếu danh sách giá trị được phép. Nội dung liên hệ dài 10–2000 ký tự sau trim. Địa chỉ thanh toán dùng chung validation, dài 10–250. Số điện thoại không hỗ trợ +84 trong quy ước hiện tại.

Nút **Hiện mật khẩu** có type button để không submit form, thay đổi type password/text và `aria-pressed`; đăng ký thành công sẽ chuyển các ô về password.

## 5. Liên hệ tư vấn

### Vai trò các hàm

- `prefillContactForm()`: nếu đang đăng nhập hợp lệ, điền tên, điện thoại và email từ users. Các trường vẫn sửa được. Khách chưa đăng nhập vẫn gửi được yêu cầu.
- `getContactFormData()`: đọc và chuẩn hóa dữ liệu, tạo đối tượng yêu cầu. `userId` là ID người đang gửi nếu có, nếu không thì null.
- Handler submit: kiểm tra 5 trường → lấy contacts → thêm yêu cầu → thử lưu → reset khi thành công → điền lại thông tin tài khoản nếu có.

Cấu trúc yêu cầu:

```js
{
  id: 123456789,
  userId: null,
  name: 'Nguyễn Demo',
  phone: '0912345678',
  email: 'demo@example.com',
  subject: 'consult',
  message: 'Tôi cần tư vấn PC cho việc học.',
  status: 'new',
  createdAt: '2026-10-22T00:00:00.000Z'
}
```

Ba chủ đề thực sự có option riêng: consult (tư vấn), order (đơn hàng), feedback (góp ý). Không chỉ kiểm tra ô select khác rỗng; phải có giá trị trong danh sách được phép.

status new chỉ là dữ liệu chuẩn bị cho việc quản lý yêu cầu sau này; bài tập chưa có trang quản trị xử lý tư vấn. Form không gửi email thật. Thông báo dùng `.text()` để nội dung được hiển thị như văn bản. Nếu sau này làm danh sách lời nhắn, cũng dùng `.text()`/textContent khi hiển thị nội dung người dùng nhập.

## 6. Chuẩn bị dữ liệu PC

### Vì sao dùng 24 đối tượng viết trực tiếp?

`products-data.js` khai báo một mảng products với 24 object rõ ràng, mỗi thuộc tính nằm một dòng. Bạn có thể chỉ tới PC ID 1 và sửa riêng CPU/giá/ảnh mà không phải giải thích công thức sinh dữ liệu. 8 PC Gaming, 8 Văn phòng, 8 Đồ họa; ID 1–24 không trùng.

Các trường bắt buộc: id, name, category, brand, price, oldPrice, image, cpu, ram, gpu, storage, motherboard, psu, stock, description. Hai trường bổ sung featured/isNew đánh dấu sản phẩm nổi bật/mới. brand là nền tảng CPU Intel/AMD; không phải thương hiệu của bộ máy lắp ráp.

Ví dụ một PC:

```js
{
  id: 1,
  name: 'PC Gaming Nova 1',
  category: 'gaming',
  brand: 'Intel',
  price: 13990000,
  oldPrice: 15990000,
  image: '../img/products/gaming-0.svg',
  cpu: 'Intel Core i5-12400F',
  ram: '16GB DDR4',
  gpu: 'RTX 3050 8GB',
  storage: 'SSD NVMe 512GB',
  motherboard: 'B660 DDR4',
  psu: '650W 80 Plus Bronze',
  stock: 8,
  description: 'Cấu hình minh họa...',
  featured: true,
  isNew: false
}
```

ID ổn định là mối liên kết giữa các trang. Store.product(id) tìm trong cùng mảng bằng find; URL chi tiết nhận id qua URLSearchParams; giỏ lưu id/quantity; so sánh lưu ID. Giá trong đơn được chụp lại khi đặt để giữ giá trị tại thời điểm đặt. Trang chủ, danh sách, chi tiết, giỏ, so sánh và thanh toán không tự tạo bộ dữ liệu sản phẩm riêng.

Giá phải là số nguyên như 13990000, không lưu chuỗi có dấu chấm và ký hiệu tiền. Chỉ khi hiển thị mới dùng Intl.NumberFormat. Tồn kho là số nguyên không âm. Các ID 8/16/24 hết hàng phục vụ kiểm thử nút mua bị vô hiệu hóa.

### Cách sửa dữ liệu an toàn

1. Tìm object theo id hoặc name trong products-data.js.
2. Sửa tên/cấu hình/giá trong object đó. Giữ dấu phẩy giữa các thuộc tính và giữa các object.
3. Không đổi ID khi muốn giữ liên kết với giỏ/so sánh đang có; sản phẩm thêm mới phải dùng ID chưa tồn tại.
4. Dùng category gaming, office hoặc creative; nhãn tiếng Việt nằm trong categoryNames.
5. Đặt ảnh trong img/products rồi dùng đường dẫn ../img/products/ten-anh.svg tính từ trang html.
6. Chạy bộ kiểm thử, xem danh sách/chi tiết/giỏ/so sánh để kiểm tra đồng nhất.

Ảnh là minh họa tự tạo, có thể dùng chung giữa các PC cùng dòng. Dữ liệu Intel dùng mainboard Intel, AMD dùng B550; đây là cấu hình mẫu, chưa xác nhận toàn bộ BIOS/tản nhiệt/kích thước/hiệu năng để bán hàng thật.

## 7. jQuery và localStorage

| Thành phần | Cách dùng trong phần của bạn |
|---|---|
| `$(function () {...})` | Đợi DOM sẵn sàng rồi gắn sự kiện |
| `.on('submit', ...)` | Nhận thao tác gửi form |
| `.val()` | Đọc/điền nội dung input |
| `.on('input change', ...)` | Xóa lỗi khi chỉnh nội dung |
| `.on('focusout', ...)` | Kiểm tra khi rời trường |
| `.prop('hidden', ...)` | Chuyển giữa form và trạng thái đã đăng nhập |
| `.text()` | Hiển thị nội dung như văn bản |
| `.append($('<a>', {...}))` | Tạo liên kết đăng nhập sau đăng ký |
| Event delegation | Nút đăng xuất sinh động được handler chung ở document xử lý |

JavaScript thuần xử lý Regex, mảng (find/push/filter/map/every), đối tượng, JSON và điều hướng. jQuery hỗ trợ DOM/sự kiện, không thay thế cơ sở dữ liệu.

localStorage chỉ lưu chuỗi:

```js
// Ghi: mảng/đối tượng -> JSON -> lưu vào key.
localStorage.setItem('users', JSON.stringify(users));
// Đọc: lấy chuỗi -> parse lại thành mảng/đối tượng.
const users = JSON.parse(localStorage.getItem('users')) || [];
```

Store.get bọc thao tác đọc/parse bằng try/catch, xử lý cả JSON sai kiểu để tránh gọi find/filter lên một object. Store.users lọc các bản ghi tài khoản thiếu cấu trúc tối thiểu. Store.set ghi JSON. saveFormData bắt lỗi ghi và trả false; handler không reset form/chuyển trang khi nhận false.

users chứa tài khoản, currentUser chứa phiên, contacts chứa yêu cầu. cart/compare/orders liên kết với phần khác của website. Key chưa tồn tại là bình thường. LocalStorage phân chia theo protocol, host và cổng: localhost khác 127.0.0.1; cổng 5500 khác 5501.

Mật khẩu demo vẫn lưu dạng văn bản; cả users và currentUser đều có thể bị sửa trong DevTools. Những kiểm tra nhất quán ở client không bảo vệ tài khoản. Hệ thống thật phải dùng backend, mật khẩu băm và cơ chế phiên phù hợp. Bản này chỉ yêu cầu mật khẩu giả.

## 8. Kiểm thử phần phụ trách

### Chạy bộ kiểm thử tự động

Mở tests/my-part.html bằng Live Server rồi bấm **Chạy kiểm thử**. Bản đã chạy đạt **77/77 trường hợp**. Bộ test gọi các hàm thật, không chép lại Regex hay tự viết lại logic nghiệp vụ để đối chiếu.

Các nhóm gồm tên tiếng Việt/Unicode, điện thoại, email sai cấu trúc, mật khẩu, xác nhận, kiểm tra mọi lỗi, email trùng, đăng nhập đúng/sai, phiên không hợp lệ, điều hướng nội bộ, điền sẵn liên hệ, dữ liệu contacts, JSON hỏng/sai kiểu và 24 PC. Lỗi lưu trữ được giả lập bằng thay Store.set tạm thời bằng hàm ném lỗi, sau đó khôi phục.

Bộ test chuyển Store.get/set sang các key pcstore_test_users/currentUser/contacts rồi xóa riêng các key đó sau khi chạy; không ghi đè dữ liệu cửa hàng. Trang test không phải chức năng dành cho khách hàng nên không đặt trong navbar cửa hàng.

### Kịch bản trình bày thực tế

1. Đăng ký rỗng để thấy 5 lỗi cùng lúc.
2. Nhập họ tên có số, email sai, số điện thoại thiếu, mật khẩu không đạt và xác nhận khác để thấy từng thông báo.
3. Đăng ký tài khoản giả hợp lệ, bấm Đăng nhập ngay và thấy email đã điền sẵn.
4. Thử mật khẩu sai, sau đó mật khẩu đúng; kiểm tra tên ở header.
5. Tải lại trang; mở liên hệ và thấy thông tin được điền sẵn.
6. Gửi liên hệ thiếu chủ đề/nội dung rồi sửa hợp lệ; xem thông báo chỉ lưu mô phỏng.
7. Mở tab khác cùng website, đăng xuất ở đó và thấy tab đầu cập nhật.
8. Đăng ký lại cùng email viết hoa để kiểm tra trùng.
9. Từ PC ID 3 bấm Tài khoản, đăng nhập và kiểm tra quay lại ID 3.
10. Thêm PC đó vào giỏ và so sánh; đối chiếu tên, CPU, GPU và giá giữa các trang.
11. Mở DevTools → Application → Local Storage để tự kiểm chứng users/currentUser/contacts; Console để tìm lỗi.

TEST-REPORT.md ghi rõ những thao tác đã chạy, kết quả quan sát và giới hạn. Không khẳng định đã thử mọi trình duyệt hoặc mọi tổ hợp dữ liệu.

## 9. Câu hỏi vấn đáp

**Hai chức năng đăng ký/đăng nhập liên kết ở đâu?** Cùng mảng users, cùng chuẩn hóa email. Đăng ký ghi tài khoản; đăng nhập đọc và đối chiếu, sau đó tạo currentUser.

**Tại sao không chỉ kiểm tra required của HTML?** Cần Regex, email trùng, xác nhận mật khẩu và thông báo đồng nhất; required chỉ mô tả một phần điều kiện.

**Vì sao không nối tất cả hàm bằng &&?** && dừng khi gặp false. Gọi qua map trước giúp mọi input đều được kiểm tra.

**Tại sao không lưu confirmPassword?** Nó chỉ xác nhận thao tác nhập ở client, không phải thông tin tài khoản cần giữ.

**Tại sao phải normalize email ở hai phía?** Tránh đăng ký một dạng nhưng không tìm lại được khi đăng nhập bằng chữ hoa/khoảng trắng ngoài.

**Tại sao không tự đăng nhập ngay khi đăng ký?** Bài tập tách rõ tạo tài khoản và xác thực; thông báo đưa người dùng sang bước tiếp theo với email sẵn có.

**Đăng xuất có xóa giỏ không?** Không. Chỉ xóa currentUser, giữ dữ liệu mua sắm demo. Không dùng localStorage.clear().

**Kiểm tra phiên có tài khoản tương ứng có làm website bảo mật không?** Không. Chỉ ngăn trạng thái demo không nhất quán; mọi dữ liệu client vẫn có thể bị can thiệp.

**Vì sao giới hạn next bằng danh sách trang?** Để thao tác đăng nhập chỉ chuyển về trang trong website, không tin URL do người khác truyền vào.

**Liên hệ bắt buộc đăng nhập không?** Không. Khách vẫn gửi tư vấn, userId là null. Thành viên được điền sẵn thông tin và liên kết ID tài khoản.

**Lưu thất bại có báo thành công không?** Không. saveFormData trả false, handler dừng trước reset và điều hướng.

**Giá có phải chuỗi không?** Giá lưu số để tính và sắp xếp; chuỗi VND chỉ tạo lúc hiển thị.

**Bộ test có thay dữ liệu thật của cửa hàng không?** Không. Dùng key có tiền tố riêng và khôi phục hàm đọc/ghi sau khi chạy.

## 10. Gợi ý trình bày ngắn

“Phần của em gồm tài khoản, liên hệ, dữ liệu PC và kiểm thử. Em tổ chức form theo thứ tự nhận sự kiện, kiểm tra từng trường, xử lý nghiệp vụ, lưu rồi thông báo. Đăng ký và đăng nhập dùng chung users và quy tắc chuẩn hóa email. Đăng ký kiểm tra trùng, lưu tài khoản rồi liên kết sang login kèm email. Đăng nhập đối chiếu đúng tài khoản, lưu currentUser và quay lại trang trước. Header đọc trạng thái, đăng xuất chỉ xóa phiên, hai tab đồng bộ qua storage event. Liên hệ hỗ trợ cả khách và thành viên, kiểm tra 5 trường rồi lưu contacts. Em chuẩn bị 24 object PC có ID duy nhất để mọi trang dùng chung. Em có trang kiểm thử 77 trường hợp và báo cáo các luồng trình duyệt đã chạy. Dự án chỉ mô phỏng frontend nên không dùng mật khẩu thật.”
