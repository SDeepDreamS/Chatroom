function initApp() {
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btnGoogleLogin');
    var btnSignUp = document.getElementById('btnCreate');
    var btnFB = document.getElementById('btnFBLogin');
    var providerF = new firebase.auth.FacebookAuthProvider();

    btnLogin.addEventListener('click', function() {
        var email = txtEmail.value;
        var password = txtPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                window.location = "chooseroom.html";
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                //create_alert("error", errorMessage);
                txtEmail.value = "";
                txtPassword.value = "";
            });
    });


    btnGoogle.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function () {
                window.location = "chooseroom.html";
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                //create_alert("error", errorMessage);
                txtEmail.value = "";
                txtPassword.value = "";
            });
    });

    btnSignUp.addEventListener('click', function() {
        var email = txtEmail.value;
        var password = txtPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                //create_alert("success", "You could sign in  right now!");
                txtEmail.value = "";
                txtPassword.value = "";
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                //create_alert("error", errorMessage);
                txtEmail.value = "";
                txtPassword.value = "";
            });
    });

    btnFB.onclick = function() {
        firebase.auth().signInWithPopup(providerF).then(function(result) {
          var token = result.credential.accessToken;      
          var user = result.user;
            window.location = "chooseroom.html";
        })
    }
    
}



window.onload = function() {
    initApp();
};