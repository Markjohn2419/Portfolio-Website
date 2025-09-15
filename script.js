// =====================
// Text editing toggle + localStorage for full containers
// =====================
document.querySelectorAll(".edit-btn[data-target]").forEach(button => {
  const targetId = button.getAttribute("data-target");
  const targetElement = document.getElementById(targetId);

  // Load saved content
  const savedContent = localStorage.getItem(targetId);
  if (savedContent) targetElement.innerHTML = savedContent;

  // Toggle edit
  button.addEventListener("click", () => {
    if (targetElement.getAttribute("contenteditable") !== "true") {
      targetElement.setAttribute("contenteditable", "true");
      targetElement.focus();
      button.textContent = "💾 Save Text";
      // Optional: add visual cue for editing
      targetElement.style.outline = "2px dashed #3b25ff";
      targetElement.style.padding = "5px";
    } else {
      targetElement.setAttribute("contenteditable", "false");
      button.textContent = "✏️ Edit Text";
      localStorage.setItem(targetId, targetElement.innerHTML);
      // Remove visual cue
      targetElement.style.outline = "none";
      targetElement.style.padding = "0";
    }
  });
});

// =====================
// Skill bar animation
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

window.addEventListener("scroll", animateSkills);
animateSkills(); // trigger on page load
