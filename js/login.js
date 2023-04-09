function loginJs() {
  "use strict";

  VANTA.HALO({
    el: "#loginBg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
  });

  const firstName = document.querySelector(".first-name");
  let password = document.getElementById("password");
  let eyeicon = document.getElementById("eyeicon");
  let eyeiconShow = document.getElementById("eyeicon-show");

  eyeicon.onclick = function () {
    eyeicon.classList.add("none");
    eyeiconShow.classList.add("block");
    if (password.type == "password") {
      password.type = "text";
    }
  };

  eyeiconShow.onclick = function () {
    eyeicon.classList.remove("none");
    eyeiconShow.classList.remove("block");
    if (password.type == "text") {
      password.type = "password";
    }
  };

  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validateMess = document.querySelector(".validate-message");

    if (firstName.value && password.value) {
      const user = {
        firstName: firstName.value,
        password: password.value,
      };

      localStorage.setItem("user", JSON.stringify(user));

      console.log(firstName.value);

      validateMess.classList.add("none");

      window.location = "../select-level.html";
    } else if (!firstName.value && password.value) {
      validateMess.classList.remove("none");

      validateMess.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #fff;"></i>
      Iltimos ismingizni kititing:`;
    } else if (firstName.value && !password.value) {
      validateMess.classList.remove("none");

      validateMess.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #fff;"></i>
      Iltimos parol kititing:`;
    } else {
      validateMess.classList.remove("none");
      validateMess.classList.add("else");
      validateMess.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #fff;"></i>
      <div><span>Iltimos ismingizni kititing</span> <br> <span>Iltimos parol kititing</span></div>`;
    }
  });

  window.addEventListener('load', () => {
    if(localStorage.hasOwnProperty('user')) {
      window.location = "../select-level.html";
    }
  })
}

loginJs();
