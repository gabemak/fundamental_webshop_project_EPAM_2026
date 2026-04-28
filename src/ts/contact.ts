const form = document.getElementById("contactForm") as HTMLFormElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const responseMsg = document.getElementById(
  "formResponse",
) as HTMLDivElement | null;

if (emailInput) {
  emailInput.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      emailInput.style.borderColor = "red";
    } else {
      emailInput.style.borderColor = "#b92770";
    }
  });
}

if (form && responseMsg) {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    if (form.checkValidity()) {
      responseMsg.innerHTML = `
        <p style="color: green; font-weight: bold; margin-top: 10px;">
          Success! Your message has been sent without reloading the page.
        </p>`;
      form.reset();
    } else {
      responseMsg.innerHTML = `
        <p style="color: red; font-weight: bold; margin-top: 10px;">
          Error! Please fill in all required fields correctly.
        </p>`;
    }
  });
}
