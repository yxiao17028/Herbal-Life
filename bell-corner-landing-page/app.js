/**
 * BELL CORNER LANDING PAGE - JAVASCRIPT LOGIC
 * Enhanced with scroll-reveal animations and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', 'light');
  loadCMSContent(); // Load admin-customized content before other inits
  initMobileNav();
  initLanguageSelector();
  initCalculator();
  initContactForm();
  initSmoothScroll();
  initProgramsCarousel();
  initMenuSlider();
  initImageLightbox();
  initScrollReveal();
  initScrollToTop();
});

/* --------------------------------------------------------------------------
   CMS Content Loader — Applies admin-customized content from localStorage
   -------------------------------------------------------------------------- */
function loadCMSContent() {
  try {
    const raw = localStorage.getItem('bell_corner_cms');
    if (!raw) return; // No custom content, use static HTML defaults
    const data = JSON.parse(raw);
    if (!data) return;

    // --- Hero Section ---
    if (data.hero) {
      const h = data.hero;
      const heroBadge = document.getElementById('heroBadge');
      if (heroBadge && h.badge) {
        heroBadge.innerHTML = `<i class="fa-solid fa-leaf"></i> ${protectBrandName(h.badge)}`;
      }
      const heroTitle = document.getElementById('heroTitle');
      if (heroTitle && h.title) {
        const highlight = h.titleHighlight ? `<span class="text-gradient notranslate" translate="no">${h.titleHighlight}</span>` : '';
        heroTitle.innerHTML = `${protectBrandName(h.title)} <br>${highlight}`;
      }
      const heroDesc = document.getElementById('heroDesc');
      if (heroDesc && h.description) {
        heroDesc.innerHTML = protectBrandName(h.description);
      }
      const heroImg = document.getElementById('heroImg');
      if (heroImg && h.image) {
        heroImg.src = h.image;
      }
    }

    // --- About Section ---
    if (data.about) {
      const a = data.about;
      const aboutTag = document.getElementById('aboutTag');
      if (aboutTag && a.tag) {
        aboutTag.innerHTML = `<i class="fa-solid fa-heart-pulse"></i> ${protectBrandName(a.tag)}`;
      }
      const aboutTitle = document.getElementById('aboutTitle');
      if (aboutTitle && a.title) {
        const highlight = a.titleHighlight ? `<span class="text-gradient notranslate" translate="no">${a.titleHighlight}</span>` : '';
        aboutTitle.innerHTML = `${protectBrandName(a.title)} ${highlight} 🌿`;
      }
      const aboutText1 = document.getElementById('aboutText1');
      if (aboutText1 && a.text1) aboutText1.innerHTML = protectBrandName(a.text1);
      const aboutText2 = document.getElementById('aboutText2');
      if (aboutText2 && a.text2) aboutText2.innerHTML = protectBrandName(a.text2);
      const aboutImg = document.getElementById('aboutImg');
      if (aboutImg && a.image) aboutImg.src = a.image;

      // Update highlights
      if (a.highlights && a.highlights.length > 0) {
        const hlItems = [
          document.getElementById('hlItem1'),
          document.getElementById('hlItem2'),
          document.getElementById('hlItem3'),
          document.getElementById('hlItem4')
        ];
        a.highlights.forEach((hl, i) => {
          if (hlItems[i]) {
            const textEl = hlItems[i].querySelector('.highlight-text');
            if (textEl) {
              textEl.innerHTML = `<h4>${protectBrandName(hl.title)}</h4><p>${protectBrandName(hl.desc)}</p>`;
            }
          }
        });
      }
    }

    // --- About Us Section ---
    if (data.aboutUs) {
      const au = data.aboutUs;
      const aboutUsTag = document.getElementById('aboutUsTag');
      if (aboutUsTag && au.tag) {
        aboutUsTag.innerHTML = `<i class="fa-solid fa-users"></i> ${protectBrandName(au.tag)}`;
      }
      const aboutUsTitle = document.getElementById('aboutUsTitle');
      if (aboutUsTitle && au.title) {
        const highlight = au.titleHighlight ? `<span class="text-gradient notranslate" translate="no">${au.titleHighlight}</span>` : '';
        aboutUsTitle.innerHTML = `${protectBrandName(au.title)} ${highlight}`;
      }
      const aboutUsSubtitle = document.getElementById('aboutUsSubtitle');
      if (aboutUsSubtitle && au.subtitle) {
        aboutUsSubtitle.innerHTML = protectBrandName(au.subtitle);
      }
      const aboutUsText1 = document.getElementById('aboutUsText1');
      if (aboutUsText1 && au.text1) aboutUsText1.innerHTML = protectBrandName(au.text1);
      const aboutUsText2 = document.getElementById('aboutUsText2');
      if (aboutUsText2 && au.text2) aboutUsText2.innerHTML = protectBrandName(au.text2);
      const aboutUsImg = document.getElementById('aboutUsImg');
      if (aboutUsImg && au.image) aboutUsImg.src = au.image;

      // Update stats
      if (au.stats && au.stats.length > 0) {
        const statsGrid = document.getElementById('aboutUsStatsGrid');
        if (statsGrid) {
          statsGrid.innerHTML = au.stats.map(st => `
            <div class="about-us-stat-card">
              <div class="stat-number">${st.value || ''}</div>
              <div class="stat-text">${st.label || ''}</div>
            </div>
          `).join('');
        }
      }

      // Update pillars
      if (au.pillars && au.pillars.length > 0) {
        const pillarsContainer = document.getElementById('aboutUsPillars');
        if (pillarsContainer) {
          pillarsContainer.innerHTML = au.pillars.map(p => `
            <div class="about-us-pillar-card">
              <div class="pillar-icon"><i class="${p.icon || 'fa-solid fa-leaf'}"></i></div>
              <div class="pillar-info">
                <h4>${p.title || ''}</h4>
                <p>${p.desc || ''}</p>
              </div>
            </div>
          `).join('');
        }
      }
    }

    // --- Menu Posters ---
    if (data.menuPosters && data.menuPosters.length > 0) {
      const track = document.getElementById('menuTrack');
      if (track) {
        const sorted = [...data.menuPosters].sort((a, b) => a.order - b.order);
        track.innerHTML = sorted.map((p, i) => `
          <div class="menu-card" data-img="${p.image}" id="menuCard${i + 1}">
            <img src="${p.image}" alt="${p.title || 'Menu Poster'}" class="menu-poster-img">
            <div class="card-zoom-overlay">
              <span class="card-zoom-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> Click to Zoom</span>
            </div>
          </div>
        `).join('');
      }
    }

    // --- Programs ---
    if (data.programs && data.programs.length > 0) {
      const wrapper = document.getElementById('carouselSlidesWrapper');
      const dotsContainer = document.getElementById('carouselDots');
      if (wrapper) {
        const sorted = [...data.programs].sort((a, b) => a.order - b.order);
        wrapper.innerHTML = sorted.map((p, i) => `
          <div class="program-slide${i === 0 ? ' active' : ''}" data-index="${i}">
            <div class="slide-content-grid">
              <div class="slide-poster-col">
                <div class="slide-poster-card" data-img="${p.image}">
                  <img src="${p.image}" alt="${p.title}" class="slide-poster-img">
                  <div class="card-zoom-overlay">
                    <span class="card-zoom-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> Click to Zoom</span>
                  </div>
                </div>
              </div>
              <div class="slide-info-col">
                <span class="slide-badge"><i class="fa-solid ${p.badgeIcon || 'fa-leaf'}"></i> ${p.badge || ''}</span>
                <h3 class="slide-title">${p.title}</h3>
                <p class="slide-desc">${p.description || ''}</p>
                <ul class="slide-list">
                  ${(p.features || []).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
                </ul>
                <div class="slide-cta-row">
                  <a href="#contact" class="btn btn-primary">${p.ctaText || 'Learn More'}</a>
                  ${p.extraTag ? `<span class="slide-extra-tag"><i class="fa-solid fa-shield-heart"></i> ${p.extraTag}</span>` : ''}
                </div>
              </div>
            </div>
          </div>
        `).join('');

        // Rebuild dots
        if (dotsContainer) {
          dotsContainer.innerHTML = sorted.map((_, i) => `
            <button class="carousel-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>
          `).join('');
        }
      }
    }

    // --- Video Section ---
    if (data.video) {
      const v = data.video;
      const resultsTitle = document.getElementById('resultsTitle');
      if (resultsTitle && v.sectionTitle) {
        resultsTitle.innerHTML = `${v.sectionTitle} <span class="text-gradient">${v.sectionTitleHighlight || ''}</span>`;
      }
      const resultsSubtitle = document.getElementById('resultsSubtitle');
      if (resultsSubtitle && v.subtitle) resultsSubtitle.textContent = v.subtitle;

      const videoEl = document.querySelector('.result-video');
      if (videoEl) {
        if (v.src) {
          const source = videoEl.querySelector('source');
          if (source) source.src = v.src;
          videoEl.load();
        }
        if (v.poster) videoEl.poster = v.poster;
      }

      const disclaimer = document.getElementById('resultDisclaimer');
      if (disclaimer && v.disclaimer) disclaimer.textContent = v.disclaimer;
    }

    // --- Contact Info ---
    if (data.contact) {
      const c = data.contact;
      // Update the info card items
      const infoCard = document.getElementById('infoCard');
      if (infoCard) {
        const details = infoCard.querySelectorAll('.info-detail');
        if (details[0] && c.address) {
          details[0].querySelector('p').innerHTML = c.address.replace(/\n/g, '<br>');
        }
        if (details[0] && c.mapsLink) {
          const mapLink = details[0].querySelector('.map-link-btn');
          if (mapLink) mapLink.href = c.mapsLink;
        }
        if (details[1] && c.hours) {
          details[1].querySelector('p').innerHTML = c.hours.replace(/\n/g, '<br>');
        }
        if (details[2] && (c.email || c.phone)) {
          details[2].querySelector('p').innerHTML = `Email: ${c.email || ''}<br>WhatsApp: ${c.phone || ''}`;
        }
      }
    }

    // --- Site Settings ---
    if (data.siteSettings) {
      const s = data.siteSettings;
      if (s.title) document.title = s.title;
      if (s.metaDescription) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', s.metaDescription);
      }
      if (s.logo) {
        document.querySelectorAll('.brand-logo-img').forEach(img => {
          img.src = s.logo;
        });
      }
    }

  } catch (e) {
    console.warn('CMS Content Loader: Could not load custom content.', e);
  }
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animation System
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // Add reveal classes to elements
  const revealMappings = [
    // Hero section is animated via CSS keyframes, no scroll reveal needed

    // About section
    { selector: '.about-img-container', cls: 'reveal-left' },
    { selector: '.about-content .section-tag', cls: 'reveal', delay: 1 },
    { selector: '.about-content .section-title', cls: 'reveal', delay: 2 },
    { selector: '#aboutText1', cls: 'reveal', delay: 3 },
    { selector: '#aboutText2', cls: 'reveal', delay: 3 },
    { selector: '.about-highlights', cls: 'reveal', delay: 4 },
    { selector: '#btnBookConsult', cls: 'reveal', delay: 5 },

    // Menu section
    { selector: '#menuTag', cls: 'reveal', delay: 1 },
    { selector: '#menuTitle', cls: 'reveal', delay: 2 },
    { selector: '#menuSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.menu-carousel-wrapper', cls: 'reveal-scale', delay: 3 },

    // Calculator section
    { selector: '#calcTag', cls: 'reveal', delay: 1 },
    { selector: '#calcTitle', cls: 'reveal', delay: 2 },
    { selector: '#calcSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.calculator-card .calc-grid', cls: 'reveal-scale', delay: 3 },

    // Programs section
    { selector: '#programTag', cls: 'reveal', delay: 1 },
    { selector: '#programTitle', cls: 'reveal', delay: 2 },
    { selector: '#programSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.programs-carousel-container', cls: 'reveal-scale', delay: 3 },

    // Results section
    { selector: '#resultsTag', cls: 'reveal', delay: 1 },
    { selector: '#resultsTitle', cls: 'reveal', delay: 2 },
    { selector: '#resultsSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.video-container-card', cls: 'reveal-scale', delay: 3 },

    // About Us section
    { selector: '#aboutUsTag', cls: 'reveal', delay: 1 },
    { selector: '#aboutUsTitle', cls: 'reveal', delay: 2 },
    { selector: '#aboutUsSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.about-us-img-column', cls: 'reveal-left', delay: 3 },
    { selector: '.about-us-content-column', cls: 'reveal-right', delay: 3 },

    // Contact section
    { selector: '#contactTag', cls: 'reveal', delay: 1 },
    { selector: '#contactTitle', cls: 'reveal', delay: 2 },
    { selector: '#contactSubtitle', cls: 'reveal', delay: 2 },
    { selector: '.info-card', cls: 'reveal-left', delay: 3 },
    { selector: '.contact-form', cls: 'reveal-right', delay: 3 },

    // Footer
    { selector: '.footer-brand', cls: 'reveal', delay: 1 },
    { selector: '.footer-col', cls: 'reveal', delay: 2 },
  ];

  revealMappings.forEach(({ selector, cls, delay }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add(cls);
      if (delay) el.classList.add(`reveal-delay-${delay}`);
    });
  });

  // IntersectionObserver for scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after revealing to save performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* --------------------------------------------------------------------------
   Scroll to Top Button
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  // Create the button
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(scrollBtn);

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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
  const duration = 800;
  const isFloat = String(targetValue).includes('.');
  const finalVal = isFloat ? parseFloat(targetValue) : parseInt(targetValue, 10);
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Use easeOutCubic for smoother counting
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (finalVal - startVal) * eased;

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

/* --------------------------------------------------------------------------
   Brand Name Protection Helpers
   -------------------------------------------------------------------------- */
function protectBrandName(str) {
  if (!str || typeof str !== 'string') return str;
  let res = str.replace(/贝尔角/g, 'Bell Corner');
  
  const placeholders = [];
  res = res.replace(/<(span|strong)[^>]*class="[^"]*notranslate[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi, (match) => {
    placeholders.push(match);
    return `__NOTRANSLATE_PH_${placeholders.length - 1}__`;
  });

  res = res.replace(/bell corner/gi, '<span class="notranslate" translate="no">Bell Corner</span>');

  placeholders.forEach((ph, idx) => {
    res = res.replace(`__NOTRANSLATE_PH_${idx}__`, ph);
  });

  return res;
}

function cleanTranslatedBrandNames() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  const nodesToFix = [];
  while (node = walker.nextNode()) {
    if (node.nodeValue && node.nodeValue.includes('贝尔角')) {
      const parentName = node.parentNode ? node.parentNode.nodeName.toLowerCase() : '';
      if (parentName !== 'script' && parentName !== 'style') {
        nodesToFix.push(node);
      }
    }
  }
  nodesToFix.forEach(node => {
    node.nodeValue = node.nodeValue.replace(/贝尔角/g, 'Bell Corner');
  });
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

    // cleanTranslatedBrandNames(); // Disabled so Google Translate can translate brand names smoothly (e.g. 贝尔角 / ベルコーナー)
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
