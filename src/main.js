import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Feed from './pages/feed.js';
import Profile from './pages/profile.js';


function loadImage() {
  const inputPhoto = document.getElementById('input-photo');
  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`post_images/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed',
      (snapshot) => {
        document.getElementById('uploader').style.display = 'block';
        const percentage = (snapshot.bytesTransferred
          / snapshot.totalBytes) * 100;
        document.querySelector('.upload-bar').value = percentage;
      },
      () => {
        const errorMessage = document.getElementById('messageImage');
        errorMessage.textContent = 'Não foi possível carregar a imagem.';
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 3000);
      },
      () => {
        const errorMessage = document.getElementById('messageImage');
        errorMessage.textContent = 'Imagem carregada! ';
        setTimeout(() => {
          document.getElementById('uploader').style.display = 'none';
        }, 3000);
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          document.getElementById('image-preview-container').innerHTML += `
          <img id='image-preview' class='image-preview' src="${downloadURL}">
          `;
        });
      });
  });
}
function locationHashChanged() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.hash === '#feed') {
        document.querySelector('main').innerHTML = Feed();
        loadImage();
      } else if (window.location.hash === '#login' || window.location.hash === '') {
        document.querySelector('main').innerHTML = Login();
      } else if (window.location.hash === '#signup') {
        document.querySelector('main').innerHTML = Signup();
      } else if (window.location.hash === '#profile') {
        document.querySelector('main').innerHTML = Profile();
        loadImage();
      }
    } else if (!user) {
      if (window.location.hash === '#login' || window.location.hash === '') {
        document.querySelector('main').innerHTML = Login();
      } else if (window.location.hash === '#signup') {
        document.querySelector('main').innerHTML = Signup();
      }
    }
  });
}
window.addEventListener('load', locationHashChanged);
window.addEventListener('hashchange', locationHashChanged, false);
