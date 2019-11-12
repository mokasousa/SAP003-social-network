import Button from './button.js';
import Textarea from './textarea.js';

// function newPostTemplate() {
//   const postArea = `
//   ${Textarea({
//     class: 'text-area',
//     id: 'post-text',
//     placeholder: 'No que você está pensando?',
//     value: '',
//   })}
//   <div class='footer-post'>
//     <div class = 'action'>
//       <label for='input-photo' class='fa fa-image'></label>
//       <div class="image-preview-container" id='image-preview-container'></div>
//       <input type='file' class='input-photo' id='input-photo'>
//       ${Button({
//     type: 'button',
//     class: 'btn btn-gray btn-post',
//     id: 'btn-post',
//     onclick: props.createPost,
//     title: 'Postar',
//   })}
//   </div>
//   <div class='surpriseUsers' id='surpriseUsers'>
//     <progress style='display:none;' value='0' max='100' id='uploader' class='upload-bar'>0%</progress>
//     <div id='messageImage'></div>
//   </div>
//   </div>
//   `;
//   const template = `
//   <div class='post-area-container'
//   <section class="input-area">
//     <form class="post-area">
//       ${postArea}
//     </form>
//   </section>
//   </div>
// `;
//   return template;
// }

function PostsTemplate(props) {
  const template = `
    <header class='header'>
      ${Button({
      type: 'button',
      class: 'btn profile-btn hide-mobile',
      id: 'btn-profile',
      onclick: props.page,
      title: props.nameBtn,
    })}
      <div class='header-title'>
        <label for='toggle-side-menu'>
          <div class='fa fa-bars hide-desktop menu-icon'></div>
        </label>
        <p> Horta Urbana </p> 
        <div class='header-img'>
          <img src="./img/fruits.svg">
        </div>
      </div>
      ${Button({
      type: 'button',
      class: 'btn logout-btn hide-mobile',
      id: 'btn-log-out',
      onclick: props.logout,
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
      onclick: props.page,
      title: props.nameBtn,
    })}
    ${Button({
      type: 'button',
      class: 'btn logout-btn ',
      id: 'btn-log-out',
      onclick: props.logout,
      title: 'Sair',
    })}
      </div>
    </header>
    ${props.userdescription}
    <div class='post-area-container'
    <section class="input-area">
      <form class="post-area">
      ${Textarea({
        class: 'text-area',
        id: 'post-text',
        placeholder: 'No que você está pensando?',
        value: '',
      })}
      <div class='footer-post'>
        <div class = 'action'>
          <label for='input-photo' class='fa fa-image'></label>
          <div class="image-preview-container" id='image-preview-container'></div>
          <input type='file' class='input-photo' id='input-photo'>
          ${Button({
        type: 'button',
        class: 'btn btn-gray btn-post',
        id: 'btn-post',
        onclick: props.createpost,
        title: 'Postar',
      })}
      </div>
      <div class='surpriseUsers' id='surpriseUsers'>
        <progress style='display:none;' value='0' max='100' id='uploader' class='upload-bar'>0%</progress>
        <div id='messageImage'></div>
      </div>
      </div>
      </form>
    </section>
    </div>
    <section id="printpost" class="print-post">
      <ul class='post-list'>${props.loadposts}</ul>
    </section>
    `;
  return template;
  }
  
  export default PostsTemplate;