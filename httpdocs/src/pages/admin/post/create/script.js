import LocalStorage from '../../../../utils/local-storage';
import { APP_ACCESS_TOKEN, DB_TABLE_POSTS } from '../../../../config/constants';
import { parseFormData } from '../../../../utils/helpers';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/config';

const formCreatePostEl = document.querySelector('#form-create-post');

function checkLogin() {
  const authLS = LocalStorage(APP_ACCESS_TOKEN);
  if (!authLS.get(null)) {
    location.href = '/login';
  }
}

function createPostHandler(e) {
  e.preventDefault();
  const form = parseFormData(e.target);
  let isError = false;

  // Check title
  if (form && form.title && form.title.length) {
    isError = false;
  } else {
    alert('Please enter title of post');
    isError = true;
  }

  // Check image url
  if (form && form.image && form.image.length) {
    isError = false;
  } else {
    alert('Please enter image of post');
    isError = true;
  }

  // Check content url
  if (form && form.content && form.content.length) {
    isError = false;
  } else {
    alert('Please enter content of post');
    isError = true;
  }

  if (!isError) {
    addDoc(collection(db, DB_TABLE_POSTS), {
      title: form.title,
      image: form.image,
      content: form.content,
      createdAt: serverTimestamp()
    })
    .then(() => {
      alert('Create Post successfully!');
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
  }
}

formCreatePostEl.addEventListener('submit', createPostHandler);
window.addEventListener('load', checkLogin);
