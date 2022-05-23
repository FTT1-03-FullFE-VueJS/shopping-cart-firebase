import LocalStorage from '../../utils/local-storage';
import { APP_ACCESS_TOKEN } from '../../config/constants';

const logoutEl = document.getElementById('logout');

function checkLogin() {
    const authLS = LocalStorage(APP_ACCESS_TOKEN);
    if (!authLS.get(null)) {
        location.href = '/login';
    }
}

function logoutHandler() {
    if (confirm('Xác nhận đăng xuất!')) {
        const authLS = LocalStorage(APP_ACCESS_TOKEN);
        authLS.remove();
        location.href = '/login';
    }
}

logoutEl.addEventListener('click', logoutHandler);
window.addEventListener('load', checkLogin);
