window.onload = function () {
// When the user clicks the button, open the modal
    document.getElementById('logInBtn').onclick = function () {
        document.getElementById('logInModal').classList.toggle('inactive-modal');
    };
    document.getElementById('optBtn').onclick = function () {
        document.getElementById('optModal').classList.toggle('inactive-modal');
    };
    document.getElementById('gameModeBtn').onclick = function () {
        document.getElementById('gameModeModal').classList.toggle('inactive-modal');
    };
// When the user clicks on <span> (x), close the modal
    document.getElementById('closeLogInModal').onclick = function () {
        document.getElementById('logInModal').classList.toggle('inactive-modal');
    };
    document.getElementById('closeOptModal').onclick = function () {
        document.getElementById('optModal').classList.toggle('inactive-modal');
    };
    document.getElementById('closeGameModeModal').onclick = function () {
        document.getElementById('gameModeModal').classList.toggle('inactive-modal');
    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === document.getElementById('optModal')) {
            document.getElementById('optModal').classList.toggle('inactive-modal');
        }
        if (event.target === document.getElementById('logInModal')) {
            document.getElementById('logInModal').classList.toggle('inactive-modal');
        }
        if (event.target === document.getElementById('gameModeModal')) {
            document.getElementById('gameModeModal').classList.toggle('inactive-modal');
        }
    };
};
let modalInterval;
if (!localStorage.user) {
    modalInterval = setInterval(function () {
        document.getElementById('logInModal').style.display = 'block';
    }, 1000);
}

class User {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

class Score {
    constructor(user, gameMode, time) {
        this.user = user;
        this.gameMode = gameMode;
        this.time = time;
    }
}

function logUserInByForm() {
    let tempForm = document.forms['logInForm'];
    if (tempForm['user-name-line'].value !== '' && tempForm['user-last-name-line'].value !== '') {
        localStorage.user = JSON.stringify(new User(tempForm['user-name-line'].value
            , tempForm['user-last-name-line'].value, tempForm['user-email-line'].value));
        window.click();
        clearInterval(modalInterval);
    }
}
