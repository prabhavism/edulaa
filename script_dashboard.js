const subjects = [
  {
    name: "Mathematics",
    image: "https://media.istockphoto.com/id/1439286764/vector/mathematics-hand-lettering-with-mathematical-doodle.jpg?s=612x612&w=is&k=20&c=pbajBma-Go0iUnDdquxl3a5hpPls5MGXJrqYAeHcN2Q=",
    faculty: "Prabhav",
    info: "Explore algebra, calculus, geometry, and more. Build strong analytical skills.",
  },
  {
    name: "Physics",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240502160218/Physics.webp",
    faculty: "Shreeram",
    info: "Dive into mechanics, optics, and quantum physics with hands-on experiments.",
  },
  {
    name: "Chemistry",
    image: "https://i.ytimg.com/vi/5iTOphGnCtg/sddefault.jpg",
    faculty: "Nikshep",
    info: "Understand the wonders of molecules, reactions, and laboratory techniques.",
  },
  {
    name: "Biology",
    image: "https://i.ytimg.com/vi/3tisOnOkwzo/maxresdefault.jpg",
    faculty: "Rohan",
    info: "Study living organisms, genetics, and the marvels of the natural world.",
  },
  {
    name: "Computer Science", 
    image: "https://i.ytimg.com/vi/CxGSnA-RTsA/maxresdefault.jpg",
    faculty: "Rohan",
    info: "Learn programming, algorithms, and the foundations of modern computing.",
  }
];

const faculties = [
  {
    name: "Prabhav",
    image: "pp.jpeg",
    about: "PhD in Mathematics from IIT Bombay. 10+ years of teaching experience. Loves making math fun and accessible.",
    
  },
  {
    name: "Shreeram",
    image: "ps.jpeg",
    about: "Specializes in theoretical and applied physics. Passionate about student projects and science outreach.",
    
  },
  {
    name: "Nikshep",
    image: "pn.jpeg",
    about: "Expert in organic chemistry with a knack for simplifying complex concepts. Published researcher.",
   
  },
  {
    name: "Rohan",
    image: "pr.jpeg",
    about: "Computer Science educator and coding mentor. Loves AI, robotics, and empowering young learners.",
    
  }
];

const runningCourses = [subjects[0], subjects[1]];
const registeredCourses = [subjects[2]];
const availableCourses = [subjects[3], subjects[4]];

function renderSlides(slideContainerId, subjectsArr, btnText, actionFn) {
  const slidesContainer = document.getElementById(slideContainerId);
  slidesContainer.innerHTML = "";
  subjectsArr.forEach(subj => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <img src="${subj.image}" alt="${subj.name}">
      <h3>${subj.name}</h3>
      <p><strong>Faculty:</strong> ${subj.faculty}</p>
      <p style="font-size:0.98rem; color:#334155; margin-bottom:0.7rem;">${subj.info}</p>
      <button class="action-btn" onclick="${actionFn}('${subj.name}')">${btnText}</button>
    `;
    slidesContainer.appendChild(slide);
  });
}

function renderFaculties() {
  const facultyList = document.getElementById("facultyList");
  facultyList.innerHTML = "";
  faculties.forEach(fac => {
    const card = document.createElement("div");
    card.className = "faculty-card";
    card.innerHTML = `
      <img src="${fac.image}" alt="${fac.name}">
      <h3>${fac.name}</h3>
      <p>${fac.about}</p>
    `;
    facultyList.appendChild(card);
  });
}

function viewCourse(courseName) {
  alert(`Viewing details for "${courseName}".\n\n(Implementation can redirect to a course page.)`);
}
function buyCourse(courseName) {
  const filename = courseName.toLowerCase() + ".html";
  window.location.href = filename;
}

function searchCourses() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    renderSlides("availableCourses", availableCourses, "Buy", "buyCourse");
    return;
  }
  const filtered = availableCourses.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.faculty.toLowerCase().includes(query) ||
    s.info.toLowerCase().includes(query)
  );
  renderSlides("availableCourses", filtered, "Buy", "buyCourse");
}

document.getElementById("profileBtn").addEventListener("click", function(e) {
  e.stopPropagation();
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", function(event) {
  if (!event.target.closest('.nav-right')) {
    document.getElementById("profileDropdown").style.display = "none";
  }
});

function logout() {
  window.location.href = "login.html";
}

function openContactModal() {
  document.getElementById('contactModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
  document.body.style.overflow = '';
}
document.getElementById('contactModal').addEventListener('click', function(e) {
  if (e.target === this) closeContactModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeContactModal();
});

document.getElementById("searchInput").addEventListener("keyup", function(e) {
  if (e.key === "Enter") searchCourses();
  else if (!this.value) renderSlides("availableCourses", availableCourses, "Buy", "buyCourse");
});

function goToSubjectPage(subject) {
  const filename = subject.toLowerCase() + ".html";
  window.location.href = filename;
}

function viewRegisteredSubject(subject) {
  const filename = subject.toLowerCase() + ".html";
  window.location.href = filename;
}

renderSlides("runningCourses", runningCourses, "Continue", "goToSubjectPage");
renderSlides("registeredCourses", registeredCourses, "View", "viewRegisteredSubject");
renderSlides("availableCourses", availableCourses, "Buy", "buyCourse");
renderFaculties();
