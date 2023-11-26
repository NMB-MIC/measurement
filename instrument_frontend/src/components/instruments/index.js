// export { default } from "./instruments";
// let timer;

// const waitTime = 1000;

// const messageInput = document.getElementById('message');

// messageInput.addEventListener('keyup', event => {
//   clearTimeout(timer);

//   timer = setTimeout(() => {
//     doneTyping(event.target.value);
//   }, waitTime);
// });

// function doneTyping(value) {
//   console.log(`The user is done typing: ${value}`);
// }

const el = document.getElementById('first_name');
console.log(el); // 👉️ null

// ⛔️ Cannot read properties of null (reading 'focus')
el.focus();