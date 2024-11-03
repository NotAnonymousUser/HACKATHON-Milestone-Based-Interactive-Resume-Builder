interface SectionVisibility {
  [key: string]: boolean;
}

class ResumeController {
  private sections: SectionVisibility = {
    "personal-section": true,
    "skills-section": true,
    "education-section": true,
    "experience-section": true,
  };

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    const buttons = document.querySelectorAll(".control-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e: Event) => {
        const targetId = (e.target as HTMLElement).id;
        const sectionId =
          targetId.replace("toggle", "").toLowerCase() + "-section";
        this.toggleSection(sectionId);
      });
    });
  }

  private toggleSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      this.sections[sectionId] = !this.sections[sectionId];

      
      if (this.sections[sectionId]) {
        section.style.display = "block";
        setTimeout(() => {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }, 10);
      } else {
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
