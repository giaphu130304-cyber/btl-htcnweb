// Hai chức năng dùng chung users và cùng quy tắc chuẩn hóa email.
function findRegisteredUser(email) {
  const normalizedEmail = normalizeEmail(email);
  return Store.users().find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );
}

function validateRegistrationEmail() {
  if (!validateEmail()) return false;
  return validateField(
    "email",
    !findRegisteredUser($("#email").val()),
    "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.",
  );
}

function authenticateUser(email, password) {
  const user = findRegisteredUser(email);
  return user && user.password === password ? user : null;
}

// Demo độc lập: sau đăng nhập hiển thị phiên ngay tại login.html.
// Khi tích hợp, nhóm thống nhất lại trang đích.
function getSafeNextPage() {
  return "login.html";
}

function renderAuthState() {
  const user = Store.currentUser();
  if (!$("#auth-session").length) return;
  $("#auth-form-area").prop("hidden", Boolean(user));
  $("#auth-session").prop("hidden", !user).empty();
  if (user) {
    $("#auth-session").append(
      $("<h2>").text("Bạn đang đăng nhập"),
      $("<p>").text(user.name + " · " + user.email),
      $("<p>", { class: "muted" }).text("Đăng nhập demo thành công."),
      $("<button>", {
        type: "button",
        class: "btn btn-outline-dark ms-2",
        "data-logout": "",
      }).text("Đăng xuất"),
    );
  }
}

$(function () {
  const next = getSafeNextPage();
  const params = new URLSearchParams(location.search);
  renderAuthState();
  $("#register-link").attr(
    "href",
    "register.html?next=" + encodeURIComponent(next),
  );
  $("#login-link").attr("href", "login.html?next=" + encodeURIComponent(next));
  if ($("#login-form").length && params.get("email"))
    $("#email").val(params.get("email"));

  $("#register-form").on("submit", function (event) {
    event.preventDefault();
    // 1. Kiểm tra toàn bộ, gồm cả email trùng, trước khi tạo tài khoản.
    const valid = validateAll([
      validateName,
      validatePhone,
      validateRegistrationEmail,
      validatePassword,
      validateConfirmPassword,
    ]);
    if (!valid) return;

    // 2. Chuẩn hóa và tạo đối tượng. Không lưu confirmPassword.
    const user = {
      id: Date.now(),
      name: normalizeName($("#fullName").val()),
      phone: $("#phone").val().trim(),
      email: normalizeEmail($("#email").val()),
      password: $("#password").val(), // Chỉ dùng mật khẩu DEMO.
      createdAt: new Date().toISOString(),
    };

    // 3. Ghi thành công rồi mới reset form và chuyển sang bước đăng nhập.
    const users = Store.users();
    users.push(user);
    if (!saveFormData("users", users)) return;
    this.reset();
    $("#password, #confirmPassword").attr("type", "password");
    $("[data-toggle-password]")
      .attr("aria-pressed", "false")
      .text("Hiện mật khẩu");
    showFormMessage(
      "Đăng ký thành công. Hãy đăng nhập bằng tài khoản vừa tạo.",
      "success",
    );
    const loginUrl =
      "login.html?email=" +
      encodeURIComponent(user.email) +
      "&next=" +
      encodeURIComponent(next);
    $("#form-message .alert").append(
      " ",
      $("<a>", { href: loginUrl }).text("Đăng nhập ngay →"),
    );
  });

  $("#login-form").on("submit", function (event) {
    event.preventDefault();
    if (!validateAll([validateEmail, validateLoginPassword])) return;

    // Đối chiếu users; không tạo tài khoản trong bước đăng nhập.
    const user = authenticateUser($("#email").val(), $("#password").val());
    if (!user) {
      showFormMessage(
        "Email hoặc mật khẩu chưa đúng. Kiểm tra lại hoặc đăng ký tài khoản demo.",
      );
      $("#password").val("").trigger("focus");
      return;
    }

    // Phiên chỉ giữ thông tin cần hiển thị, không sao chép mật khẩu.
    const session = { id: user.id, name: user.name, email: user.email };
    if (!saveFormData("currentUser", session)) return;
    location.href = next;
  });

  $(document).on("click", "[data-logout]", function () {
    try {
      localStorage.removeItem(DEMO_STORAGE_PREFIX + "currentUser");
      renderAuthState();
    } catch (error) {
      showFormMessage("Không thể đăng xuất vì trình duyệt chặn lưu trữ.");
    }
  });

  window.addEventListener("storage", function (event) {
    if (
      event.key === DEMO_STORAGE_PREFIX + "currentUser" ||
      event.key === DEMO_STORAGE_PREFIX + "users" ||
      event.key === null
    )
      renderAuthState();
  });
  window.addEventListener("pageshow", renderAuthState);
});
