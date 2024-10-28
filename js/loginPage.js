//A function that checks that the user exists
function check() {
    var existUser = false;
    //Creating two variables name and password
    var userName = document.getElementById('userName');
    var pass = document.getElementById('pass');
    //Retrieve all users
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    //A loop that goes through the array and checks if a user exists
    for (var i = 0; i < users.length; i++) {
        if (users[i][0].name == userName.value && users[i][3].pass == pass.value) 
        {
            sessionStorage.name = userName.value;//save user name to game page
            existUser = true;
            break;
        }
    }
    //If the user does not exist, print an appropriate message
    if (!existUser) {
        alert("login not correct");
    }
    //If so, a connection to the games page
    else {
        var url= "../html/mainPage.html"; 
         window.location=url;
    }
}