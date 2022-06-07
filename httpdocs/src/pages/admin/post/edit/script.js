import LocalStorage from '../../../../utils/local-storage';
import { APP_ACCESS_TOKEN, DB_TABLE_POSTS } from '../../../../config/constants';
import { query, collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import { getURLParam } from '../../../../utils/helpers';

const formEl    = document.querySelector('#form-edit-post');
const titleEl   = document.querySelector('#title');
const imageEl   = document.querySelector('#image');
const contentEl = document.querySelector('#content');

function checkLogin() {
  const authLS = LocalStorage(APP_ACCESS_TOKEN);
  if (!authLS.get(null)) {
    location.href = '/login';
  }
}

function loadPostDetail() {
  /**
   * 1: Lấy id của post trên url
   * 2: lấy bài post trong firebase/firestore dự theo id lấy ở bước 1
   * 3: Hiển thị ra dom
   */
  const post_id = getURLParam('id');

  const postQuery = query(collection(db, DB_TABLE_POSTS));
  onSnapshot(postQuery, snapshot => {
    const collection = [];
    snapshot.forEach(doc => {
      collection.push({...doc.data(), id: doc.id});
    });
    const postSelected = collection.find(post => post.id === post_id);
    renderForm(postSelected);
  });
}

function renderForm(formData) {
  titleEl.value   = formData.title;
  imageEl.value   = formData.image;
  contentEl.value = formData.content;
}


formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleValue   = titleEl.value;
  const imageValue   = imageEl.value;
  const contentValue = contentEl.value;

  let isValid = false;
  if (titleValue.trim().length === 0) {
    alert('Please enter the title of post!');
    isValid = false;
  } else {
    isValid = true;
  }

  if (imageValue.trim().length === 0) {
    alert('Please enter the image of post!');
    isValid = false;
  } else {
    isValid = true;
  }

  if (contentValue.trim().length === 0) {
    alert('Please enter the content of post!');
    isValid = false;
  } else {
    isValid = true;
  }

  if (isValid) {
    // console.log('Submit handle edit!');
    const post_id = getURLParam('id');
    ;(async () => {
      const postRef = doc(db, DB_TABLE_POSTS, post_id);
      await updateDoc(postRef, {
        title: titleValue,
        image: imageValue,
        content: contentValue
      });
      location.href = '/admin/post/list'
    })();
  }
});

loadPostDetail();
window.addEventListener('load', checkLogin);
