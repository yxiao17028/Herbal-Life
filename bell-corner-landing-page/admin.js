/**
 * BELL CORNER ADMIN PANEL — CMS Logic
 * RESTful-style CRUD operations with localStorage persistence
 */

/* ==========================================================================
   ContentAPI — RESTful CRUD Simulation Layer
   ========================================================================== */
class ContentAPI {
  static STORAGE_KEY = 'bell_corner_cms';

  // Default data structure matching the landing page
  static getDefaults() {
    return {
      hero: {
        badge: 'Fresh & Natural · Balanced Nutrition Meals',
        title: 'Health begins with meal',
        titleHighlight: 'Achieve health through balanced nutrition.',
        description: 'Welcome to Bell Corner! We specialize in fresh, scientifically balanced nutrition meals paired with low-calorie, high protein smoothies and energy teas for a clean, vibrant lifestyle. Enjoy a high-quality, nutritionally balanced breakfast for a healthy start.',
        image: 'assets/hero_meal_poster.jpg'
      },
      about: {
        tag: 'Clean Eating Concept',
        title: 'Crafted for Modern Living:',
        titleHighlight: 'Aesthetic Nutrition Meals',
        text1: 'At Bell Corner, we believe delicious taste and optimal health go hand in hand. Every nutrition meal is scientifically crafted with premium proteins, complex carbs, and rich dietary fiber.',
        text2: 'Whether you need a nutrient-dense morning boost, a clean lean meal for weight management, or post-workout recovery, we create customized fresh green nutrition meal plans for you.',
        image: 'assets/about_meal_v2.jpg',
        highlights: [
          { title: 'Balanced Macronutrient Ratio', desc: 'Controlled calories with high quality protein and light digestion.' },
          { title: 'Pure Fresh Ingredients', desc: 'Selected fresh vegetables and whole lean proteins.' },
          { title: 'Plant-Based Friendly', desc: 'Rich vegetarian and plant-protein options available.' },
          { title: 'Comfortable Green Aesthetic', desc: 'Crisp, refreshing experience from meals to atmosphere.' }
        ]
      },
      aboutUs: {
        tag: 'Our Story & Mission',
        title: 'About',
        titleHighlight: 'Bell Corner',
        subtitle: 'Your local neighborhood nutrition club in Bandar Mahkota Cheras, dedicated to healthy living, fresh meals, and active community wellness.',
        text1: 'Bell Corner was founded in Bandar Mahkota Cheras with a passion to bring wholesome, nutrient-dense nutrition meals and active lifestyle coaching to our local community. We believe that good health starts with proper daily nutrition and a supportive, energetic environment.',
        text2: 'From signature protein smoothies and refreshing energy teas to clean, balanced meals, our club is more than a place to eat — it is a welcoming space for anyone striving for weight management, fitness recovery, or an overall healthier lifestyle.',
        image: 'assets/about_meal.png',
        stats: [
          { value: '5,000+', label: 'Meals Served' },
          { value: '100%', label: 'Fresh & Healthy' },
          { value: '500+', label: 'Club Members' },
          { value: '5+ Yrs', label: 'Dedicated Service' }
        ],
        pillars: [
          { icon: 'fa-solid fa-leaf', title: 'Wholesome Nutrition', desc: 'Crafted with premium proteins, essential nutrients, and low-calorie recipes.' },
          { icon: 'fa-solid fa-people-group', title: 'Supportive Community', desc: 'Join our weekly fitness workouts, Tabata classes, and wellness scan check-ins.' },
          { icon: 'fa-solid fa-bullseye', title: 'Goal-Oriented Coaching', desc: 'Tailored 1-on-1 meal plans designed specifically for your personal body goals.' }
        ]
      },
      menuPosters: [
        { id: 1, title: 'Healthy Dessert Poster', image: 'assets/menu_poster_1_v2.jpg', order: 1 },
        { id: 2, title: '3 Simple Steps Poster', image: 'assets/menu_poster_2.jpg', order: 2 },
        { id: 3, title: 'Shape Booster Poster', image: 'assets/menu_poster_3.jpg', order: 3 },
        { id: 4, title: 'Beauty Drink QQ Water Poster', image: 'assets/menu_poster_4.jpg', order: 4 },
        { id: 5, title: 'Fat Away Tea Poster', image: 'assets/menu_poster_5.jpg', order: 5 },
        { id: 6, title: 'Power Drink Poster', image: 'assets/menu_poster_6.jpg', order: 6 }
      ],
      programs: [
        {
          id: 1,
          badge: 'Featured Detox Reset',
          badgeIcon: 'fa-leaf',
          title: '5-Day Body Detox',
          description: 'Clear toxins, improve digestion, and boost energy! A 5-day natural hydration & detox reset to feel lighter, healthier, and revitalized.',
          features: [
            'Eliminate Toxins & Improve Digestion',
            'Boost Energy & Hydrate Naturally',
            'Glowing Skin & Natural 5-Day Reset'
          ],
          ctaText: 'Enroll In 5-Day Detox',
          extraTag: '100% Natural Ingredients',
          image: 'assets/program_detox_5days.jpg',
          order: 1
        },
        {
          id: 2,
          badge: 'Body Analysis',
          badgeIcon: 'fa-heart-pulse',
          title: 'Body Index Scan & Health Check',
          description: 'Do you know your internal body stats? Get a comprehensive evaluation for visceral fat, body fat, muscle mass, and cardiovascular health risks.',
          features: [
            'Full Body Index Scan (Fat, Muscle & Hydration)',
            'Visceral Fat Risk & Health Evaluation',
            'Personalized Health Improvement Guidance'
          ],
          ctaText: 'Book Body Scan',
          extraTag: 'Instant Health Insights',
          image: 'assets/program_health_scan.jpg',
          order: 2
        },
        {
          id: 3,
          badge: 'Personalized Support',
          badgeIcon: 'fa-user-group',
          title: 'Daily Nutrition Club & Coaching',
          description: 'Start every morning right! Enjoy fresh nutrition meals, energy tea, and 1-on-1 personalized guidance tailored for your weight & fitness goals.',
          features: [
            'Fresh Daily Meal + Energy Tea',
            '1-on-1 Personal Meal & Body Guidance',
            'Direct WhatsApp Check-ins & Support'
          ],
          ctaText: 'Book Private Coaching',
          extraTag: 'Friendly Community',
          image: 'assets/program_holistic_coaching.jpg',
          order: 3
        },
        {
          id: 4,
          badge: 'Fitness & Workout',
          badgeIcon: 'fa-dumbbell',
          title: 'Tabata Fit In Workout Class',
          description: 'Burn calories and build strength with our energetic Tabata workout sessions! Join us every Wednesday morning for high-intensity interval training paired with post-exercise recovery nutrition.',
          features: [
            'Every Wednesday | 9:00 AM – 10:00 AM',
            'RM 180 / 4 High-Energy Classes',
            'Includes Post-Exercise Recovery Protein Nutrition'
          ],
          ctaText: 'Join Tabata Class',
          extraTag: 'Recovery Drink Included',
          image: 'assets/program_tabata_workout.jpg',
          order: 4
        }
      ],
      video: {
        src: 'assets/herbal_life.mp4',
        poster: 'assets/hero_meal_poster.jpg',
        sectionTitle: 'Customer',
        sectionTitleHighlight: 'Transformations & Results',
        subtitle: 'Discover real life-changing health journeys, active energy boosts, and inspiring community results.',
        disclaimer: 'Disclaimer: Product Results are typically individual result, It may Vary'
      },
      contact: {
        address: '2a, 2, Jln Temenggung 17/9, Bandar Mahkota Cheras, 43200 Cheras, Selangor',
        mapsLink: 'https://maps.app.goo.gl/Nk5PqchMUoNeMSuF6',
        hours: 'Monday - Saturday: 7:30 AM – 10:30 AM\nSunday: OFF',
        email: 'yeehen@gmail.com',
        phone: '017-256 2112',
        whatsappNumber: '60172562112'
      },
      siteSettings: {
        title: 'Bell Corner | Fresh Healthy Nutrition Meals & Wellness Club',
        metaDescription: 'Discover Bell Corner in Bandar Mahkota Cheras. Fresh healthy nutrition meals, signature protein smoothies, and energy teas.',
        logo: 'assets/logo_v2.png'
      }
    };
  }

  /** Load all CMS data */
  static getAll() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('ContentAPI: Failed to parse stored data', e);
    }
    return null;
  }

  /** GET — retrieve a specific section */
  static get(section) {
    const data = this.getAll() || this.getDefaults();
    return data[section] || null;
  }

  /** Save all CMS data */
  static saveAll(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('ContentAPI: Failed to save data', e);
      return false;
    }
  }

  /** PUT — update a section entirely */
  static update(section, newData) {
    const data = this.getAll() || this.getDefaults();
    data[section] = newData;
    return this.saveAll(data);
  }

  /** POST — add item to an array section (menuPosters, programs) */
  static create(section, item) {
    const data = this.getAll() || this.getDefaults();
    if (!Array.isArray(data[section])) {
      return false;
    }
    // Auto-generate ID
    const maxId = data[section].reduce((max, it) => Math.max(max, it.id || 0), 0);
    item.id = maxId + 1;
    item.order = data[section].length + 1;
    data[section].push(item);
    return this.saveAll(data) ? item : false;
  }

  /** PUT — update single item in array section by ID */
  static updateItem(section, id, updates) {
    const data = this.getAll() || this.getDefaults();
    if (!Array.isArray(data[section])) return false;
    const index = data[section].findIndex(it => it.id === id);
    if (index === -1) return false;
    data[section][index] = { ...data[section][index], ...updates };
    return this.saveAll(data);
  }

  /** DELETE — remove item from array section by ID */
  static delete(section, id) {
    const data = this.getAll() || this.getDefaults();
    if (!Array.isArray(data[section])) return false;
    data[section] = data[section].filter(it => it.id !== id);
    // Reorder
    data[section].forEach((it, i) => { it.order = i + 1; });
    return this.saveAll(data);
  }

  /** Export all data as JSON string */
  static export() {
    const data = this.getAll() || this.getDefaults();
    return JSON.stringify(data, null, 2);
  }

  /** Import data from JSON string */
  static import(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      return this.saveAll(data);
    } catch (e) {
      console.error('ContentAPI: Import failed', e);
      return false;
    }
  }

  /** Reset to defaults */
  static reset() {
    return this.saveAll(this.getDefaults());
  }

  /** Check if custom data exists */
  static hasCustomData() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}

/* ==========================================================================
   Admin Panel UI Controller
   ========================================================================== */
const AdminApp = {
  currentSection: 'dashboard',
  ADMIN_PASSWORD: 'bell2026',

  init() {
    this.checkAuth();
    this.bindLoginForm();
    this.bindSidebar();
    this.bindMobileNav();
    this.loadDashboard();
  },

  /* --- Authentication --- */
  checkAuth() {
    const isLoggedIn = sessionStorage.getItem('bell_admin_auth') === 'true';
    const overlay = document.getElementById('loginOverlay');
    const layout = document.getElementById('adminLayout');
    if (isLoggedIn) {
      overlay.classList.add('hidden');
      layout.style.display = 'flex';
    } else {
      overlay.classList.remove('hidden');
      layout.style.display = 'none';
    }
  },

  bindLoginForm() {
    const form = document.getElementById('loginForm');
    const errorEl = document.getElementById('loginError');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('loginPassword').value;
      if (pwd === this.ADMIN_PASSWORD) {
        sessionStorage.setItem('bell_admin_auth', 'true');
        this.checkAuth();
        this.loadDashboard();
        showAdminToast('Welcome to Bell Corner Admin!', 'success');
      } else {
        errorEl.classList.add('show');
        errorEl.textContent = 'Incorrect password. Please try again.';
      }
    });
  },

  logout() {
    sessionStorage.removeItem('bell_admin_auth');
    this.checkAuth();
  },

  /* --- Sidebar Navigation --- */
  bindSidebar() {
    document.querySelectorAll('.sidebar-nav-item[data-section]').forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        this.switchSection(section);
      });
    });
  },

  switchSection(section) {
    this.currentSection = section;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === section);
    });

    // Update panels
    document.querySelectorAll('.admin-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${section}`);
    });

    // Update header title
    const titles = {
      dashboard: '<i class="fa-solid fa-gauge-high"></i> Dashboard',
      hero: '<i class="fa-solid fa-house"></i> Hero Section',
      about: '<i class="fa-solid fa-info-circle"></i> About Section',
      'about-us': '<i class="fa-solid fa-users"></i> About Us Section',
      menu: '<i class="fa-solid fa-utensils"></i> Menu Posters',
      programs: '<i class="fa-solid fa-trophy"></i> Programs',
      video: '<i class="fa-solid fa-video"></i> Video Section',
      contact: '<i class="fa-solid fa-phone"></i> Contact Info',
      settings: '<i class="fa-solid fa-gear"></i> Site Settings'
    };
    document.getElementById('headerTitle').innerHTML = titles[section] || section;

    // Load section data
    this.loadSectionData(section);

    // Close mobile sidebar
    document.getElementById('adminSidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  },

  loadSectionData(section) {
    switch (section) {
      case 'dashboard': this.loadDashboard(); break;
      case 'hero': this.loadHeroForm(); break;
      case 'about': this.loadAboutForm(); break;
      case 'about-us': this.loadAboutUsForm(); break;
      case 'menu': this.loadMenuPosters(); break;
      case 'programs': this.loadPrograms(); break;
      case 'video': this.loadVideoForm(); break;
      case 'contact': this.loadContactForm(); break;
      case 'settings': this.loadSettingsForm(); break;
    }
  },

  /* --- Mobile Navigation --- */
  bindMobileNav() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      });
    }
  },

  /* ======================================================================
     DASHBOARD
     ====================================================================== */
  loadDashboard() {
    const data = ContentAPI.getAll() || ContentAPI.getDefaults();
    const menuCount = data.menuPosters ? data.menuPosters.length : 0;
    const programCount = data.programs ? data.programs.length : 0;

    document.getElementById('statMenuCount').textContent = menuCount;
    document.getElementById('statProgramCount').textContent = programCount;
    document.getElementById('statVideoCount').textContent = data.video && data.video.src ? 1 : 0;
    document.getElementById('statStatus').innerHTML = ContentAPI.hasCustomData()
      ? '<span class="status-badge live"><span class="status-dot"></span> Customized</span>'
      : '<span class="status-badge draft"><span class="status-dot"></span> Default</span>';
  },

  /* ======================================================================
     HERO SECTION FORM
     ====================================================================== */
  loadHeroForm() {
    const data = ContentAPI.get('hero') || ContentAPI.getDefaults().hero;
    document.getElementById('heroBadgeInput').value = data.badge || '';
    document.getElementById('heroTitleInput').value = data.title || '';
    document.getElementById('heroTitleHighlightInput').value = data.titleHighlight || '';
    document.getElementById('heroDescInput').value = data.description || '';
    document.getElementById('heroImageInput').value = data.image || '';

    const preview = document.getElementById('heroImagePreview');
    if (data.image) {
      preview.src = data.image;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  },

  saveHero() {
    const heroData = {
      badge: document.getElementById('heroBadgeInput').value.trim(),
      title: document.getElementById('heroTitleInput').value.trim(),
      titleHighlight: document.getElementById('heroTitleHighlightInput').value.trim(),
      description: document.getElementById('heroDescInput').value.trim(),
      image: document.getElementById('heroImageInput').value.trim()
    };

    if (ContentAPI.update('hero', heroData)) {
      showAdminToast('Hero section updated successfully!', 'success');
      this.loadDashboard();
    } else {
      showAdminToast('Failed to save hero section.', 'error');
    }
  },

  /* ======================================================================
     ABOUT SECTION FORM
     ====================================================================== */
  loadAboutForm() {
    const data = ContentAPI.get('about') || ContentAPI.getDefaults().about;
    document.getElementById('aboutTagInput').value = data.tag || '';
    document.getElementById('aboutTitleInput').value = data.title || '';
    document.getElementById('aboutTitleHighlightInput').value = data.titleHighlight || '';
    document.getElementById('aboutText1Input').value = data.text1 || '';
    document.getElementById('aboutText2Input').value = data.text2 || '';
    document.getElementById('aboutImageInput').value = data.image || '';

    const preview = document.getElementById('aboutImagePreview');
    if (data.image) {
      preview.src = data.image;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }

    // Load highlights
    this.renderAboutHighlights(data.highlights || []);
  },

  renderAboutHighlights(highlights) {
    const container = document.getElementById('aboutHighlightsList');
    if (!container) return;

    container.innerHTML = highlights.map((h, i) => `
      <div class="card" style="padding: 1rem; margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="font-size: 0.85rem;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 0.4rem;"></i> Highlight ${i + 1}</strong>
          <button class="btn btn-danger btn-sm" onclick="AdminApp.removeHighlight(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-group" style="margin-bottom: 0.5rem;">
          <input type="text" class="form-control" value="${escapeHtml(h.title)}" data-hl-index="${i}" data-hl-field="title" placeholder="Title">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <input type="text" class="form-control" value="${escapeHtml(h.desc)}" data-hl-index="${i}" data-hl-field="desc" placeholder="Description">
        </div>
      </div>
    `).join('');
  },

  addHighlight() {
    const data = ContentAPI.get('about') || ContentAPI.getDefaults().about;
    if (!data.highlights) data.highlights = [];
    data.highlights.push({ title: 'New Highlight', desc: 'Description here...' });
    ContentAPI.update('about', data);
    this.renderAboutHighlights(data.highlights);
    showAdminToast('Highlight added!', 'success');
  },

  removeHighlight(index) {
    const data = ContentAPI.get('about') || ContentAPI.getDefaults().about;
    if (!data.highlights) return;
    data.highlights.splice(index, 1);
    ContentAPI.update('about', data);
    this.renderAboutHighlights(data.highlights);
    showAdminToast('Highlight removed.', 'info');
  },

  saveAbout() {
    const data = ContentAPI.get('about') || ContentAPI.getDefaults().about;

    data.tag = document.getElementById('aboutTagInput').value.trim();
    data.title = document.getElementById('aboutTitleInput').value.trim();
    data.titleHighlight = document.getElementById('aboutTitleHighlightInput').value.trim();
    data.text1 = document.getElementById('aboutText1Input').value.trim();
    data.text2 = document.getElementById('aboutText2Input').value.trim();
    data.image = document.getElementById('aboutImageInput').value.trim();

    // Gather highlights from inline inputs
    const hlInputs = document.querySelectorAll('[data-hl-index]');
    const hlMap = {};
    hlInputs.forEach(input => {
      const idx = parseInt(input.dataset.hlIndex);
      const field = input.dataset.hlField;
      if (!hlMap[idx]) hlMap[idx] = {};
      hlMap[idx][field] = input.value.trim();
    });

    data.highlights = Object.keys(hlMap)
      .sort((a, b) => a - b)
      .map(k => hlMap[k]);

    if (ContentAPI.update('about', data)) {
      showAdminToast('About section updated successfully!', 'success');
    } else {
      showAdminToast('Failed to save about section.', 'error');
    }
  },

  /* ======================================================================
     ABOUT US SECTION FORM
     ====================================================================== */
  loadAboutUsForm() {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;
    document.getElementById('aboutUsTagInput').value = data.tag || '';
    document.getElementById('aboutUsTitleInput').value = data.title || '';
    document.getElementById('aboutUsTitleHighlightInput').value = data.titleHighlight || '';
    document.getElementById('aboutUsSubtitleInput').value = data.subtitle || '';
    document.getElementById('aboutUsText1Input').value = data.text1 || '';
    document.getElementById('aboutUsText2Input').value = data.text2 || '';
    document.getElementById('aboutUsImageInput').value = data.image || '';

    const preview = document.getElementById('aboutUsImagePreview');
    if (data.image) {
      preview.src = data.image;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }

    this.renderAboutUsStats(data.stats || []);
    this.renderAboutUsPillars(data.pillars || []);
  },

  renderAboutUsStats(stats) {
    const container = document.getElementById('aboutUsStatsList');
    if (!container) return;

    container.innerHTML = stats.map((st, i) => `
      <div class="card" style="padding: 1rem; margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="font-size: 0.85rem;"><i class="fa-solid fa-chart-pie" style="color: var(--accent); margin-right: 0.4rem;"></i> Stat ${i + 1}</strong>
          <button class="btn btn-danger btn-sm" onclick="AdminApp.removeAboutUsStat(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-row" style="margin-bottom: 0;">
          <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="form-control" value="${escapeHtml(st.value)}" data-stat-index="${i}" data-stat-field="value" placeholder="Number / Value (e.g. 5,000+)">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <input type="text" class="form-control" value="${escapeHtml(st.label)}" data-stat-index="${i}" data-stat-field="label" placeholder="Label (e.g. Meals Served)">
          </div>
        </div>
      </div>
    `).join('');
  },

  addAboutUsStat() {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;
    if (!data.stats) data.stats = [];
    data.stats.push({ value: '100+', label: 'New Metric' });
    ContentAPI.update('aboutUs', data);
    this.renderAboutUsStats(data.stats);
    showAdminToast('Stat item added!', 'success');
  },

  removeAboutUsStat(index) {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;
    if (!data.stats) return;
    data.stats.splice(index, 1);
    ContentAPI.update('aboutUs', data);
    this.renderAboutUsStats(data.stats);
    showAdminToast('Stat item removed.', 'info');
  },

  renderAboutUsPillars(pillars) {
    const container = document.getElementById('aboutUsPillarsList');
    if (!container) return;

    container.innerHTML = pillars.map((p, i) => `
      <div class="card" style="padding: 1rem; margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="font-size: 0.85rem;"><i class="${escapeHtml(p.icon || 'fa-solid fa-leaf')}" style="color: var(--accent); margin-right: 0.4rem;"></i> Pillar ${i + 1}</strong>
          <button class="btn btn-danger btn-sm" onclick="AdminApp.removeAboutUsPillar(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-group" style="margin-bottom: 0.5rem;">
          <input type="text" class="form-control" value="${escapeHtml(p.icon || '')}" data-pillar-index="${i}" data-pillar-field="icon" placeholder="Icon class (e.g. fa-solid fa-leaf)">
        </div>
        <div class="form-group" style="margin-bottom: 0.5rem;">
          <input type="text" class="form-control" value="${escapeHtml(p.title)}" data-pillar-index="${i}" data-pillar-field="title" placeholder="Pillar Title">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <input type="text" class="form-control" value="${escapeHtml(p.desc)}" data-pillar-index="${i}" data-pillar-field="desc" placeholder="Pillar Description">
        </div>
      </div>
    `).join('');
  },

  addAboutUsPillar() {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;
    if (!data.pillars) data.pillars = [];
    data.pillars.push({ icon: 'fa-solid fa-star', title: 'New Pillar Title', desc: 'Pillar description details...' });
    ContentAPI.update('aboutUs', data);
    this.renderAboutUsPillars(data.pillars);
    showAdminToast('Pillar added!', 'success');
  },

  removeAboutUsPillar(index) {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;
    if (!data.pillars) return;
    data.pillars.splice(index, 1);
    ContentAPI.update('aboutUs', data);
    this.renderAboutUsPillars(data.pillars);
    showAdminToast('Pillar removed.', 'info');
  },

  saveAboutUs() {
    const data = ContentAPI.get('aboutUs') || ContentAPI.getDefaults().aboutUs;

    data.tag = document.getElementById('aboutUsTagInput').value.trim();
    data.title = document.getElementById('aboutUsTitleInput').value.trim();
    data.titleHighlight = document.getElementById('aboutUsTitleHighlightInput').value.trim();
    data.subtitle = document.getElementById('aboutUsSubtitleInput').value.trim();
    data.text1 = document.getElementById('aboutUsText1Input').value.trim();
    data.text2 = document.getElementById('aboutUsText2Input').value.trim();
    data.image = document.getElementById('aboutUsImageInput').value.trim();

    // Gather stats from inline inputs
    const statInputs = document.querySelectorAll('[data-stat-index]');
    const statMap = {};
    statInputs.forEach(input => {
      const idx = parseInt(input.dataset.statIndex);
      const field = input.dataset.statField;
      if (!statMap[idx]) statMap[idx] = {};
      statMap[idx][field] = input.value.trim();
    });

    data.stats = Object.keys(statMap)
      .sort((a, b) => a - b)
      .map(k => statMap[k]);

    // Gather pillars from inline inputs
    const pillarInputs = document.querySelectorAll('[data-pillar-index]');
    const pillarMap = {};
    pillarInputs.forEach(input => {
      const idx = parseInt(input.dataset.pillarIndex);
      const field = input.dataset.pillarField;
      if (!pillarMap[idx]) pillarMap[idx] = {};
      pillarMap[idx][field] = input.value.trim();
    });

    data.pillars = Object.keys(pillarMap)
      .sort((a, b) => a - b)
      .map(k => pillarMap[k]);

    if (ContentAPI.update('aboutUs', data)) {
      showAdminToast('About Us section updated successfully!', 'success');
    } else {
      showAdminToast('Failed to save About Us section.', 'error');
    }
  },

  /* ======================================================================
     MENU POSTERS
     ====================================================================== */
  loadMenuPosters() {
    const posters = ContentAPI.get('menuPosters') || ContentAPI.getDefaults().menuPosters;

    const grid = document.getElementById('menuPosterGrid');
    if (!grid) return;

    if (!posters.length) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-image" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; display: block;"></i>
          <p>No menu posters yet. Click "Add Poster" to get started.</p>
        </div>`;
      return;
    }

    grid.innerHTML = posters
      .sort((a, b) => a.order - b.order)
      .map(p => `
        <div class="image-grid-item" data-id="${p.id}">
          <span class="image-order-badge">${p.order}</span>
          <img src="${p.image}" alt="${escapeHtml(p.title)}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 260%22><rect fill=%22%231a1f2b%22 width=%22200%22 height=%22260%22/><text fill=%22%235a6374%22 font-size=%2214%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>No Image</text></svg>'">
          <div class="image-overlay">
            <p style="font-size: 0.78rem; margin-bottom: 0.4rem; font-weight: 600;">${escapeHtml(p.title)}</p>
            <div class="image-actions">
              <button class="btn btn-sm btn-primary" onclick="AdminApp.editPoster(${p.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-sm btn-danger" onclick="AdminApp.deletePoster(${p.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      `).join('');

    // Update count
    document.getElementById('menuPosterCount').textContent = `${posters.length} Posters`;
  },

  showPosterModal(poster = null) {
    const modal = document.getElementById('posterModal');
    const titleEl = document.getElementById('posterModalTitle');
    const form = document.getElementById('posterForm');

    if (poster) {
      titleEl.innerHTML = '<i class="fa-solid fa-pen"></i> Edit Poster';
      document.getElementById('posterTitleInput').value = poster.title || '';
      document.getElementById('posterImagePathInput').value = poster.image || '';
      form.dataset.editId = poster.id;

      const preview = document.getElementById('posterModalPreview');
      if (poster.image) {
        preview.src = poster.image;
        preview.style.display = 'block';
      }
    } else {
      titleEl.innerHTML = '<i class="fa-solid fa-plus"></i> Add New Poster';
      document.getElementById('posterTitleInput').value = '';
      document.getElementById('posterImagePathInput').value = '';
      delete form.dataset.editId;
      document.getElementById('posterModalPreview').style.display = 'none';
    }

    modal.classList.add('active');
  },

  closePosterModal() {
    document.getElementById('posterModal').classList.remove('active');
  },

  savePoster() {
    const form = document.getElementById('posterForm');
    const title = document.getElementById('posterTitleInput').value.trim();
    const image = document.getElementById('posterImagePathInput').value.trim();

    if (!title || !image) {
      showAdminToast('Please fill in title and image path.', 'error');
      return;
    }

    const editId = form.dataset.editId ? parseInt(form.dataset.editId) : null;

    if (editId) {
      ContentAPI.updateItem('menuPosters', editId, { title, image });
      showAdminToast('Poster updated!', 'success');
    } else {
      ContentAPI.create('menuPosters', { title, image });
      showAdminToast('Poster added!', 'success');
    }

    this.closePosterModal();
    this.loadMenuPosters();
    this.loadDashboard();
  },

  editPoster(id) {
    const posters = ContentAPI.get('menuPosters') || [];
    const poster = posters.find(p => p.id === id);
    if (poster) this.showPosterModal(poster);
  },

  deletePoster(id) {
    if (!confirm('Are you sure you want to delete this poster?')) return;
    ContentAPI.delete('menuPosters', id);
    this.loadMenuPosters();
    this.loadDashboard();
    showAdminToast('Poster deleted.', 'info');
  },

  /* ======================================================================
     PROGRAMS
     ====================================================================== */
  loadPrograms() {
    const programs = ContentAPI.get('programs') || ContentAPI.getDefaults().programs;
    const list = document.getElementById('programsList');
    if (!list) return;

    document.getElementById('programCount').textContent = `${programs.length} Programs`;

    if (!programs.length) {
      list.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-trophy" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; display: block;"></i>
          <p>No programs yet. Click "Add Program" to get started.</p>
        </div>`;
      return;
    }

    list.innerHTML = programs
      .sort((a, b) => a.order - b.order)
      .map(p => `
        <div class="program-list-item">
          <img src="${p.image}" alt="${escapeHtml(p.title)}" class="program-thumb" onerror="this.style.display='none'">
          <div class="program-info">
            <h4>${escapeHtml(p.title)}</h4>
            <p>${escapeHtml(p.description)}</p>
          </div>
          <div class="program-actions">
            <button class="btn btn-sm btn-primary" onclick="AdminApp.editProgram(${p.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-danger" onclick="AdminApp.deleteProgram(${p.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join('');
  },

  showProgramModal(program = null) {
    const modal = document.getElementById('programModal');
    const titleEl = document.getElementById('programModalTitle');
    const form = document.getElementById('programForm');

    if (program) {
      titleEl.innerHTML = '<i class="fa-solid fa-pen"></i> Edit Program';
      document.getElementById('progBadgeInput').value = program.badge || '';
      document.getElementById('progBadgeIconInput').value = program.badgeIcon || 'fa-leaf';
      document.getElementById('progTitleInput').value = program.title || '';
      document.getElementById('progDescInput').value = program.description || '';
      document.getElementById('progFeaturesInput').value = (program.features || []).join('\n');
      document.getElementById('progCtaInput').value = program.ctaText || '';
      document.getElementById('progExtraTagInput').value = program.extraTag || '';
      document.getElementById('progImageInput').value = program.image || '';
      form.dataset.editId = program.id;

      const preview = document.getElementById('progModalPreview');
      if (program.image) { preview.src = program.image; preview.style.display = 'block'; }
    } else {
      titleEl.innerHTML = '<i class="fa-solid fa-plus"></i> Add New Program';
      document.getElementById('progBadgeInput').value = '';
      document.getElementById('progBadgeIconInput').value = 'fa-leaf';
      document.getElementById('progTitleInput').value = '';
      document.getElementById('progDescInput').value = '';
      document.getElementById('progFeaturesInput').value = '';
      document.getElementById('progCtaInput').value = '';
      document.getElementById('progExtraTagInput').value = '';
      document.getElementById('progImageInput').value = '';
      delete form.dataset.editId;
      document.getElementById('progModalPreview').style.display = 'none';
    }

    modal.classList.add('active');
  },

  closeProgramModal() {
    document.getElementById('programModal').classList.remove('active');
  },

  saveProgram() {
    const form = document.getElementById('programForm');
    const title = document.getElementById('progTitleInput').value.trim();
    const description = document.getElementById('progDescInput').value.trim();

    if (!title) {
      showAdminToast('Program title is required.', 'error');
      return;
    }

    const programData = {
      badge: document.getElementById('progBadgeInput').value.trim(),
      badgeIcon: document.getElementById('progBadgeIconInput').value.trim() || 'fa-leaf',
      title,
      description,
      features: document.getElementById('progFeaturesInput').value.split('\n').map(f => f.trim()).filter(Boolean),
      ctaText: document.getElementById('progCtaInput').value.trim(),
      extraTag: document.getElementById('progExtraTagInput').value.trim(),
      image: document.getElementById('progImageInput').value.trim()
    };

    const editId = form.dataset.editId ? parseInt(form.dataset.editId) : null;

    if (editId) {
      ContentAPI.updateItem('programs', editId, programData);
      showAdminToast('Program updated!', 'success');
    } else {
      ContentAPI.create('programs', programData);
      showAdminToast('Program added!', 'success');
    }

    this.closeProgramModal();
    this.loadPrograms();
    this.loadDashboard();
  },

  editProgram(id) {
    const programs = ContentAPI.get('programs') || [];
    const prog = programs.find(p => p.id === id);
    if (prog) this.showProgramModal(prog);
  },

  deleteProgram(id) {
    if (!confirm('Are you sure you want to delete this program?')) return;
    ContentAPI.delete('programs', id);
    this.loadPrograms();
    this.loadDashboard();
    showAdminToast('Program deleted.', 'info');
  },

  /* ======================================================================
     VIDEO SECTION
     ====================================================================== */
  loadVideoForm() {
    const data = ContentAPI.get('video') || ContentAPI.getDefaults().video;
    document.getElementById('videoSrcInput').value = data.src || '';
    document.getElementById('videoPosterInput').value = data.poster || '';
    document.getElementById('videoTitleInput').value = data.sectionTitle || '';
    document.getElementById('videoTitleHighlightInput').value = data.sectionTitleHighlight || '';
    document.getElementById('videoSubtitleInput').value = data.subtitle || '';
    document.getElementById('videoDisclaimerInput').value = data.disclaimer || '';
  },

  saveVideo() {
    const videoData = {
      src: document.getElementById('videoSrcInput').value.trim(),
      poster: document.getElementById('videoPosterInput').value.trim(),
      sectionTitle: document.getElementById('videoTitleInput').value.trim(),
      sectionTitleHighlight: document.getElementById('videoTitleHighlightInput').value.trim(),
      subtitle: document.getElementById('videoSubtitleInput').value.trim(),
      disclaimer: document.getElementById('videoDisclaimerInput').value.trim()
    };

    if (ContentAPI.update('video', videoData)) {
      showAdminToast('Video section updated!', 'success');
    } else {
      showAdminToast('Failed to save video section.', 'error');
    }
  },

  /* ======================================================================
     CONTACT INFO
     ====================================================================== */
  loadContactForm() {
    const data = ContentAPI.get('contact') || ContentAPI.getDefaults().contact;
    document.getElementById('contactAddressInput').value = data.address || '';
    document.getElementById('contactMapsInput').value = data.mapsLink || '';
    document.getElementById('contactHoursInput').value = data.hours || '';
    document.getElementById('contactEmailInput').value = data.email || '';
    document.getElementById('contactPhoneInput').value = data.phone || '';
    document.getElementById('contactWhatsappInput').value = data.whatsappNumber || '';
  },

  saveContact() {
    const contactData = {
      address: document.getElementById('contactAddressInput').value.trim(),
      mapsLink: document.getElementById('contactMapsInput').value.trim(),
      hours: document.getElementById('contactHoursInput').value.trim(),
      email: document.getElementById('contactEmailInput').value.trim(),
      phone: document.getElementById('contactPhoneInput').value.trim(),
      whatsappNumber: document.getElementById('contactWhatsappInput').value.trim()
    };

    if (ContentAPI.update('contact', contactData)) {
      showAdminToast('Contact info updated!', 'success');
    } else {
      showAdminToast('Failed to save contact info.', 'error');
    }
  },

  /* ======================================================================
     SITE SETTINGS
     ====================================================================== */
  loadSettingsForm() {
    const data = ContentAPI.get('siteSettings') || ContentAPI.getDefaults().siteSettings;
    document.getElementById('siteTitleInput').value = data.title || '';
    document.getElementById('siteMetaDescInput').value = data.metaDescription || '';
    document.getElementById('siteLogoInput').value = data.logo || '';

    const preview = document.getElementById('siteLogoPreview');
    if (data.logo) {
      preview.src = data.logo;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  },

  saveSettings() {
    const settingsData = {
      title: document.getElementById('siteTitleInput').value.trim(),
      metaDescription: document.getElementById('siteMetaDescInput').value.trim(),
      logo: document.getElementById('siteLogoInput').value.trim()
    };

    if (ContentAPI.update('siteSettings', settingsData)) {
      showAdminToast('Site settings updated!', 'success');
    } else {
      showAdminToast('Failed to save site settings.', 'error');
    }
  },

  /* ======================================================================
     DATA EXPORT / IMPORT / RESET
     ====================================================================== */
  exportData() {
    const json = ContentAPI.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bell-corner-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAdminToast('Data exported successfully!', 'success');
  },

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ContentAPI.import(ev.target.result)) {
          showAdminToast('Data imported successfully! Reloading...', 'success');
          setTimeout(() => this.loadSectionData(this.currentSection), 500);
          this.loadDashboard();
        } else {
          showAdminToast('Invalid JSON file. Import failed.', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  resetData() {
    if (!confirm('⚠️ This will reset ALL content to default values. Are you sure?')) return;
    if (!confirm('This action cannot be undone. Proceed?')) return;
    ContentAPI.reset();
    this.loadSectionData(this.currentSection);
    this.loadDashboard();
    showAdminToast('All data reset to defaults.', 'info');
  },

  previewSite() {
    window.open('index.html', '_blank');
  }
};

/* ==========================================================================
   Utilities
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showAdminToast(message, type = 'info') {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'admin-toast';
    toast.innerHTML = '<i></i><span></span>';
    document.body.appendChild(toast);
  }

  const icons = {
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-circle-xmark',
    info: 'fa-solid fa-circle-info'
  };

  toast.className = `admin-toast ${type}`;
  toast.querySelector('i').className = icons[type] || icons.info;
  toast.querySelector('span').textContent = message;

  // Trigger reflow for re-animation
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/** Handle image path input + preview */
function handleImagePathPreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (val) {
      preview.src = val;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  });
}

/** Handle file upload and convert to base64, then set in path input */
function handleFileUpload(fileInputId, pathInputId, previewId) {
  const fileInput = document.getElementById(fileInputId);
  if (!fileInput) return;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      showAdminToast('Please upload an image or video file.', 'error');
      return;
    }

    // For images, convert to base64
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result;
        const pathInput = document.getElementById(pathInputId);
        if (pathInput) pathInput.value = base64;
        const preview = document.getElementById(previewId);
        if (preview) {
          preview.src = base64;
          preview.style.display = 'block';
        }
        showAdminToast('Image uploaded! Remember to save.', 'success');
      };
      reader.readAsDataURL(file);
    } else {
      showAdminToast('Video files should be placed in the assets/ folder. Enter the path manually.', 'info');
    }
  });
}

/* ==========================================================================
   Initialize
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();

  // Bind image path previews
  handleImagePathPreview('heroImageInput', 'heroImagePreview');
  handleImagePathPreview('aboutImageInput', 'aboutImagePreview');
  handleImagePathPreview('aboutUsImageInput', 'aboutUsImagePreview');
  handleImagePathPreview('posterImagePathInput', 'posterModalPreview');
  handleImagePathPreview('progImageInput', 'progModalPreview');
  handleImagePathPreview('siteLogoInput', 'siteLogoPreview');

  // Bind file uploads
  handleFileUpload('heroFileUpload', 'heroImageInput', 'heroImagePreview');
  handleFileUpload('aboutFileUpload', 'aboutImageInput', 'aboutImagePreview');
  handleFileUpload('aboutUsFileUpload', 'aboutUsImageInput', 'aboutUsImagePreview');
  handleFileUpload('posterFileUpload', 'posterImagePathInput', 'posterModalPreview');
  handleFileUpload('progFileUpload', 'progImageInput', 'progModalPreview');
  handleFileUpload('siteLogoFileUpload', 'siteLogoInput', 'siteLogoPreview');

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });
});
