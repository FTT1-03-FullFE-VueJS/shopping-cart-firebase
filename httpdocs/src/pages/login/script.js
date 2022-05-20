import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';

const provider = new FacebookAuthProvider();

/**
 * 1. Nhấn vào nút facebook login
 * 2. Tự động mở popup lên -> Login facebook
 * 3. Nhận diện Login thành công
 *    + Lưu Token vào LocalStorage
 *    + Redirect home
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
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
