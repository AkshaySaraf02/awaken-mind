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
const firestore = firebase.firestore()


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

function validateForm(event) {
    event.preventDefault();
    const email = document.forms['signup-form']['email'].value
    const password = document.forms['signup-form']['password'].value
    const name = document.forms['signup-form']['name'].value

    if (!(email.includes('@') && email.includes('.com'))) {
        console.log('Invalid!');
        document.getElementById("invalid-id-pass").style.display = 'block'
        return false
    }

    else {
        console.log('Passed')
        document.getElementById("invalid-id-pass").style.display = 'none'


        auth.createUserWithEmailAndPassword(email, password).then(credentials => {
            console.log("Account Created for " + name);
            console.log(credentials.user.uid)

            const userRef = firestore.collection('user_data').doc(String(credentials.user.uid))

            const userData = {
                "name": name,
                "mail": email,
                "id": credentials.user.uid,
                "type": "Basic"
            };
            userRef.set(userData)
                .then(() => {
                    console.log("User added to database successfully!");
                    document.getElementById("signup-btn").style.background = "linear-gradient(90deg, dark-green, light-green) !important";
                    document.getElementById("signup-btn").textContent = "Account Created"
                    window.location.href = "home.html"
                })
                .catch((error) => {
                    console.error("Error adding user to database:", error);
                });

        });
    }
}

function enableLogin() {
    const email = document.forms['signup-form']['email'].value
    const password = document.forms['signup-form']['password'].value
    console.log("enableLogin invoked")

    if (email.length > 0 && password.length > 0) {
        document.getElementById("signup-btn").style.background = 'linear-gradient(90deg, var(--blue), violet)';
    }
    else {
        document.getElementById("signup-btn").style.background = 'grey';
    }
}

document.getElementById("password").addEventListener('input', enableLogin)