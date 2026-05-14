// IMPORT FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
addDoc,
serverTimestamp,
query,
orderBy,
onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// FIREBASE CONFIG

const firebaseConfig = {

apiKey: "AIzaSyCS4lYlpDItYILyskoRnKL3sPLQrR1e1F0",

authDomain: "haevent-ade1f.firebaseapp.com",

projectId: "haevent-ade1f",

storageBucket: "haevent-ade1f.firebasestorage.app",

messagingSenderId: "358969921800",

appId: "1:358969921800:web:477020d900fa0f68ca1cbd",

measurementId: "G-09HMZZFZSG"

};


// INIT FIREBASE

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ELEMENT

const form =
document.getElementById("messageForm");

const messagesContainer =
document.getElementById("messages");


// KIRIM PESAN

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const name =
document.getElementById("name").value;

const message =
document.getElementById("messageInput").value;

await addDoc(
collection(db,"messages"),
{

name,
message,
createdAt: serverTimestamp()

}
);

form.reset();

});


// TAMPILKAN PESAN

const q =
query(
collection(db,"messages"),
orderBy("createdAt","desc")
);

onSnapshot(q,(snapshot)=>{

messagesContainer.innerHTML = "";

snapshot.forEach((doc)=>{

const data = doc.data();

messagesContainer.innerHTML += `

<div class="message-card">

<h3>${data.name}</h3>

<p>"${data.message}"</p>

</div>

`;

});

});


// =========================
// PRELOADER
// =========================

window.addEventListener("load",()=>{

const preloader =
document.getElementById("preloader");

setTimeout(()=>{

preloader.style.opacity = "0";

preloader.style.visibility = "hidden";

},1800);

});


// =========================
// REVEAL ANIMATION
// =========================

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveals.forEach((reveal)=>{

const windowHeight =
window.innerHeight;

const revealTop =
reveal.getBoundingClientRect().top;

if(revealTop < windowHeight - 100){

reveal.classList.add("active");

}

});

});