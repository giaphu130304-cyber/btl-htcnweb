// js trang chu
// du lieu sp mau (lay lai mot so sp tu trang danh sach de hien thi ngoai trang chu)
var dsSp = [
  { id: 1, ten: "Bộ PC Gaming ASUS TUF Core i5-13400F / RAM 16GB / RTX 4060 8GB", hang: "ASUS", danhMuc: "pc-gaming", nhuCau: "gaming", ts1: "i5-13400F", ts2: "RTX 4060", ts3: "RAM 16GB", giaCu: 23990000, giaMoi: 19990000, traGop: true, nhan: "BÁN CHẠY", qua: "Tặng bàn phím cơ + Chuột Gaming", sao: 4.9, luotMua: 86, doHot: 100, anh: "img/pc-gaming-1.jpg" },
  { id: 2, ten: "Bộ PC Gaming MSI MAG Core i5-12400F / RAM 16GB / RTX 3060 12GB", hang: "MSI", danhMuc: "pc-gaming", nhuCau: "gaming", ts1: "i5-12400F", ts2: "RTX 3060", ts3: "SSD 512GB", giaCu: 18990000, giaMoi: 15490000, traGop: true, nhan: "GIẢM SỐC", qua: "Tặng lót chuột size lớn + Tai nghe", sao: 4.8, luotMua: 72, doHot: 96, anh: "img/pc-gaming-2.jpg" },
  { id: 3, ten: "Bộ PC Workstation Đồ Họa Core i7-14700K / 32GB DDR5 / RTX 4070 Super", hang: "Intel", danhMuc: "pc-gaming", nhuCau: "cao-cap", ts1: "i7-14700K", ts2: "RTX 4070S", ts3: "RAM 32GB", giaCu: 43990000, giaMoi: 38490000, traGop: true, nhan: "CẤU HÌNH KHỦNG", qua: "Tặng tản nhiệt nước AIO 360 RGB", sao: 5.0, luotMua: 29, doHot: 95, anh: "img/pc-gaming-3.jpg" },
  { id: 7, ten: "Bộ PC Gaming AMD Ryzen 5 5600X / RAM 16GB / RX 6600 8GB", hang: "AMD", danhMuc: "pc-gaming", nhuCau: "gaming", ts1: "Ryzen 5 5600X", ts2: "RX 6600", ts3: "RAM 16GB", giaCu: 16490000, giaMoi: 13490000, traGop: true, nhan: "GIẢM SỐC", qua: "Tặng tai nghe Gaming giả lập 7.1", sao: 4.8, luotMua: 68, doHot: 92, anh: "img/pc-gaming-2.jpg" },
  { id: 6, ten: "Bộ PC Văn Phòng ASUS ExpertCenter Core i3-12100 / RAM 8GB / SSD 256GB", hang: "ASUS", danhMuc: "pc-office", nhuCau: "van-phong", ts1: "i3-12100", ts2: "RAM 8GB", ts3: "SSD 256GB", giaCu: 9490000, giaMoi: 7690000, traGop: false, nhan: "GIÁ RẺ", qua: "Tặng bộ bàn phím + chuột văn phòng", sao: 4.7, luotMua: 54, doHot: 88, anh: "img/pc-office-1.jpg" },
  { id: 11, ten: "Bộ PC Văn Phòng Kế Toán Core i5-12400 / RAM 16GB / SSD 512GB NVMe", hang: "Intel", danhMuc: "pc-office", nhuCau: "van-phong", ts1: "i5-12400", ts2: "RAM 16GB", ts3: "SSD 512GB", giaCu: 12490000, giaMoi: 10490000, traGop: true, nhan: "", qua: "Cài đặt miễn phí trọn đời + Tặng phím chuột", sao: 4.7, luotMua: 39, doHot: 84, anh: "img/pc-office-2.jpg" },
  { id: 4, ten: "Màn hình Gaming LG UltraGear 27GS60F 27 inch FHD IPS 180Hz 1ms", hang: "LG", danhMuc: "monitors", nhuCau: "gaming", ts1: "27 inch", ts2: "180Hz", ts3: "IPS 1ms", giaCu: 4990000, giaMoi: 3890000, traGop: true, nhan: "HOT DEAL", qua: "Tặng cáp DisplayPort 1.4", sao: 4.9, luotMua: 114, doHot: 98, anh: "img/monitor-1.jpg" },
  { id: 8, ten: "Màn hình ASUS TUF Gaming VG249Q3A 24 inch FHD Fast IPS 180Hz", hang: "ASUS", danhMuc: "monitors", nhuCau: "gaming", ts1: "24 inch", ts2: "180Hz", ts3: "99% sRGB", giaCu: 4290000, giaMoi: 3390000, traGop: false, nhan: "SINH VIÊN", qua: "Miễn phí giao hàng nội thành", sao: 4.8, luotMua: 97, doHot: 94, anh: "img/monitor-2.jpg" },
  { id: 5, ten: "VGA Gigabyte GeForce RTX 4060 WindForce OC 8GB GDDR6", hang: "Gigabyte", danhMuc: "hardware", nhuCau: "gaming", ts1: "8GB GDDR6", ts2: "2 Fan OC", ts3: "DLSS 3", giaCu: 9690000, giaMoi: 8190000, traGop: true, nhan: "BÁN CHẠY", qua: "Giảm thêm 200.000đ khi build kèm PC", sao: 4.8, luotMua: 63, doHot: 93, anh: "img/vga-rtx.jpg" },
  { id: 9, ten: "CPU Intel Core i5-13400F (Up to 4.6GHz, 10 Nhân 16 Luồng, 20MB Cache)", hang: "Intel", danhMuc: "hardware", nhuCau: "gaming", ts1: "10 Nhân", ts2: "16 Luồng", ts3: "Socket 1700", giaCu: 5990000, giaMoi: 4890000, traGop: false, nhan: "", qua: "Tặng keo tản nhiệt cao cấp", sao: 4.9, luotMua: 81, doHot: 89, anh: "img/cpu-chip.jpg" },
  { id: 10, ten: "RAM Desktop Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz", hang: "Corsair", danhMuc: "hardware", nhuCau: "do-hoa", ts1: "32GB DDR5", ts2: "6000MHz", ts3: "LED RGB", giaCu: 3890000, giaMoi: 3190000, traGop: false, nhan: "GIẢM SỐC", qua: "Bảo hành 1 đổi 1 36 tháng", sao: 4.9, luotMua: 45, doHot: 85, anh: "img/main-ram.jpg" },
  { id: 15, ten: "Mainboard MSI B760M Gaming Plus WIFI DDR5", hang: "MSI", danhMuc: "hardware", nhuCau: "gaming", ts1: "Socket 1700", ts2: "4 khe DDR5", ts3: "WiFi 6E", giaCu: 4690000, giaMoi: 3990000, traGop: false, nhan: "", qua: "Hỗ trợ cập nhật BIOS miễn phí", sao: 4.7, luotMua: 41, doHot: 80, anh: "img/main-ram.jpg" }
];

// doi so thanh tien vn
function doiTien(so) {
  return so.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

// tinh % giam
function tinhGiam(cu, moi) {
  return Math.round(((cu - moi) / cu) * 100);
}

// tim sp theo id
function timSp(idSp) {
  for (var i = 0; i < dsSp.length; i++) {
    if (dsSp[i].id === idSp) return dsSp[i];
  }
  return null;
}

// ve 1 khoi san pham theo danh sach id
function veKhoi(idKhung, dsId) {
  var khung = document.getElementById(idKhung);
  if (!khung) return;

  var html = "";
  for (var i = 0; i < dsId.length; i++) {
    var sp = timSp(dsId[i]);
    if (!sp) continue;
    var giam = tinhGiam(sp.giaCu, sp.giaMoi);

    var htmlGop = sp.traGop
      ? '<span class="nhan-gop">Trả góp 0%</span>'
      : '<div class="nhan-gop-trong"></div>';

    var htmlHot = sp.nhan !== ""
      ? '<span class="nhan-hot">' + sp.nhan + '</span>'
      : '';

    html += `
      <div class="the-sp">
        ${htmlGop}
        <div class="khung-anh-sp" onclick="xemChiTiet(${sp.id})">
          <img src="${sp.anh}" alt="${sp.ten}">
        </div>
        ${htmlHot}
        <h3 class="ten-sp" onclick="xemChiTiet(${sp.id})" title="${sp.ten}">${sp.ten}</h3>
        <div class="ds-thong-so">
          <span class="tag-ts">${sp.ts1}</span>
          <span class="tag-ts">${sp.ts2}</span>
          <span class="tag-ts">${sp.ts3}</span>
        </div>
        <div class="gia-moi">${doiTien(sp.giaMoi)}</div>
        <div class="hang-gia-cu">
          <span class="gia-cu">${doiTien(sp.giaCu)}</span>
          <span class="giam-pt">-${giam}%</span>
        </div>
        <div class="qua-km">🎁 ${sp.qua}</div>
        <div class="chan-the">
          <div class="diem-sao">${sp.sao} ★ <span>(${sp.luotMua})</span></div>
          <div>
            <button type="button" class="nut-mua" onclick="xemChiTiet(${sp.id})">Chi tiết</button>
            <button type="button" class="nut-mua" onclick="themGioHang(${sp.id})">+ Giỏ hàng</button>
          </div>
        </div>
      </div>
    `;
  }
  khung.innerHTML = html;
}

// bam vao sp thi sang trang chi tiet (dung chung key localstorage voi trang san pham)
function xemChiTiet(idSp) {
  var sp = timSp(idSp);
  if (!sp) return;
  localStorage.setItem("spDangXem", JSON.stringify(sp));
  localStorage.setItem("selected_product_id", sp.id);
  window.location.href = "chitiet.html";
}

// them vao gio hang (cung key voi trang san pham)
function themGioHang(idSp) {
  var sp = timSp(idSp);
  if (!sp) return;

  var gio = JSON.parse(localStorage.getItem("gioHangBoPC")) || [];
  var timThay = false;

  for (var j = 0; j < gio.length; j++) {
    if (gio[j].id === idSp) {
      gio[j].soLuong += 1;
      timThay = true;
      break;
    }
  }

  if (!timThay) {
    gio.push({
      id: sp.id,
      ten: sp.ten,
      gia: sp.giaMoi,
      anh: sp.anh,
      soLuong: 1
    });
  }

  localStorage.setItem("gioHangBoPC", JSON.stringify(gio));
  capNhatBadgeGio();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function capNhatBadgeGio() {
  var gio = JSON.parse(localStorage.getItem("gioHangBoPC")) || [];
  var tong = 0;
  for (var i = 0; i < gio.length; i++) {
    tong += gio[i].soLuong;
  }
  var badge = document.querySelector(".cart-badge");
  var chuGio = document.querySelector(".action-cart .action-value");
  if (badge) badge.innerText = tong;
  if (chuGio) chuGio.innerText = "(" + tong + ") sản phẩm";
}

// ===== slide banner =====
var slideHienTai = 0;
var timerSlide = null;

function hienSlide(viTri) {
  var dsSlide = document.querySelectorAll("#slideLon .slide-item");
  var dsCham = document.querySelectorAll("#chamSlide .cham");
  if (dsSlide.length === 0) return;

  if (viTri < 0) viTri = dsSlide.length - 1;
  if (viTri >= dsSlide.length) viTri = 0;
  slideHienTai = viTri;

  for (var i = 0; i < dsSlide.length; i++) {
    dsSlide[i].classList.remove("hien");
    if (dsCham[i]) dsCham[i].classList.remove("hien");
  }
  dsSlide[viTri].classList.add("hien");
  if (dsCham[viTri]) dsCham[viTri].classList.add("hien");
}

function doiSlide(buoc) {
  hienSlide(slideHienTai + buoc);
  chayLaiTimer();
}

function chayLaiTimer() {
  clearInterval(timerSlide);
  timerSlide = setInterval(function () {
    hienSlide(slideHienTai + 1);
  }, 4500);
}

function taoChamSlide() {
  var soSlide = document.querySelectorAll("#slideLon .slide-item").length;
  var khungCham = document.getElementById("chamSlide");
  if (!khungCham) return;
  for (var i = 0; i < soSlide; i++) {
    var cham = document.createElement("span");
    cham.className = "cham";
    cham.setAttribute("data-vitri", i);
    cham.onclick = function () {
      hienSlide(Number(this.getAttribute("data-vitri")));
      chayLaiTimer();
    };
    khungCham.appendChild(cham);
  }
}

// khoi tao khi load trang
window.onload = function () {
  veKhoi("khungPcGaming", [1, 2, 3, 7]);
  veKhoi("khungVanPhong", [6, 11, 4, 8]);
  veKhoi("khungLinhKien", [5, 9, 10, 15]);
  capNhatBadgeGio();

  taoChamSlide();
  hienSlide(0);
  chayLaiTimer();
};
