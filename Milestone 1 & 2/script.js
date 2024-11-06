"use strict";
class ResumeController {
    constructor() {
        this.sections = {
            "personal-section": true,
            "skills-section": true,
            "education-section": true,
            "experience-section": true,
        };
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        const buttons = document.querySelectorAll(".control-btn");
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const targetId = e.target.id;
                const sectionId = targetId.replace("toggle", "").toLowerCase() + "-section";
                this.toggleSection(sectionId);
            });
        });
    }
    toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.sections[sectionId] = !this.sections[sectionId];
            if (this.sections[sectionId]) {
                section.style.display = "block";
                setTimeout(() => {
                    section.style.opacity = "1";
                    section.style.transform = "translateY(0)";
                }, 10);
            }
            else {
                section.style.opacity = "0";
                section.style.transform = "translateY(-20px)";
                setTimeout(() => {
                    section.style.display = "none";
                }, 300);
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new ResumeController();
});
