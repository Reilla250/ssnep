// ====================================================
//  SSNeP+ CMS Loader — js/cms.js
//  Loaded on EVERY page. Reads from localStorage
//  and injects admin-controlled content into the DOM.
// ====================================================

const CMS = {

  get(key, fallback) {
    try {
      const v = localStorage.getItem('ssnep_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },

  // ---- Run on every page ----
  init() {
    this.applySitewide();
    const page = this.detectPage();
    const pages = {
      'index':     () => this.renderHome(),
      'about':     () => this.renderAbout(),
      'team':      () => this.renderTeam(),
      'programs':  () => this.renderPrograms(),
      'service':   () => this.renderPrograms(),
      'portfolio': () => this.renderPortfolio(),
      'news':      () => this.renderNews(),
      'contact':   () => this.renderContact(),
    };
    if (pages[page]) pages[page]();
  },

  detectPage() {
    const f = window.location.pathname.split('/').pop().replace('.html','') || 'index';
    return f;
  },

  // ---- Apply to every page ----
  applySitewide() {
    const s = this.get('settings', {});
    // Contact info in header topbar
    document.querySelectorAll('[data-cms="email"]').forEach(el => {
      if (s.email) { el.textContent = s.email; el.href = 'mailto:' + s.email; }
    });
    document.querySelectorAll('[data-cms="phone"]').forEach(el => {
      if (s.phone) { el.textContent = s.phone; el.href = 'tel:' + s.phone.replace(/\s/g,''); }
    });
    document.querySelectorAll('[data-cms="facebook"]').forEach(el => {
      if (s.facebook) el.href = s.facebook;
    });
    document.querySelectorAll('[data-cms="twitter"]').forEach(el => {
      if (s.twitter) el.href = s.twitter;
    });
    // Logo/org name
    document.querySelectorAll('[data-cms="org-name"]').forEach(el => {
      if (s.orgName) el.textContent = s.orgName;
    });
    document.querySelectorAll('[data-cms="org-abbr"]').forEach(el => {
      if (s.orgAbbr) el.textContent = '(' + s.orgAbbr + ')';
    });
    // Footer address
    document.querySelectorAll('[data-cms="footer-address"]').forEach(el => {
      if (s.address) el.innerHTML = s.address.replace(/\n/g,'<br>');
    });
    document.querySelectorAll('[data-cms="footer-phone"]').forEach(el => {
      if (s.phone) el.textContent = s.phone;
    });
    document.querySelectorAll('[data-cms="footer-fax"]').forEach(el => {
      if (s.fax) el.textContent = s.fax;
    });
    document.querySelectorAll('[data-cms="footer-email"]').forEach(el => {
      if (s.email) { el.textContent = s.email; el.href = 'mailto:' + s.email; }
    });
    // Apply theme color
    if (s.primaryColor) {
      document.documentElement.style.setProperty('--blue', s.primaryColor);
      document.documentElement.style.setProperty('--blue-light', s.primaryColor + '22');
    }
    // Page title prefix
    if (s.orgAbbr && !document.title.includes(s.orgAbbr)) {
      // keep existing
    }
  },

  // ---- HOME ----
  renderHome() {
    const s = this.get('settings', {});
    const el = t => document.querySelector('[data-cms="' + t + '"]');
    if (s.heroTitle && el('hero-title'))    el('hero-title').textContent = s.heroTitle;
    if (s.heroSubtitle && el('hero-sub'))  el('hero-sub').textContent   = s.heroSubtitle;
    if (s.heroBtnText && el('hero-btn'))   el('hero-btn').textContent   = s.heroBtnText;
    if (s.missionLabel && el('mission-label')) el('mission-label').textContent = s.missionLabel;
    if (s.missionTitle && el('mission-title')) el('mission-title').innerHTML   = s.missionTitle;
    if (s.missionText && el('mission-text'))   el('mission-text').textContent  = s.missionText;
    // Render programs on home
    this.renderProgramCards('[data-cms="home-programs"]', 3);
  },

  // ---- ABOUT ----
  renderAbout() {
    const s = this.get('settings', {});
    document.querySelectorAll('[data-cms="about-p1"]').forEach(el => {
      if (s.aboutP1) el.innerHTML = s.aboutP1;
    });
    document.querySelectorAll('[data-cms="about-p2"]').forEach(el => {
      if (s.aboutP2) el.innerHTML = s.aboutP2;
    });
  },

  // ---- TEAM ----
  renderTeam() {
    const container = document.getElementById('cms-team-grid');
    if (!container) return;
    const team = this.get('team', []);
    if (!team || team.length === 0) return;

    // Mapping default photo URLs
    const defaultPhotos = {
      1: 'assets/images/team-member-1.jpeg',
      2: 'assets/images/team-member-2.jpeg',
      3: 'assets/images/team-member-3.jpeg',
      4: 'assets/images/team-member-4.jpeg',
      5: 'assets/images/team-member-5.jpeg',
      6: 'assets/images/team-member-7.jpeg',
      7: 'assets/images/team-member-9.jpeg',
      8: 'assets/images/team-member-18.png',
      9: 'assets/images/team-member-19.jpeg',
      10: 'assets/images/team-member-22.jpeg'
    };

    container.innerHTML = team.map(m => {
      const src = m.photoUrl || defaultPhotos[m.id] || 'assets/images/team-member-1.jpeg';
      return `
        <div class="team-item">
          <div class="team-photo">
            <img src="${src}" alt="${this.esc(m.name)}" onError="this.onerror=null;this.src='assets/images/team-member-1.jpeg';" />
          </div>
          <div class="team-text">
            <a href="team.html">${this.esc(m.name)}</a>
            <p>${this.esc(m.role)}</p>
          </div>
          <div class="team-social">
            <ul>
              <li><a href="${m.facebook || '#'}" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="${m.twitter || '#'}" target="_blank"><i class="fab fa-twitter"></i></a></li>
              <li><a href="${m.linkedin || '#'}" target="_blank"><i class="fab fa-linkedin-in"></i></a></li>
              <li><a href="${m.youtube || '#'}" target="_blank"><i class="fab fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      `;
    }).join('');
  },

  // ---- PROGRAMS ----
  renderPrograms() {
    this.renderProgramCards('#cms-programs-grid', 999);
  },

  renderProgramCards(selector, limit) {
    const container = document.querySelector(selector);
    if (!container) return;
    const programs = this.get('programs', []).filter(p => p.status === 'active').slice(0, limit);
    if (!programs || programs.length === 0) return;
    const defaultImages = {
      1: 'assets/images/service-1.png',
      2: 'assets/images/service-2.jpeg',
      3: 'assets/images/service-3.jpg',
      4: 'assets/images/service-5.jpg',
      5: 'assets/images/service-6.jpg',
      6: 'assets/images/service-19.jpg'
    };
    container.innerHTML = programs.map(p => {
      const src = p.imageUrl || defaultImages[p.id] || 'assets/images/service-1.png';
      return `
        <div class="program-card">
          <img src="${src}" alt="${this.esc(p.title)}" class="program-card-img" />
          <div class="program-card-body">
            <h3><a href="service-detail-${p.id||1}.html" style="color:var(--text-dark);">${this.esc(p.title)}</a></h3>
            <p>${this.esc(p.description||'')}</p>
            <a href="service-detail-${p.id||1}.html" class="read-more">Read More <i class="fas fa-chevron-circle-right"></i></a>
          </div>
        </div>
      `;
    }).join('');
  },

  // ---- PORTFOLIO ----
  renderPortfolio() {
    const container = document.getElementById('cms-portfolio-grid');
    if (!container) return;
    const items = this.get('portfolio', []);
    if (!items || items.length === 0) return;
    const defaultImages = {
      1: 'assets/images/portfolio-6.jpeg',
      2: 'assets/images/portfolio-5.jpeg',
      3: 'assets/images/portfolio-4.jpeg',
      4: 'assets/images/portfolio-3.jpeg',
      5: 'assets/images/portfolio-2.jpeg',
      6: 'assets/images/portfolio-1.jpeg'
    };
    container.innerHTML = items.map((p, i) => {
      const src = p.imageUrl || defaultImages[p.id] || defaultImages[i+1] || 'assets/images/portfolio-6.jpeg';
      return `
        <div class="portfolio-item" data-category="${this.esc(p.category||'all')}" id="port-${p.id}">
          <img src="${src}" alt="${this.esc(p.title)}" style="width:100%;height:100%;object-fit:cover;" />
          <div class="portfolio-overlay">
            <h4><a href="portfolio-detail-${p.id||1}.html" style="color:white;">${this.esc(p.title)}</a></h4>
            <span class="portfolio-category">${this.esc(p.description||p.category||'Project')}</span>
            <a href="${src}" target="_blank" class="gallery-icon-btn" style="margin-top:10px; width:40px; height:40px; font-size:14px;" aria-label="View photo"><i class="fas fa-search-plus"></i></a>
          </div>
        </div>
      `;
    }).join('');
  },

  // ---- NEWS ----
  renderNews() {
    const container = document.getElementById('cms-news-list');
    if (!container) return;
    const news = this.get('news', []).filter(n => n.status==='published');
    if (!news || news.length === 0) return;
    const defaultNewsImgs = {
      1: 'assets/images/news-9.jpg',
      2: 'assets/images/news-5.jpg',
      3: 'assets/images/news-4.jpg',
      4: 'assets/images/news-3.jpg',
      5: 'assets/images/news-2.jpg'
    };
    const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '';
    container.innerHTML = news.map((n, i) => {
      const idNum = n.id || (i + 1);
      const src = n.imageUrl || defaultNewsImgs[idNum] || 'assets/images/news-9.jpg';
      const detailLink = `news-detail-${idNum}.html`;
      return `
        <div class="news-card-item" style="display:flex; flex-direction:column; gap:16px; margin-bottom:40px; background:#fff; border:1px solid var(--border); border-radius:6px; overflow:hidden;">
          <a href="${detailLink}">
            <img src="${src}" alt="${this.esc(n.title)}" style="width:100%; height:320px; object-fit:cover;" />
          </a>
          <div style="padding:20px 24px 28px;">
            <div style="display:flex; gap:16px; font-size:12px; color:var(--blue); margin-bottom:10px;">
              <span><i class="far fa-folder" style="margin-right:4px;"></i> ${this.esc(n.category||'News')}</span>
              <span><i class="far fa-calendar-alt" style="margin-right:4px;"></i> ${fmtDate(n.date)}</span>
            </div>
            <h3 style="font-size:20px; font-weight:700; margin-bottom:12px; line-height:1.4;">
              <a href="${detailLink}" style="color:var(--text-dark);">${this.esc(n.title)}</a>
            </h3>
            <p style="font-size:14px; color:var(--text-mid); line-height:1.8; margin-bottom:16px;">
              ${this.esc(n.excerpt||'')}
            </p>
            <a href="${detailLink}" class="btn-cta" style="padding:9px 20px; font-size:12px;">Read More <i class="fas fa-chevron-circle-right"></i></a>
          </div>
        </div>
      `;
    }).join('');
  },

  // ---- CONTACT ----
  renderContact() {
    const s = this.get('settings', {});
    const el = id => document.getElementById(id);
    if (el('cms-contact-address') && s.address) el('cms-contact-address').innerHTML = s.address.replace(/\n/g,'<br>');
    if (el('cms-contact-phone') && s.phone)     { el('cms-contact-phone').textContent  = s.phone; el('cms-contact-phone').href = 'tel:' + s.phone.replace(/\s/g,''); }
    if (el('cms-contact-fax') && s.fax)         el('cms-contact-fax').textContent    = s.fax;
    if (el('cms-contact-email') && s.email)     { el('cms-contact-email').textContent = s.email; el('cms-contact-email').href = 'mailto:'+s.email; }
  },

  esc(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  // ---- Handle contact form submission ----
  handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const answer = parseInt(document.getElementById('captchaAnswer').value);
    if (answer !== 13) { alert('Captcha incorrect. 6 + 7 = 13'); return; }
    const msg = {
      id: Date.now(),
      name:    form.firstName.value + ' ' + form.lastName.value,
      email:   form.email.value,
      subject: form.subject.value || '(No subject)',
      message: form.message.value,
      date:    new Date().toISOString().split('T')[0],
      read:    false,
    };
    let msgs = [];
    try { msgs = JSON.parse(localStorage.getItem('ssnep_messages')||'[]'); } catch{}
    msgs.unshift(msg);
    localStorage.setItem('ssnep_messages', JSON.stringify(msgs));
    alert('Thank you! Your message has been sent. We will get back to you soon.');
    form.reset();
  },

  // ---- Handle newsletter subscribe ----
  handleSubscribe(email) {
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
    let subs = [];
    try { subs = JSON.parse(localStorage.getItem('ssnep_subscribers')||'[]'); } catch{}
    if (subs.find(s => s.email === email)) { alert('You are already subscribed!'); return false; }
    subs.push({ id: Date.now(), email, date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('ssnep_subscribers', JSON.stringify(subs));
    alert('Thank you for subscribing!');
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => CMS.init());
