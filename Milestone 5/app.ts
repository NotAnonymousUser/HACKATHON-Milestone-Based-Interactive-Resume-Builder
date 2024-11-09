//get references to the  form and diplay area

const form = document.getElementById("form-section") as HTMLFormElement;
const resumeSection = document.getElementById( "resume-display") as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//handle form submission
form.addEventListener("submit", (event: Event) => {
  event.preventDefault(); //prevent page reload

  //collect input values
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement)
    .value;
  const linkedin = (document.getElementById("linkedin") as HTMLInputElement)
    .value;
  const education = (document.getElementById("education") as HTMLInputElement)
    .value;
  const institute = (document.getElementById("institute") as HTMLInputElement)
    .value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value;
  const jobTitle = (document.getElementById("experience") as HTMLInputElement)
    .value;
  const companyName = (
    document.getElementById("experience") as HTMLInputElement
  ).value;
  const dates = (document.getElementById("dates-0") as HTMLInputElement).value;
  const summary = (document.getElementById("summary") as HTMLInputElement)
    .value;


    // Save form data in localStorage with the username as the key
const resumeData = {
  name,
  email,
  contact,
  linkedin,
  education,
  institute,
  skills,
  jobTitle,
  companyName,
  dates,
  summary,
  };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally


  //generate the resume content dynamically:
  const resumeHtmlContent = `
      <h2><b>Resume</b></h2>
      <h3>Personal Information</h3>
      <p><b>Name:</b><span contenteditable="true"> ${name}</span></p>
      <p><b>Email:</b><span contenteditable="true"> ${email}</span></p>
      <p><b>Contact:</b><span contenteditable="true"> ${contact}</span></p>
      <p><b>LinkedIn:</b><span contenteditable="true"> ${linkedin}</span></p>
      <h3>Education</h3>
      <p contenteditable="true"> ${education}</span></p>
      <p><b>Institute:</b><span contenteditable="true"> ${institute}</span></p>

      <h3>Skills</h3>
      <p contenteditable="true"> ${skills}</span></p>

      <h3>Experience</h3>
      <p><b>Job Title:</b><span contenteditable="true"> ${jobTitle}</span></p>
      <p><b>Company Name:</b><span contenteditable="true"> ${companyName}</span></p>
      <p><b>Duration:</b><span contenteditable="true"> ${dates}</span></p>
      <h3>Professional Summary</h3>
      <p contenteditable="true"> ${summary}</span></p>
      `;

  

  //display generated resume
  if (resumeSection) {
    resumeSection.innerHTML = resumeHtmlContent;
  } else {
    console.log("Resume section not found");
  }


  // Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  if (username) {
  
  // Autofill form if data is found in localStorage
  const savedResumeData = localStorage.getItem(username);
  if (savedResumeData) {
  const resumeData = JSON.parse(savedResumeData);
  (document.getElementById('username') as HTMLInputElement).value = username;
  (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
  (document.getElementById('email') as HTMLInputElement).value =resumeData.email;
  (document.getElementById('contact') as HTMLInputElement).value = resumeData.contact;
  (document.getElementById('linkedin') as HTMLInputElement).value =resumeData.linkedin;
  (document.getElementById('education') as HTMLInputElement).value =resumeData.education;
  (document.getElementById('institute') as HTMLTextAreaElement).value =resumeData.education;
  (document.getElementById('skills') as HTMLTextAreaElement).value =resumeData.skills;
  (document.getElementById('experience') as HTMLTextAreaElement).value= resumeData.jobTitle;
  (document.getElementById('experience') as HTMLTextAreaElement).value= resumeData.companyName;
  (document.getElementById('dates') as HTMLTextAreaElement).value= resumeData.dates;
  (document.getElementById('summary') as HTMLTextAreaElement).value= resumeData.summary;


  }
  }
  });





