// --------- Typing effect for professions ---------
const professions = ["Student", "Video Editor", "Developer", "Gamer", "Photographer"];
let currentProfession = 0;
let currentChar = 0;
const professionElement = document.getElementById("changingProfession");
const typingSpeed = 100;
const pauseBetween = 1500;
function typeProfession() {
    const text = professions[currentProfession];
    if (currentChar < text.length) {
        professionElement.textContent += text[currentChar];
        currentChar++;
        setTimeout(typeProfession, typingSpeed);
    } else {
        setTimeout(() => { eraseProfession(); }, pauseBetween);
    }
}
function eraseProfession() {
    if (currentChar > 0) {
        professionElement.textContent = professions[currentProfession].slice(0, currentChar - 1);
        currentChar--;
        setTimeout(eraseProfession, typingSpeed / 2);
    } else {
        currentProfession = (currentProfession + 1) % professions.length;
        setTimeout(typeProfession, typingSpeed);
    }
}
typeProfession();

// --------- Improved Scroll reveal ---------
const sections = document.querySelectorAll(".section");
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.6; // Earlier trigger for full-page snaps
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = sectionTop + section.getBoundingClientRect().height;
        if (sectionTop < triggerBottom && sectionBottom > 0) { // In partial view
            section.classList.add("show");
        } else {
            section.classList.remove("show"); // Re-hide if scrolled past/up
        }
    });
}
window.addEventListener("scroll", () => requestAnimationFrame(revealOnScroll));
window.addEventListener("resize", revealOnScroll); // Handle window resize
revealOnScroll(); // Initial call

// --------- Button pulse on scroll ---------
const buttons = document.querySelectorAll(".btn-projects, .btn-resume, .btn-send, .btn-view");
function pulseButtons() {
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.9){
            btn.classList.add("pulse");
        } else {
            btn.classList.remove("pulse");
        }
    });
}
window.addEventListener("scroll", pulseButtons);
pulseButtons(); // Initial check on load

// --------- Hero parallax effect ---------
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    let offset = window.scrollY;
    hero.style.backgroundPositionY = offset * 0.5 + 'px';
});

// --------- Hamburger menu toggle (for mobile) ---------
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    // Optional: Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}
// Variable declarations remain the same
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const carouselImages = document.querySelector('.carousel-images');
const totalSlides = slides.length; 
// Note: totalSlides must represent the number of slides in your HTML (e.g., 3 unique slides)

/**
 * Updates the CSS classes and styles for all slides based on the current center index.
 * This is where the scaling (center-focus) and looping are handled visually.
 */
function updateCarouselStyles() {
  const centerIndex = currentIndex;
  
  // 1. Calculate the necessary horizontal shift for the *carousel container*
  // We shift the container based on the current index, using 100% per slide width.
  carouselImages.style.transform = `translateX(-${centerIndex * 100}%)`;

  // 2. Apply classes for styling and scaling
  slides.forEach((slide, index) => {
    // Clear all existing dynamic classes first
    slide.classList.remove('active', 'side-left', 'side-right');

    // Determine the position relative to the centerIndex for visual effects
    let position = index - centerIndex;
    
    // Handle the visual wrapping for the loop effect
    if (centerIndex === 0 && index === totalSlides - 1) {
        position = -1; // The last slide is visually to the left of the first slide
    } else if (centerIndex === totalSlides - 1 && index === 0) {
        position = 1; // The first slide is visually to the right of the last slide
    }

    if (position === 0) {
      slide.classList.add('active'); // Center (Big)
      // Clear specific side transforms on the active element
      slide.style.transform = 'none'; 
    } else if (position === -1) {
      slide.classList.add('side-left'); // Left (Small)
    } else if (position === 1) {
      slide.classList.add('side-right'); // Right (Small)
    }
    // All other slides (position > 1 or < -1) will remain small/off-screen due to the translateX on the container
  });
}

/**
 * Handles slide change logic and boundary checks for the continuous loop.
 */
function changeSlide(direction) {
  currentIndex += direction;
  
  // Continuous loop logic: Go to the first slide when pressing next on the last, and vice-versa.
  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }
  
  // Update the visual state after changing the index
  updateCarouselStyles();
}

// Initial call to set up the carousel state on load
document.addEventListener("DOMContentLoaded", () => {
    updateCarouselStyles();
    // (Ensure the rest of your DOMContentLoaded logic remains here)
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent normal form submission

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://submit-form.com/iphaBo0nr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      });

      if (response.ok) {
        form.innerHTML = `
          <div class="thank-you-message">
            <h3>Thank you!</h3>
            <p>I’ll reply to you as soon as possible 🚀</p>
          </div>
        `;
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to send your message right now. Try again later!");
    }
  });
});

const elements = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => appearOnScroll.observe(el));
