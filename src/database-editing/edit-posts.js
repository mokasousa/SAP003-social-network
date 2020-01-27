import Button from '../components/button.js';
import Textarea from '../components/textarea.js';

function saveComment() {
 
  const newComment = document.querySelector('.textarea-comment').value;
  const timestamp = new Date();
  const datasetid = event.target.dataset.id;
  //console.log(datasetid)
  const user = firebase.auth().currentUser.uid
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .get()
    .then((doc) => {
      const userName = doc.data().name;
      const id = doc.id;
      firebase
        .firestore()
        .collection('posts')
        .doc(datasetid)
        .collection('comments')
        .add({
            userName,
            newComment,
            id,
            timestamp,
          })
         
    });

    document.getElementById(datasetid).querySelector('.comment-container').innerHTML = '';
}

function cancelComment() {
  const datasetid = event.target.dataset.id;
  document.getElementById(datasetid).querySelector('.comment-container').innerHTML = '';
}

function AddComment(postId) {
  const commentArea = `
    ${window.textarea.component({
    class: 'textarea-comment edit-textarea',
    placeholder: 'Escreva um comentário',
    value: '',
    })}
    <div>
      ${window.button.component({
      type: 'button',
      class: 'btn btn-gray',
      id: 'btn-comment-cancel',
      dataId: postId,
      onclick: functions.cancelComment,
      title: 'Cancelar',
      })}
      ${window.button.component({
      type: 'button',
      class: 'btn btn-gray',
      id: 'btn-comment-post',
      dataId: postId,
      onclick: functions.saveComment,
      title: 'Postar',
      })}
    </div>
    `;
  const createSection = document.getElementById(postId).querySelector('.comment-container');
  createSection.innerHTML = `${commentArea}`;
}

function DeleteComment(postid) {
  //console.log(event.target.dataset.ref, event.target.dataset.userid);
  if (!window.confirm('Tem certeza que deseja excluir esse comentário?')) return;
  firebase
    .firestore()
    .collection('posts')
    .doc(postid)
    .collection('comments')
    .doc(event.target.dataset.ref)
    .delete();
}

function PrivacyPost(postId, option) {
  //console.log(option)
  const docPost = firebase.firestore().collection('posts').doc(postId);
  docPost.update({
    privacy: option,
  });
}

function saveEdit() {
  const id = event.target.dataset.id;
  const postText = document.getElementById(id).querySelector('.post-text');
  const buttonPencil = document.getElementById(id).querySelector('.edit-post');
  const editedText = document.querySelector('.edit-textarea').value;
  postText.innerHTML = `
  <p class='post-text'>${editedText}</p>
  `;
  firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      text: editedText,
    });
  document.getElementById(id).querySelector('.edit-button').innerHTML = '';
  buttonPencil.style.display = 'block';
}

function cancelEdit() {

  const id = event.target.dataset.id;

  const postText = document.getElementById(id).querySelector('.post-text');
  const buttonPencil = document.getElementById(id).querySelector('.edit-post');
  const text = postText.textContent.trim();
  postText.innerHTML = `
  <p class='post-text'>${text}</p>
  `;
  document.getElementById(id).querySelector('.edit-button').innerHTML = '';
  buttonPencil.style.display = 'block';
}

function EditPost(postId) {
  const postText = document.getElementById(postId).querySelector('.post-text');
  const button = document.getElementById(postId).querySelector('.edit-button');
  const buttonPencil = document.getElementById(postId).querySelector('.edit-post');
  const text = postText.textContent;
  postText.innerHTML = `
    ${window.textarea.component({
      class: 'edit-textarea',
      id: 'edit-textarea',
      placeholder: '',
      value: text,
    })}
    `;
  button.innerHTML = `
    ${window.button.component({
      id: 'btn-cancel',
      class: 'btn cancel-btn',
      dataId: postId,
      onclick: functions.cancelEdit,
      title: 'Cancelar',
    })}
    ${window.button.component({
      id: 'btn-save',
      class: 'btn save-btn btn-gray',
      dataId: postId,
      onclick: functions.saveEdit,
      title: 'Salvar',
    })}
    `;
  buttonPencil.style.display = 'none';
}

async function LikePost(postId) {
  const postsCollection = firebase.firestore().collection('posts');
  const actualPost = await postsCollection.doc(postId).get();

  postsCollection.doc(postId).get().then((doc) => {
    const arrUsers = doc.data().user_likes;
    const thisUser = arrUsers.includes(firebase.auth().currentUser.uid);

    if (!thisUser) {
      postsCollection.doc(postId).update({
        likes: actualPost.data().likes + 1,
        user_likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
      });
    }
  });
}

function DeletePost(postId) {
  if (!confirm('Tem certeza que deseja excluir essa publicação?')) return;
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .delete();
}

function GetFirstLetter(userName) {
  return userName[0];
}

export {
  AddComment,
  DeleteComment,
  PrivacyPost,
  EditPost,
  LikePost,
  DeletePost,
  GetFirstLetter,
};

window.functions = {
  cancelEdit,
  saveEdit,
  saveComment,
  cancelComment
}