function renderCompare() {
  const selected = Store.get('compare').map(id => Store.product(id)).filter(Boolean);
  if (!selected.length) { $('#compare-content').html(emptyState('Chọn tối đa 3 PC để so sánh')); return; }
  const fields = { price: 'Giá', cpu: 'CPU', ram: 'RAM', gpu: 'GPU', storage: 'Ổ cứng', motherboard: 'Mainboard', psu: 'Nguồn', stock: 'Tồn kho' };
  $('#compare-content').html(`<p class="muted">${selected.length < 2 ? 'Hãy thêm ít nhất 1 sản phẩm nữa để đối chiếu cấu hình.' : 'Đối chiếu cấu hình và chọn chiếc PC phù hợp.'}</p><div class="panel table-responsive"><table class="table compare-table"><thead><tr><th>Thông số</th>${selected.map(p => `<th><img src="${p.image}" alt="${p.name}"><a href="product-detail.html?id=${p.id}">${p.name}</a><button class="text-button text-danger" data-uncompare="${p.id}">Xóa khỏi so sánh</button></th>`).join('')}</tr></thead><tbody>${Object.entries(fields).map(([key,label]) => `<tr><th>${label}</th>${selected.map(p => `<td>${key === 'price' ? Store.money(p[key]) : p[key]}</td>`).join('')}</tr>`).join('')}<tr><th>Mua sản phẩm</th>${selected.map(p => `<td><button class="btn btn-yellow" data-add="${p.id}" ${!p.stock ? 'disabled' : ''}>Thêm vào giỏ</button></td>`).join('')}</tr></tbody></table></div><a href="products.html" class="btn btn-outline-dark mt-3">+ Chọn thêm sản phẩm</a>`);
}
$(function () {
  $(document).on('click', '[data-compare]', function () {
    const id = Number($(this).data('compare')); const selected = Store.get('compare');
    if (selected.includes(id)) return notify('PC này đã có trong danh sách so sánh.', 'info');
    if (selected.length >= 3) return notify('Chỉ có thể so sánh tối đa 3 sản phẩm. Hãy xóa một PC ở trang So sánh.', 'warning');
    selected.push(id); Store.set('compare', selected); updateBadges(); notify('Đã thêm PC vào danh sách so sánh.');
  });
  $(document).on('click', '[data-uncompare]', function () { Store.set('compare', Store.get('compare').filter(id => id !== Number($(this).data('uncompare')))); renderCompare(); updateBadges(); });
  if ($('#compare-content').length) renderCompare();
});
