<script>
  // Text editing toggle + save to localStorage
  document.querySelectorAll(".edit-btn[data-target]").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement.getAttribute("contenteditable") !== "true") {
        // Enable editing
        targetElement.setAttribute("contenteditable", "true");
        targetElement.focus();
        button.textContent = "💾 Save Text";
      } else {
        // Disable editing + save to localStorage
        targetElement.setAttribute("contenteditable", "false");
        button.textContent = "✏️ Edit Text";
        localStorage.setItem(targetId, targetElement.innerHTML);
      }
    });

    // Load saved text if exists
    const targetId = button.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    const savedText = localStorage.getItem(targetId);
    if (savedText) {
      targetElement.innerHTML = savedText;
    }
  });

  // Image change with file upload + save to localStorage
  document.querySelectorAll(".edit-btn[data-img]").forEach(button => {
    button.addEventListener("click", () => {
      const imgId = button.getAttribute("data-img");
      const inputId = button.getAttribute("data-input");
      const imgElement = document.getElementById(imgId);
      const inputElement = document.getElementById(inputId);

      inputElement.click();

      inputElement.addEventListener("change", () => {
        const file = inputElement.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            imgElement.src = e.target.result;
            localStorage.setItem(imgId, e.target.result); // Save base64 image
          };
          reader.readAsDataURL(file);
        }
      });
    });

    // Load saved image if exists
    const imgId = button.getAttribute("data-img");
    const imgElement = document.getElementById(imgId);
    const savedImg = localStorage.getItem(imgId);
    if (savedImg) {
      imgElement.src = savedImg;
    }
  });
</script>
