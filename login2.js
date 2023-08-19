// This file contains all global scripts that should work on ALL pages of the website
// This script needs to be added on every HTML page for all the pages to access these scripts

const loginButton = document.getElementsByClassName('login-link');
const logoutButton = document.getElementsByClassName('logout-link');

console.log("User logged in? " + sessionStorage.getItem('userStatus'))

// Check if the user is logged in. If they are, the Log in button will be replaced with Log out
if(sessionStorage.getItem('userStatus') == 'loggedIn') {
    console.log('User is logged in')
    loginButton[0].style.display = 'none';
    logoutButton[0].style.display = 'inline-block';
} else {
    console.log('User is logged out')
    loginButton[0].style.display = 'inline-block';
    logoutButton[0].style.display = 'none';
}


function logout() {
  let confirmAction = confirm("Are you sure you want to logout?");

  if(confirmAction) {
    console.log("Logging out..")
    console.log("Setting session to logged out...")
    sessionStorage.setItem('userStatus', 'loggedOut')
  } else {
    // Do nothing
  }
  
}