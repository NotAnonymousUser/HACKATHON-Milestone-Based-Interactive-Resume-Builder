"use strict";
class InteractiveResumeBuilder {
    constructor() {
        this.resume = {
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
        this.educationCount = 0;
        this.experienceCount = 0;
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        var _a, _b, _c;
        (_a = document
            .getElementById("addEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.addEducationField());
        (_b = document
            .getElementById("addExperience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.addExperienceField());
        (_c = document
            .getElementById("resumeForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (e) => this.handleSubmit(e));
    }
    makeEditable(element, type, index = null, field = null) {
        element.addEventListener("click", () => {
            const currentText = element.textContent || "";
            const input = document.createElement(element.tagName === "P" ? "input" : "textarea");
            input.value = currentText;
            input.className = "editable-input";
            if (element.tagName === "P") {
                input.type = "text";
            }
            else {
                input.rows = 3;
            }
            input.addEventListener("blur", () => {
                const newValue = input.value;
                element.textContent = newValue;
                if (type === "personalInfo" && field) {
                    this.resume.personalInfo[field] = newValue;
                }
                else if (type === "education" && typeof index === "number" && field) {
                    this.resume.education[index][field] = newValue;
                }
                else if (type === "experience" &&
                    typeof index === "number" &&
                    field) {
                    this.resume.experience[index][field] = newValue;
                }
                else if (type === "skills") {
                    this.resume.skills = newValue.split(",").map((skill) => skill.trim());
                }
                element.classList.remove("editing");
            });
            input.addEventListener("keypress", function (e) {
                const keyboardEvent = e;
                if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
                    this.blur();
                }
            });
            element.textContent = "";
            element.appendChild(input);
            element.classList.add("editing");
            input.focus();
        });
    }
    addEducationField() {
        const container = document.getElementById("educationContainer");
        if (!container)
            return;
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
    addExperienceField() {
        const container = document.getElementById("experienceContainer");
        if (!container)
            return;
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
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        // Collect personal information
        this.resume.personalInfo = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            location: formData.get("location"),
        };
        // Collect education
        this.resume.education = [];
        for (let i = 0; i < this.educationCount; i++) {
            const school = formData.get(`school_${i}`);
            if (school) {
                this.resume.education.push({
                    school: school,
                    degree: formData.get(`degree_${i}`),
                    graduationYear: formData.get(`gradYear_${i}`),
                    gpa: formData.get(`gpa_${i}`),
                });
            }
        }
        // Collect experience
        this.resume.experience = [];
        for (let i = 0; i < this.experienceCount; i++) {
            const company = formData.get(`company_${i}`);
            if (company) {
                this.resume.experience.push({
                    company: company,
                    position: formData.get(`position_${i}`),
                    startDate: formData.get(`startDate_${i}`),
                    endDate: formData.get(`endDate_${i}`),
                    description: formData.get(`description_${i}`),
                });
            }
        }
        // Collect skills
        this.resume.skills = formData.get("skills")
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
        this.generateResume();
    }
    generateResume() {
        const preview = document.getElementById("resumePreview");
        if (!preview)
            return;
        preview.style.display = "block";
        preview.innerHTML = `
      <div class="preview-header">
        <h1 class="editable" data-type="personalInfo" data-field="fullName">${this.resume.personalInfo.fullName}</h1>
        <p class="editable" data-type="personalInfo" data-field="contact">${this.resume.personalInfo.email} | ${this.resume.personalInfo.phone}</p>
        <p class="editable" data-type="personalInfo" data-field="location">${this.resume.personalInfo.location}</p>
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Education</h2>
        ${this.resume.education
            .map((edu, index) => `
            <div class="preview-item" data-index="${index}">
              <h3 class="editable" data-type="education" data-field="school">${edu.school}</h3>
              <p class="editable" data-type="education" data-field="degree">${edu.degree} - ${edu.graduationYear}</p>
              <p class="editable" data-type="education" data-field="gpa">GPA: ${edu.gpa}</p>
            </div>
          `)
            .join("")}
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Work Experience</h2>
        ${this.resume.experience
            .map((exp, index) => `
            <div class="preview-item" data-index="${index}">
              <h3 class="editable" data-type="experience" data-field="company">${exp.company} - ${exp.position}</h3>
              <p class="editable" data-type="experience" data-field="dates">${exp.startDate} - ${exp.endDate}</p>
              <p class="editable" data-type="experience" data-field="description">${exp.description}</p>
            </div>
          `)
            .join("")}
      </div>

      <div class="preview-section">
        <h2 class="preview-title">Skills</h2>
        <p class="editable" data-type="skills">${this.resume.skills.join(", ")}</p>
      </div>
    `;
        // Make elements editable
        const editableElements = preview.getElementsByClassName("editable");
        Array.from(editableElements).forEach((element) => {
            var _a;
            const type = element.getAttribute("data-type");
            const field = element.getAttribute("data-field");
            const index = (_a = element
                .closest(".preview-item")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-index");
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
