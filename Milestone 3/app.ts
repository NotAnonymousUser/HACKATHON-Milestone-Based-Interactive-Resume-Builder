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

class ResumeBuilder {
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
                <h1>${this.resume.personalInfo.fullName}</h1>
                <p>${this.resume.personalInfo.email} | ${
      this.resume.personalInfo.phone
    }</p>
                <p>${this.resume.personalInfo.location}</p>
            </div>

            <div class="preview-section">
                <h2 class="preview-title">Education</h2>
                ${this.resume.education
                  .map(
                    (edu) => `
                    <div class="preview-item">
                        <h3>${edu.school}</h3>
                        <p>${edu.degree} - ${edu.graduationYear}</p>
                        <p>GPA: ${edu.gpa}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>

            <div class="preview-section">
                <h2 class="preview-title">Work Experience</h2>
                ${this.resume.experience
                  .map(
                    (exp) => `
                    <div class="preview-item">
                        <h3>${exp.company} - ${exp.position}</h3>
                        <p>${exp.startDate} - ${exp.endDate}</p>
                        <p>${exp.description}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>

            <div class="preview-section">
                <h2 class="preview-title">Skills</h2>
                <p>${this.resume.skills.join(", ")}</p>
            </div>
        `;

    // Scroll to preview
    preview.scrollIntoView({ behavior: "smooth" });
  }
}

// Initialize the Resume Builder
document.addEventListener("DOMContentLoaded", () => {
  new ResumeBuilder();
});
