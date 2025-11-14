//import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js"
//import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/ScrollTrigger.min.js"

gsap.registerPlugin(ScrollTrigger)

let currentPage = 0
let allProjects = []
let skills = []
let aboutText = []

async function loadData() {
  try {
    // fetch JSON relative to this module file (works when served over http)
    const response = await fetch('src/json/data.json')
    const data = await response.json()
    allProjects = data.projects
    skills = data.skills
    aboutText = data.about
    renderPage()
    renderSkills()
    renderAbout()
    initAnimations()
  } catch (error) {
    console.error("Error loading data:", error)
  }
}

// Render projects for current page
function renderPage() {
  const projectsPerPage = 3
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = allProjects.slice(startIndex, endIndex)

  const container = document.getElementById("projects-container")
  container.innerHTML = ""

  currentProjects.forEach((project, index) => {
    const projectCard = document.createElement("a")
    projectCard.className = "project-card"
    projectCard.href = project.url || "#"
    if (project.url) {
      projectCard.target = "_blank"
      projectCard.rel = "noopener noreferrer"
    }

    const tagsHTML = project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")

    projectCard.innerHTML = `
      <div class="project-header">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
        </div>
        <svg class="project-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      </div>
      <div class="project-tags">${tagsHTML}</div>
    `

    container.appendChild(projectCard)
  })

  renderPagination()
  animateProjectCards()
}

// Render pagination controls
function renderPagination() {
  const projectsPerPage = 3
  const totalPages = Math.ceil(allProjects.length / projectsPerPage)
  const paginationContainer = document.getElementById("pagination")

  let paginationHTML = `
    <button class="pagination-button" id="prev-btn" ${currentPage === 0 ? "disabled" : ""}>
      ← Previous
    </button>
    <div class="pagination-dots" id="dots-container">
  `

  for (let i = 0; i < totalPages; i++) {
    paginationHTML += `
      <button class="pagination-dot ${i === currentPage ? "active" : ""}" data-page="${i}">${i + 1}</button>
    `
  }

  paginationHTML += `
    </div>
    <button class="pagination-button" id="next-btn" ${currentPage === totalPages - 1 ? "disabled" : ""}>
      Next →
    </button>
  `

  paginationContainer.innerHTML = paginationHTML

  // Add event listeners
  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--
      renderPage()
      window.scrollTo({ top: document.getElementById("work").offsetTop - 100, behavior: "smooth" })
    }
  })

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++
      renderPage()
      window.scrollTo({ top: document.getElementById("work").offsetTop - 100, behavior: "smooth" })
    }
  })

  document.querySelectorAll(".pagination-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      currentPage = Number.parseInt(dot.dataset.page)
      renderPage()
      window.scrollTo({ top: document.getElementById("work").offsetTop - 100, behavior: "smooth" })
    })
  })
}

// Render skills section
function renderSkills() {
  const container = document.getElementById("skills-container")
  container.innerHTML = ""

  skills.forEach((skillGroup) => {
    const skillDiv = document.createElement("div")
    skillDiv.className = "skill-group"

    const itemsHTML = skillGroup.items.map((item) => `<span class="skill-item">${item}</span>`).join("")

    skillDiv.innerHTML = `
      <h3>${skillGroup.category}</h3>
      <div class="skill-items">${itemsHTML}</div>
    `

    container.appendChild(skillDiv)
  })
}

// Render about section
function renderAbout() {
  const container = document.getElementById("about-content")
  const paragraphsHTML = aboutText.map((text) => `<p>${text}</p>`).join("")
  container.innerHTML = paragraphsHTML
}

// Animate project cards
function animateProjectCards() {
  const cards = document.querySelectorAll(".project-card")

  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 60, rotationX: 15, rotationZ: -2 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        rotationZ: 0,
        duration: 0.8,
        delay: index * 0.12,
        ease: "back.out",
      },
    )

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 0px 0px rgba(255, 255, 255, 0)",
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })
}

// Initialize all animations
function initAnimations() {
  // Hero animations
  const tl = gsap.timeline()
  tl.fromTo("#hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
    .fromTo(
      "#hero-title",
      { opacity: 0, y: 50, letterSpacing: "-0.05em" },
      { opacity: 1, y: 0, letterSpacing: "0em", duration: 1.2, ease: "power3.out" },
      0.2,
    )
    .fromTo(".hero-description", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4)
    .fromTo("#hero-buttons", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out" }, 0.6)

  // Hero floating effect
  gsap.to("#hero", {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })

  // Skills section animations
  const skillItems = document.querySelectorAll(".skill-item")
  gsap.fromTo(
    skillItems,
    { opacity: 0, y: 20, scale: 0.8, rotation: -5 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  )

  // About section animations
  const aboutParagraphs = document.querySelectorAll("#about-content p")
  gsap.fromTo(
    aboutParagraphs,
    { opacity: 0, y: 30, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.25,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    },
  )

  // Pagination buttons hover
  const paginationButtons = document.querySelectorAll(".pagination-button")
  paginationButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "back.out" })
    })
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out" })
    })
  })
}

// Load data on page load
document.addEventListener("DOMContentLoaded", loadData)
