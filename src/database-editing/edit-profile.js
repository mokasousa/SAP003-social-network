import Button from '../components/button.js';
import Textarea from '../components/textarea.js'
import { GetFirstLetter } from './edit-posts.js';


function UserInfo() {
  firebase
  .firestore()
  .collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then((doc) => {
    const username = `
      <div class = 'letterIcon letterIconBig'>
      ${GetFirstLetter(doc.data().name)}
      </div>
      ${doc.data().name.toUpperCase()}
    `;
    document.querySelector('.profile-name').innerHTML = username;
  });
}

function AddBio() {
  firebase
  .firestore()
  .collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then((doc) => {
    const userBiography = `
      <p class=“text-bio”>${doc.data().biography}</p>
    `;
    document.querySelector('.user-bio').innerHTML = userBiography;
    });
}

async function saveEditBio() {
  const saveEdit = document.querySelector('.edit-textarea').value;
  await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          biography: saveEdit,
        });
  document.querySelector('.user-bio').innerHTML = '';
  profile.AddBio();
  document.getElementById('btn-post').style.display = 'block';
}

function cancelEditBio() {
  document.querySelector('.user-bio').innerHTML = '';
  profile.AddBio();
  document.getElementById('btn-post').style.display = 'block';
}

function editBio() {
  firebase
  .firestore()
  .collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then((doc) => {
    document.querySelector('.user-bio').innerHTML = `
      <form>
      ${window.textarea.component({
      class: 'edit-textarea',
      id: 'edit-textarea',
      placeholder: 'Fale de você, seus gostos, plantas favoritas, etc.',
      value: doc.data().biography,
      })}
      </form>
      <div class=bio-btn>
      ${window.button.component({
      id: 'btn-cancel',
      class: 'btn cancel-btn',
      onclick: profile.cancelEditBio,
      title: 'Cancelar',
      })}
      ${window.button.component({
      id: 'btn-save',
      class: 'btn save-btn btn-gray',
      onclick: profile.saveEditBio,
      title: 'Publicar',
      })
      }
      </div>
    `;
    document.getElementById('btn-post').style.display = 'none';
    });
}

function CreateBio() {
  const template = `
    ${Button({
    type: 'button',
    class: 'btn btn-gray btn-post',
    id: 'btn-post',
    onclick: profile.editBio,
    title: 'Editar biografia',
  })}
    `;
  return template;
}

export {
  UserInfo,
  AddBio,
  CreateBio,
};

window.profile = {
  saveEditBio,
  cancelEditBio,
  editBio,
  AddBio,
};
