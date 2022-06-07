import LocalStorage from '../../../../utils/local-storage';
import { query, collection, onSnapshot, deleteDoc } from "firebase/firestore";
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
          <button type="button" class="btn btn-danger btn-delete" data-post-id="${post.id}">Delete</button>
          <a href="/admin/post/edit?id=${post.id}" class="btn btn-warning btn-edit">Edit</a>
        </div>
      </div>
    </div>`
  ));

  const productListEl = document.querySelector('.list-product');
  productListEl.innerHTML = _html.join('');

  const listButtonsDelete = document.querySelectorAll('.btn-delete');
  listButtonsDelete.forEach(elItem => {
    elItem.addEventListener('click', function(event) {
      const post_id = event.target.getAttribute('data-post-id');
      onSnapshot(postQuery, snapshot => {
        snapshot.forEach(doc => {
          if (doc.id === post_id) {
            if (confirm('Are you sure to delete this?')) {
              deleteDoc(doc.ref);
            }
          };
        });
      });
    });
  });
}

window.addEventListener('load', checkLogin);
