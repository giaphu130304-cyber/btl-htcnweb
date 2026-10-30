function getContactFormData() {
  const user = Store.currentUser();
  return {
    id: Date.now(),
    userId: user ? user.id : null,
    name: normalizeName($('#fullName').val()),
    phone: $('#phone').val().trim(),
    email: normalizeEmail($('#email').val()),
    subject: $('#subject').val(),
    message: $('#message').val().trim(),
    status: 'new',
    createdAt: new Date().toISOString()
  };
}

function prefillContactForm() {
  const session = Store.currentUser();
  if (!session) return; // Khách chưa đăng nhập vẫn có thể gửi tư vấn.
  const user = Store.users().find(item => item.id === session.id);
  if (!user) return;
  $('#fullName').val(user.name);
  $('#phone').val(user.phone);
  $('#email').val(user.email);
}

$(function () {
  if (!$('#contact-form').length) return;
  prefillContactForm();

  $('#contact-form').on('submit', function (event) {
    event.preventDefault();
    // 1. Kiểm tra cả 5 trường. Dữ liệu sai không được lưu.
    const valid = validateAll([
      validateName, validatePhone, validateEmail, validateSubject, validateMessage
    ]);
    if (!valid) return;

    // 2. Đọc -> thêm yêu cầu -> ghi lại contacts.
    const contacts = Store.get('contacts');
    contacts.push(getContactFormData());
    if (!saveFormData('contacts', contacts)) return;

    // 3. Chỉ reset khi ghi thành công, điền sẵn lại thông tin tài khoản.
    this.reset();
    prefillContactForm();
    showFormMessage('Đã lưu yêu cầu tư vấn mô phỏng thành công. Không có email thực tế được gửi.', 'success');
  });
});
