// === Thème clair / sombre avec localStorage === //
const toggle = document.getElementById("theme-toggle"); // Checkbox pour changer le thème
const html = document.documentElement; // <html> pour changer l'attribut data-theme

// Vérifie si un thème a déjà été sauvegardé dans le navigateur
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme); // Applique le thème sauvegardé
  toggle.checked = savedTheme === "dark"; // Coche la checkbox si le thème est dark
}

// Quand on change la checkbox
toggle.addEventListener("change", () => {
  const newTheme = toggle.checked ? "dark" : "light"; // Définit le nouveau thème
  html.setAttribute("data-theme", newTheme); // Applique le thème sur le HTML
  localStorage.setItem("theme", newTheme); // Sauvegarde le thème choisi dans le navigateur
});


// === Animation d'apparition des sections au scroll === //
const sections = document.querySelectorAll('.section');

// détecte quand une section apparaît à l'écran
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { // Si la section est visible
      entry.target.classList.add('visible'); // Ajoute la classe 'visible' pour l'animation
      observer.unobserve(entry.target); // Arrête d'observer cette section pour ne pas répéter l'animation
    }
  });
}, { threshold: 0.2 }); // 20% de visibilité pour déclencher l'animation

sections.forEach(section => observer.observe(section)); // Observe chaque section


// === Formulaire de contact avec feedback ===// 
const form = document.querySelector(".contact-form"); // Formulaire
const btn = form.querySelector(".submit-btn"); // Bouton d'envoi
const vinyl = form.querySelector(".vinyl-loader"); // Loader animé (vinyle)
const feedback = form.querySelector(".form-feedback"); // Zone de message de retour

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêche l'envoi classique du formulaire

  vinyl.style.display = "inline-block"; // Affiche le loader
  btn.querySelector(".btn-text").textContent = "Envoi..."; // Change le texte du bouton

  const data = new FormData(form); // Récupère les données du formulaire

  // Envoi des données avec fetch
  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' } // Pour recevoir une réponse JSON
  }).then(response => {
    vinyl.style.display = "none"; // Cache le loader
    if (response.ok) { // Si l'envoi a réussi
      feedback.textContent = "Message envoyé ! Merci 🌸"; // Message de succès
      form.reset(); // Réinitialise le formulaire
      btn.querySelector(".btn-text").textContent = "Envoyer"; // Remet le texte du bouton
    } else { // Si erreur côté serveur
      feedback.textContent = "Oups, une erreur est survenue.";
      btn.querySelector(".btn-text").textContent = "Envoyer";
    }
  }).catch(() => { // Si erreur réseau
    vinyl.style.display = "none";
    feedback.textContent = "Oups, une erreur est survenue.";
    btn.querySelector(".btn-text").textContent = "Envoyer";
  });
});


// === MODALE === //

const projectCards = document.querySelectorAll('.want-more'); // Cartes cliquables
const modals = document.querySelectorAll('.modal'); // Modales
const closeButtons = document.querySelectorAll('.close-modal'); // Boutons de fermeture

// Ouvre la modale correspondante au clic sur une carte
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault(); 
    const modalId = card.getAttribute('data-modal'); // Récupère l'ID de la modale
    document.getElementById(modalId).classList.add('open'); // Ouvre la modale
  });
});

// Ferme la modale au clic sur la X
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('open'); // Retire la classe 'open'
  });
});

// Ferme la modale si on clique en dehors
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) modal.classList.remove('open');
  });
});
