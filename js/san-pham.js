// du lieu sp mau
var dsSanPham = [
  {
    id: 1,
    ten: "Bộ PC Gaming ASUS TUF Core i5-13400F / RAM 16GB / RTX 4060 8GB",
    hang: "ASUS",
    danhMuc: "pc-gaming",
    nhuCau: "gaming",
    ts1: "i5-13400F",
    ts2: "RTX 4060",
    ts3: "RAM 16GB",
    giaCu: 23990000,
    giaMoi: 19990000,
    traGop: true,
    nhan: "BÁN CHẠY",
    qua: "Tặng bàn phím cơ + Chuột Gaming",
    sao: 4.9,
    luotMua: 86,
    doHot: 100,
    anh: "img/pc-gaming-1.jpg"
  },
  {
    id: 2,
    ten: "Bộ PC Gaming MSI MAG Core i5-12400F / RAM 16GB / RTX 3060 12GB",
    hang: "MSI",
    danhMuc: "pc-gaming",
    nhuCau: "gaming",
    ts1: "i5-12400F",
    ts2: "RTX 3060",
    ts3: "SSD 512GB",
    giaCu: 18990000,
    giaMoi: 15490000,
    traGop: true,
    nhan: "GIẢM SỐC",
    qua: "Tặng lót chuột size lớn + Tai nghe",
    sao: 4.8,
    luotMua: 72,
    doHot: 96,
    anh: "img/pc-gaming-2.jpg"
  },
  {
    id: 3,
    ten: "Bộ PC Workstation Đồ Họa Core i7-14700K / 32GB DDR5 / RTX 4070 Super",
    hang: "Intel",
    danhMuc: "pc-gaming",
    nhuCau: "cao-cap",
    ts1: "i7-14700K",
    ts2: "RTX 4070S",
    ts3: "RAM 32GB",
    giaCu: 43990000,
    giaMoi: 38490000,
    traGop: true,
    nhan: "CẤU HÌNH KHỦNG",
    qua: "Tặng tản nhiệt nước AIO 360 RGB",
    sao: 5.0,
    luotMua: 29,
    doHot: 95,
    anh: "img/pc-gaming-3.jpg"
  },
  {
    id: 4,
    ten: "Màn hình Gaming LG UltraGear 27GS60F 27 inch FHD IPS 180Hz 1ms",
    hang: "LG",
    danhMuc: "monitors",
    nhuCau: "gaming",
    ts1: "27 inch",
    ts2: "180Hz",
    ts3: "IPS 1ms",
    giaCu: 4990000,
    giaMoi: 3890000,
    traGop: true,
    nhan: "HOT DEAL",
    qua: "Tặng cáp DisplayPort 1.4",
    sao: 4.9,
    luotMua: 114,
    doHot: 98,
    anh: "img/monitor-1.jpg"
  },
  {
    id: 5,
    ten: "VGA Gigabyte GeForce RTX 4060 WindForce OC 8GB GDDR6",
    hang: "Gigabyte",
    danhMuc: "hardware",
    nhuCau: "gaming",
    ts1: "8GB GDDR6",
    ts2: "2 Fan OC",
    ts3: "DLSS 3",
    giaCu: 9690000,
    giaMoi: 8190000,
    traGop: true,
    nhan: "BÁN CHẠY",
    qua: "Giảm thêm 200.000đ khi build kèm PC",
    sao: 4.8,
    luotMua: 63,
    doHot: 93,
    anh: "img/vga-rtx.jpg"
  },
  {
    id: 6,
    ten: "Bộ PC Văn Phòng ASUS ExpertCenter Core i3-12100 / RAM 8GB / SSD 256GB",
    hang: "ASUS",
    danhMuc: "pc-office",
    nhuCau: "van-phong",
    ts1: "i3-12100",
    ts2: "RAM 8GB",
    ts3: "SSD 256GB",
    giaCu: 9490000,
    giaMoi: 7690000,
    traGop: false,
    nhan: "GIÁ RẺ",
    qua: "Tặng bộ bàn phím + chuột văn phòng",
    sao: 4.7,
    luotMua: 54,
    doHot: 88,
    anh: "img/pc-office-1.jpg"
  },
  {
    id: 7,
    ten: "Bộ PC Gaming AMD Ryzen 5 5600X / RAM 16GB / RX 6600 8GB",
    hang: "AMD",
    danhMuc: "pc-gaming",
    nhuCau: "gaming",
    ts1: "Ryzen 5 5600X",
    ts2: "RX 6600",
    ts3: "RAM 16GB",
    giaCu: 16490000,
    giaMoi: 13490000,
    traGop: true,
    nhan: "GIẢM SỐC",
    qua: "Tặng tai nghe Gaming giả lập 7.1",
    sao: 4.8,
    luotMua: 68,
    doHot: 92,
    anh: "img/pc-gaming-2.jpg"
  },
  {
    id: 8,
    ten: "Màn hình ASUS TUF Gaming VG249Q3A 24 inch FHD Fast IPS 180Hz",
    hang: "ASUS",
    danhMuc: "monitors",
    nhuCau: "gaming",
    ts1: "24 inch",
    ts2: "180Hz",
    ts3: "99% sRGB",
    giaCu: 4290000,
    giaMoi: 3390000,
    traGop: false,
    nhan: "SINH VIÊN",
    qua: "Miễn phí giao hàng nội thành",
    sao: 4.8,
    luotMua: 97,
    doHot: 94,
    anh: "img/monitor-2.jpg"
  },
  {
    id: 9,
    ten: "CPU Intel Core i5-13400F (Up to 4.6GHz, 10 Nhân 16 Luồng, 20MB Cache)",
    hang: "Intel",
    danhMuc: "hardware",
    nhuCau: "gaming",
    ts1: "10 Nhân",
    ts2: "16 Luồng",
    ts3: "Socket 1700",
    giaCu: 5990000,
    giaMoi: 4890000,
    traGop: false,
    nhan: "",
    qua: "Tặng keo tản nhiệt cao cấp",
    sao: 4.9,
    luotMua: 81,
    doHot: 89,
    anh: "img/cpu-chip.jpg"
  },
  {
    id: 10,
    ten: "RAM Desktop Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
    hang: "Corsair",
    danhMuc: "hardware",
    nhuCau: "do-hoa",
    ts1: "32GB DDR5",
    ts2: "6000MHz",
    ts3: "LED RGB",
    giaCu: 3890000,
    giaMoi: 3190000,
    traGop: false,
    nhan: "GIẢM SỐC",
    qua: "Bảo hành 1 đổi 1 36 tháng",
    sao: 4.9,
    luotMua: 45,
    doHot: 85,
    anh: "img/main-ram.jpg"
  },
  {
    id: 11,
    ten: "Bộ PC Văn Phòng Kế Toán Core i5-12400 / RAM 16GB / SSD 512GB NVMe",
    hang: "Intel",
    danhMuc: "pc-office",
    nhuCau: "van-phong",
    ts1: "i5-12400",
    ts2: "RAM 16GB",
    ts3: "SSD 512GB",
    giaCu: 12490000,
    giaMoi: 10490000,
    traGop: true,
    nhan: "",
    qua: "Cài đặt miễn phí trọn đời + Tặng phím chuột",
    sao: 4.7,
    luotMua: 39,
    doHot: 84,
    anh: "img/pc-office-2.jpg"
  },
  {
    id: 12,
    ten: "Màn hình Cong Samsung Odyssey G5 G55C 27 inch 2K VA 165Hz",
    hang: "Samsung",
    danhMuc: "monitors",
    nhuCau: "do-hoa",
    ts1: "27\" 2K",
    ts2: "165Hz",
    ts3: "Cong 1000R",
    giaCu: 6890000,
    giaMoi: 5490000,
    traGop: true,
    nhan: "HOT DEAL",
    qua: "Giảm 300.000đ khi mua kèm Arm màn hình",
    sao: 4.7,
    luotMua: 52,
    doHot: 87,
    anh: "img/monitor-1.jpg"
  },
  {
    id: 13,
    ten: "Bộ PC Gaming Gigabyte AORUS Ryzen 7 7800X3D / 32GB / RTX 4070 Ti",
    hang: "Gigabyte",
    danhMuc: "pc-gaming",
    nhuCau: "cao-cap",
    ts1: "R7 7800X3D",
    ts2: "RTX 4070Ti",
    ts3: "32GB DDR5",
    giaCu: 52990000,
    giaMoi: 46990000,
    traGop: true,
    nhan: "CAO CẤP",
    qua: "Tặng ghế Gaming + Bàn phím cơ không dây",
    sao: 5.0,
    luotMua: 17,
    doHot: 90,
    anh: "img/pc-gaming-1.jpg"
  },
  {
    id: 14,
    ten: "VGA ASUS Dual GeForce RTX 4060 Ti OC Edition 8GB GDDR6",
    hang: "ASUS",
    danhMuc: "hardware",
    nhuCau: "do-hoa",
    ts1: "RTX 4060Ti",
    ts2: "8GB GDDR6",
    ts3: "PCIe 4.0",
    giaCu: 12990000,
    giaMoi: 11290000,
    traGop: true,
    nhan: "",
    qua: "Tặng giá đỡ VGA chống xệ",
    sao: 4.8,
    luotMua: 34,
    doHot: 83,
    anh: "img/vga-rtx.jpg"
  },
  {
    id: 15,
    ten: "Mainboard MSI B760M Gaming Plus WIFI DDR5",
    hang: "MSI",
    danhMuc: "hardware",
    nhuCau: "gaming",
    ts1: "Socket 1700",
    ts2: "4 khe DDR5",
    ts3: "WiFi 6E",
    giaCu: 4690000,
    giaMoi: 3990000,
    traGop: false,
    nhan: "",
    qua: "Hỗ trợ cập nhật BIOS miễn phí",
    sao: 4.7,
    luotMua: 41,
    doHot: 80,
    anh: "img/main-ram.jpg"
  },
  {
    id: 16,
    ten: "CPU AMD Ryzen 7 5700X (8 Nhân 16 Luồng, Up to 4.6GHz, AM4)",
    hang: "AMD",
    danhMuc: "hardware",
    nhuCau: "do-hoa",
    ts1: "8 Nhân",
    ts2: "16 Luồng",
    ts3: "Socket AM4",
    giaCu: 5490000,
    giaMoi: 4390000,
    traGop: false,
    nhan: "GIẢM SỐC",
    qua: "Giảm 150K khi mua kèm tản khí",
    sao: 4.8,
    luotMua: 58,
    doHot: 86,
    anh: "img/cpu-chip.jpg"
  },
  {
    id: 17,
    ten: "Bộ PC Văn Phòng Mini MSI PRO DP21 Core i5-13400 / 16GB / 512GB WiFi",
    hang: "MSI",
    danhMuc: "pc-office",
    nhuCau: "van-phong",
    ts1: "i5-13400",
    ts2: "Nhỏ gọn",
    ts3: "Có WiFi",
    giaCu: 14990000,
    giaMoi: 12790000,
    traGop: true,
    nhan: "",
    qua: "Tặng Windows 11 bản quyền theo máy",
    sao: 4.6,
    luotMua: 23,
    doHot: 78,
    anh: "img/pc-office-1.jpg"
  },
  {
    id: 18,
    ten: "Màn hình Đồ Họa LG 27UP600 27 inch 4K UHD IPS VESA DisplayHDR 400",
    hang: "LG",
    danhMuc: "monitors",
    nhuCau: "do-hoa",
    ts1: "27\" 4K UHD",
    ts2: "IPS 10-bit",
    ts3: "95% DCI-P3",
    giaCu: 7990000,
    giaMoi: 6490000,
    traGop: true,
    nhan: "CHUẨN MÀU",
    qua: "Cân màu miễn phí tại cửa hàng",
    sao: 4.9,
    luotMua: 47,
    doHot: 82,
    anh: "img/monitor-2.jpg"
  },
  {
    id: 19,
    ten: "Bộ PC Streamer & Render Core i5-14600KF / 32GB RGB / RTX 4060 Ti 16GB",
    hang: "Corsair",
    danhMuc: "pc-gaming",
    nhuCau: "do-hoa",
    ts1: "i5-14600KF",
    ts2: "RTX 4060Ti",
    ts3: "RAM 32GB",
    giaCu: 32990000,
    giaMoi: 27990000,
    traGop: true,
    nhan: "BÁN CHẠY",
    qua: "Tặng Micro thu âm + Webcam Full HD",
    sao: 4.9,
    luotMua: 31,
    doHot: 91,
    anh: "img/pc-gaming-3.jpg"
  },
  {
    id: 20,
    ten: "Màn hình MSI G255F 24.5 inch FHD Rapid IPS 180Hz 1ms",
    hang: "MSI",
    danhMuc: "monitors",
    nhuCau: "gaming",
    ts1: "24.5 inch",
    ts2: "180Hz",
    ts3: "Rapid IPS",
    giaCu: 3990000,
    giaMoi: 3090000,
    traGop: false,
    nhan: "GIÁ RẺ",
    qua: "Bảo hành chính hãng 36 tháng",
    sao: 4.7,
    luotMua: 64,
    doHot: 81,
    anh: "img/monitor-1.jpg"
  },
  {
    id: 21,
    ten: "Bộ PC Học Tập Sinh Viên Ryzen 5 4600G / RAM 16GB / SSD 512GB",
    hang: "AMD",
    danhMuc: "pc-office",
    nhuCau: "van-phong",
    ts1: "R5 4600G",
    ts2: "Vega 7",
    ts3: "RAM 16GB",
    giaCu: 8990000,
    giaMoi: 7290000,
    traGop: false,
    nhan: "SINH VIÊN",
    qua: "Giảm thêm 200K khi xuất trình thẻ SV",
    sao: 4.8,
    luotMua: 76,
    doHot: 87,
    anh: "img/pc-office-2.jpg"
  },
  {
    id: 22,
    ten: "Màn hình Samsung ViewFinity S8 27 inch 4K IPS USB-C 90W",
    hang: "Samsung",
    danhMuc: "monitors",
    nhuCau: "cao-cap",
    ts1: "27\" 4K",
    ts2: "USB-C 90W",
    ts3: "98% sRGB",
    giaCu: 9990000,
    giaMoi: 8290000,
    traGop: true,
    nhan: "",
    qua: "Tặng cáp Type-C chính hãng",
    sao: 4.8,
    luotMua: 22,
    doHot: 77,
    anh: "img/monitor-2.jpg"
  }
];

// bien luu trang thai
var hangChon = "all";
var kieuXep = "noi-bat";
var trangHienTai = 1;
var soSp1Trang = 8;

function doiTien(so) {
  return so.toLocaleString("vi-VN") + "₫";
}

function tinhGiam(cu, moi) {
  if (cu <= moi) return 0;
  return Math.round(((cu - moi) / cu) * 100);
}

// loc + tim kiem + sap xep
function layDsDaLoc() {
  var tuKhoa = document.getElementById("oTimKiem").value.toLowerCase().trim();
  var danhMuc = document.getElementById("chonDanhMuc").value;
  var mucGia = document.getElementById("chonGia").value;
  var nhuCau = document.getElementById("chonNhuCau").value;
  var chiTraGop = document.getElementById("chkGop").checked;
  var chiGiamSau = document.getElementById("chkGiamSau").checked;

  var kq = [];

  for (var i = 0; i < dsSanPham.length; i++) {
    var sp = dsSanPham[i];
    var ptGiam = tinhGiam(sp.giaCu, sp.giaMoi);

    // check tu khoa
    if (tuKhoa !== "") {
      var gopChuoi = (sp.ten + " " + sp.hang + " " + sp.ts1 + " " + sp.ts2 + " " + sp.ts3).toLowerCase();
      if (gopChuoi.indexOf(tuKhoa) === -1) {
        continue;
      }
    }

    if (hangChon !== "all" && sp.hang !== hangChon) continue;
    if (danhMuc !== "all" && sp.danhMuc !== danhMuc) continue;
    if (nhuCau !== "all" && sp.nhuCau !== nhuCau) continue;

    // check gia
    if (mucGia === "duoi-5" && sp.giaMoi >= 5000000) continue;
    if (mucGia === "5-15" && (sp.giaMoi < 5000000 || sp.giaMoi > 15000000)) continue;
    if (mucGia === "15-25" && (sp.giaMoi <= 15000000 || sp.giaMoi > 25000000)) continue;
    if (mucGia === "tren-25" && sp.giaMoi <= 25000000) continue;

    if (chiTraGop && !sp.traGop) continue;
    if (chiGiamSau && ptGiam < 15) continue;

    kq.push(sp);
  }

  // sap xep mang
  kq.sort(function (a, b) {
    if (kieuXep === "gia-tang") {
      return a.giaMoi - b.giaMoi;
    } else if (kieuXep === "gia-giam") {
      return b.giaMoi - a.giaMoi;
    } else if (kieuXep === "giam-nhieu") {
      return tinhGiam(b.giaCu, b.giaMoi) - tinhGiam(a.giaCu, a.giaMoi);
    } else if (kieuXep === "ten-az") {
      return a.ten.localeCompare(b.ten, "vi");
    } else {
      return b.doHot - a.doHot;
    }
  });

  return kq;
}

// do sp ra giao dien
function hienThiSp() {
  var listLoc = layDsDaLoc();
  var khung = document.getElementById("khungSanPham");
  document.getElementById("demSp").innerText = listLoc.length;

  if (listLoc.length === 0) {
    khung.innerHTML =
      '<div class="khong-co-sp">' +
      '<h4>Không tìm thấy sản phẩm nào phù hợp!</h4>' +
      '<p>Thử đổi từ khóa khác hoặc bấm xóa bộ lọc để xem lại toàn bộ máy.</p>' +
      '<button class="nut-xoa-loc" onclick="resetLoc()">Đặt lại bộ lọc</button>' +
      '</div>';
    document.getElementById("nutPhanTrang").innerHTML = "";
    return;
  }

  var tongTrang = Math.ceil(listLoc.length / soSp1Trang);
  if (trangHienTai > tongTrang) {
    trangHienTai = 1;
  }

  // cat mang theo trang
  var batDau = (trangHienTai - 1) * soSp1Trang;
  var ketThuc = batDau + soSp1Trang;
  var spTrangNay = listLoc.slice(batDau, ketThuc);

  var html = "";
  for (var i = 0; i < spTrangNay.length; i++) {
    var sp = spTrangNay[i];
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
        <div class="khung-anh-sp" onclick="moXemNhanh(${sp.id})">
          <img src="${sp.anh}" alt="${sp.ten}">
        </div>
        ${htmlHot}
        <h3 class="ten-sp" onclick="moXemNhanh(${sp.id})" title="${sp.ten}">${sp.ten}</h3>
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
          <button class="nut-mua" onclick="themGioHang(${sp.id})">+ Giỏ hàng</button>
        </div>
      </div>
    `;
  }

  khung.innerHTML = html;
  taoPhanTrang(tongTrang);
}

// tao nut phan trang
function taoPhanTrang(tongTrang) {
  var khuTrang = document.getElementById("nutPhanTrang");
  var html = "";

  var khoaTruoc = trangHienTai === 1 ? "disabled" : "";
  html += `<button class="nut-trang" ${khoaTruoc} onclick="doiTrang(${trangHienTai - 1})">&laquo; Trước</button>`;

  for (var p = 1; p <= tongTrang; p++) {
    var dangChon = p === trangHienTai ? "active" : "";
    html += `<button class="nut-trang ${dangChon}" onclick="doiTrang(${p})">${p}</button>`;
  }

  var khoaSau = trangHienTai === tongTrang ? "disabled" : "";
  html += `<button class="nut-trang" ${khoaSau} onclick="doiTrang(${trangHienTai + 1})">Sau &raquo;</button>`;

  khuTrang.innerHTML = html;
}

function doiTrang(soTrang) {
  var listLoc = layDsDaLoc();
  var tongTrang = Math.ceil(listLoc.length / soSp1Trang);
  if (soTrang < 1 || soTrang > tongTrang) return;

  trangHienTai = soTrang;
  hienThiSp();
  document.getElementById("khuBoLoc").scrollIntoView({ behavior: "smooth" });
}

// chon hang tren hang nut
function chonHang(tenHang, nut) {
  hangChon = tenHang;
  trangHienTai = 1;

  var dsNut = document.querySelectorAll(".nut-hang");
  for (var i = 0; i < dsNut.length; i++) {
    dsNut[i].classList.remove("active");
  }
  nut.classList.add("active");
  hienThiSp();
}

// chon kieu sap xep
function chonXep(kieu, nut) {
  kieuXep = kieu;
  trangHienTai = 1;

  var dsNut = document.querySelectorAll(".nut-xep");
  for (var i = 0; i < dsNut.length; i++) {
    dsNut[i].classList.remove("active");
  }
  nut.classList.add("active");
  hienThiSp();
}

// goi khi thay doi select hoac o tim kiem
function locLai() {
  var oHeader = document.querySelector(".header-search .search-input");
  if (oHeader) {
    oHeader.value = document.getElementById("oTimKiem").value;
  }
  trangHienTai = 1;
  hienThiSp();
}

// dua het ve ban dau
function resetLoc() {
  hangChon = "all";
  kieuXep = "noi-bat";
  trangHienTai = 1;

  document.getElementById("oTimKiem").value = "";
  document.getElementById("chonDanhMuc").value = "all";
  document.getElementById("chonGia").value = "all";
  document.getElementById("chonNhuCau").value = "all";
  document.getElementById("chkGop").checked = false;
  document.getElementById("chkGiamSau").checked = false;

  var oHeader = document.querySelector(".header-search .search-input");
  if (oHeader) oHeader.value = "";

  var dsHang = document.querySelectorAll(".nut-hang");
  for (var i = 0; i < dsHang.length; i++) dsHang[i].classList.remove("active");
  if (dsHang[0]) dsHang[0].classList.add("active");

  var dsXep = document.querySelectorAll(".nut-xep");
  for (var j = 0; j < dsXep.length; j++) dsXep[j].classList.remove("active");
  if (dsXep[0]) dsXep[0].classList.add("active");

  var navItems = document.querySelectorAll("#main-navbar .nav-link");
  for (var k = 0; k < navItems.length; k++) navItems[k].classList.remove("active");

  hienThiSp();
}

// mo popup xem thong tin nhanh
function moXemNhanh(idSp) {
  var sp = null;
  for (var i = 0; i < dsSanPham.length; i++) {
    if (dsSanPham[i].id === idSp) {
      sp = dsSanPham[i];
      break;
    }
  }
  if (!sp) return;

  // luu tam vao localstorage de ghep trang chi tiet neu can
  localStorage.setItem("spDangXem", JSON.stringify(sp));

  var giam = tinhGiam(sp.giaCu, sp.giaMoi);
  document.getElementById("noiDungPopup").innerHTML = `
    <div>
      <img src="${sp.anh}" alt="${sp.ten}">
    </div>
    <div>
      <h3 style="margin-bottom:8px; font-size:17px;">${sp.ten}</h3>
      <div style="margin-bottom:8px;">
        <span class="gia-moi" style="font-size:20px; margin-right:8px;">${doiTien(sp.giaMoi)}</span>
        <span class="gia-cu">${doiTien(sp.giaCu)}</span>
        <span class="giam-pt">-${giam}%</span>
      </div>
      <table class="bang-ts-nhanh">
        <tr><td>Hãng</td><td>${sp.hang}</td></tr>
        <tr><td>Thông số 1</td><td>${sp.ts1}</td></tr>
        <tr><td>Thông số 2</td><td>${sp.ts2}</td></tr>
        <tr><td>Thông số 3</td><td>${sp.ts3}</td></tr>
        <tr><td>Khuyến mãi</td><td>${sp.qua}</td></tr>
      </table>
      <button class="nut-mua-popup" onclick="themGioHang(${sp.id})">THÊM VÀO GIỎ HÀNG</button>
    </div>
  `;

  document.getElementById("popupChiTiet").classList.add("hien");
}

function dongPopup() {
  document.getElementById("popupChiTiet").classList.remove("hien");
}

// luu gio hang vao localstorage
function themGioHang(idSp) {
  var sp = null;
  for (var i = 0; i < dsSanPham.length; i++) {
    if (dsSanPham[i].id === idSp) {
      sp = dsSanPham[i];
      break;
    }
  }
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

// khoi tao khi load trang + gan su kien cho header/navbar co san
window.onload = function () {
  hienThiSp();
  capNhatBadgeGio();

  // dong bo thanh search tren header
  var formTimHeader = document.querySelector(".header-search .search-form");
  var inputHeader = document.querySelector(".header-search .search-input");
  if (formTimHeader && inputHeader) {
    formTimHeader.onsubmit = function (e) {
      e.preventDefault();
      document.getElementById("oTimKiem").value = inputHeader.value;
      trangHienTai = 1;
      hienThiSp();
    };
    inputHeader.oninput = function () {
      document.getElementById("oTimKiem").value = inputHeader.value;
      trangHienTai = 1;
      hienThiSp();
    };
  }

  // bam menu ngang loc theo danh muc luon
  var dsLinkMenu = document.querySelectorAll("#main-navbar .nav-link");
  for (var i = 0; i < dsLinkMenu.length; i++) {
    dsLinkMenu[i].addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href && href.indexOf("#") === 0) {
        var maDm = href.substring(1);
        var selDm = document.getElementById("chonDanhMuc");
        if (selDm) {
          selDm.value = maDm;
          trangHienTai = 1;
          hienThiSp();
        }
      }
    });
  }
};
