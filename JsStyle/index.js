// Smooth scroll for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Show small effect message in console (fun easter egg for juniors 😎)
console.log("🔥 IGDTUW LE Student Guide Loaded | Built for LE Students 🚀");
