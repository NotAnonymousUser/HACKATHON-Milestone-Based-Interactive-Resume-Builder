var ResumeController = /** @class */ (function () {
  function ResumeController() {
    this.sections = {
      "personal-section": true,
      "skills-section": true,
      "education-section": true,
      "experience-section": true,
    };
    this.initializeEventListeners();
  }
  ResumeController.prototype.initializeEventListeners = function () {
    var _this = this;
    var buttons = document.querySelectorAll(".control-btn");
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        var targetId = e.target.id;
        var sectionId =
          targetId.replace("toggle", "").toLowerCase() + "-section";
        _this.toggleSection(sectionId);
      });
    });
  };
  ResumeController.prototype.toggleSection = function (sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
      this.sections[sectionId] = !this.sections[sectionId];
      // Add fade effect
      if (this.sections[sectionId]) {
        section.style.display = "block";
        setTimeout(function () {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }, 10);
      } else {
        section.style.opacity = "0";
        section.style.transform = "translateY(-20px)";
        setTimeout(function () {
          section.style.display = "none";
        }, 300);
      }
    }
  };
  return ResumeController;
})();
// Initialize the controller when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new ResumeController();
});
