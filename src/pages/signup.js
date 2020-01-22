import Button from '../components/button.js';
import Input from '../components/input.js';

function newUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;
  const errorMessageField = document.getElementById('errorMessageSignup');
  if (email.length > 0 && password.length > 0 && name.length > 0) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp.user) {
          resp.user.updateProfile({
            displayName: name,
          })
            .then(() => {
              firebase.firestore().collection('users').doc(resp.user.uid).set({
                name,
                biography: 'Fale de você, seus gostos, plantas favoritas, etc.',
              })
                .then(() => {
                  window.location = '#feed';
                });
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          errorMessageField.textContent = 'Email inválido.';
        } else if (errorCode === 'auth/weak-password') {
          errorMessageField.textContent = 'A senha deve conter 6 caracteres ou mais.';
        }
      });
  } else {
    errorMessageField.textContent = 'Preencha todos os campos para realizar seu cadastro!';
  }
}

function Signup() {
  const userInfo = `
    ${Input({
    type: 'text',
    class: 'name-input',
    placeholder: 'Nome',
    value: '',
  })}
    ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'Email',
    value: '',
  })}
    ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
    value: '',
  })}
    ${Button({
    class: 'btn btn-register btn-gray',
    id: 'btn-new-user',
    onclick: newUser,
    title: 'Cadastrar',
  })}
  `;
  const template = `
    <header class="main-header">
    </header>
    <form class="form-content-signup">
    <img class='signup-img' src="./img/horta-urbana-2.png">
      <main class="register-input">
      <img class='logo-img' src='./img/horta-urbana-logo.png'>
        <h2>Bem vindo(a)!</h2>
        <p class="register-text">Para realizar o cadastro, preencha as informações abaixo:</p>
        ${userInfo}
        <p>Já é membro? 
          <a href='#login'>Faça seu login!</a>
        </p> 
        <div id="errorMessageSignup" class="error-message"></div>
      </main>
    </form>
    `;
  return template;
}

export default Signup;
