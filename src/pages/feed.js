// import Button from '../components/button.js';
// import Textarea from '../components/textarea.js';
import PostsTemplate from '../components/posts-template.js';
import {
  AddComment,
  DeleteComment,
  PrivacyPost,
  EditPost,
  LikePost,
  DeletePost,
  GetFirstLetter,
} from '../posts/functions.js';
import {
  UserInfo,
  AddBio,
  CreateBio,
} from '../posts/edit-profile.js';


function logOut() {
  window.auth
    .signOut()
    .then(() => {
      window.location = '#login';
    });
}

function printComments(arr, logged) {
  let template = '';
  arr.forEach((text) => {
    const deleteCommentTemplate = `<div class="delete-comment fa fa-trash" onclick="button.handleClick(event,${DeleteComment}, event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id)"></div>`
    template += `
    <li class='comments-list' data-userid='${text.id}'  data-ref='${text.idComment}'>
      <div class='letterIcon'>${GetFirstLetter(text.userName)}</div> 
      <div class= 'comment-area'>
      ${logged === text.id ? deleteCommentTemplate : ''}
      <div class='user'>${text.userName}:</div>
      <div class='text-comment'>${text.newComment}</div>
      </div>
    </li>
    `;
  });
  return template;
}


function addPost(post, postId) {

  const imageTemplate = `<img class='preview-picture' src='${post.image_url}'>`;

  const trashAndPencilTemplatePost = `<div class="delete fa fa-trash" onclick="button.handleClick(event,${DeletePost}, event.target.parentNode.id)"></div><div class="edit-post fa fa-pencil" onclick="button.handleClick(event,${EditPost}, event.target.parentNode.id)"></div>`;

  const LoggedUserID = window.auth.currentUser.uid;

  const selectTemplate = `<select class="privacy"><option value="public" ${post.privacy === 'public' ? 'selected' : ''}>Público</option><option value="private" ${post.privacy === 'private' ? 'selected' : ''}> Privado</option></select>`;

  const postTemplate = `
      <li class='post' id = '${postId}'>
        <p class='username'>Postado por <strong><span id='${post.user_id}'>${post.user_name}</span></strong></p> 
        <p class='date'>${post.createdAt.toDate().toLocaleString('pt-BR').substr(0, 19)}</p>
        ${post.image_url ? imageTemplate : ''}
        <p class="post-text">${post.text}</p>
        ${LoggedUserID === post.user_id ? trashAndPencilTemplatePost : ''}
        <div class="edit-button"></div>
        <div class="post-footer">
          <div class="interaction-area">
            <div>
              <div class="like fa fa-heart" onclick="button.handleClick(event,${LikePost}, event.target.parentNode.parentNode.parentNode.parentNode.id)"></div>
              ${post.likes}
            </div>
            <div class='comment-icon fa fa-comments' onclick="button.handleClick(event,${AddComment}, event.target.parentNode.parentNode.parentNode.id)"></div>
            ${LoggedUserID === post.user_id ? selectTemplate : ''}
          </div>
          <div class='comments'>
            <div class='comment-container'></div>
            ${post.comments.length > 0 ? '<p><strong>Comentários:</strong></p>' : ''}
            <ul class='comment-posts'>${printComments(post.comments, LoggedUserID)}</ul>
          </div>
        </div>
      </li>
      `;
  return postTemplate;
}

function createPost() {
  const image = document.getElementById('image-preview');
  const text = document.querySelector('.text-area').value;
  const user = window.auth.currentUser;
  window.db
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      const post = {
        likes: 0,
        user_likes: [],
        text,
        comments: [],
        user_name: doc.data().name,
        user_id: user.uid,
        image_url: image ? image.src : null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        privacy: 'public',
      };

      window.db
        .collection('posts')
        .add(post)
        .then();

      document.querySelector('.text-area').value = '';
      const errorMessage = document.getElementById('messageImage');
      errorMessage.textContent = '';
      document.getElementById('image-preview-container').innerHTML = '';
    });
}

function loadPosts(firstProp, secondProp) {
  //const firstProp = checkIsProfile('user_id', 'privacy');
  //const secondProp = checkIsProfile(firebase.auth().currentUser.uid, 'public');
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection
    .where(firstProp, '==', secondProp)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const postList = document.querySelector('.post-list');
      postList.innerHTML = '';
      snapshot.docs.forEach((post) => {
        postList.innerHTML += addPost(post.data(), post.id);
      });
      // document.querySelectorAll('.delete').forEach((btn) => {
      //   btn.addEventListener('click', (event) => {
      //     DeletePost(event.target.parentNode.getAttribute('id'));
      //   });
      // });
      // document.querySelectorAll('.delete-comment').forEach((btn) => {
      //   btn.addEventListener('click', (event) => {
      //     DeleteComment(event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id'));
      //   });
      // });
      // document.querySelectorAll('.like').forEach((btn) => {
      //   btn.addEventListener('click', (event) => {
      //     LikePost(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'));
      //   });
      // });
      // document.querySelectorAll('.edit-post').forEach((btn) => {
      //   btn.addEventListener('click', (event) => {
      //     EditPost(event.target.parentNode.parentNode.getAttribute('id'));
      //   });
      // });
      // document.querySelectorAll('.comment-icon').forEach((icon) => {
      //   icon.addEventListener('click', (event) => {
      //     AddComment(event.target.parentNode.parentNode.parentNode.getAttribute('id'));
      //   });
      // });
      document.querySelectorAll('.privacy').forEach((selection) => {
        selection.addEventListener('change', (event) => {
          const targetOption = document.querySelector('.privacy').options[document.querySelector('.privacy').selectedIndex].value;
          PrivacyPost(event.target.parentNode.parentNode.parentNode.getAttribute('id'), targetOption);
        });
      });
    });
}

function userDescription() {
  const template = `
  <div class='bio-container'>
  <section class='user-profile'>
        <div class='profile-name'>
        ${UserInfo()}
        </div>
        <section class='user-bio'>
          ${AddBio()}
        </section>
        ${CreateBio()}
        <div class='edit-button'></div>
  </section>
  </div>
      `;
  return template;
}

function Feed() {
  const props = {
    page: () => window.location.hash = '#profile',
    nameBtn: 'Meu Perfil',
    logout: logOut,
    userdescription: '',
    createpost: createPost,
    loadposts: loadPosts('privacy', 'public'),
    }
  const template = `
    ${PostsTemplate(props)}
    `;
  return template;
}

function Profile() {
  const props = {
    page: () => window.location.hash = '#feed',
    nameBtn: 'Mural de Posts',
    logout: logOut,
    userdescription: userDescription(),
    createpost: createPost,
    loadposts: loadPosts('user_id', window.auth.currentUser.uid),
    }
  const template = `
    ${PostsTemplate(props)}
    `;
  return template;
}

export {Feed, Profile};
