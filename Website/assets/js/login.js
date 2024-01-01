const firebaseConfig = {
    apiKey: "AIzaSyA8V7z60ya0WFObUjXFHYkhLGekSMJ3bwM",
    authDomain: "awaken-mind.firebaseapp.com",
    projectId: "awaken-mind",
    storageBucket: "awaken-mind.appspot.com",
    messagingSenderId: "734600570838",
    appId: "1:734600570838:web:2a56feef6e3b2c2a652677",
    measurementId: "G-32KVHJJ27X"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

function togglePassword() {
    const currentStatus = document.getElementsByClassName("toggler")[0].innerHTML;


    if (currentStatus == "Show") {
        document.getElementsByClassName("toggler")[0].innerHTML = 'Hide'
        document.getElementById("password").type = 'text'
    }
    else {
        document.getElementsByClassName("toggler")[0].innerHTML = 'Show'
        document.getElementById("password").type = 'password'
    }
}

function logIn(event) {
    event.preventDefault();
    document.getElementById("invalid-id-pass").style.display = 'none'
    const email = document.forms['login-form']['email'].value;
    const password = document.forms['login-form']['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(response => {
        window.location.href = "home.html"
        console.log(response + "this is response");


    }).catch((error) => {
        console.log(error)
        document.getElementById("invalid-id-pass").style.display = 'block'
        return false
    });
    return true
}


function enableLogin() {
    const email = document.forms['login-form']['email'].value
    const password = document.forms['login-form']['password'].value
    console.log("enableLogin invoked")

    if (email.length > 0 && password.length > 0) {
        document.getElementById("login-btn").style.background = 'linear-gradient(90deg, var(--blue), violet)';
    }
    else {
        document.getElementById("login-btn").style.background = 'grey';

    }
}

document.getElementById("password").addEventListener('input', enableLogin)

