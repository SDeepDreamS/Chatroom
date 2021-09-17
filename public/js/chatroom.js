

function changePlace(myplace){
    nowplace = myplace.id;
    console.log(nowplace);
}

function init() {
    var user_email = '';
    var user_name = ''
    var nowplace = localStorage.getItem('nowplace') // Retrieves from browser storage
    console.log(nowplace);
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_email = user.email;
            user_name = user.displayName;
        } else {
            account.innerHTML = "<a class = 'menu'>Waiting</a>";
        }
    });

    post_btn = document.getElementById('post');
    post_txt = document.getElementById('input');
    post_sticker = document.getElementById('pc');
    post_upload = document.getElementById('uploadbtn')

    post_btn.addEventListener('click', function() {
        console.log(nowplace);
        post_txt.value = post_txt.value.replace(/[<>\"\'\&']/g,function(a){
            switch(a){
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '\"':
                return '&quot;';
            case '\'':
                return '&#39;';
            case '\&':
                return '&amp;';
            }
        })
        console.log(post_txt.value);
        if(nowplace == 'public')
        {
            if (post_txt.value != "") {
                firebase.database().ref('/com_list').push({
                    name:user_name,
                    email:user_email,
                    data:post_txt.value,
                    time:nowTime(),
                    sticker:null
                });
                //console.log(nowTime());
                post_txt.value = "";
            }
        }else if(nowplace == 'animal')
        {
            if (post_txt.value != "") {
                firebase.database().ref('/animal_list').push({
                    name:user_name,
                    email:user_email,
                    data:post_txt.value,
                    time:nowTime(),
                    sticker:null
                });
                console.log(nowTime());
                post_txt.value = "";
            }
        }else if(nowplace == 'forest')
        {
            if (post_txt.value != "") {
                firebase.database().ref('/forest_list').push({
                    name:user_name,
                    email:user_email,
                    data:post_txt.value,
                    time:nowTime(),
                    sticker:null
                });
                console.log(nowTime());
                post_txt.value = "";
            }
        }else if(nowplace == 'sky')
        {
            if (post_txt.value != "") {
                firebase.database().ref('/sky_list').push({
                    name:user_name,
                    email:user_email,
                    data:post_txt.value,
                    time:nowTime(),
                    sticker:null
                });
                console.log(nowTime());
                post_txt.value = "";
            }
        }
    });

    document.querySelector('.file-select').addEventListener('change', handleFileUploadChange,false);
    
    post_upload.addEventListener('click', function() {
        storageRef.child('images/' + temp).getDownloadURL().then(function(url) {
            console.log(url);
        if(nowplace == 'public')
        {
            console.log(url);
            firebase.database().ref('/com_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                img:url
            });

        }else if(nowplace == 'animal')
        {
            firebase.database().ref('/animal_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                img:url
            });

        }else if(nowplace == 'forest')
        {
            firebase.database().ref('/forest_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                img:url
            });

        }else if(nowplace == 'sky')
        {
            firebase.database().ref('/sky_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                img:url
            });
        }
            
        }).catch(function(error) {
            // Handle any errors
        });
    
    },false);

    post_sticker.addEventListener('click', function() {
        if(nowplace == 'public')
        {
            firebase.database().ref('/com_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                sticker:"img/public.png"
            });

        }else if(nowplace == 'animal')
        {
            firebase.database().ref('/animal_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                sticker:"img/public.png"
            });

        }else if(nowplace == 'forest')
        {
            firebase.database().ref('/forest_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                sticker:"img/public.png"
            });

        }else if(nowplace == 'sky')
        {
            firebase.database().ref('/sky_list').push({
                name:user_name,
                email:user_email,
                data:null,
                time:nowTime(),
                sticker:"img/public.png"
            });

        }
    });

    // The html code for post
    var other_str_before_username = '<div class="otherSend"><p style="margin:0px;font-size:10px">';
    var other_str_after_content = '</li><div class="otherArrow"></div></div>'+'<p class="othersendTime">';
    var str_before_username = '<div class="mySend"><p style="margin:0px;font-size:10px">';
    var str_after_content = '</li><div class="myArrow"></div></div>'+'<p class="sendTime">';
    var other_st_after_content = '<div class="otherArrow"></div></div>'+'<p class="othersendTime">';
    var st_after_content = '<div class="myArrow"></div></div>'+'<p class="sendTime">';

    var postsRef = firebase.database().ref('com_list');
    var animalpostsRef = firebase.database().ref('animal_list');
    var forestpostsRef = firebase.database().ref('forest_list');
    var skypostsRef = firebase.database().ref('sky_list');
    // List for store posts html
    var total_post = [];
    var animal_total_post = [];
    var forest_total_post = [];
    var sky_total_post = [];
    // Counter for checking history post update complete
    var first_count = 0;
    var animal_first_count = 0;
    var forest_first_count = 0;
    var sky_first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;
    var animal_second_count = 0;
    var forest_second_count = 0;
    var sky_second_count = 0;

    if(nowplace == 'public'){
        postsRef.once('value')
        .then(function(snapshot) {
            /// TODO 7: Get all history posts when the web page is loaded 
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. count history message number and recond in "first_count"
            ///         Hint : Trace the code in this block, then you will know how to finish this TODO
            snapshot.forEach(i=>{
                first_count = first_count + 1;
                if(i.val().data != null)
                {

                    if(i.val().email === user_email)
                    {
                        total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><li>" +i.val().data+ str_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><li>" +i.val().data+ other_str_after_content + i.val().time+'</p></div>')
                    }

                }else if(i.val().sticker != null){

                    if(i.val().email === user_email)
                    {

                        total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().sticker + ">" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().sticker + ">" + other_st_after_content + i.val().time+'</p></div>')
                    }

                }else{
                    if(i.val().email === user_email)
                    {

                        total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().img + " height='100'>" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().img + " height='100'>" + other_st_after_content + i.val().time+'</p></div>')
                    }
                }
            })
            /// Join all post in list to html in once
            document.getElementById('msgcontent').innerHTML = total_post.join('');

            /// Add listener to update new post
            postsRef.on('child_added', function(data) {
                second_count += 1;
                if (second_count > first_count) {
                    var childData = data.val();
                    if(childData.data != null)
                    {
                
                        if(childData.email == user_email)
                            total_post[total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><li>" + childData.data + str_after_content +nowTime()+'</p></div>'
                        else
                            total_post[total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><li>" +childData.data+ other_str_after_content + nowTime()+'</p></div>'
                    }else if(childData.sticker != null){
                        
                        if(childData.email == user_email)
                            total_post[total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.sticker + ">"  + st_after_content +nowTime()+'</p></div>'
                        else
                            total_post[total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.sticker + ">"+ other_st_after_content + nowTime()+'</p></div>'
                    }else{
                        if(childData.email == user_email)
                            total_post[total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.img + " height='100'>" + st_after_content +nowTime()+'</p></div>'
                        else
                            total_post[total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.img + " height='100'>" + other_st_after_content + nowTime()+'</p></div>'
                    }

                    document.getElementById('msgcontent').innerHTML = total_post.join('');
                    if(childData.email != user_email && document.hidden == true)
                    {   
                        if(childData.data != '')
                            notification(childData);
                        else if(window.Notification && Notification.permission === "granted") {
                            var n = new Notification(childData.email + " send a picture");
                        }      
                    }
                }
            });

            scrollMessage();

        })
        .catch(e => console.log(e.message));

    }else if(nowplace == 'animal'){
        animalpostsRef.once('value')
        .then(function(snapshot) {
            /// TODO 7: Get all history posts when the web page is loaded 
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. count history message number and recond in "first_count"
            ///         Hint : Trace the code in this block, then you will know how to finish this TODO
            snapshot.forEach(i=>{
                animal_first_count = animal_first_count + 1;
                if(i.val().data != null)
                {

                    if(i.val().email === user_email)
                    {
                        animal_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><li>" +i.val().data+ str_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        animal_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><li>" +i.val().data+ other_str_after_content + i.val().time+'</p></div>')
                    }

                }else if(i.val().sticker != null){

                    if(i.val().email === user_email)
                    {

                        animal_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().sticker + ">" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        animal_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().sticker + ">" + other_st_after_content + i.val().time+'</p></div>')
                    }

                }else{
                    if(i.val().email === user_email)
                    {

                        animal_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().img + " height='100'>" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        animal_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().img + " height='100'>" + other_st_after_content + i.val().time+'</p></div>')
                    }
                }
            })
            /// Join all post in list to html in once
            document.getElementById('msgcontent').innerHTML = animal_total_post.join('');

            /// Add listener to update new post
            animalpostsRef.on('child_added', function(data) {
                animal_second_count += 1;
                if (animal_second_count > animal_first_count) {
                    var childData = data.val();
                    if(childData.data != null)
                    {
                
                        if(childData.email == user_email)
                            animal_total_post[animal_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><li>" + childData.data + str_after_content +nowTime()+'</p></div>'
                        else
                            animal_total_post[animal_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><li>" +childData.data+ other_str_after_content + nowTime()+'</p></div>'
                    }else if(childData.sticker != null){
                        
                        if(childData.email == user_email)
                            animal_total_post[animal_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.sticker + ">"  + st_after_content +nowTime()+'</p></div>'
                        else
                            animal_total_post[animal_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.sticker + ">"+ other_st_after_content + nowTime()+'</p></div>'
                    }else{
                        if(childData.email == user_email)
                            animal_total_post[animal_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.img + " height='100'>" + st_after_content +nowTime()+'</p></div>'
                        else
                            animal_total_post[animal_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.img + " height='100'>" + other_st_after_content + nowTime()+'</p></div>'
                    }

                    document.getElementById('msgcontent').innerHTML = animal_total_post.join('');
                    if(childData.email != user_email && document.hidden == true)
                    {   
                        if(childData.data != '')
                            notification(childData);
                        else if(window.Notification && Notification.permission === "granted") {
                            var n = new Notification(childData.email + " send a picture");
                        }      
                    }
                }
            });

            scrollMessage();

        })
        .catch(e => console.log(e.message));
    }
    else if(nowplace == 'forest'){
        forestpostsRef.once('value')
        .then(function(snapshot) {
            /// TODO 7: Get all history posts when the web page is loaded 
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. count history message number and recond in "first_count"
            ///         Hint : Trace the code in this block, then you will know how to finish this TODO
            snapshot.forEach(i=>{
                forest_first_count = forest_first_count + 1;
                if(i.val().data != null)
                {

                    if(i.val().email === user_email)
                    {
                        forest_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><li>" +i.val().data+ str_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        forest_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><li>" +i.val().data+ other_str_after_content + i.val().time+'</p></div>')
                    }

                }else if(i.val().sticker != null){

                    if(i.val().email === user_email)
                    {

                        forest_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().sticker + ">" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        forest_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().sticker + ">" + other_st_after_content + i.val().time+'</p></div>')
                    }

                }else{
                    if(i.val().email === user_email)
                    {

                        forest_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().img + " height='100'>" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        forest_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().img + " height='100'>" + other_st_after_content + i.val().time+'</p></div>')
                    }
                }
            })
            /// Join all post in list to html in once
            document.getElementById('msgcontent').innerHTML = forest_total_post.join('');

            /// Add listener to update new post
            forestpostsRef.on('child_added', function(data) {
                forest_second_count += 1;
                if (forest_second_count > forest_first_count) {
                    var childData = data.val();
                    if(childData.data != null)
                    {
                
                        if(childData.email == user_email)
                            forest_total_post[forest_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><li>" + childData.data + str_after_content +nowTime()+'</p></div>'
                        else
                            forest_total_post[forest_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><li>" +childData.data+ other_str_after_content + nowTime()+'</p></div>'
                    }else if(childData.sticker != null){
                        
                        if(childData.email == user_email)
                            forest_total_post[forest_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.sticker + ">"  + st_after_content +nowTime()+'</p></div>'
                        else
                            forest_total_post[forest_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.sticker + ">"+ other_st_after_content + nowTime()+'</p></div>'
                    }else{
                        if(childData.email == user_email)
                            forest_total_post[forest_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.img + " height='100'>" + st_after_content +nowTime()+'</p></div>'
                        else
                            forest_total_post[forest_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.img + " height='100'>" + other_st_after_content + nowTime()+'</p></div>'
                    }

                    document.getElementById('msgcontent').innerHTML = forest_total_post.join('');
                    if(childData.email != user_email && document.hidden == true)
                    {   
                        if(childData.data != '')
                            notification(childData);
                        else if(window.Notification && Notification.permission === "granted") {
                            var n = new Notification(childData.email + " send a picture");
                        }      
                    }
                }
            });

            scrollMessage();

        })
        .catch(e => console.log(e.message));
    }else if(nowplace == 'sky'){
        skypostsRef.once('value')
        .then(function(snapshot) {
            /// TODO 7: Get all history posts when the web page is loaded 
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. count history message number and recond in "first_count"
            ///         Hint : Trace the code in this block, then you will know how to finish this TODO
            snapshot.forEach(i=>{
                sky_first_count = sky_first_count + 1;
                if(i.val().data != null)
                {

                    if(i.val().email === user_email)
                    {
                        sky_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><li>" +i.val().data+ str_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        sky_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><li>" +i.val().data+ other_str_after_content + i.val().time+'</p></div>')
                    }

                }else if(i.val().sticker != null){

                    if(i.val().email === user_email)
                    {

                        sky_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().sticker + ">" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        sky_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().sticker + ">" + other_st_after_content + i.val().time+'</p></div>')
                    }

                }else{
                    if(i.val().email === user_email)
                    {

                        sky_total_post.push(str_before_username + i.val().name + "</p><div class='myDialogue'><img src=" + i.val().img + " height='100'>" + st_after_content + i.val().time+'</p></div>')
                    }
                    else{
                        sky_total_post.push(other_str_before_username + i.val().name + "</p><div class='otherDialogue'><img src=" + i.val().img + " height='100'>" + other_st_after_content + i.val().time+'</p></div>')
                    }
                }
            })
            /// Join all post in list to html in once
            document.getElementById('msgcontent').innerHTML = sky_total_post.join('');

            /// Add listener to update new post
            skypostsRef.on('child_added', function(data) {
                sky_second_count += 1;
                if (sky_second_count > sky_first_count) {
                    var childData = data.val();
                    if(childData.data != null)
                    {
                
                        if(childData.email == user_email)
                            sky_total_post[sky_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><li>" + childData.data + str_after_content +nowTime()+'</p></div>'
                        else
                            sky_total_post[sky_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><li>" +childData.data+ other_str_after_content + nowTime()+'</p></div>'
                    }else if(childData.sticker != null){
                        
                        if(childData.email == user_email)
                            sky_total_post[sky_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.sticker + ">"  + st_after_content +nowTime()+'</p></div>'
                        else
                            sky_total_post[sky_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.sticker + ">"+ other_st_after_content + nowTime()+'</p></div>'
                    }else{
                        if(childData.email == user_email)
                            sky_total_post[sky_total_post.length] = str_before_username + childData.name + "</p><div class='myDialogue'><img src=" + childData.img + " height='100'>" + st_after_content +nowTime()+'</p></div>'
                        else
                            sky_total_post[sky_total_post.length] = other_str_before_username + childData.name + "</p><div class='otherDialogue'><img src=" + childData.img + " height='100'>" + other_st_after_content + nowTime()+'</p></div>'
                    }

                    document.getElementById('msgcontent').innerHTML = sky_total_post.join('');
                    if(childData.email != user_email && document.hidden == true)
                    {   
                        if(childData.data != '')
                            notification(childData);
                        else if(window.Notification && Notification.permission === "granted") {
                            var n = new Notification(childData.email + " send a picture");
                        }      
                    }
                }
            });

            scrollMessage();

        })
        .catch(e => console.log(e.message));
    }
    

    function nowTime(){
        var time = new Date();
        var hr   = time.getHours();
        var min  = time.getMinutes();
        if(time.getHours()<=9){
            hr="0"+time.getHours();
        }
        if(time.getMinutes()<=9){
            min="0"+time.getMinutes();
        }
        var sendTime=hr+":"+min;
        return sendTime;
    }

};

function notification(data){
    if (window.Notification && Notification.permission === "granted") {
        var n = new Notification(data.name + " say: " + data.data);
    }
    console.log(data.name+"say" +data.data);
};

window.onload = function() {
    init();
    scrollMessage();
};

function scrollMessage(){
    $('#msgcontent').stop().animate({scrollTop: $("#msgcontent")[0].scrollHeight}, 800);
};


window.addEventListener("load", function() {

    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
});

const storageRef = firebase.storage().ref();

var database = firebase.database;

var temp = "";

var selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     temp = selectedFile.name;
     console.log(temp);
     console.log('success');
  });
}


/*$(".display-photo").on("click", function() {


  storageRef.child('images/' + temp).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
      var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      console.log(url);

      $("#picture-display").html("<img src='" + url + "' width='200'>");
  
      // Or inserted into an <img> element:
      var img = document.getElementById('myimg');
      img.src = url;
  }).catch(function(error) {
      // Handle any errors
  });

});*/

 