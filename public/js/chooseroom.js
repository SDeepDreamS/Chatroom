var nowplace = "public";
var firstname;
var myname = '';

function init() {
    var user_email = '';
    var myname;
    var account = document.getElementById('nowAccount');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.displayName == null)
            {
                var arr =  user.email.split('@');
                myname = arr[0];
                account.innerHTML = "<span class='mb-0 text-white lh-100'>" + myname + "</span>";
                localStorage.setItem('firstname',myname);
                console.log("null"+myname);
            }
            else{
                myname = user.displayName;
                account.innerHTML = "<span class='mb-0 text-white lh-100'>" + myname + "</span>";
                localStorage.setItem('firstname',myname);
                console.log("have name"+user.displayName);
            }
        } else {
        }
      });

    document.getElementById("animal").onclick=function(){
        nowplace = event.target.id;
        console.log(nowplace);
        localStorage.setItem('nowplace', "animal");
        disp_prompt("animal");
    }

    document.getElementById("forest").onclick=function(){
        nowplace = event.target.id;
        console.log(nowplace);
        localStorage.setItem('nowplace', "forest");
        disp_prompt("forest");
    }

    document.getElementById("sky").onclick=function(){
        nowplace = event.target.id;
        console.log(nowplace);
        localStorage.setItem('nowplace', "sky");
        disp_prompt("sky");
    }

    document.getElementById("public").onclick=function(){
        nowplace = event.target.id;
        console.log(nowplace);
        localStorage.setItem('nowplace', "public");
        document.location.href="chatroom.html";
    }

    firebase.auth().onAuthStateChanged(function(user) {
        console.log(firebase.auth().currentUser);
        // Check user login
        if (user) {
            user_email = user.email;
            var logout = document.getElementById('logoutBtn');
            logout.addEventListener('click', function() {
                firebase.auth().signOut().then(function(){
                    alert('sign out successfully')
                }).catch(function(error) {
                    alert('error!')
                });
                document.location.href="./index.html";
            }); 
        } else {
            account.innerHTML = "<a class = 'menu'>Waiting</a>";
        }
    });
}

function disp_prompt(val)
{
    var name=prompt("請輸入此聊天室密碼","password")
    if (name!=null && name == val)
    {
        alert('successfully enter the chatroom');
        document.location.href="chatroom.html";
    }
    else{
        alert('wrong password'+' ans= '+val);
        document.location.href="chooseroom.html";
    }
}

window.onload = function(){
    init();
};