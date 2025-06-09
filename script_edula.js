
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
    portfolio: "https://prabhavism.github.io/portfoliwebsite/index.html"
  },
  {
    name: "Shreeram",
    image: "ps.jpeg",
    about: "Specializes in theoretical and applied physics. Passionate about student projects and science outreach.",
    portfolio: "https://youtu.be/HGTJBPNC-Gw?si=atk1AoaY0arncCvr"
  },
  {
    name: "Nikshep",
    image: "pn.jpeg",
    about: "Expert in organic chemistry with a knack for simplifying complex concepts. Published researcher.",
    portfolio: "https://danknik.github.io/portfolio/"
  },
  {
    name: "Rohan",
    image: "pr.jpeg",
    about: "Computer Science educator and coding mentor. Loves AI, robotics, and empowering young learners.",
    portfolio: "https://github-acc1.github.io/portfolio/"
  }
];

function renderSlides(subjectsArr) {
  const slidesContainer = document.getElementById("slidesContainer");
  slidesContainer.innerHTML = "";
  subjectsArr.forEach(subj => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <img src="${subj.image}" alt="${subj.name}">
      <h2>${subj.name}</h2>
      <p><strong>Faculty:</strong> ${subj.faculty}</p>
      <p style="font-size:0.98rem; color:#334155; margin-bottom:0.7rem;">${subj.info}</p>
      <button class="register-btn" onclick="registerSubject('${subj.name}')">Register</button>
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
      <a href="${fac.portfolio}" target="_blank" class="portfolio-btn">View Portfolio</a>
    `;
    facultyList.appendChild(card);
  });
}

function registerSubject(subjectName) {
  window.location.href = 'register.html';
}

function searchCourses() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    renderSlides(subjects);
    return;
  }
  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.faculty.toLowerCase().includes(query) ||
    s.info.toLowerCase().includes(query)
  );
  renderSlides(filtered);
}

document.getElementById("searchInput").addEventListener("keyup", function(e) {
  if (e.key === "Enter") searchCourses();
  else if (!this.value) renderSlides(subjects);
});

function openContactModal() {
  document.getElementById('contactModal').style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}
function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
  document.body.style.overflow = ''; // Restore scroll
}
document.getElementById('contactModal').addEventListener('click', function(e) {
  if (e.target === this) closeContactModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeContactModal();
});

renderSlides(subjects);
renderFaculties();