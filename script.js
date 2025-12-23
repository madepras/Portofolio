document.addEventListener("DOMContentLoaded", () => {
  /* ===== NAV TOGGLE ===== */ 
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
  /* ===== THEME TOGGLE ===== */ const toggle =
    document.getElementById("theme-toggle");
  const body = document.body;
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }
  /* ===== CONTACT FORM ===== */ const form =
    document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const honeypot = form.website ? form.website.value : "";
    if (honeypot !== "") return;
    if (!name || !email || !message) {
      status.textContent = "All fields are required.";
      status.style.color = "red";
      return;
    }
    if (message.length < 10) {
      status.textContent = "Message must be at least 10 characters.";
      status.style.color = "red";
      return;
    }
    const lastSend = localStorage.getItem("lastSend");
    if (lastSend && Date.now() - lastSend < 60000) {
      status.textContent = "Please wait 1 minute before sending again.";
      status.style.color = "orange";
      return;
    }
    status.textContent = "Sending...";
    status.style.color = "#94a3b8";
    emailjs
      .send("service_0t2e4f6", "template_4n1cs3u", {
        name,
        email,
        message,
        time: new Date().toLocaleString("id-ID"),
      })
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        localStorage.setItem("lastSend", Date.now());
        form.reset();
      })
      .catch((error) => {
        status.textContent = "Failed to send message.";
        status.style.color = "red";
        console.error("EmailJS Error:", error);
      });
  });
});
