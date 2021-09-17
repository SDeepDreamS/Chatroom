


function init() {

    var btnnewname = document.getElementById('btnewname');
    var txtname = document.getElementById('newname');
    var originname = localStorage.getItem('firstname');
    document.getElementById('Myname').innerHTML = "Hi, I am " + originname;

    
        btnnewname.addEventListener('click', function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    originname = txtname.value;
                    document.getElementById('Myname').innerHTML = "Hi, I am " + originname;
                    console.log("Now originname= " + originname);
                    user.updateProfile({
                        displayName: originname,
                    })
                    console.log(originname + ' ' + user.displayName);
                } else {
                }
          });
    });




}

window.onload = function() {
    init();
};