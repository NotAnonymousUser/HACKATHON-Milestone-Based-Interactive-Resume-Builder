interface Education {
  school: string;
  degree: string;
  graduationYear: string;
  gpa: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
}

class InteractiveResumeBuilder {
  private resume: Resume = {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    education: [],
    experience: [],
    skills: [],
  };

  private educationCount: number = 0;
  private experienceCount: number = 0;

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    document
      .getElementById("addEducation")
      ?.addEventListener("click", () => this.addEducationField());
    document
      .getElementById("addExperience")
      ?.addEventListener("click", () => this.addExperienceField());
    document
      .getElementById("resumeForm")
      ?.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private makeEditable(
    element: HTMLElement,
    type: string,
    index: number | null = null,
    field: string | null = null
  ): void {
    element.addEventListener("click", () => {
      const currentText = element.textContent || "";
      const input = document.createElement(
        element.tagName === "P" ? "input" : "textarea"
      );

      input.value = currentText;
      input.className = "editable-input";

      if (element.tagName === "P") {
        (input as HTMLInputElement).type = "text";
      } else {
        (input as HTMLTextAreaElement).rows = 3;
      }

      input.addEventListener("blur", () => {
        const newValue = input.value;
        element.textContent = newValue;

        if (type === "personalInfo" && field) {
          this.resume.personalInfo[
            field as keyof typeof this.resume.personalInfo
          ] = newValue;
        } else if (type === "education" && typeof index === "number" && field) {
          this.resume.education[index][field as keyof Education] = newValue;
        } else if (
          type === "experience" &&
          typeof index === "number" &&
          field
        ) {
          this.resume.experience[index][field as keyof Experience] = newValue;
        } else if (type === "skills") {
          this.resume.skills = newValue.split(",").map((skill) => skill.trim());
        }

        element.classList.remove("editing");
      });

      input.addEventListener(
        "keypress",
        function (this: HTMLElement, e: Event) {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
            (this as HTMLInputElement | HTMLTextAreaElement).blur();
          }
        }
      );

      element.textContent = "";
      element.appendChild(input);
      element.classList.add("editing");
      input.focus();
    });
  }

  private addEducationField(): void {
    const container = document.getElementById("educationContainer");
    if (!container) return;

    const section = document.createElement("div");
    section.className = "dynamic-section";
    section.innerHTML = `
      <div class="form-group">
        <label>School/University</label>
        <input type="text" name="school_${this.educationCount}" required>
      </div>
      <div class="form-group">
        <label>Degree</label>
        <input type="text" name="degree_${this.educationCount}" required>
      </div>
      <div class="form-group">
        <label>Graduation Year</label>
        <input type="text" name="gradYear_${this.educationCount}" required>
      </div>
      <div class="form-group">
        <label>GPA</label>
        <input type="text" name="gpa_${this.educationCount}" required>
      </div>
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    container.appendChild(section);
    this.educationCount++;
  }

  private addExperienceField(): void {
    const container = document.getElementById("experienceContainer");
    if (!container) return;

    const section = document.createElement("div");
    section.className = "dynamic-section";
    section.innerHTML = `
      <div class="form-group">
        <label>Company</label>
        <input type="text" name="company_${this.experienceCount}" required>
      </div>
      <div class="form-group">
        <label>Position</label>
        <input type="text" name="position_${this.experienceCount}" required>
      </div>
      <div class="form-group">
        <label>Start Date</label>
        <input type="month" name="startDate_${this.experienceCount}" required>
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="month" name="endDate_${this.experienceCount}" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea name="description_${this.experienceCount}" rows="3" required></textarea>
      </div>
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    container.appendChild(section);
    this.experienceCount++;
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Collect personal information
    this.resume.personalInfo = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
    };

    // Collect education
    this.resume.education = [];
    for (let i = 0; i < this.educationCount; i++) {
      const school = formData.get(`school_${i}`);
      if (school) {
        this.resume.education.push({
          school: school as string,
          degree: formData.get(`degree_${i}`) as string,
          graduationYear: formData.get(`gradYear_${i}`) as string,
          gpa: formData.get(`gpa_${i}`) as string,
        });
      }
    }

    // Collect experience
    this.resume.experience = [];
    for (let i = 0; i < this.experienceCount; i++) {
      const company = formData.get(`company_${i}`);
      if (company) {
        this.resume.experience.push({
          company: company as string,
          position: formData.get(`position_${i}`) as string,
          startDate: formData.get(`startDate_${i}`) as string,
          endDate: formData.get(`endDate_${i}`) as string,
          description: formData.get(`description_${i}`) as string,
        });
      }
    }

    // Collect skills
    this.resume.skills = (formData.get("skills") as string)
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    this.generateResume();
  }

  private generateResume(): void {
    const preview = document.getElementById("resumePreview");
    if (!preview) return;

    preview.style.display = "block";
    preview.innerHTML = `
      <div class="preview-header">
        <h1 class="editable" data-type="personalInfo" data-field="fullName">${
          this.resume.personalInfo.fullName
        }</h1>
        <p class="editable" data-type="personalInfo" data-field="contact">${
          this.resume.personalInfo.email
        } | ${this.resume.personalInfo.phone}</p>
        <p class="editable" data-type="personalInfo" data-field="location">${
          this.resume.personalInfo.location
        }</p>
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Education</h2>
        ${this.resume.education
          .map(
            (edu, index) => `
            <div class="preview-item" data-index="${index}">
              <h3 class="editable" data-type="education" data-field="school">${edu.school}</h3>
              <p class="editable" data-type="education" data-field="degree">${edu.degree} - ${edu.graduationYear}</p>
              <p class="editable" data-type="education" data-field="gpa">GPA: ${edu.gpa}</p>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Work Experience</h2>
        ${this.resume.experience
          .map(
            (exp, index) => `
            <div class="preview-item" data-index="${index}">
              <h3 class="editable" data-type="experience" data-field="company">${exp.company} - ${exp.position}</h3>
              <p class="editable" data-type="experience" data-field="dates">${exp.startDate} - ${exp.endDate}</p>
              <p class="editable" data-type="experience" data-field="description">${exp.description}</p>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Skills</h2>
        <p class="editable" data-type="skills">${this.resume.skills.join(
          ", "
        )}</p>
      </div>
    `;

    // Make elements editable
    const editableElements = preview.getElementsByClassName("editable");
    Array.from(editableElements).forEach((element) => {
      const type = element.getAttribute("data-type");
      const field = element.getAttribute("data-field");
      const index = element
        .closest(".preview-item")
        ?.getAttribute("data-index");

      if (type && element instanceof HTMLElement) {
        this.makeEditable(element, type, index ? parseInt(index) : null, field);
      }
    });

    // Scroll to preview
    preview.scrollIntoView({ behavior: "smooth" });
  }
}

// Initialize the Resume Builder
document.addEventListener("DOMContentLoaded", () => {
  new InteractiveResumeBuilder();
});
