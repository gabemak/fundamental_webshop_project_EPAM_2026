import{n as e,t}from"./main-DDy8OPbm.js";import{n}from"./main-D7MyJQla.js";import"./header-DqwkfWMZ.js";var r=e((()=>{var e=document.getElementById(`contactForm`),t=document.getElementById(`email`),n=document.getElementById(`formResponse`);t&&t.addEventListener(`input`,()=>{/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value)?t.style.borderColor=`#b92770`:t.style.borderColor=`red`}),e&&n&&e.addEventListener(`submit`,t=>{t.preventDefault(),e.checkValidity()?(n.innerHTML=`
        <p style="color: green; font-weight: bold; margin-top: 10px;">
          Success! Your message has been sent without reloading the page.
        </p>`,e.reset()):n.innerHTML=`
        <p style="color: red; font-weight: bold; margin-top: 10px;">
          Error! Please fill in all required fields correctly.
        </p>`})}));t(),r(),n();