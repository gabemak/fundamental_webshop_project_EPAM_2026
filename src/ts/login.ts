const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const togglePassword = document.getElementById("togglePassword") as HTMLElement;

togglePassword?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

loginForm?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;
  resetValidation();

  if (!emailRegex.test(emailValue)) {
    showError(emailInput, "emailError");
    isValid = false;
  }

  if (passwordValue.length < 6) {
    showError(passwordInput, "passwordError");
    isValid = false;
  }

  if (isValid) {
    const userName = emailValue.split("@")[0];
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", userName);

    const submitBtn = loginForm.querySelector(
      ".btn-login",
    ) as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.innerText = "LOGGING IN...";
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  }
});

function showError(input: HTMLInputElement, errorId: string) {
  input.classList.add("invalid");
  const errorDiv = document.getElementById(errorId);
  if (errorDiv) errorDiv.style.display = "block";
}

function resetValidation() {
  [emailInput, passwordInput].forEach((input) =>
    input.classList.remove("invalid"),
  );
  document.querySelectorAll(".error-message").forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });
}
