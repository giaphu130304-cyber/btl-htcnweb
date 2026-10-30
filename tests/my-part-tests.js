// Không có framework test hoặc backend. Chạy trực tiếp bằng Live Server.
$(function () {
  $('#run-tests').on('click', function () {
    const results = [];
    const prefix = 'pcstore_test_';
    const originalGet = Store.get;
    const originalSet = Store.set;
    const keys = ['users', 'currentUser', 'contacts'];

    function test(name, run) {
      try {
        if (!run()) throw new Error('Giá trị nhận được không đúng mong đợi.');
        results.push({ name, passed: true });
      } catch (error) {
        results.push({ name, passed: false, message: error.message });
      }
    }

    function fieldTest(name, id, value, check, expected) {
      test(name, function () {
        $('#' + id).val(value);
        return check() === expected;
      });
    }

    // Đổi vùng key cho bộ kiểm thử, giữ nguyên logic đọc/ghi thực tế.
    Store.get = function (key, fallback = []) {
      return originalGet.call(Store, prefix + key, fallback);
    };
    Store.set = function (key, value) {
      return originalSet.call(Store, prefix + key, value);
    };

    try {
      keys.forEach(key => localStorage.removeItem(prefix + key));
      fieldTest('Tên: bắt buộc', 'fullName', '', validateName, false);
      fieldTest('Tên: tiếng Việt có dấu', 'fullName', 'Nguyễn Văn Demo', validateName, true);
      fieldTest('Tên: Unicode tổ hợp', 'fullName', 'Nguye\u0302\u0303n An', validateName, true);
      fieldTest('Tên: chuẩn hóa nhiều khoảng trắng', 'fullName', '  Nguyễn   An  ', validateName, true);
      fieldTest('Tên: không nhận chữ số', 'fullName', 'Demo123', validateName, false);
      fieldTest('Tên: không nhận HTML', 'fullName', '<b>Demo</b>', validateName, false);
      fieldTest('Tên: quá dài', 'fullName', 'A'.repeat(71), validateName, false);

      ['03', '05', '07', '08', '09'].forEach(start => {
        fieldTest('Điện thoại: đầu ' + start, 'phone', start + '12345678', validatePhone, true);
      });
      ['', '0212345678', '091234567', '09123456789', '+84912345678', '09abcdefgh'].forEach(value => {
        fieldTest('Điện thoại: từ chối ' + (value || 'rỗng'), 'phone', value, validatePhone, false);
      });

      fieldTest('Email: chữ hoa và khoảng trắng ngoài', 'email', '  STUDENT@EXAMPLE.COM ', validateEmail, true);
      fieldTest('Email: dấu + ở phần tên', 'email', 'demo+pc@example.com', validateEmail, true);
      ['', 'abc', 'a@@example.com', '.a@example.com', 'a.@example.com', 'a..b@example.com', 'a@-example.com', 'a@example-.com', 'a@example..com', 'a@exam ple.com'].forEach(value => {
        fieldTest('Email: từ chối ' + (value || 'rỗng'), 'email', value, validateEmail, false);
      });
      fieldTest('Email: vượt giới hạn phần tên 64', 'email', 'a'.repeat(65) + '@example.com', validateEmail, false);

      fieldTest('Mật khẩu: hợp lệ', 'password', 'Demo12345', validatePassword, true);
      ['', 'Demo12', 'demo12345', 'DEMO12345', 'DemoAbcde', 'Demo 12345', 'A'.repeat(65) + 'a1'].forEach(value => {
        fieldTest('Mật khẩu: từ chối ' + (value ? 'dữ liệu thiếu điều kiện (' + value.length + ' ký tự)' : 'rỗng'), 'password', value, validatePassword, false);
      });
      $('#password').val('Demo12345');
      fieldTest('Xác nhận: giống mật khẩu', 'confirmPassword', 'Demo12345', validateConfirmPassword, true);
      fieldTest('Xác nhận: khác mật khẩu', 'confirmPassword', 'Demo12346', validateConfirmPassword, false);
      fieldTest('Đăng nhập: mật khẩu không rỗng được đối chiếu ở bước sau', 'password', 'sai', validateLoginPassword, true);

      test('validateAll gọi mọi hàm dù hàm đầu trả false', function () {
        let called = 0;
        const valid = validateAll([() => { called++; return false; }, () => { called++; return true; }]);
        return !valid && called === 2;
      });

      const user = { id: 123, name: 'Nguyễn Demo', phone: '0912345678', email: 'demo@example.com', password: 'Demo12345' };
      Store.set('users', [user]);
      test('Email trùng không phân biệt hoa thường', function () {
        $('#email').val(' DEMO@EXAMPLE.COM ');
        return validateRegistrationEmail() === false;
      });
      test('Email mới được chấp nhận', function () {
        $('#email').val('other@example.com');
        return validateRegistrationEmail() === true;
      });
      test('Đăng nhập đúng email chuẩn hóa và mật khẩu', () => authenticateUser(' DEMO@EXAMPLE.COM ', 'Demo12345').id === 123);
      test('Đăng nhập sai mật khẩu', () => authenticateUser('demo@example.com', 'sai') === null);
      test('Đăng nhập tài khoản không tồn tại', () => authenticateUser('missing@example.com', 'Demo12345') === null);
      test('Phiên hợp lệ, không trả mật khẩu', function () {
        Store.set('currentUser', { id: user.id, email: user.email });
        const session = Store.currentUser();
        return session.name === user.name && !('password' in session);
      });
      test('Phiên mồ côi không được coi là đăng nhập', function () {
        Store.set('currentUser', { id: 999, email: user.email });
        return Store.currentUser() === null;
      });
      test('Phiên sai email bị từ chối', function () {
        Store.set('currentUser', { id: user.id, email: 'wrong@example.com' });
        return Store.currentUser() === null;
      });
      test('Chuyển hướng nội bộ giữ tham số sản phẩm', () => getSafeNextPage('product-detail.html?id=3') === 'product-detail.html?id=3');
      ['https://example.com', '//example.com', 'javascript:alert(1)', '../html/index.html', 'login.html'].forEach(url => {
        test('Chặn next không hợp lệ: ' + url, () => getSafeNextPage(url) === 'index.html');
      });

      Store.set('currentUser', { id: user.id, email: user.email });
      test('Liên hệ điền sẵn thông tin người đang đăng nhập', function () {
        prefillContactForm();
        return $('#fullName').val() === user.name && $('#phone').val() === user.phone && $('#email').val() === user.email;
      });
      fieldTest('Liên hệ: chủ đề bắt buộc', 'subject', '', validateSubject, false);
      fieldTest('Liên hệ: chọn tư vấn', 'subject', 'consult', validateSubject, true);
      fieldTest('Liên hệ: nội dung quá ngắn', 'message', 'ngắn', validateMessage, false);
      fieldTest('Liên hệ: nội dung hợp lệ', 'message', 'Tôi cần tư vấn PC cho việc học.', validateMessage, true);
      fieldTest('Liên hệ: nội dung quá dài', 'message', 'a'.repeat(2001), validateMessage, false);
      test('Dữ liệu liên hệ có userId, thời gian và trạng thái new', function () {
        $('#fullName').val(' Nguyễn   Demo ');
        $('#email').val(' DEMO@EXAMPLE.COM ');
        $('#message').val('  Tôi cần tư vấn cấu hình PC.  ');
        const contact = getContactFormData();
        return contact.userId === 123 && contact.name === 'Nguyễn Demo' &&
          contact.email === 'demo@example.com' && contact.message === 'Tôi cần tư vấn cấu hình PC.' &&
          contact.status === 'new' && !Number.isNaN(Date.parse(contact.createdAt));
      });
      test('Lưu và đọc lại yêu cầu liên hệ bằng JSON', function () {
        const contact = getContactFormData();
        return saveFormData('contacts', [contact]) && Store.get('contacts')[0].message === contact.message;
      });
      test('Thông báo hiển thị HTML như văn bản', function () {
        showFormMessage('<img src=x onerror=alert(1)>');
        return $('#form-message img').length === 0 && $('#form-message').text().includes('<img');
      });
      test('Lưu trữ thất bại trả false, giữ nội dung input', function () {
        const testSet = Store.set;
        Store.set = function () { throw new Error('Mô phỏng hết dung lượng'); };
        const before = $('#message').val();
        try {
          return saveFormData('contacts', []) === false && $('#message').val() === before && $('#form-message').text().includes('Không thể lưu');
        } finally { Store.set = testSet; }
      });
      test('JSON hỏng trả mảng mặc định', function () {
        localStorage.setItem(prefix + 'users', '{broken');
        return Array.isArray(Store.get('users')) && Store.get('users').length === 0;
      });
      test('JSON sai kiểu trả mảng mặc định', function () {
        localStorage.setItem(prefix + 'users', '{}');
        return Array.isArray(Store.get('users')) && Store.get('users').length === 0;
      });

      test('PC: đủ 24 ID duy nhất', () => products.length === 24 && new Set(products.map(p => p.id)).size === 24);
      ['gaming', 'office', 'creative'].forEach(category => test('PC: đủ 8 máy ' + category, () => products.filter(p => p.category === category).length === 8));
      test('PC: đủ mọi trường dữ liệu bắt buộc', function () {
        const required = ['id', 'name', 'category', 'brand', 'price', 'oldPrice', 'image', 'cpu', 'ram', 'gpu', 'storage', 'motherboard', 'psu', 'stock', 'description'];
        return products.every(p => required.every(key => p[key] !== undefined && p[key] !== ''));
      });
      test('PC: giá và tồn kho là số hợp lệ', () => products.every(p => Number.isInteger(p.price) && p.price > 0 && p.oldPrice >= p.price && Number.isInteger(p.stock) && p.stock >= 0));
      test('PC: CPU, nền tảng và mainboard nhất quán', () => products.every(p => p.cpu.startsWith('AMD') ? p.brand === 'AMD' && p.motherboard === 'B550' : p.brand === 'Intel' && !p.motherboard.includes('B550')));
      test('PC: các trang cùng truy xuất một sản phẩm bằng ID', () => Store.product('1') === products[0] && Store.product(999) === undefined);
    } catch (error) {
      results.push({ name: 'Khởi chạy bộ kiểm thử', passed: false, message: error.message });
    } finally {
      keys.forEach(key => localStorage.removeItem(prefix + key));
      Store.get = originalGet;
      Store.set = originalSet;
    }

    $('#test-results').empty();
    results.forEach(result => {
      $('<tr>').append($('<td>').text(result.name),
        $('<td>', { class: result.passed ? 'text-success' : 'text-danger' }).text(result.passed ? 'Đạt' : 'Lỗi: ' + result.message))
        .appendTo('#test-results');
    });
    const passed = results.filter(result => result.passed).length;
    $('#test-summary').attr('class', 'my-4 alert alert-' + (passed === results.length ? 'success' : 'danger'))
      .text(passed + '/' + results.length + ' trường hợp đạt.');
  });
});
