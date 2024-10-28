
//Registration function
function sighn() {
  //Creating variables that receive the values from html
  var userName = document.getElementById('userName');
  var useLastname = document.getElementById('useLastname');
  var pass = document.getElementById('pass');
  var mail = document.getElementById('mail');
  var fone = document.getElementById('fone');
  //Creating two corrects
  var correct = true;
  var correctmail = false;
  var emailExist = false;
  //Correctness check - that all the fields are not empty + printing an appropriate message + turning the correct to false
  if (mail.value.length == 0) {
    alert('Please fill in email');
    correct = false;
  }
  else if (pass.value.length == 0) {
    alert('Please fill in password');
    correct = false;
  }
  else if (userName.value.length == 0) {
    alert('Please fill in userName');
    correct = false;
  }
  else if (useLastname.value.length == 0) {
    alert('Please fill in useLastname');
    correct = false;
  }
  else if (fone.value.length == 0) {
    alert('Please fill in fone');
    correct = false;
  }
  //Correctness check - that the password is not less than 8 characters
  else if (pass.value.length < 8) {
    alert('password is less then 8 characters');
    correct = false;
  }
  //Correctness check-that the email with @
  else{
    for (var i = 0; i < mail.value.length; i++) {
    if (mail.value[i]=='@') {
      correctmail=true;
    }
  }
    if(correctmail==false){
      alert("your email is not correct-add @");
    }
  }
  //If all the tests are correct - checking whether the user is not saved
  if(correctmail){
  if (correct) {

    //Retrieve all users
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    //Go through all users and check if there is a user with the same email
    for (var i = 0; i < users.length; i++) {
      if (users[i][2].mail === mail.value) {
        emailExist = true;
      }
    }
    //Creating an object that stores all the user's data
    var userData = [{ name: document.getElementById("userName").value },
    { useLastname: document.getElementById("useLastname").value },
    { mail: document.getElementById("mail").value },
    { pass: document.getElementById("pass").value },
    { fone: document.getElementById("fone").value }
    ];
    //Inserting the object into the array
    users.push(userData);
    //If this email exists - printing an appropriate message - connection to the games page
    if (emailExist) {
      alert("You are already logged in");
      var url = "../html/loginPage.html";
      window.location = url;

    }
    //If not, update localStorage and add the new user + an appropriate message
    else {
      localStorage.setItem('Users', JSON.stringify(users));
      alert('Your account has been created');
      ////Saving the username for the game page
      sessionStorage.name = userName.value;
      //connection to the games page
      var url = "../html/mainPage.html";
      window.location = url;
    
    }
  }
}
}
