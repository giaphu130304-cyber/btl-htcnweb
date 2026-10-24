const DEMO_STORAGE_PREFIX = 'pcstore_auth_demo_';

function readDemoData(key, fallback) {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

const Store = {
  users() {
    const users = readDemoData('users', []);
    return Array.isArray(users) ? users.filter(user =>
      user && typeof user.email === 'string' && typeof user.password === 'string'
      && typeof user.name === 'string') : [];
  },
  currentUser() {
    const session = readDemoData('currentUser', null);
    if (!session || typeof session.email !== 'string') return null;
    const user = this.users().find(user => user.id === session.id && user.email === session.email);
    return user ? { id: user.id, name: user.name, email: user.email } : null;
  }
};

function saveFormData(key, value) {
  try {
    localStorage.setItem(DEMO_STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (error) {
    showFormMessage('Không thể lưu dữ liệu. Hãy cho phép trình duyệt lưu dữ liệu và thử lại.');
    return false;
  }
}
