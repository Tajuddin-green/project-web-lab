const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = document.getElementById("username");
  const inputUserName = userName.value;

  if (inputUserName === "") {
    alert("Enter Username");
    Swal.fire({
      icon: "error",
      title: "Wrong Username",
      text: "Enter Correct Username",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    const passWord = document.getElementById("password");
    const inputPassWord = passWord.value;

    if (inputPassWord === "123456") {
      Swal.fire({
        title: "Login Successfull!",
        text: "Wellcome Back",
        icon: "success",
      });

      document.getElementById("hero-section").classList.add("hidden");
      document.getElementById("nav-bar").classList.remove("hidden");
      document.getElementById("learn-section").classList.remove("hidden");
      document.getElementById("faq-section").classList.remove("hidden");
    } else {
      alert("Enter correct password");
      Swal.fire({
        icon: "error",
        title: "Wrong Password",
        text: "Enter Correct Passwpord",
        footer: '<a href="#">Forgot Password?</a>',
      });
      passWord.value = "";
    }
  }
});

const logOutBtn = document.getElementById("logout-btn");
logOutBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to log out",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged Out!",
        icon: "success",
      });

      // Only execute this if the user confirms the logout
      document.getElementById("hero-section").classList.remove("hidden");
      document.getElementById("nav-bar").classList.add("hidden");
      document.getElementById("learn-section").classList.add("hidden");
      document.getElementById("faq-section").classList.add("hidden");
    }
  });
});

document.getElementById("error-message").style.display = "none";
