// Mỗi hàm kiểm tra một trường và trả về true/false.
function normalizeName(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function validateField(id, valid, message) {
  const input = document.getElementById(id);
  if (!input) return false;
  input.classList.toggle('is-invalid', !valid);
  input.setAttribute('aria-invalid', String(!valid));
  document.getElementById(id + '-error').textContent = valid ? '' : message;
  return valid;
}

function validateName() {
  const value = normalizeName($('#fullName').val());
  if (!value) return validateField('fullName', false, 'Vui lòng nhập họ và tên.');
  // Chữ tiếng Việt, bao gồm dấu Unicode tổ hợp.
  const pattern = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
  const valid = value.length >= 2 && value.length <= 70 && pattern.test(value);
  return validateField('fullName', valid, 'Họ tên cần 2–70 ký tự, chỉ gồm chữ, khoảng trắng, dấu nháy hoặc gạch nối giữa các từ.');
}

function validatePhone() {
  const value = $('#phone').val().trim();
  if (!value) return validateField('phone', false, 'Vui lòng nhập số điện thoại.');
  return validateField('phone', /^0[35789]\d{8}$/.test(value), 'Số điện thoại cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09.');
}

function validateEmail() {
  const value = normalizeEmail($('#email').val());
  if (!value) return validateField('email', false, 'Vui lòng nhập email.');
  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const parts = value.split('@');
  const localPart = parts[0];
  const domain = parts[1] || '';
  const validDomain = domain.split('.').every(label => /^[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?$/i.test(label));
  const valid = value.length <= 120 && localPart.length <= 64 &&
    pattern.test(value) && !value.includes('..') &&
    !localPart.startsWith('.') && !localPart.endsWith('.') && validDomain;
  return validateField('email', valid, 'Nhập email hợp lệ, tối đa 120 ký tự, ví dụ ban@example.com.');
}

function validatePassword() {
  const value = $('#password').val();
  if (!value) return validateField('password', false, 'Vui lòng tạo mật khẩu demo.');
  const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,64}$/.test(value);
  return validateField('password', valid, 'Mật khẩu cần 8–64 ký tự, có chữ hoa, chữ thường và số; không chứa khoảng trắng.');
}

function validateLoginPassword() {
  // Đăng nhập chỉ kiểm tra đã nhập; sau đó đối chiếu với tài khoản đã lưu.
  return validateField('password', $('#password').val().length > 0, 'Vui lòng nhập mật khẩu demo.');
}

function validateConfirmPassword() {
  const value = $('#confirmPassword').val();
  if (!value) return validateField('confirmPassword', false, 'Vui lòng nhập lại mật khẩu.');
  return validateField('confirmPassword', value === $('#password').val(), 'Mật khẩu xác nhận chưa khớp.');
}

function validateAddress() {
  const value = $('#address').val().trim();
  return validateField('address', value.length >= 10 && value.length <= 250, 'Nhập địa chỉ từ 10–250 ký tự, gồm số nhà, đường và địa phương.');
}

function validateSubject() {
  return validateField('subject', ['consult', 'order', 'feedback'].includes($('#subject').val()), 'Vui lòng chọn chủ đề liên hệ.');
}

function validateMessage() {
  const value = $('#message').val().trim();
  if (!value) return validateField('message', false, 'Vui lòng nhập nội dung cần tư vấn.');
  return validateField('message', value.length >= 10 && value.length <= 2000, 'Nội dung cần từ 10–2000 ký tự.');
}

function validateAll(checks) {
  // Gọi tất cả trước khi tổng hợp, tránh && dừng sớm và bỏ sót lỗi.
  const results = checks.map(check => check());
  const valid = results.every(Boolean);
  if (!valid) document.querySelector('.is-invalid')?.focus();
  return valid;
}

function showFormMessage(message, type = 'danger') {
  $('#form-message').empty().append(
    $('<div>', { class: 'alert alert-' + type, role: type === 'danger' ? 'alert' : 'status' }).text(message)
  );
}

$(function () {
  $('form.validated-form input, form.validated-form textarea, form.validated-form select')
    .on('input change', function () {
      $(this).removeClass('is-invalid').attr('aria-invalid', 'false');
      $('#' + this.id + '-error').text('');
      $('#form-message').empty();
    });

  const checks = {
    fullName: validateName,
    phone: validatePhone,
    email: validateEmail,
    password: $('#register-form').length ? validatePassword : validateLoginPassword,
    confirmPassword: validateConfirmPassword,
    address: validateAddress,
    subject: validateSubject,
    message: validateMessage
  };
  $('.validated-form').on('focusout', 'input, select, textarea', function () {
    if (checks[this.id]) checks[this.id]();
  });

  $('#register-form #password').on('input', function () {
    if ($('#confirmPassword').val()) validateConfirmPassword();
  });

  $('[data-toggle-password]').on('click', function () {
    const input = document.getElementById($(this).attr('data-toggle-password'));
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    $(this).attr('aria-pressed', String(show)).text(show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  });
});
