import LocalStorage from '../../../../utils/local-storage';
import { APP_ACCESS_TOKEN } from '../../../../config/constants';
import { query, collection, onSnapshot, where, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import { DB_TABLE_POSTS } from '../../../../config/constants';

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
  const href    = location.href;
  const url     = new URL(href);
  const post_id = url.searchParams.get("id");

  const postQuery = query(collection(db, DB_TABLE_POSTS));
  onSnapshot(postQuery, snapshot => {
    const collection = [];
    snapshot.forEach(doc => {
      collection.push({...doc.data(), id: doc.id});
    });
    const postSelected = collection.find(post => post.id === post_id);
    renderDom(postSelected);
  });
}

function renderDom(postItem) {
  const _html = `
    <div class="card" style="width: 800px;">
      <img class="card-img-top" src="${postItem.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${postItem.title}</h5>
        <p class="card-text">${postItem.content}</p>
      </div>
    </div>
  `;
  document.querySelector('#post-detail').innerHTML = _html;
}

loadPostDetail();
window.addEventListener('load', checkLogin);