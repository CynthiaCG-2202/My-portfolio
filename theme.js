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
