// ===== Theme switch
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  toggle.checked = savedTheme === "dark";
}

toggle.addEventListener("change", () => {
  const newTheme = toggle.checked ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// ===== Section appear on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// ===== Form submit
const form = document.querySelector(".contact-form");
const btn = form.querySelector(".submit-btn");
const vinyl = form.querySelector(".vinyl-loader");
const feedback = form.querySelector(".form-feedback");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  vinyl.style.display = "inline-block";
  btn.querySelector(".btn-text").textContent = "Envoi...";

  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    vinyl.style.display = "none";
    if(response.ok){
      feedback.textContent = "Message envoyé ! Merci 🌸";
      form.reset();
      btn.querySelector(".btn-text").textContent = "Envoyer";
    } else {
      feedback.textContent = "Oups, une erreur est survenue.";
      btn.querySelector(".btn-text").textContent = "Envoyer";
    }
  }).catch(() => {
    vinyl.style.display = "none";
    feedback.textContent = "Oups, une erreur est survenue.";
    btn.querySelector(".btn-text").textContent = "Envoyer";
  });
});
