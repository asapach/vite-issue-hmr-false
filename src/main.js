import { message } from './message.js';

const loads = Number(sessionStorage.getItem('loads') ?? 0) + 1;
sessionStorage.setItem('loads', String(loads));

document.querySelector('#loads').textContent = String(loads);
document.querySelector('#message').textContent = message;
