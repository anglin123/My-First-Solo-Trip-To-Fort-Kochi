/**
 * Premium Travel Editorial Interactive JS
 * "My First Solo Trip to Fort Kochi"
 */

// Global image error handler to render beautiful custom SVG placeholders
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    const img = e.target;
    const altText = img.alt || 'Kochi Sightseeing';
    
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 350" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a3054" />
            <stop offset="50%" stop-color="#0d4c82" />
            <stop offset="100%" stop-color="#e64a19" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
        <rect x="15" y="15" width="470" height="320" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" rx="8" />
        
        <!-- Camera Icon -->
        <path d="M250,110 L270,110 L275,120 L300,120 C308,120 315,127 315,135 L315,195 C315,203 308,210 300,210 L200,210 C192,210 185,203 185,195 L185,135 C185,127 192,120 200,120 L225,120 L230,110 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round" opacity="0.6" />
        <circle cx="250" cy="165" r="22" fill="none" stroke="white" stroke-width="3" opacity="0.6" />
        
        <text x="50%" y="260" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" font-weight="600" fill="white" opacity="0.95">${altText}</text>
        <text x="50%" y="290" dominant-baseline="middle" text-anchor="middle" font-family="'Playfair Display', serif" font-size="13" font-style="italic" fill="rgba(255,255,255,0.7)">Fort Kochi Chronicles</text>
      </svg>
    `;
    
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());
    img.onerror = null; // Prevent recursion
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProgressBar();
  initScrollspy();
  initFaqAccordion();
  initPackingChecklist();
  initBudgetCalculator();
  initLightboxGallery();
  initCommentsSection();
  initNewsletterForm();
  initLeafletMap();
});

/* ==========================================
   1. NAVBAR & NAVIGATION
   ========================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navMenu.style.padding = '1.5rem 2rem';
      navMenu.style.borderBottom = '1px solid var(--text-border)';
      
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars';
          }
        }
      });
    });
  }
}

/* ==========================================
   2. READING PROGRESS BAR
   ========================================== */
function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  });
}

/* ==========================================
   3. SCROLLSPY SIDEBAR
   ========================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.toc-list li');
  const headerLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 150; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    // Sidebar scrollspy update
    navLinks.forEach(li => {
      li.classList.remove('active');
      const href = li.querySelector('a').getAttribute('href');
      if (href === `#${currentId}`) {
        li.classList.add('active');
      }
    });

    // Header active link update
    headerLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'journey-reflections' && href === '#journey-reflections')) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   4. FAQ ACCORDION
   ========================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    
    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        });
        
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* ==========================================
   5. PACKING CHECKLIST (LOCAL STORAGE)
   ========================================== */
function initPackingChecklist() {
  const checklistGrid = document.getElementById('packing-checklist-grid');
  const resetButton = document.getElementById('btn-reset-checklist');
  const checklistProgressBar = document.getElementById('checklist-progress-bar');
  if (!checklistGrid) return;

  const checkboxes = checklistGrid.querySelectorAll('input[type="checkbox"]');

  // Load saved state
  checkboxes.forEach(checkbox => {
    const itemId = checkbox.getAttribute('data-item');
    const isChecked = localStorage.getItem(`checklist_${itemId}`) === 'true';
    checkbox.checked = isChecked;
    
    // Toggle checked class on parent label card
    const labelCard = checkbox.closest('.checklist-item');
    if (labelCard) {
      labelCard.classList.toggle('checked', isChecked);
    }
  });

  // Calculate and update progress bar
  updateChecklistProgress(checkboxes, checklistProgressBar);

  // Checkbox change listener
  checklistGrid.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      const checkbox = e.target;
      const itemId = checkbox.getAttribute('data-item');
      const isChecked = checkbox.checked;
      
      localStorage.setItem(`checklist_${itemId}`, isChecked);
      
      const labelCard = checkbox.closest('.checklist-item');
      if (labelCard) {
        labelCard.classList.toggle('checked', isChecked);
      }
      
      updateChecklistProgress(checkboxes, checklistProgressBar);
    }
  });

  // Reset checklist
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      checkboxes.forEach(checkbox => {
        const itemId = checkbox.getAttribute('data-item');
        checkbox.checked = false;
        localStorage.removeItem(`checklist_${itemId}`);
        const labelCard = checkbox.closest('.checklist-item');
        if (labelCard) {
          labelCard.classList.remove('checked');
        }
      });
      updateChecklistProgress(checkboxes, checklistProgressBar);
    });
  }
}

function updateChecklistProgress(checkboxes, progressBar) {
  if (!progressBar) return;
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percentage = total > 0 ? (checked / total) * 100 : 0;
  progressBar.style.width = percentage + '%';
}

/* ==========================================
   6. BUDGET SELECTOR & CALCULATOR
   ========================================== */
const BUDGET_DATA = {
  "1000": {
    accommodation: 400,
    food: 300,
    transport: 100,
    activities: 100,
    misc: 100,
    description: "Perfect for budget travelers and backpackers. You will stay in clean shared hostel dormitories, eat delicious local meals (sadhya/street food), travel using public ferries/buses, and focus on free or low-cost sights."
  },
  "2000": {
    accommodation: 800,
    food: 550,
    transport: 200,
    activities: 250,
    misc: 200,
    description: "Flashpacker comfort. Allows you to stay in high-quality air-conditioned dorms or basic private rooms, enjoy one meal a day at a heritage café, take occasional auto-rickshaw rides, and afford all entry tickets and Kathakali shows."
  },
  "3000": {
    accommodation: 1300,
    food: 750,
    transport: 350,
    activities: 300,
    misc: 300,
    description: "Mid-range exploration. Stay in beautiful private homestays run by local families, dine in historic cafes (like Kashi or David Hall), rent a scooter for transit, buy high-grade spices, and explore backwater day trips."
  },
  "5000": {
    accommodation: 2200,
    food: 1100,
    transport: 600,
    activities: 600,
    misc: 500,
    description: "Boutique traveler experience. Stay in premium air-conditioned colonial heritage rooms, indulge in fresh seafood dining at fine restaurants, hire private taxis for long day trips (like Cherai Beach), and buy souvenirs."
  }
};

function initBudgetCalculator() {
  const budgetSelector = document.querySelector('.budget-tiers');
  if (!budgetSelector) return;

  const buttons = budgetSelector.querySelectorAll('.budget-tier-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedBudget = btn.getAttribute('data-budget');
      updateBudgetCalculatorValues(selectedBudget);
    });
  });

  // Init with default active (1000)
  updateBudgetCalculatorValues("1000");
}

function updateBudgetCalculatorValues(tierKey) {
  const data = BUDGET_DATA[tierKey];
  if (!data) return;

  const totalBudgetVal = parseInt(tierKey);

  // Update text values
  document.getElementById('val-accommodation').innerText = `₹${data.accommodation}`;
  document.getElementById('val-food').innerText = `₹${data.food}`;
  document.getElementById('val-transport').innerText = `₹${data.transport}`;
  document.getElementById('val-activities').innerText = `₹${data.activities}`;
  document.getElementById('val-misc').innerText = `₹${data.misc}`;
  document.getElementById('summary-total').innerText = `₹${totalBudgetVal.toLocaleString()}`;
  document.getElementById('budget-description').innerText = data.description;

  // Calculate percentages and update bar fills
  const setBarWidth = (fillId, value) => {
    const percent = totalBudgetVal > 0 ? (value / totalBudgetVal) * 100 : 0;
    const bar = document.getElementById(fillId);
    if (bar) {
      bar.style.width = percent + '%';
    }
  };

  setBarWidth('fill-accommodation', data.accommodation);
  setBarWidth('fill-food', data.food);
  setBarWidth('fill-transport', data.transport);
  setBarWidth('fill-activities', data.activities);
  setBarWidth('fill-misc', data.misc);
}

/* ==========================================
   7. CUSTOM LIGHTBOX GALLERY
   ========================================== */
function initLightboxGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-btn-close');
  const prevBtn = document.getElementById('lightbox-btn-prev');
  const nextBtn = document.getElementById('lightbox-btn-next');

  let currentIndex = 0;
  const galleryData = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src'),
    title: item.getAttribute('data-title'),
    desc: item.getAttribute('data-desc')
  }));

  // Open Lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox(galleryData[currentIndex]);
    });
  });

  function openLightbox(data) {
    lightboxImg.src = data.src;
    lightboxTitle.innerText = data.title;
    lightboxDesc.innerText = data.desc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Release background scroll
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxContent(galleryData[currentIndex]);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent(galleryData[currentIndex]);
  }

  function updateLightboxContent(data) {
    // Smooth transition between slides
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = data.src;
      lightboxTitle.innerText = data.title;
      lightboxDesc.innerText = data.desc;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  // Close Event
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Nav Events
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
}

/* ==========================================
   8. COMMENT SYSTEM (LOCAL STORAGE)
   ========================================== */
const DEFAULT_COMMENTS = [
  {
    name: "Rohan Sen",
    date: "July 02, 2026",
    text: "This guide is incredibly detailed! I'm planning my first trip to Kerala next month, and I was quite nervous about budget management. The budget selector here matches what I was looking for. Appam and stew is definitely on my list now!",
    likes: 8
  },
  {
    name: "Sarah Jenkins",
    date: "June 28, 2026",
    text: "As a solo female traveler who spent a week in Fort Kochi last winter, I can vouch for everything written here. It is one of the safest places I've been to. St. Francis Church and Vasco da Gama Square are beautiful. Princess Street is a joy to walk.",
    likes: 12
  },
  {
    name: "Anjali Nair",
    date: "June 15, 2026",
    text: "Great read! One quick tip: if you take the local ferry to Vypin island, make sure to try the small fried fish stalls near the jetty. They are extremely fresh, very cheap, and absolutely delicious.",
    likes: 5
  }
];

function initCommentsSection() {
  const form = document.getElementById('comment-submission-form');
  const commentsListBox = document.getElementById('comments-list-box');
  const commentsCountSpan = document.getElementById('comments-count');
  if (!commentsListBox) return;

  // Retrieve or initialize comments
  let comments = JSON.parse(localStorage.getItem('fort_kochi_comments'));
  if (!comments || comments.length === 0) {
    comments = DEFAULT_COMMENTS;
    localStorage.setItem('fort_kochi_comments', JSON.stringify(comments));
  }

  // Render comments
  renderComments(comments, commentsListBox, commentsCountSpan);

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('comment-input-name');
      const emailInput = document.getElementById('comment-input-email');
      const textInput = document.getElementById('comment-input-text');
      
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      
      if (name && text) {
        const newComment = {
          name: name,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          text: text,
          likes: 0
        };
        
        comments.unshift(newComment); // Add new comment to top
        localStorage.setItem('fort_kochi_comments', JSON.stringify(comments));
        
        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        textInput.value = '';
        
        renderComments(comments, commentsListBox, commentsCountSpan);
      }
    });
  }
}

function renderComments(comments, container, countSpan) {
  container.innerHTML = '';
  if (countSpan) countSpan.innerText = comments.length;

  comments.forEach((comment, index) => {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    
    // Get initial letter
    const initial = comment.name ? comment.name.charAt(0).toUpperCase() : 'U';

    commentItem.innerHTML = `
      <div class="comment-meta">
        <div class="comment-author-box">
          <div class="comment-avatar">${initial}</div>
          <span class="comment-author">${comment.name}</span>
        </div>
        <span class="comment-date">${comment.date}</span>
      </div>
      <p class="comment-text">${comment.text}</p>
      <div class="comment-actions">
        <button class="comment-action-btn like-btn" data-index="${index}">
          <i class="fa-regular fa-thumbs-up"></i> Helpful (${comment.likes})
        </button>
        <button class="comment-action-btn reply-btn">
          <i class="fa-regular fa-comment-dots"></i> Reply
        </button>
      </div>
    `;
    
    container.appendChild(commentItem);
  });

  // Attach click listeners to like buttons
  container.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = btn.getAttribute('data-index');
      let currentComments = JSON.parse(localStorage.getItem('fort_kochi_comments'));
      
      if (currentComments && currentComments[idx]) {
        currentComments[idx].likes += 1;
        localStorage.setItem('fort_kochi_comments', JSON.stringify(currentComments));
        renderComments(currentComments, container, countSpan);
      }
    });
  });

  // Simple alert placeholder for reply buttons
  container.querySelectorAll('.reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert("Reply feature will be enabled soon!");
    });
  });
}

/* ==========================================
   9. NEWSLETTER FORM
   ========================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput && emailInput.value.trim()) {
      alert(`Thank you for subscribing! A welcome guide has been dispatched to: ${emailInput.value.trim()}`);
      emailInput.value = '';
    }
  });
}

/* ==========================================
   10. LEAFLET INTERACTIVE MAP
   ========================================== */
const MAP_MARKERS = [
  { name: "Chinese Fishing Nets", lat: 9.9698, lng: 76.2415, fee: "Free (Tip if operating)", hours: "Active all day", section: "#place-fishing-nets" },
  { name: "Fort Kochi Beach", lat: 9.9682, lng: 76.2396, fee: "Free", hours: "24/7", section: "#place-beach" },
  { name: "St. Francis Church", lat: 9.9681, lng: 76.2419, fee: "Free", hours: "10 AM - 5 PM", section: "#place-st-francis" },
  { name: "Santa Cruz Basilica", lat: 9.9654, lng: 76.2427, fee: "Free", hours: "9 AM - 6 PM", section: "#place-santa-cruz" },
  { name: "Mattancherry Palace", lat: 9.9575, lng: 76.2592, fee: "₹5 (Indians), ₹100 (Foreigners)", hours: "9 AM - 5 PM, Closed Fri", section: "#place-mattancherry" },
  { name: "Jew Town", lat: 9.9558, lng: 76.2598, fee: "Free to wander", hours: "9:30 AM - 6:30 PM", section: "#place-jew-town" },
  { name: "Dutch Cemetery", lat: 9.9650, lng: 76.2392, fee: "Free (External View Only)", hours: "Visible anytime", section: "#place-dutch-cemetery" },
  { name: "Princess Street", lat: 9.9669, lng: 76.2418, fee: "Free", hours: "24/7", section: "#place-princess-street" },
  { name: "Vasco da Gama Square", lat: 9.9694, lng: 76.2423, fee: "Free", hours: "24/7, Best in evenings", section: "#place-vasco-square" },
  { name: "David Hall Art Gallery", lat: 9.9678, lng: 76.2435, fee: "Free", hours: "10 AM - 7 PM", section: "#place-david-hall" },
  { name: "Indo-Portuguese Museum", lat: 9.9634, lng: 76.2443, fee: "₹20 (Indians), ₹200 (Foreigners)", hours: "9 AM - 5 PM, Closed Mon", section: "#place-indo-portuguese" },
  { name: "Kerala Kathakali Centre", lat: 9.9659, lng: 76.2422, fee: "₹400", hours: "Makeup at 5 PM, Show at 6 PM", section: "#place-kathakali" },
  { name: "Marine Drive (Mainland)", lat: 9.9806, lng: 76.2758, fee: "Free", hours: "24/7, Best in evenings", section: "#place-marine-drive" },
  { name: "Cherai Beach (Vypin)", lat: 10.1416, lng: 76.1783, fee: "Free", hours: "24/7", section: "#place-cherai-beach" }
];

function initLeafletMap() {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Initialize map centered at Fort Kochi
  const map = L.map('map-container', {
    scrollWheelZoom: false // disable scrolling zoom for layout usability
  }).setView([9.968, 76.244], 13);

  // Add CartoDB Voyager Tile Layer (clean, minimal ocean blue/grey look that matches our design)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Create custom marker icons (sunset orange matching colors)
  const customIconHtml = `
    <div style="
      background-color: var(--sunset-medium); 
      width: 14px; 
      height: 14px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 0 0 4px rgba(230, 74, 25, 0.3);
    "></div>
  `;

  const markerBounds = [];

  // Plot markers
  MAP_MARKERS.forEach(spot => {
    const customIcon = L.divIcon({
      html: customIconHtml,
      className: 'custom-map-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);
    
    // Custom popup content matching styling
    const popupHtml = `
      <div style="font-family: var(--font-sans); color: var(--text-dark); padding: 0.2rem;">
        <h4 style="margin: 0 0 0.4rem 0; font-size: 1rem; color: var(--ocean-dark); font-weight: 700;">${spot.name}</h4>
        <p style="margin: 0 0 0.3rem 0; font-size: 0.85rem; color: var(--text-medium);"><strong>Entry:</strong> ${spot.fee}</p>
        <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--text-medium);"><strong>Hours:</strong> ${spot.hours}</p>
        <a href="${spot.section}" style="
          color: var(--sunset-medium); 
          font-weight: 600; 
          font-size: 0.85rem; 
          text-decoration: underline;
        ">Read Detail Guide</a>
      </div>
    `;

    marker.bindPopup(popupHtml);
    markerBounds.push([spot.lat, spot.lng]);
  });

  // Fit bounds to make sure all 14 points (including Vypin and Marine Drive) are within viewport on load
  if (markerBounds.length > 0) {
    map.fitBounds(markerBounds, { padding: [40, 40] });
  }
}
