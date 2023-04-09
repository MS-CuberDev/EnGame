function selectLevel() {
  "use strict";

  VANTA.RINGS({
    el: "#selectLevelBg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
  });

  const levelButtons = document.querySelectorAll(".level");

  levelButtons.forEach((levelBtn) => {
    levelBtn.addEventListener("click", () => {
      levelButtons.forEach((item) => {
        if (item.classList.contains("active") && item !== levelBtn) {
          item.classList.remove("active");
        }
      });
      levelBtn.classList.toggle("active");
    });
  });
}

export default selectLevel;
