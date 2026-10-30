$(function () {
  if (!$('#checkout-content').length) return;
  if (!Store.cart().length) { $('#checkout-content').html(emptyState('Bạn chưa có sản phẩm để thanh toán')); return; }
  $('#checkout-summary').html(`<h2>Đơn hàng của bạn</h2>${Store.cart().map(x => `<p>${Store.product(x.id).name} × ${x.quantity}<strong>${Store.money(Store.product(x.id).price*x.quantity)}</strong></p>`).join('')}<hr><p>Tổng cộng <strong class="price">${Store.money(Store.total())}</strong></p><p class="muted">Miễn phí vận chuyển mô phỏng. Không thu tiền thật.</p>`);
  const user = Store.currentUser(); if (user) $('#fullName').val(user.name);
  $('input[name="payment"]').on('change', () => $('#bank-info').toggle($('input[name="payment"]:checked').val() === 'bank'));
  $('#checkout-form').on('submit', function (event) {
    event.preventDefault();
    if (!validateAll([validateName,validatePhone,validateAddress])) return;
    const cart = Store.cart(); if (!cart.length) return notify('Giỏ hàng đã trống. Vui lòng tải lại trang.', 'warning');
    const payment = $('input[name="payment"]:checked').val(); if (!['cod','bank'].includes(payment)) return;
    const order = { id: 'PC'+Date.now(), userId: user?.id || null, recipient: { name: $('#fullName').val().trim(), phone: $('#phone').val().trim(), address: $('#address').val().trim() }, items: cart.map(x => ({ ...x, name: Store.product(x.id).name, price: Store.product(x.id).price })), total: Store.total(), payment, status: 'Đã tiếp nhận (mô phỏng)', createdAt: new Date().toISOString() };
    const orders = Store.get('orders'); orders.push(order); Store.set('orders', orders); Store.set('cart', []); updateBadges();
    $('#checkout-content').html(`<section class="panel success-state"><div class="success-mark">✓</div><h1>Đặt hàng thành công!</h1><p>Cảm ơn bạn đã trải nghiệm PC Store.</p><p>Mã đơn: <strong>${order.id}</strong></p><p>Tổng đơn hàng: <strong>${Store.money(order.total)}</strong></p><p>Đây là đơn hàng mô phỏng; không có giao dịch hoặc giao hàng thực tế.</p><a class="btn btn-yellow" href="products.html">Tiếp tục khám phá →</a></section>`);
  });
});
