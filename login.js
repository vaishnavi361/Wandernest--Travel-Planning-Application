// Flip card logic (already in your script)
function flip() {
    document.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)";
}
function flipAgain() {
    document.querySelector('.flip-card-inner').style.transform = "rotateY(0deg)";
}

// Eye toggle logic (already in your script)
document.getElementById("eye-login").onclick = function () {
    const password = document.getElementById("password-login");
    const eye = this;
    password.type = password.type === "password" ? "text" : "password";
    eye.className = password.type === "text" ? "fa fa-eye" : "fa fa-eye-slash";
    eye.style.color = password.type === "text" ? "cyan" : "white";
};

document.getElementById("eye-signup").onclick = function () {
    const password2 = document.getElementById("password-signup");
    const eye2 = this;
    password2.type = password2.type === "password" ? "text" : "password";
    eye2.className = password2.type === "text" ? "fa fa-eye" : "fa fa-eye-slash";
    eye2.style.color = password2.type === "text" ? "cyan" : "white";
};

// Login handler
document.querySelector(".box-login form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input[type='email']").value;
    const password = document.getElementById("password-login").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Login successful!");
            window.location.href = "index.html"; // or wherever your home page is
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        });
});

// Signup handler
document.querySelector(".box-signup form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-signup").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            // Store user data in Firestore
            return firebase.firestore().collection("users").doc(user.uid).set({
                username: username,
                email: email,
                uid: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Signup successful! Redirecting...");
            window.location.href = "login.html"; // or wherever your home page is
        })
        .catch(error => {
            alert("Signup failed: " + error.message);
        });
});
