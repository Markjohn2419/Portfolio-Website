// =====================
// Text editing toggle + localStorage
// =====================
document.querySelectorAll(".edit-btn[data-target]").forEach(button => {
  const targetId = button.getAttribute("data-target");
  const targetElement = document.getElementById(targetId);

  // Load saved text
  const savedText = localStorage.getItem(targetId);
  if (savedText) targetElement.innerHTML = savedText;

  // Toggle edit
  button.addEventListener("click", () => {
    if (targetElement.getAttribute("contenteditable") !== "true") {
      targetElement.setAttribute("contenteditable", "true");
      targetElement.focus();
      button.textContent = "💾 Save Text";
    } else {
      targetElement.setAttribute("contenteditable", "false");
      button.textContent = "✏️ Edit Text";
      localStorage.setItem(targetId, targetElement.innerHTML);
    }
  });
});

// =====================
// Image change + localStorage
// =====================
document.querySelectorAll(".edit-btn[data-img]").forEach(button => {
  const imgId = button.getAttribute("data-img");
  const inputId = button.getAttribute("data-input");
  const imgElement = document.getElementById(imgId);
  const inputElement = document.getElementById(inputId);

  // Load saved image
  const savedImg = localStorage.getItem(imgId);
  if (savedImg) imgElement.src = savedImg;

  // Image upload
  button.addEventListener("click", () => {
    inputElement.click();
    inputElement.onchange = () => {
      const file = inputElement.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          imgElement.src = e.target.result;
          localStorage.setItem(imgId, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  });
});

// =====================
// Skill bar animation when About section is in view
// =====================
function animateSkills() {
  const aboutSection = document.getElementById("ABOUT");
  const skills = document.querySelectorAll(".skill-level");
  const sectionPos = aboutSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos - 100) {
    skills.forEach(skill => {
      const level = skill.getAttribute("data-level");
      skill.style.width = level;
    });
    window.removeEventListener("scroll", animateSkills);
  }
}

// Trigger animation on scroll and page load
window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);
