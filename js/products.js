let currentPage = 1;
const pageSize = 8;
function renderProducts() {
  const query = $('#search-products').val().trim().toLocaleLowerCase('vi');
  const category = $('#filter-category').val(); const brand = $('#filter-brand').val(); const range = $('#filter-price').val();
  let list = products.filter(p => p.name.toLocaleLowerCase('vi').includes(query) && (!category || p.category === category) && (!brand || p.brand === brand) && (!range || (range === 'low' ? p.price < 15000000 : range === 'mid' ? p.price >= 15000000 && p.price <= 25000000 : p.price > 25000000)));
  const sort = $('#sort-products').val();
  if (sort === 'asc') list.sort((a,b) => a.price-b.price);
  if (sort === 'desc') list.sort((a,b) => b.price-a.price);
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name, 'vi'));
  const pages = Math.ceil(list.length/pageSize); currentPage = Math.max(1, Math.min(currentPage, pages || 1));
  $('#result-count').text(`${list.length} sản phẩm phù hợp`);
  $('#product-grid').html(list.length ? list.slice((currentPage-1)*pageSize, currentPage*pageSize).map(productCard).join('') : emptyState('Chưa tìm thấy cấu hình phù hợp'));
  $('#pagination').html(Array.from({length: pages}, (_,i) => `<button class="btn ${currentPage === i+1 ? 'btn-yellow' : 'btn-light'}" data-page="${i+1}" aria-label="Trang ${i+1}" ${currentPage === i+1 ? 'aria-current="page"' : ''}>${i+1}</button>`).join(''));
}
$(function () {
  if ($('#featured-grid').length) {
    $('#featured-grid').html(products.filter(p => p.category === 'gaming' && p.featured).map(productCard).join(''));
    $('#sale-grid').html([products[8],products[9],products[16],products[17]].map(productCard).join(''));
    $('#new-grid').html([products[4],products[12],products[20],products[21]].map(productCard).join(''));
  }
  const params = new URLSearchParams(location.search);
  if ($('#product-grid').length) {
    $('#search-products').val(params.get('q') || ''); $('#filter-category').val(params.get('category') || '');
    renderProducts();
    $('#search-products').on('input', () => { currentPage = 1; renderProducts(); });
    $('.product-filter').on('change', () => { currentPage = 1; renderProducts(); });
    $('#reset-filters').on('click', () => { $('#search-products').val(''); $('.product-filter').val(''); currentPage = 1; renderProducts(); });
    $('#pagination').on('click', '[data-page]', function () { currentPage = Number($(this).data('page')); renderProducts(); document.getElementById('listing-heading').scrollIntoView({behavior:'smooth'}); });
  }
  if ($('#product-detail').length) {
    const p = Store.product(params.get('id'));
    if (!p) { $('#product-detail').html(emptyState('Không tìm thấy sản phẩm')); return; }
    document.title = p.name + ' | PC Store';
    const fields = {cpu:'Bộ xử lý',ram:'Bộ nhớ RAM',gpu:'Card đồ họa',storage:'Ổ cứng',motherboard:'Mainboard',psu:'Bộ nguồn'};
    $('#product-detail').html(`<div class="detail-layout"><div class="panel detail-visual"><span class="eyebrow">${categoryNames[p.category]}</span><img src="${p.image}" alt="Minh họa ${p.name}"><p>Ảnh minh họa thiết kế bởi PC Store</p></div><div class="panel"><span class="eyebrow">SẴN SÀNG CHO GÓC MÁY CỦA BẠN</span><h1>${p.name}</h1><p class="${p.stock ? 'text-success' : 'text-danger'}">● ${p.stock ? `Còn hàng · ${p.stock} bộ` : 'Tạm hết hàng'}</p><del>${Store.money(p.oldPrice)}</del><div class="detail-price">${Store.money(p.price)}</div><p class="muted">Giá và cấu hình mô phỏng phục vụ bài tập.</p><div class="detail-highlights">${p.cpu}<br>${p.ram} · ${p.gpu}<br>${p.storage}</div><button class="btn btn-yellow btn-lg" data-add="${p.id}" ${!p.stock ? 'disabled' : ''}>+ Thêm vào giỏ hàng</button> <button class="btn btn-outline-dark btn-lg" data-compare="${p.id}">⇄ So sánh</button></div></div><div class="detail-layout mt-4"><section class="panel"><h2>Được tạo ra cho đam mê của bạn</h2><p>${p.description}</p><p>Thiết kế gọn gàng, dễ nâng cấp. Mọi thông số trong dự án dùng để thực hành hiển thị và xử lý dữ liệu.</p></section><section class="panel"><h2>Thông số kỹ thuật</h2><table class="table">${Object.entries(fields).map(([key,label])=>`<tr><th>${label}</th><td>${p[key]}</td></tr>`).join('')}</table></section></div><div class="section-heading"><h2>Cấu hình bạn có thể thích</h2></div><div class="product-grid">${products.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4).map(productCard).join('')}</div>`);
  }
});
