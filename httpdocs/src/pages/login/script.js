import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LocalStorage from '../../utils/local-storage';
import { APP_ACCESS_TOKEN } from '../../config/constants';

const provider = new FacebookAuthProvider();

/**
 * 1. Nhấn vào nút facebook login
 * 2. Tự động mở popup lên -> Login facebook
 * 3. Nhận diện Login thành công
 *    + Lưu Token vào LocalStorage
 *    + Redirect home
 * 4. Nêú user chưa login mà user lại vào trang home
 *  -> Đẩy qua trang login
 * 5. Nếu user đã login rồi mà user lại vào lại trang login
 *  -> Đẩu qua trang home
 */
const loginButtonEl = document.getElementById('loginButton');

loginButtonEl.addEventListener('click', async function() {
  // signInWithPopup(auth, provider)
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  try {
    const data = await signInWithPopup(auth, provider);
    const authLS = LocalStorage(APP_ACCESS_TOKEN);
    const accessToken = data.user.accessToken;
    authLS.set(accessToken);
    location.href = '/';
  } catch (err) {
    console.log(err);
  }
});


function checkLogin() {
    const authLS = LocalStorage(APP_ACCESS_TOKEN);
    if (authLS.get(null)) {
        location.href = '/';
    }
}

window.addEventListener('load', checkLogin);