import LocalStorage from '../../../../utils/local-storage';
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { APP_ACCESS_TOKEN, DB_TABLE_POSTS } from '../../../../config/constants';

function checkLogin() {
  const authLS = LocalStorage(APP_ACCESS_TOKEN);
  if (!authLS.get(null)) {
    location.href = '/login';
  }
}

const postQuery = query(collection(db, DB_TABLE_POSTS));
onSnapshot(postQuery, snapshot => {
  const collection = [];
  snapshot.forEach(doc => {
    collection.push({...doc.data(), id: doc.id});
  });
  renderDom(collection);
});

function renderDom(posts) {
  const _html = posts.map(post => (
    `<div class="col-md-3 p-2">
      <div class="card" style="height: 350px; overflow: scroll;">
        <img src="${post.image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
          <a href="/admin/post/detail?id=${post.id}" class="btn btn-primary">View detail</a>
          <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>`
  ));

  const productListEl = document.querySelector('.list-product');
  productListEl.innerHTML = _html.join('');
}

window.addEventListener('load', checkLogin);