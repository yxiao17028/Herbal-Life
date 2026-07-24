/**
 * BELL CORNER LANDING PAGE - JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', 'light');
  initMobileNav();
  initLanguageSelector();
  initCalculator();
  initContactForm();
  initSmoothScroll();
  initProgramsCarousel();
  initMenuSlider();
  initImageLightbox();
});

/* --------------------------------------------------------------------------
   Mobile Navbar Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggleBtn || !navMenu) return;

  navToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    navToggleBtn.setAttribute('aria-expanded', isExpanded);
    navToggleBtn.innerHTML = isExpanded ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Nutrition & Hydration Goal Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
  const weightInput = document.getElementById('calcWeight');
  const activitySelect = document.getElementById('calcActivity');
  const goalSelect = document.getElementById('calcGoal');
  const calculateBtn = document.getElementById('calculateBtn');
  
  const proteinOutput = document.getElementById('proteinOutput');
  const waterOutput = document.getElementById('waterOutput');

  function calculateGoals() {
    const weight = parseFloat(weightInput.value);
    if (!weight || weight <= 0) {
      showToast('Please enter a valid body weight in kg.');
      return;
    }

    const activityMultiplier = parseFloat(activitySelect.value) || 1.2;
    const goalFactor = parseFloat(goalSelect.value) || 1.0;

    // Protein calculation: Base 1.4g to 2.2g per kg depending on activity & goal
    let proteinGrams = Math.round(weight * 1.5 * activityMultiplier * goalFactor);

    // Water calculation: 35ml to 45ml per kg
    let waterLiters = (weight * 0.038 * activityMultiplier).toFixed(1);

    // Animate output counters
    animateCounter(proteinOutput, proteinGrams, 'g');
    animateCounter(waterOutput, waterLiters, ' L');
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateGoals);
  }

  // Also auto update on input change
  if (weightInput) {
    weightInput.addEventListener('input', () => {
      if (weightInput.value > 20) calculateGoals();
    });
  }
}

function animateCounter(element, targetValue, suffix = '') {
  const startVal = 0;
  const duration = 600;
  const isFloat = String(targetValue).includes('.');
  const finalVal = isFloat ? parseFloat(targetValue) : parseInt(targetValue, 10);
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = startVal + (finalVal - startVal) * progress;

    element.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   Universal iOS & Android Compatible Navigation (WhatsApp & Facebook)
   -------------------------------------------------------------------------- */
function openWhatsApp(messageText = '') {
  const phone = '60172562112';
  const text = messageText ? encodeURIComponent(messageText) : '';
  
  // Universal WhatsApp API endpoint supported seamlessly across iOS Safari, Android & Desktop
  const waUrl = text 
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
    : `https://api.whatsapp.com/send?phone=${phone}`;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Direct location navigation on iOS and Android triggers native WhatsApp launch without popup blockers
    window.location.href = waUrl;
  } else {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }
}

function handleWhatsAppClick(e, messageText = '') {
  if (e) e.preventDefault();
  openWhatsApp(messageText);
}

function handleFacebookClick(e, fbUrl = 'https://www.facebook.com/bellleong21/') {
  if (e) e.preventDefault();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = fbUrl;
  } else {
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) {
      showToast('Please fill in your name and phone number.');
      return;
    }

    const waText = `Hi Bell Corner! My name is ${name} (${phone}). I am interested in ${service}. Message: ${message}`;

    showToast('Thank you! Redirecting to WhatsApp to chat with Bell Corner...');
    
    setTimeout(() => {
      openWhatsApp(waText);
      contactForm.reset();
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Function
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> <span id="toastMsg"></span>`;
    document.body.appendChild(toast);
  }

  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   Smooth Scroll Highlight Active Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Google Translate & Language Selector Widget
   -------------------------------------------------------------------------- */
function toggleLangDropdown(e) {
  if (e) e.stopPropagation();
  const card = document.getElementById('langDropdownCard');
  if (card) {
    card.classList.toggle('show');
  }
}

function updateActiveLangUI(langCode) {
  if (!langCode) return;

  const tabs = document.querySelectorAll('.lang-tab-btn');
  tabs.forEach(t => {
    if (t.dataset.lang === langCode) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  const select = document.getElementById('allLangSelect');
  if (select) {
    select.value = langCode;
  }
}

function switchLanguage(langCode) {
  if (!langCode) return;

  try {
    localStorage.setItem('bell_corner_lang', langCode);
  } catch (e) {}

  updateActiveLangUI(langCode);

  function applyLanguage(code) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  }

  // 1. Try immediate client-side widget trigger
  if (!applyLanguage(langCode)) {
    // 2. Set googtrans cookie
    document.cookie = "googtrans=/auto/" + langCode + "; path=/;";
    if (window.location.hostname) {
      document.cookie = "googtrans=/auto/" + langCode + "; domain=" + window.location.hostname + "; path=/;";
    }
    
    // 3. Retry after a short delay for Google Translate script initialization
    setTimeout(() => {
      if (!applyLanguage(langCode)) {
        if (window.location.protocol === 'file:') {
          showToast('Google Translate loading... You can also right-click page -> Translate.');
        } else {
          location.reload();
        }
      }
    }, 400);
  }

  const card = document.getElementById('langDropdownCard');
  if (card) card.classList.remove('show');
}

function startGoogleTranslateCleaner() {
  setInterval(() => {
    if (document.body.style.top && document.body.style.top !== '0px') {
      document.body.style.top = '0px';
    }
    const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, iframe.skiptranslate, iframe[class*="goog-te-banner"]');
    bannerFrames.forEach(frame => {
      frame.style.display = 'none';
      frame.style.visibility = 'hidden';
      frame.style.opacity = '0';
      frame.style.height = '0';
    });
  }, 200);
}

function initLanguageSelector() {
  startGoogleTranslateCleaner();

  document.addEventListener('click', (e) => {
    const card = document.getElementById('langDropdownCard');
    const btn = document.getElementById('langBtn');
    if (card && btn && !card.contains(e.target) && !btn.contains(e.target)) {
      card.classList.remove('show');
    }
  });

  // Detect active language from localStorage or googtrans cookie on page load
  let activeLang = '';
  try {
    activeLang = localStorage.getItem('bell_corner_lang');
  } catch (e) {}

  if (!activeLang) {
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1]) {
      activeLang = match[1];
    }
  }

  if (activeLang) {
    updateActiveLangUI(activeLang);
  }
}

/* --------------------------------------------------------------------------
   Programs Slideshow / Carousel Logic
   -------------------------------------------------------------------------- */
function initProgramsCarousel() {
  const slides = document.querySelectorAll('.program-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const container = document.getElementById('programsCarousel');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayTimer = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.currentTarget.getAttribute('data-slide'));
      showSlide(targetIndex);
      startAutoPlay();
    });
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  window.jumpToProgramSlide = function(index) {
    showSlide(index);
    startAutoPlay();
  };

  showSlide(0);
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   Continuous Slow Moving Marquee Slider (Single Row 4 Cards)
   -------------------------------------------------------------------------- */
function initMenuSlider() {
  const track = document.getElementById('menuTrack');
  const wrapper = document.getElementById('menuCarouselWrapper');
  const prevBtn = document.getElementById('menuSliderPrevBtn');
  const nextBtn = document.getElementById('menuSliderNextBtn');

  if (!track) return;

  const originalCards = Array.from(track.children);
  if (!originalCards.length) return;

  // Duplicate cards to form a seamless infinite marquee loop
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let currentPosition = 0;
  let speed = 0.75; // Silky smooth slow crawl pixels per frame (~45px per sec)
  let isPaused = false;
  let animId = null;

  function getHalfWidth() {
    let halfWidth = 0;
    const cards = Array.from(track.children);
    const halfCount = originalCards.length;
    for (let i = 0; i < halfCount; i++) {
      const rect = cards[i].getBoundingClientRect();
      halfWidth += rect.width + 24; // 24px (1.5rem gap)
    }
    return halfWidth;
  }

  function render() {
    if (!isPaused) {
      currentPosition += speed;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && currentPosition >= halfWidth) {
        currentPosition -= halfWidth; // Seamless reset to start
      }
      track.style.transform = `translateX(-${currentPosition}px)`;
    }
    animId = requestAnimationFrame(render);
  }

  function moveNext() {
    const cards = Array.from(track.children);
    if (!cards.length) return;
    const singleWidth = cards[0].getBoundingClientRect().width + 24;
    currentPosition += singleWidth;
    const halfWidth = getHalfWidth();
    if (halfWidth > 0 && currentPosition >= halfWidth) {
      currentPosition -= halfWidth;
    }
    track.style.transform = `translateX(-${currentPosition}px)`;
  }

  function movePrev() {
    const cards = Array.from(track.children);
    if (!cards.length) return;
    const singleWidth = cards[0].getBoundingClientRect().width + 24;
    currentPosition -= singleWidth;
    const halfWidth = getHalfWidth();
    if (currentPosition < 0) {
      currentPosition += halfWidth;
    }
    track.style.transform = `translateX(-${currentPosition}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      movePrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moveNext();
    });
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => { isPaused = true; });
    wrapper.addEventListener('mouseleave', () => { isPaused = false; });
  }

  cancelAnimationFrame(animId);
  render();
}

/* --------------------------------------------------------------------------
   Image Lightbox Modal Zoom Function
   -------------------------------------------------------------------------- */
function initImageLightbox() {
  const modal = document.getElementById('imageZoomModal');
  const modalImg = document.getElementById('lightboxZoomImg');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!modal || !modalImg) return;

  function openLightbox(imgSrc) {
    modalImg.src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card, .slide-poster-card');
    if (card) {
      const imgSrc = card.getAttribute('data-img') || card.querySelector('img')?.src;
      if (imgSrc) {
        openLightbox(imgSrc);
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-body')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}
