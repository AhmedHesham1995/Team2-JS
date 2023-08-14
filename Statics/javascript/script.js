var email_l = document.getElementById('email'),
    password_l = document.getElementById('password');

// sign up var
var username_sign = document.getElementById('username'),
    sign_btn = document.getElementById('signup');

var user_regx = /^[A-Za-z][A-Za-z]{3,}$/;
// var email_regx = /^\w+@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,3}$/;
var email_regx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

var pass_regx = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;

function validate(input, regex, messageId) {
    var messageElement = document.querySelector('.' + messageId);

    if (!regex.test(input.value) && input.value.trim() !== "") {
        // Show the error message
        messageElement.style.display = 'block';
        input.classList.remove('isvalid');
        return false;
    } else {
        // Hide the error message
        messageElement.style.display = 'none';
        input.classList.add('isvalid');
        return true;
    }
}

var users = [];
function isEmailExist(usersArray, email) {
    return usersArray.some(user => user.email === email);
}

function signUp() {
    var isUsernameValid = validate(username_sign, user_regx, 'msg1');
    var isEmailValid = validate(email_l, email_regx, 'msg2');
    var isPasswordValid = validate(password_l, pass_regx, 'msg3');
    
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        var msg2 = document.querySelector('.msg2');
        
        // Get existing users from localStorage or initialize an empty array
        var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (!isEmailExist(existingUsers, email_l.value)) {
            var temp = {
                name: username_sign.value,
                email: email_l.value,
                password: password_l.value,
            };

            // Only add the new user if the input values are not empty
            if (temp.name !== "" && temp.email !== "" && temp.password !== "") {
                existingUsers.push(temp);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                msg2.style.display = "none";
                window.location.href = "login.html";
            }
        } else {
            alert("Email already exists");
            msg2.style.display = "block";
        }
    }
}

function login() {
    var users = JSON.parse(localStorage.getItem('users'));
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const foundUser = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (foundUser) {
        alert("Login successful");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
}
