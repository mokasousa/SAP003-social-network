function Button(props) {
  const template = `
    <button id='${props.id}' class='${props.class}' data-id='${props.dataId}' onclick="button.handleClick(event, ${props.onclick})">${props.title}</button>
    `;
  return template;
}

window.button = {
  handleClick: (event, callback, par) => {
    event.preventDefault();
    callback(par);
    
  },
  component: Button,
};

export default Button;
