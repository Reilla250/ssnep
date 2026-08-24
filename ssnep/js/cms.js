// ====================================================
//  SSNeP+ CMS Loader — js/cms.js
//  Loaded on EVERY page. Reads from localStorage
//  and injects admin-controlled content into the DOM.
//  Now includes built-in DEFAULTS so real photos always
//  show even on a fresh visit (before admin seeds data).
// ====================================================

const CMS = {

  // ---- Built-in defaults (mirrors admin/js/admin.js) ----
  DEFAULTS: {
    settings: {
      orgName: 'South Sudan Network of People Living with HIV',
      orgAbbr: 'SSNeP+',
      email: 'info@ssneps.org',
      phone: '+211 925 222 012',
      fax: '+211 921 406 329',
      address: 'Nimra Talata — Behind MCC building\nJuba, South Sudan',
      facebook: '#',
      twitter: '#',
      primaryColor: '#286DC1',
      heroTitle: 'We Work to Improve Lives of PLHIV in South Sudan',
      heroSubtitle: 'SSNeP+ is a national umbrella organization that brings together various state networks, associations, and support groups of PLHIV across South Sudan.',
      heroBtnText: 'Read More',
      missionLabel: 'We Are On Mission',
      missionTitle: 'Changing Lives<br>for Good',
      missionText: 'SSNeP+ coordinates the interests and activities of member associations and support groups of People Living with HIV/AIDS throughout South Sudan.',
      aboutP1: '<strong>South Sudan Network of People Living with HIV (SSNeP+)</strong> is a national umbrella body that represents and coordinates the interests and activities of member associations and groups. SSNeP+ is an umbrella of State networks, member associations and support groups of <a href="#">PLHIV</a> in South Sudan.',
      aboutP2: 'SSNeP+ is fully committed to its vision of creating an environment in which PLHIV live longer, positively and productively. SSNeP+ subscribes to the three (3) \'zeros\' of the Joint United Nations Joint Programme on HIV/AIDS (UNAIDS).',
      copyrightText: 'Copyright © 2024, SSNEP. All Rights Reserved.',
    },
    team: [
      {id:1,  name:'Alice Okuo Amadra',    role:'Program Officer',                   initials:'AO', status:'active', photoUrl:'assets/images/team-member-1.jpeg'},
      {id:2,  name:'Lole Laila Lole',      role:'Executive Director',                initials:'LL', status:'active', photoUrl:'assets/images/team-member-2.jpeg'},
      {id:3,  name:'Samuel Bullen',        role:'Finance Administrator',             initials:'SB', status:'active', photoUrl:'assets/images/team-member-3.jpeg'},
      {id:4,  name:'Wani Isaac',           role:'Clinical Project Officer',          initials:'WI', status:'active', photoUrl:'assets/images/team-member-4.jpeg'},
      {id:5,  name:'Kiden Sarah',          role:'Finance Assistant',                 initials:'KS', status:'active', photoUrl:'assets/images/team-member-5.jpeg'},
      {id:6,  name:'Koma Williams',        role:'Clinical Project Nurse',            initials:'KW', status:'active', photoUrl:'assets/images/team-member-7.jpeg'},
      {id:7,  name:'Poni Rose',            role:'HIV Advocacy and Prevention Officer',initials:'PR', status:'active', photoUrl:'assets/images/team-member-9.jpeg'},
      {id:8,  name:'Obulejo Jackson',      role:'M&E Officer',                       initials:'OJ', status:'active', photoUrl:'assets/images/team-member-18.png'},
      {id:9,  name:'Likambo Moses John',   role:'SBCC Officer',                      initials:'LM', status:'active', photoUrl:'assets/images/team-member-19.jpeg'},
      {id:10, name:'Joseph Oniku Karlino', role:'SBCC Officer',                      initials:'JO', status:'active', photoUrl:'assets/images/team-member-22.jpeg'},
    ],
    news: [
      {id:1, title:'Optimization of targeted provider and client-initiated HIV testing services',                    category:'HIV/AIDS',          date:'2024-08-01', status:'published', excerpt:'SSNeP+ continues to optimize targeted provider-initiated and client-initiated HIV testing services across South Sudan.', imageUrl:'assets/images/news-1.jpg'},
      {id:2, title:'Malaria Program — Insecticide Treated Mosquito Nets (ITMNs) Distribution',                     category:'Malaria',           date:'2024-07-15', status:'published', excerpt:'SSNeP+ successfully distributed insecticide-treated mosquito nets to vulnerable PLHIV households.', imageUrl:'assets/images/news-2.jpg'},
      {id:3, title:'HIV/AIDS Awareness Programme Reaches Thousands in Juba County',                                category:'Awareness',         date:'2024-06-10', status:'published', excerpt:'Awareness campaigns reached thousands of community members in Juba County.', imageUrl:'assets/images/news-3.jpg'},
      {id:4, title:'Quarterly Board Meeting Strengthens Organizational Governance',                                category:'Governance',        date:'2024-05-20', status:'published', excerpt:'SSNeP+ held its quarterly board meeting bringing together leadership from member associations.', imageUrl:'assets/images/news-4.jpg'},
      {id:5, title:'Capacity Building for PLHIV Member Associations Completed',                                   category:'Capacity Building', date:'2024-04-05', status:'published', excerpt:'Comprehensive capacity building program for PLHIV member associations completed.', imageUrl:'assets/images/news-5.jpg'},
    ],
    programs: [
      {id:1, title:'Malaria Programs',          status:'active', description:'Malaria is a serious threat in South Sudan. We focus on prevention, quick diagnosis, and proper treatment.', imageUrl:'assets/images/service-1.png'},
      {id:2, title:'HIV/AIDS Awareness',        status:'active', description:'With awareness and access to resources, we can make a difference in the fight against HIV/AIDS.', imageUrl:'assets/images/service-2.jpeg'},
      {id:3, title:'Tuberculosis',              status:'active', description:'SSNeP plays a crucial role in addressing the dual burden of HIV and Tuberculosis in South Sudan.', imageUrl:'assets/images/service-3.jpg'},
      {id:4, title:'Monitoring & Evaluation',   status:'active', description:'SSNeP+ has developed key quality assurance mechanisms for HIV prevention, treatment, care, and retention.', imageUrl:'assets/images/service-5.jpg'},
      {id:5, title:'Reporting',                 status:'active', description:'SSNeP uses different reporting approaches with key consideration on donor requirements and National Strategic Plan.', imageUrl:'assets/images/service-6.jpg'},
      {id:6, title:'Stigma & Discrimination',   status:'active', description:'"Silence can be damaging" — eliminating stigma and discrimination against PLHIV in healthcare settings.', imageUrl:'assets/images/service-19.jpg'},
    ],
    portfolio: [
      {id:1, title:'Quarterly Board Meetings',                        category:'institutional', description:'Institutional Capacity Building',          imageUrl:'assets/images/portfolio-1.jpeg'},
      {id:2, title:'Capacity Building to PLHIV Member Associations', category:'institutional', description:'Institutional Capacity Building',          imageUrl:'assets/images/portfolio-2.jpeg'},
      {id:3, title:'Food Distribution and Care to PLHIVs',           category:'health',        description:'Health Program',                          imageUrl:'assets/images/portfolio-3.jpeg'},
      {id:4, title:'Tuberculosis Treatment Program',                  category:'health',        description:'Health Program',                          imageUrl:'assets/images/portfolio-4.jpeg'},
      {id:5, title:'Malaria Program — ITMNs Distribution',           category:'health',        description:'Health Program',                          imageUrl:'assets/images/portfolio-5.jpeg'},
      {id:6, title:'HIV/AIDS Awareness Programme',                    category:'advocacy',      description:'Advocacy and Resource Mobilization',      imageUrl:'assets/images/portfolio-6.jpeg'},
    ],
  },

  // ---- Seed localStorage with defaults if not already set ----
  seedDefaults() {
    Object.keys(this.DEFAULTS).forEach(key => {
      if (!localStorage.getItem('ssnep_' + key)) {
        localStorage.setItem('ssnep_' + key, JSON.stringify(this.DEFAULTS[key]));
      }
    });
  },

  get(key, fallback) {
    try {
      const v = localStorage.getItem('ssnep_' + key);
      return v ? JSON.parse(v) : (this.DEFAULTS[key] || fallback);
    } catch { return (this.DEFAULTS[key] || fallback); }
  },

  // ---- Run on every page ----
  init() {
    this.seedDefaults();
    this.applySitewide();
    const page = this.detectPage();
    const pages = {
      'index':     () => this.renderHome(),
      'about':     () => this.renderAbout(),
      'team':      () => this.renderTeam(),
      'programs':  () => this.renderPrograms(),
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
  },

  // ---- HOME ----
  renderHome() {
    const s = this.get('settings', {});
    const el = t => document.querySelector('[data-cms="' + t + '"]');
    if (s.heroTitle    && el('hero-title'))    el('hero-title').textContent    = s.heroTitle;
    if (s.heroSubtitle && el('hero-sub'))      el('hero-sub').textContent      = s.heroSubtitle;
    if (s.heroBtnText  && el('hero-btn'))      el('hero-btn').textContent      = s.heroBtnText;
    if (s.missionLabel && el('mission-label')) el('mission-label').textContent = s.missionLabel;
    if (s.missionTitle && el('mission-title')) el('mission-title').innerHTML   = s.missionTitle;
    if (s.missionText  && el('mission-text'))  el('mission-text').textContent  = s.missionText;
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
    const team = this.get('team', this.DEFAULTS.team).filter(m => !m.status || m.status === 'active');
    if (!team.length) return;
    container.innerHTML = team.map(m => `
      <div class="team-card">
        <div class="team-photo-wrap">
          ${m.photoUrl
            ? `<img src="${m.photoUrl}" alt="${this.esc(m.name)}" loading="lazy">`
            : `<img src="assets/images/team-member-1.jpeg" alt="${this.esc(m.name)}" loading="lazy">`
          }
        </div>
        <div class="team-info"><h3>${this.esc(m.name)}</h3></div>
        <div class="team-card-role">${this.esc(m.role)}</div>
        <div class="team-social">
          ${m.facebook  ? `<a href="${m.facebook}" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>` : '<a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>'}
          ${m.twitter   ? `<a href="${m.twitter}"  aria-label="Twitter"><i class="fab fa-twitter"></i></a>` : '<a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>'}
          ${m.linkedin  ? `<a href="${m.linkedin}" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : '<a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>'}
          ${m.email     ? `<a href="mailto:${m.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>` : '<a href="#" aria-label="Email"><i class="fas fa-envelope"></i></a>'}
        </div>
      </div>
    `).join('');
  },

  // ---- PROGRAMS ----
  renderPrograms() {
    this.renderProgramCards('#cms-programs-grid', 999);
  },

  renderProgramCards(selector, limit) {
    const container = document.querySelector(selector);
    if (!container) return;
    const programs = this.get('programs', this.DEFAULTS.programs)
      .filter(p => !p.status || p.status === 'active')
      .slice(0, limit);
    if (!programs.length) return;
    container.innerHTML = programs.map(p => `
      <div class="program-card">
        <div class="program-card-img-wrap">
          <img src="${p.imageUrl || 'assets/images/service-1.png'}" alt="${this.esc(p.title)}" loading="lazy">
        </div>
        <div class="program-card-body">
          <h3>${this.esc(p.title)}</h3>
          <p>${this.esc(p.description || '')}</p>
          <a href="programs.html" class="read-more">Read More</a>
        </div>
      </div>
    `).join('');
  },

  // ---- PORTFOLIO ----
  renderPortfolio() {
    const container = document.getElementById('cms-portfolio-grid');
    if (!container) return;
    const items = this.get('portfolio', this.DEFAULTS.portfolio);
    if (!items.length) return;
    container.innerHTML = items.map((p) => `
      <div class="portfolio-item" data-category="${this.esc(p.category)}" id="port-${p.id}">
        <img src="${p.imageUrl || 'assets/images/portfolio-1.jpeg'}" alt="${this.esc(p.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
        <div class="portfolio-overlay">
          <h3>${this.esc(p.title)}</h3>
          <p>${this.esc(p.description || '')}</p>
        </div>
      </div>
    `).join('');
  },

  // ---- NEWS ----
  renderNews() {
    const container = document.getElementById('cms-news-list');
    if (!container) return;
    const news = this.get('news', this.DEFAULTS.news)
                     .filter(n => !n.status || n.status === 'published')
                     .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!news.length) { container.innerHTML = '<p style="color:#94a3b8;padding:20px;">No published posts yet.</p>'; return; }
    const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}) : '';
    container.innerHTML = news.map(n => `
      <div class="news-item">
        <div class="news-item-img" style="overflow:hidden;">
          <img src="${n.imageUrl || 'assets/images/news-1.jpg'}" alt="${this.esc(n.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="news-item-body">
          <h3><a href="#">${this.esc(n.title)}</a></h3>
          <div class="news-meta">
            <span><i class="fas fa-calendar" style="margin-right:4px;"></i>${fmtDate(n.date)}</span>
            <span><i class="fas fa-tag" style="margin-right:4px;"></i>${this.esc(n.category)}</span>
          </div>
          <p>${this.esc(n.excerpt || '')}</p>
          <a href="#" class="read-more" style="margin-top:10px;display:inline-flex;">Read More</a>
        </div>
      </div>
    `).join('');

    // Sidebar recent posts
    const sidebar = document.getElementById('cms-recent-posts');
    if (sidebar) {
      sidebar.innerHTML = news.slice(0, 6).map(n => `
        <li><a href="#">${this.esc(n.title)}</a></li>
      `).join('');
    }
  },

  // ---- CONTACT ----
  renderContact() {
    const s = this.get('settings', {});
    const el = id => document.getElementById(id);
    if (el('cms-contact-address') && s.address) el('cms-contact-address').innerHTML = s.address.replace(/\n/g, '<br>');
    if (el('cms-contact-phone')   && s.phone)   el('cms-contact-phone').textContent   = s.phone;
    if (el('cms-contact-fax')     && s.fax)     el('cms-contact-fax').textContent     = s.fax;
    if (el('cms-contact-email')   && s.email)   { el('cms-contact-email').textContent = s.email; el('cms-contact-email').href = 'mailto:' + s.email; }
  },

  esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  // ---- Handle contact form submission ----
  handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const answer = parseInt(document.getElementById('captchaAnswer').value);
    if (answer !== 13) { alert('Captcha incorrect. 6 + 7 = 13'); return; }
    const msg = {
      id:      Date.now(),
      name:    form.firstName.value + ' ' + form.lastName.value,
      email:   form.email.value,
      subject: form.subject.value || '(No subject)',
      message: form.message.value,
      date:    new Date().toISOString().split('T')[0],
      read:    false,
    };
    let msgs = [];
    try { msgs = JSON.parse(localStorage.getItem('ssnep_messages') || '[]'); } catch {}
    msgs.unshift(msg);
    localStorage.setItem('ssnep_messages', JSON.stringify(msgs));
    alert('Thank you! Your message has been sent. We will get back to you soon.');
    form.reset();
  },

  // ---- Handle newsletter subscribe ----
  handleSubscribe(email) {
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
    let subs = [];
    try { subs = JSON.parse(localStorage.getItem('ssnep_subscribers') || '[]'); } catch {}
    if (subs.find(s => s.email === email)) { alert('You are already subscribed!'); return false; }
    subs.push({ id: Date.now(), email, date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('ssnep_subscribers', JSON.stringify(subs));
    alert('Thank you for subscribing!');
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => CMS.init());
