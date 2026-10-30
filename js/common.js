const Store = {
  get(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      if (value === null) return fallback;
      // JSON đúng cú pháp nhưng sai kiểu cũng không được làm hỏng giao diện.
      if (Array.isArray(fallback) && !Array.isArray(value)) return fallback;
      if (fallback === null && (typeof value !== 'object' || Array.isArray(value))) return fallback;
      return value;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  users() {
    return this.get('users').filter(user => user && typeof user === 'object' &&
      typeof user.name === 'string' && typeof user.email === 'string' &&
      typeof user.password === 'string' && user.id !== undefined);
  },
  currentUser() {
    const session = this.get('currentUser', null);
    if (!session || typeof session.email !== 'string') return null;
    // Phiên cũ không còn tài khoản tương ứng được coi là đã đăng xuất.
    const user = this.users().find(item => item.id === session.id &&
      item.email.trim().toLowerCase() === session.email.trim().toLowerCase());
    return user ? { id: user.id, name: user.name, email: user.email } : null;
  },
  product(id) { return products.find(p => p.id === Number(id)); },
  money(value) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value); },
  escape(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
  cart() { return this.get('cart').filter(x => this.product(x.id) && Number.isInteger(x.quantity) && x.quantity > 0).map(x => ({ id: x.id, quantity: Math.min(x.quantity, this.product(x.id).stock) })).filter(x => x.quantity > 0); },
  total() { return this.cart().reduce((sum, x) => sum + this.product(x.id).price * x.quantity, 0); }
};
function notify(message, type = 'success') {
  $('#notice').html(`<div class="alert alert-${type} shadow" role="status">${Store.escape(message)}<button type="button" class="btn-close float-end" aria-label="Đóng"></button></div>`);
}
function updateBadges() { $('.cart-count').text(Store.cart().reduce((n, x) => n + x.quantity, 0)); $('.compare-count').text(Store.get('compare').length); }
function productCard(p) {
  return `<article class="product-card"><a class="product-image" href="product-detail.html?id=${p.id}"><span class="product-tag">${p.stock ? 'Ưu đãi cấu hình' : 'Tạm hết hàng'}</span><img src="${p.image}" alt="Minh họa ${p.name}" loading="lazy"></a><div class="product-body"><span class="eyebrow">${categoryNames[p.category]} · ${p.brand}</span><a class="product-title" href="product-detail.html?id=${p.id}">${p.name}</a><div class="spec-chips"><span>${p.cpu.replace('Intel Core ', '').replace('AMD ', '')}</span><span>${p.ram}</span><span>${p.gpu}</span><span>${p.storage}</span></div><div class="old-price">${Store.money(p.oldPrice)} <span>-${Math.round((1-p.price/p.oldPrice)*100)}%</span></div><strong class="price">${Store.money(p.price)}</strong><div class="product-actions"><button class="btn btn-buy" data-add="${p.id}" ${!p.stock ? 'disabled' : ''}>+ Thêm vào giỏ</button><button class="btn compare-btn" data-compare="${p.id}" aria-label="So sánh ${p.name}">⇄</button></div></div></article>`;
}
function emptyState(text, link = 'products.html', label = 'Khám phá sản phẩm') { return `<div class="empty-state"><div class="empty-icon">▤</div><h2>${text}</h2><a class="btn btn-yellow" href="${link}">${label} →</a></div>`; }
$(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const user = Store.currentUser();
  $('#site-header').html(`<div class="top-strip">PC STORE · NÂNG TẦM GÓC MÁY, KHƠI NGUỒN CẢM HỨNG <span>Cấu hình mẫu dành cho học tập</span></div><header><div class="container header-main"><a href="index.html" class="logo"><span class="logo-mark">▣</span> pc<span>store</span><b>®</b></a><form action="products.html" class="header-search"><input name="q" aria-label="Tìm kiếm sản phẩm" placeholder="Bạn đang tìm cấu hình PC nào?"><button aria-label="Tìm kiếm">⌕</button></form><a href="contact.html" class="header-contact">Tư vấn cấu hình<strong>1900 0000</strong></a><a href="login.html" class="account-link">♙ <span>${user ? Store.escape(user.name) : 'Tài khoản'}</span></a>${user ? '<button id="logout" class="logout-link">Đăng xuất</button>' : ''}<a href="cart.html" class="cart-link">▱ <span>Giỏ hàng</span><b class="cart-count">0</b></a></div><nav class="container nav-main" aria-label="Điều hướng chính"><a href="products.html" class="all-category">☰ <span>Tất cả sản phẩm</span></a><a href="products.html?category=gaming">PC Gaming</a><a href="products.html?category=office">PC Văn phòng</a><a href="products.html?category=creative">PC Đồ họa</a><a href="compare.html">⇄ So sánh <span class="compare-count">0</span></a><a href="contact.html">Liên hệ</a><span class="nav-note">✦ Cấu hình cho mọi nhu cầu</span></nav></header>`);
  $(`.nav-main a[href='${page}']`).addClass('active');
  $('#site-footer').html(`<div class="container service-row"><div>▣ <strong>Cấu hình đa dạng</strong><span>Cho học tập, làm việc & giải trí</span></div><div>✓ <strong>Tư vấn tận tâm</strong><span>Tìm chiếc PC phù hợp với bạn</span></div><div>↻ <strong>Hỗ trợ rõ ràng</strong><span>Đồng hành cùng góc máy của bạn</span></div><div>♧ <strong>Mua sắm dễ dàng</strong><span>Trải nghiệm đặt hàng mô phỏng</span></div></div><footer><div class="container footer-grid"><div><a class="logo" href="index.html">▣ pc<span>store</span></a><p>Khởi đầu góc máy. Mở lối đam mê.</p><p>Website bài tập lớn môn Lập trình Web.</p></div><div><h3>Khám phá PC Store</h3><a href="products.html?category=gaming">PC Gaming</a><a href="products.html?category=office">PC Văn phòng</a><a href="products.html?category=creative">PC Đồ họa</a></div><div><h3>Hỗ trợ khách hàng</h3><a href="contact.html#policies">Chính sách & bảo hành</a><a href="contact.html">Liên hệ & góp ý</a><a href="compare.html">So sánh cấu hình</a></div><div><h3>Kết nối với chúng tôi</h3><p>12 Nguyễn Văn Bảo, TP. Hồ Chí Minh<br>Địa chỉ minh họa cho bài tập</p><p>1900 0000 · hello@pcstore.example</p></div></div><div class="container footer-bottom">© 2026 PC Store. Dự án học tập · Giá, cấu hình và chính sách đều là dữ liệu mô phỏng.</div></footer>`);
  updateBadges();
  $(document).on('click', '#notice .btn-close', () => $('#notice').empty());
  refreshAccountNavigation();
  $(document).on('click', '#logout, [data-logout]', function () {
    try {
      localStorage.removeItem('currentUser');
      location.href = 'login.html';
    } catch (error) {
      notify('Trình duyệt đang chặn lưu trữ nên chưa thể cập nhật trạng thái đăng xuất.', 'danger');
    }
  });
  window.addEventListener('storage', function (event) {
    if (event.key === 'currentUser' || event.key === 'users' || event.key === null) refreshAccountNavigation();
  });
  window.addEventListener('pageshow', refreshAccountNavigation);
});

function refreshAccountNavigation() {
  const user = Store.currentUser();
  $('.account-link span').text(user ? user.name : 'Tài khoản');
  const page = location.pathname.split('/').pop() || 'index.html';
  const next = ['login.html', 'register.html'].includes(page) ? 'index.html' : page + location.search;
  $('.account-link').attr('href', 'login.html?next=' + encodeURIComponent(next));
  if (user && !$('#logout').length) {
    $('.account-link').after($('<button>', { id: 'logout', type: 'button', class: 'logout-link' }).text('Đăng xuất'));
  }
  if (!user) $('#logout').remove();
}

// Dùng chung cho đăng ký, phiên đăng nhập và yêu cầu liên hệ.
function saveFormData(key, value) {
  try {
    Store.set(key, value);
    return true;
  } catch (error) {
    // Giữ nguyên form khi trình duyệt chặn lưu hoặc hết dung lượng.
    showFormMessage('Không thể lưu dữ liệu trên trình duyệt. Hãy cho phép lưu trữ, kiểm tra dung lượng rồi thử lại.');
    return false;
  }
}
