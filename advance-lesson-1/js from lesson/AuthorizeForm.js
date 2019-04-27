'use strict';

//class A {
//    AAA() {
//        return 1;
//    }
//}


//let a = new A();
//a.AAA();

class AuthorizeForm {
    constructor(loginUrl, registerUrl) {
        this.loginUrl = loginUrl;
        this.registerUrl = registerUrl;
    }

    Login(email, password) {
        let data = {
            email: email,
            password: password
        };

        $.post(this.loginUrl, data, function (response) {
            if (response.redirect) {
                Alert.Success("You are authorized!");
                location.href = response.url;
            }
            else {
                Alert.Error("Incorrect email or password");
            }
            
        }, "json");
    }

    Register(email, password) {
        let data = {
            email: email,
            password: password
        };

        $.post(this.registerUrl, data, function (response) {
            if (response.result) {
                Alert.Success("You are successfuly registered!");

                setTimeout(function () {
                    location.href = "/";
                }, 300);
            }
            else {
                Alert.Error(
                    (response.errors && response.errors.join(" "))
                    ||
                    "Unexpected error. Please, try again later."
                );
            }

        }, "json");
    }
}

let authorizeForm = new AuthorizeForm("/Account/Login", "/Account/Register");
const bindControls = () => {
    let loginBtn = document.querySelector("#loginButton");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            authorizeForm.Login(email, password);
        });
    }

    let regBtn = document.querySelector("#registerButton");
    if (regBtn) {
        regBtn.addEventListener("click", function () {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirPassword").value;

            //temp decision
            if (password !== confirmPassword)
                Alert.Error("Confirmation of password was failed");
            else
            authorizeForm.Register(email, password);
        });
    }
};

bindControls();