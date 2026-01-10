document.addEventListener("DOMContentLoaded", () => {
  //text logo click
  const logo = document.querySelector(".text-logo");
  const front = document.querySelector(".logo-front");

  if (!logo || !front) return;

  logo.addEventListener("click", () => {
    front.style.color = "white";
    front.style.background = "none";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 150);
  });

  //navbar
  const links = document.querySelectorAll(".navbar-nav .nav-link");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
