/**
 * ============================================================================
 * AUTH MODAL COMPONENT (ĐĂNG NHẬP & ĐĂNG KÝ)
 * Component render động (dynamic rendering) theo schema, có thể tái sử dụng.
 * ============================================================================
 */

(function () {
  'use strict';

  // Định nghĩa Schema cấu hình cho từng form
  const AUTH_SCHEMAS = {
    login: {
      type: 'login',
      title: 'Đăng nhập',
      fields: [
        {
          name: 'identifier',
          label: 'Số điện thoại hoặc Email',
          type: 'text',
          placeholder: 'Nhập số điện thoại hoặc email đã mua hàng',
          required: true,
          autocomplete: 'username'
        },
        {
          name: 'password',
          label: 'Mật khẩu',
          type: 'password',
          placeholder: 'Nhập mật khẩu',
          required: true,
          hasToggle: true,
          autocomplete: 'current-password'
        }
      ],
      hasOptionsRow: true,
      rememberOption: {
        name: 'rememberMe',
        label: 'Ghi nhớ đăng nhập'
      },
      forgotOption: {
        text: 'Quên mật khẩu?',
        target: 'forgot'
      },
      submitText: 'Đăng nhập',
      switchPrompt: {
        prefix: 'Chưa có tài khoản?',
        linkText: 'Đăng ký ngay',
        target: 'register'
      }
    },

    register: {
      type: 'register',
      title: 'Đăng ký tài khoản',
      fields: [
        {
          name: 'fullname',
          label: 'Họ và tên',
          type: 'text',
          placeholder: 'Ví dụ: Nguyễn Ngọc Vy',
          required: true,
          autocomplete: 'name'
        },
        {
          name: 'identifier',
          label: 'Email hoặc số điện thoại',
          type: 'text',
          placeholder: 'Ví dụ: you@bopc.vn hoặc 0901234567',
          required: true,
          autocomplete: 'email'
        },
        {
          name: 'password',
          label: 'Mật khẩu',
          type: 'password',
          placeholder: 'Nhập mật khẩu',
          required: true,
          hasToggle: true,
          autocomplete: 'new-password'
        },
        {
          name: 'confirmPassword',
          label: 'Nhập lại mật khẩu',
          type: 'password',
          placeholder: 'Nhập lại mật khẩu',
          required: true,
          hasToggle: true,
          autocomplete: 'new-password'
        }
      ],
      hasOptionsRow: false,
      submitText: 'Đăng ký',
      switchPrompt: {
        prefix: 'Đã có tài khoản?',
        linkText: 'Đăng nhập',
        target: 'login'
      }
    },

    forgot: {
      type: 'forgot',
      title: 'Khôi phục mật khẩu',
      subtitle: 'Nhập số điện thoại hoặc email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu',
      fields: [
        {
          name: 'identifier',
          label: 'Số điện thoại hoặc Email',
          type: 'text',
          placeholder: 'Nhập số điện thoại hoặc email đã mua hàng',
          required: true,
          autocomplete: 'username'
        }
      ],
      hasOptionsRow: false,
      submitText: 'Gửi yêu cầu khôi phục',
      switchPrompt: {
        prefix: 'Quay lại',
        linkText: 'Đăng nhập',
        target: 'login'
      }
    }
  };

  // SVG Icons dùng trong component
  const ICONS = {
    close: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `,
    eyeShow: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `,
    eyeHide: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `
  };

  class AuthModalComponent {
    constructor() {
      this.modalEl = null;
      this.dialogEl = null;
      this.formContainerEl = null;
      this.currentType = 'login';
      this.isOpen = false;
      this.customSubmitCallback = null;

      this.init();
    }

    /**
     * Khởi tạo cấu trúc DOM cho modal nếu chưa tồn tại
     */
    init() {
      if (document.getElementById('auth-modal')) {
        this.modalEl = document.getElementById('auth-modal');
        this.dialogEl = this.modalEl.querySelector('.auth-modal-dialog');
        this.formContainerEl = this.modalEl.querySelector('.auth-form-container');
      } else {
        this.createModalDOM();
      }

      this.bindGlobalEvents();
    }

    /**
     * Tạo container modal vào cuối body
     */
    createModalDOM() {
      const modal = document.createElement('div');
      modal.id = 'auth-modal';
      modal.className = 'auth-modal-backdrop';
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      modal.innerHTML = `
        <div class="auth-modal-dialog" tabindex="-1">
          <button type="button" class="auth-modal-close" aria-label="Đóng cửa sổ">
            ${ICONS.close}
          </button>
          <div class="auth-form-container"></div>
        </div>
      `;

      document.body.appendChild(modal);

      this.modalEl = modal;
      this.dialogEl = modal.querySelector('.auth-modal-dialog');
      this.formContainerEl = modal.querySelector('.auth-form-container');
    }

    /**
     * Render động form dựa theo schema
     * @param {string} type 'login' | 'register' | 'forgot'
     */
    renderForm(type = 'login') {
      const schema = AUTH_SCHEMAS[type];
      if (!schema) {
        console.error(`AuthModal: Schema '${type}' không tồn tại.`);
        return;
      }

      this.currentType = type;

      // Sinh HTML cho từng trường input
      const fieldsHTML = schema.fields.map(field => `
        <div class="auth-field-group">
          <label class="auth-label" for="auth-${field.name}">
            ${field.label}${field.required ? '<span class="required-star">*</span>' : ''}
          </label>
          <div class="auth-input-wrapper">
            <input 
              id="auth-${field.name}"
              name="${field.name}" 
              type="${field.type}" 
              class="auth-input" 
              placeholder="${field.placeholder}"
              ${field.required ? 'required' : ''}
              ${field.autocomplete ? `autocomplete="${field.autocomplete}"` : ''}
            >
            ${field.hasToggle ? `
              <button type="button" class="auth-password-toggle" aria-label="Hiện/Ẩn mật khẩu" tabindex="-1">
                ${ICONS.eyeShow}
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');

      // Sinh HTML cho hàng tuỳ chọn (Ghi nhớ / Quên mật khẩu)
      let optionsRowHTML = '';
      if (schema.hasOptionsRow) {
        optionsRowHTML = `
          <div class="auth-options-row">
            ${schema.rememberOption ? `
              <label class="auth-checkbox-label">
                <input type="checkbox" name="${schema.rememberOption.name}">
                <span>${schema.rememberOption.label}</span>
              </label>
            ` : '<span></span>'}
            ${schema.forgotOption ? `
              <a href="#forgot" class="auth-forgot-link" data-switch-to="${schema.forgotOption.target}">
                ${schema.forgotOption.text}
              </a>
            ` : ''}
          </div>
        `;
      }

      // Sinh tiêu đề và phụ đề (nếu có)
      const subtitleHTML = schema.subtitle 
        ? `<p class="auth-modal-subtitle">${schema.subtitle}</p>` 
        : '';

      // Sinh toàn bộ nội dung form
      this.formContainerEl.innerHTML = `
        <div class="auth-modal-header">
          <h2 class="auth-modal-title">${schema.title}</h2>
          ${subtitleHTML}
        </div>

        <form class="auth-dynamic-form" novalidate>
          ${fieldsHTML}
          ${optionsRowHTML}
          <button type="submit" class="auth-submit-btn">
            ${schema.submitText}
          </button>
        </form>

        <div class="auth-switch-prompt">
          <span>${schema.switchPrompt.prefix}</span>
          <a href="#switch" class="auth-switch-link" data-switch-to="${schema.switchPrompt.target}">
            ${schema.switchPrompt.linkText}
          </a>
        </div>
      `;

      this.bindFormEvents();
    }

    /**
     * Gắn sự kiện cho các thành phần bên trong form vừa render
     */
    bindFormEvents() {
      // 1. Nút bật/tắt hiển thị mật khẩu (Show/Hide Password)
      const toggles = this.formContainerEl.querySelectorAll('.auth-password-toggle');
      toggles.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const wrapper = toggleBtn.closest('.auth-input-wrapper');
          const input = wrapper.querySelector('input');
          const isPassword = input.type === 'password';

          input.type = isPassword ? 'text' : 'password';
          toggleBtn.innerHTML = isPassword ? ICONS.eyeHide : ICONS.eyeShow;
        });
      });

      // 2. Các liên kết chuyển form (Đăng ký <-> Đăng nhập <-> Quên mật khẩu)
      const switchLinks = this.formContainerEl.querySelectorAll('[data-switch-to]');
      switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetType = link.getAttribute('data-switch-to');
          this.renderForm(targetType);
        });
      });

      // 3. Xử lý Submit form
      const form = this.formContainerEl.querySelector('.auth-dynamic-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Kiểm tra khớp mật khẩu ở form đăng ký
        if (this.currentType === 'register') {
          if (data.password !== data.confirmPassword) {
            alert('Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại!');
            const confirmInput = form.querySelector('[name="confirmPassword"]');
            if (confirmInput) {
              confirmInput.focus();
              confirmInput.classList.add('input-error');
            }
            return;
          }
        }

        // Gọi callback hoặc xử lý thông báo thành công
        if (typeof this.customSubmitCallback === 'function') {
          this.customSubmitCallback(data, this.currentType);
        } else {
          const actionText = this.currentType === 'login' ? 'Đăng nhập' : (this.currentType === 'register' ? 'Đăng ký' : 'Yêu cầu');
          alert(`[Bộ PC] ${actionText} thành công!\nXin chào: ${data.fullname || data.identifier}`);
          this.close();
        }
      });
    }

    /**
     * Gắn sự kiện toàn cục: đóng modal khi click backdrop, nút X, phím ESC
     */
    bindGlobalEvents() {
      // Đóng khi click nút X
      const closeBtn = this.modalEl.querySelector('.auth-modal-close');
      closeBtn.addEventListener('click', () => this.close());

      // Đóng khi click vùng ngoài dialog (backdrop)
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) {
          this.close();
        }
      });

      // Đóng khi nhấn phím Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Lắng nghe tất cả nút mở modal trên trang (ví dụ nút Tài khoản trên Header)
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-auth-modal]');
        if (trigger) {
          e.preventDefault();
          const type = trigger.getAttribute('data-auth-modal') || 'login';
          this.open(type);
        }
      });
    }

    /**
     * Mở modal với loại form chỉ định
     * @param {string} type 'login' | 'register'
     */
    open(type = 'login') {
      this.renderForm(type);
      this.modalEl.classList.add('is-active');
      this.modalEl.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      this.isOpen = true;

      // Focus tự động vào input đầu tiên
      setTimeout(() => {
        const firstInput = this.formContainerEl.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    }

    /**
     * Đóng modal
     */
    close() {
      this.modalEl.classList.remove('is-active');
      this.modalEl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      this.isOpen = false;
    }

    /**
     * Đăng ký callback khi form submit
     * @param {Function} callback (data, type) => void
     */
    onSubmit(callback) {
      this.customSubmitCallback = callback;
    }
  }

  // Khởi tạo và gắn vào window để tái sử dụng toàn trang
  window.AuthModal = new AuthModalComponent();

})();
