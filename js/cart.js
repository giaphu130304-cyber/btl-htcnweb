function addToCart(id) {
  const p = Store.product(id); if (!p || !p.stock) return notify('Sản phẩm đã hết hàng.', 'warning');
  const cart = Store.cart(); const item = cart.find(x => x.id === p.id);
  if (item && item.quantity >= p.stock) return notify('Đã đạt số lượng tồn kho.', 'warning');
  if (item) item.quantity++; else cart.push({ id: p.id, quantity: 1 });
  Store.set('cart', cart); updateBadges(); notify(`Đã thêm ${p.name} vào giỏ hàng.`);
}
function renderCart() {
  const cart = Store.cart();
  $('#cart-content').html(cart.length ? `<div class="shopping-layout"><section class="panel">${cart.map(x => { const p = Store.product(x.id); return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><a href="product-detail.html?id=${p.id}"><strong>${p.name}</strong></a><p class="muted">${p.cpu} · ${p.ram}</p><span class="price">${Store.money(p.price)}</span></div><div><label for="qty-${p.id}" class="small">Số lượng (tối đa ${p.stock})</label><input class="form-control quantity" id="qty-${p.id}" type="number" min="1" max="${p.stock}" value="${x.quantity}" data-quantity="${p.id}"><button class="text-button text-danger" data-remove="${p.id}">Xóa</button></div><strong data-line-total="${p.id}">${Store.money(p.price*x.quantity)}</strong></div>`; }).join('')}</section><aside class="panel order-summary"><h2>Thông tin giỏ hàng</h2><p>Tạm tính <strong class="cart-total">${Store.money(Store.total())}</strong></p><p>Phí vận chuyển <strong>Miễn phí (mô phỏng)</strong></p><hr><p>Tổng cộng <strong class="price cart-total">${Store.money(Store.total())}</strong></p><a href="checkout.html" class="btn btn-yellow w-100">Tiến hành thanh toán →</a><a href="products.html" class="continue-link">Tiếp tục mua sắm</a></aside></div>` : emptyState('Giỏ hàng của bạn đang trống'));
}
$(function () {
  $(document).on('click', '[data-add]', function () { addToCart($(this).data('add')); });
  if ($('#cart-content').length) renderCart();
  $(document).on('input change focusout', '[data-quantity]', function (event) {
    const id = Number($(this).data('quantity')); const value = Number(this.value); const p = Store.product(id);
    if (!Number.isInteger(value) || value < 1 || value > p.stock) { notify(`Số lượng phải là số nguyên từ 1 đến ${p.stock}.`, 'warning'); if (event.type !== 'input') renderCart(); return; }
    Store.set('cart', Store.cart().map(x => x.id === id ? { ...x, quantity: value } : x)); $('[data-line-total=\"'+id+'\" ]').text(Store.money(p.price * value)); $('.cart-total').text(Store.money(Store.total())); updateBadges();
  });
  $(document).on('click', '[data-remove]', function () { Store.set('cart', Store.cart().filter(x => x.id !== Number($(this).data('remove')))); renderCart(); updateBadges(); });
});

