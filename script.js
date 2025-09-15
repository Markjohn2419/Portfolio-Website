// Text editing toggle + save to localStorage
document.querySelectorAll(".edit-btn[data-target]").forEach(button => {
  const targetId = button.getAttribute("data-target");
  const targetElement = document.getElementById(targetId);

  // Load saved text if exists
  const savedText = localStorage.getItem(targetId);
  if (savedText) {
    targetElement.innerHTML = savedText;
  }

  // Toggle edit mode
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

// Image change with file upload + save to localStorage
document.querySelectorAll(".edit-btn[data-img]").forEach(button => {
  const imgId = button.getAttribute("data-img");
  const inputId = button.getAttribute("data-input");
  const imgElement = document.getElementById(imgId);
  const inputElement = document.getElementById(inputId);

  // Load saved image if exists
  const savedImg = localStorage.getItem(imgId);
  if (savedImg) {
    imgElement.src = savedImg;
  }

  button.addEventListener("click", () => {
    inputElement.click();

    inputElement.onchange = () => {
      const file = inputElement.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          imgElement.src = e.target.result;
          localStorage.setItem(imgId, e.target.result); // Save base64 image
        };
        reader.readAsDataURL(file);
      }
    };
  });
});
