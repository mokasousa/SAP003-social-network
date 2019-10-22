import Button from '../components/button.js';

function logOut() {
  auth
    .signOut()
    .then(() => {
      window.location = '#login';
    });
}

function userInfo() {
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).get().then((doc) => {
    const username = `
    <h4>${doc.data().name}!</h4>
    `;
    document.querySelector('.profile').innerHTML = username;
  });
}

function Profile() {
  const template = `
  <header class='header'>
    ${Button({
    type: 'button',
    class: 'btn profile-btn hide-mobile',
    id: 'btn-profile',
    onclick: () => window.location = '#feed',
    title: 'Mural',
  })}
    <div class='header-title'>
      <label for='toggle-side-menu'>
        <div class='fa fa-bars hide-desktop menu-icon'></div>
      </label>
      <p> Horta Urbana </p> 
      <div class='header-img'>
        <img src="./img/cenoura.png">
      </div>
    </div>
    ${Button({
    type: 'button',
    class: 'btn logout-btn hide-mobile',
    id: 'btn-log-out',
    onclick: logOut,
    title: 'Sair',
  })}
    <input 
      type='checkbox'
      id='toggle-side-menu' 
      class='toggle-side-menu hide-desktop'
    />
    <div class='side-menu hide-desktop'>
      ${Button({
    type: 'button',
    class: 'btn profile-btn ',
    id: 'btn-profile',
    onclick: () => window.location = '#feed',
    title: 'Mural',
  })}
      ${Button({
    type: 'button',
    class: 'btn logout-btn ',
    id: 'btn-log-out',
    onclick: logOut,
    title: 'Sair',
  })}
    </div>
  </header>
    <div class='profile'>${userInfo()}</div>
    <section id="printpost" class="print-post">
      <ul class='post-list'></ul>
    </section>
`;
  return template;
}

export default Profile;


// function Profile(props) {
//   const templateProfile = `
//   <div class='srdosaneis'> ${postListProfile(props)}</div>
//   `;
//   return templateProfile;
// }

// function postListProfile(props) {
//   props.posts.forEach((element) => {
//     console.log(element.data().text);
//   });
// }
