// ====================================================
//  SSNeP+ Website — Main JavaScript
//  Search modal + News article reader modal
// ====================================================

// ---- News Article Data ----
var NEWS_DB = [
  {
    id: '1',
    title: 'Optimization of targeted provider and client-initiated HIV testing services',
    category: 'HIV/AIDS',
    date: '2024-08-01',
    author: 'SSNeP+ Media Team',
    excerpt: 'SSNeP+ continues to optimize targeted provider-initiated and client-initiated HIV testing services across South Sudan.',
    content: '<p><strong>JUBA, South Sudan</strong> — SSNeP+ continues to optimize targeted provider-initiated and client-initiated HIV testing services (HTS) across South Sudan, significantly improving early HIV diagnosis, reducing community transmission, and streamlining linkage to antiretroviral treatment (ART).</p><p>Through strategic partnerships with county health departments and community health worker networks, SSNeP+ has implemented tailored testing models including index testing, mobile voluntary testing outreach in remote counties, and integrated provider-initiated HTS at primary healthcare facilities.</p><p>Special attention is dedicated to key affected populations, pregnant women, and young individuals, ensuring confidentiality, pre- and post-test counseling, and immediate referral to treatment and peer support groups.</p><p>SSNeP+ remains committed to accelerating progress toward the UNAIDS 95-95-95 targets: ensuring 95% of people living with HIV know their status, 95% of diagnosed individuals receive ART, and 95% on ART achieve viral suppression.</p>'
  },
  {
    id: '2',
    title: 'Malaria Program — Insecticide Treated Mosquito Nets (ITMNs) Distribution',
    category: 'Malaria',
    date: '2024-07-15',
    author: 'SSNeP+ Health Team',
    excerpt: 'SSNeP+ successfully distributed insecticide-treated mosquito nets to vulnerable PLHIV households across multiple counties.',
    content: '<p><strong>JUBA, South Sudan</strong> — Under its comprehensive health program, SSNeP+ has completed the distribution of thousands of long-lasting Insecticide-Treated Mosquito Nets (ITMNs) to vulnerable People Living with HIV (PLHIV) households across multiple counties.</p><p>Malaria remains one of the leading causes of morbidity and mortality in South Sudan, posing severe health risks to immunocompromised individuals. Coinfection with malaria significantly increases viral load and complicates HIV management.</p><p>Along with net distribution, SSNeP+ community mobilization teams conducted practical demonstrations on proper net hanging, physical care, and vector control strategies. Community members were also educated on early fever recognition and prompt attendance at local healthcare clinics.</p><p>This distribution campaign was made possible through strong collaboration with local community leaders, healthcare providers, and international development partners.</p>'
  },
  {
    id: '3',
    title: 'HIV/AIDS Awareness Programme Reaches Thousands in Juba County',
    category: 'Awareness',
    date: '2024-06-10',
    author: 'SSNeP+ Advocacy Team',
    excerpt: 'SSNeP\'s HIV/AIDS awareness campaigns reached thousands of community members in Juba County.',
    content: '<p><strong>JUBA COUNTY, South Sudan</strong> — Thousands of community members, youth groups, and women leaders participated in SSNeP+\'s multi-week HIV/AIDS Awareness Programme held across key payams in Juba County.</p><p>The campaign utilized interactive community dialogues, radio sensitization broadcasts, and peer-led educational sessions to dispel myths, provide accurate information on transmission and prevention, and promote regular voluntary HIV testing.</p><p>Crucially, the programme focused on tackling health-facility and community-based stigma and discrimination. Speakers emphasized that with consistent antiretroviral therapy (ART), people living with HIV lead long, healthy, and productive lives.</p><p>"Silence and stigma can be damaging. By opening honest conversations in our communities, we empower people to seek testing and treatment without fear," noted SSNeP+ Executive Director during the closing ceremony in Nimra Talata.</p>'
  },
  {
    id: '4',
    title: 'Quarterly Board Meeting Strengthens Organizational Governance',
    category: 'Governance',
    date: '2024-05-20',
    author: 'SSNeP+ Secretariat',
    excerpt: 'SSNeP+ held its quarterly board meeting bringing together leadership from member associations across South Sudan.',
    content: '<p><strong>JUBA, South Sudan</strong> — The Board of Directors of SSNeP+ convened its quarterly meeting in Juba, bringing together representatives from state networks, member associations, and PLHIV support groups nationwide.</p><p>The board evaluated progress under ongoing initiatives, including the USAID/Advancing HIV & AIDS Epidemic Control (AHEC) project, reviewed financial audits and M&E reports, and approved key operational guidelines for the upcoming quarter.</p><p>Board members commended executive leadership and field officers for maintaining service continuity across health centers despite operational challenges. The meeting concluded with a renewed mandate to strengthen grassroots member associations and advocate for increased national resources toward HIV, TB, and Malaria programs.</p>'
  },
  {
    id: '5',
    title: 'Capacity Building for PLHIV Member Associations Completed',
    category: 'Capacity Building',
    date: '2024-04-05',
    author: 'USAID/AHEC Project Team',
    excerpt: 'Comprehensive capacity building program for PLHIV member associations completed, empowering grassroots organizations.',
    content: '<p><strong>JUBA, South Sudan</strong> — SSNeP+ has successfully completed an intensive capacity building workshop series for PLHIV member associations operating across South Sudan\'s states.</p><p>Supported under the USAID/Advancing HIV & AIDS Epidemic Control (AHEC) project, the training modules covered organizational management, financial reporting, human rights advocacy, data collection, and peer support group facilitation.</p><p>Participants expressed enthusiasm for the practical tools gained, noting that enhanced organizational capacity will enable local associations to better serve PLHIV communities, monitor healthcare delivery, and partner effectively with local health authorities.</p>'
  }
];

// ---- Site Pages for search ----
var SITE_PAGES = [
  { name: 'Home', url: 'index.html', desc: 'Main portal for South Sudan Network of PLHIV (SSNeP+).' },
  { name: 'About Us', url: 'about.html', desc: 'SSNeP+ vision, mission and registration details.' },
  { name: 'Our Team', url: 'team.html', desc: 'Meet the executive leadership and program officers.' },
  { name: 'FAQ', url: 'faq.html', desc: 'Frequently Asked Questions, PSEA reporting, Child Protection & Gender policies.' },
  { name: 'Our Programs & Services', url: 'programs.html', desc: 'HIV, Malaria, TB, Monitoring & Evaluation, Advocacy.' },
  { name: 'Portfolio & Events', url: 'portfolio.html', desc: 'USAID/AHEC project gallery and capacity building.' },
  { name: 'News & Updates', url: 'news.html', desc: 'Latest articles, press releases, and health program news.' },
  { name: 'Contact Us', url: 'contact.html', desc: 'Get in touch with SSNeP+ in Juba, South Sudan.' }
];

// ---- Helpers ----
function esc(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function fmtDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}); }
  catch(e) { return d; }
}
function getAllNews() {
  var list = [];
  try {
    var stored = JSON.parse(localStorage.getItem('ssnep_news') || '[]');
    if (stored && stored.length > 0) {
      list = stored.filter(function(n){ return n.status === 'published'; });
    }
  } catch(e) {}
  // Always merge defaults
  NEWS_DB.forEach(function(dn) {
    if (!list.some(function(n){ return String(n.id) === String(dn.id); })) {
      list.push(dn);
    }
  });
  return list;
}

// ====================================================
//  SEARCH MODAL
// ====================================================
function buildSearchModal() {
  if (document.getElementById('ssnepSearchOverlay')) return;
  var html = '<div id="ssnepSearchOverlay" class="search-modal-overlay" onclick="if(event.target===this)closeSearch()">' +
    '<div class="search-modal-card">' +
      '<div class="search-modal-header">' +
        '<h3><i class="fas fa-search" style="margin-right:8px;"></i>Search ssneps.org</h3>' +
        '<button class="modal-close-btn" onclick="closeSearch()">&times;</button>' +
      '</div>' +
      '<div class="search-input-box">' +
        '<i class="fas fa-search"></i>' +
        '<input type="text" id="ssnepSearchInput" placeholder="Search news, programs, pages..." autocomplete="off" />' +
      '</div>' +
      '<div class="search-results-container" id="ssnepSearchResults"></div>' +
    '</div>' +
  '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('ssnepSearchInput').addEventListener('input', function(){
    doSearch(this.value);
  });
}

function openSearch() {
  buildSearchModal();
  var overlay = document.getElementById('ssnepSearchOverlay');
  overlay.classList.add('active');
  var inp = document.getElementById('ssnepSearchInput');
  inp.value = '';
  setTimeout(function(){ inp.focus(); }, 80);
  doSearch('');
}

function closeSearch() {
  var overlay = document.getElementById('ssnepSearchOverlay');
  if (overlay) overlay.classList.remove('active');
}

function doSearch(query) {
  var container = document.getElementById('ssnepSearchResults');
  if (!container) return;
  var q = (query || '').toLowerCase().trim();
  var allNews = getAllNews();
  var html = '';

  if (!q) {
    // Show recent news + page shortcuts
    html += '<div class="search-result-group-title">Recent News</div>';
    allNews.slice(0, 3).forEach(function(n) {
      html += '<div class="search-result-item" onclick="closeSearch();openArticle(\'' + n.id + '\')">' +
        '<h4>' + esc(n.title) + '</h4>' +
        '<p>' + esc(n.excerpt || '') + '</p>' +
        '<span class="search-result-badge">' + esc(n.category || 'News') + ' &bull; ' + fmtDate(n.date) + '</span>' +
      '</div>';
    });
    html += '<div class="search-result-group-title" style="margin-top:16px;">Pages</div>';
    SITE_PAGES.forEach(function(p) {
      html += '<a href="' + p.url + '" class="search-result-item" onclick="closeSearch()">' +
        '<h4>' + esc(p.name) + '</h4>' +
        '<p>' + esc(p.desc) + '</p>' +
      '</a>';
    });
  } else {
    var newsHits = allNews.filter(function(n){
      return (n.title||'').toLowerCase().includes(q) ||
             (n.category||'').toLowerCase().includes(q) ||
             (n.excerpt||'').toLowerCase().includes(q);
    });
    var pageHits = SITE_PAGES.filter(function(p){
      return (p.name||'').toLowerCase().includes(q) ||
             (p.desc||'').toLowerCase().includes(q);
    });

    if (newsHits.length) {
      html += '<div class="search-result-group-title">News Articles (' + newsHits.length + ')</div>';
      newsHits.forEach(function(n) {
        html += '<div class="search-result-item" onclick="closeSearch();openArticle(\'' + n.id + '\')">' +
          '<h4>' + esc(n.title) + '</h4>' +
          '<p>' + esc(n.excerpt || '') + '</p>' +
          '<span class="search-result-badge">' + esc(n.category || 'News') + ' &bull; ' + fmtDate(n.date) + '</span>' +
        '</div>';
      });
    }
    if (pageHits.length) {
      html += '<div class="search-result-group-title" style="margin-top:16px;">Pages (' + pageHits.length + ')</div>';
      pageHits.forEach(function(p) {
        html += '<a href="' + p.url + '" class="search-result-item" onclick="closeSearch()">' +
          '<h4>' + esc(p.name) + '</h4>' +
          '<p>' + esc(p.desc) + '</p>' +
        '</a>';
      });
    }
    if (!newsHits.length && !pageHits.length) {
      html = '<div style="text-align:center;padding:30px 0;color:#94a3b8;">' +
        '<i class="fas fa-search" style="font-size:32px;display:block;margin-bottom:10px;"></i>' +
        'No results for "<strong>' + esc(query) + '</strong>". Try "HIV", "Malaria", or "Team".' +
      '</div>';
    }
  }
  container.innerHTML = html;
}

// ====================================================
//  NEWS ARTICLE MODAL
// ====================================================
function buildArticleModal() {
  if (document.getElementById('ssnepArticleOverlay')) return;
  var html = '<div id="ssnepArticleOverlay" class="news-modal-overlay" onclick="if(event.target===this)closeArticle()">' +
    '<div class="news-modal-card">' +
      '<div class="search-modal-header">' +
        '<h3 id="artModalHeader">News &amp; Update</h3>' +
        '<button class="modal-close-btn" onclick="closeArticle()">&times;</button>' +
      '</div>' +
      '<div class="news-modal-body">' +
        '<span class="news-modal-category" id="artCat">Category</span>' +
        '<h2 class="news-modal-title" id="artTitle">Title</h2>' +
        '<div class="news-modal-meta" id="artMeta">' +
          '<span><i class="fas fa-calendar" style="margin-right:4px;"></i><span id="artDate"></span></span>' +
          '<span><i class="fas fa-user" style="margin-right:4px;"></i><span id="artAuthor"></span></span>' +
        '</div>' +
        '<div class="news-modal-content" id="artContent"></div>' +
      '</div>' +
      '<div class="news-modal-footer">' +
        '<span style="font-size:12px;color:#64748b;"><i class="fas fa-shield-alt" style="color:#1565C0;margin-right:4px;"></i>SSNeP+ Official Publication</span>' +
        '<button onclick="closeArticle()" style="padding:8px 22px;background:#1565C0;color:white;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Close</button>' +
      '</div>' +
    '</div>' +
  '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
}

function openArticle(id) {
  buildArticleModal();
  var allNews = getAllNews();
  var item = null;
  if (id) {
    item = allNews.find(function(n){ return String(n.id) === String(id); });
  }
  if (!item) item = allNews[0];
  if (!item) return;

  document.getElementById('artCat').textContent    = item.category || 'News';
  document.getElementById('artTitle').textContent  = item.title;
  document.getElementById('artDate').textContent   = fmtDate(item.date);
  document.getElementById('artAuthor').textContent = item.author || 'SSNeP+ Team';
  document.getElementById('artModalHeader').textContent = item.category || 'News & Update';

  var contentEl = document.getElementById('artContent');
  if (item.content && item.content.trim().charAt(0) === '<') {
    contentEl.innerHTML = item.content;
  } else if (item.content) {
    contentEl.innerHTML = '<p>' + esc(item.content) + '</p>';
  } else {
    contentEl.innerHTML = '<p>' + esc(item.excerpt || item.title) + '</p>';
  }

  document.getElementById('ssnepArticleOverlay').classList.add('active');
  document.getElementById('ssnepArticleOverlay').scrollTop = 0;
}

function closeArticle() {
  var overlay = document.getElementById('ssnepArticleOverlay');
  if (overlay) overlay.classList.remove('active');
}

// ====================================================
//  DOM READY
// ====================================================
document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile hamburger ---
  var hamburger = document.getElementById('hamburger');
  var mainNav   = document.getElementById('mainNav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function() {
      mainNav.classList.toggle('open');
    });
  }

  // --- Search button(s) in header ---
  document.querySelectorAll('.nav-search').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openSearch();
    });
  });

  // --- Read More / title links / sidebar links (delegated) ---
  document.addEventListener('click', function(e) {
    var el = e.target.closest('.read-more[data-id], .news-title-link[data-id], .sidebar-news-link[data-id]');
    if (el) {
      e.preventDefault();
      openArticle(el.getAttribute('data-id'));
      return;
    }
    // CMS-rendered news items (from cms.js render) — click Read More inside #cms-news-list
    var cmsReadMore = e.target.closest('#cms-news-list .read-more, #cms-news-list a');
    if (cmsReadMore) {
      e.preventDefault();
      // find nearest news title
      var newsBlock = cmsReadMore.closest('.news-item, [class*="news"]');
      var titleEl = newsBlock ? newsBlock.querySelector('h3 a, h3') : null;
      var title = titleEl ? titleEl.textContent.trim() : '';
      var allNews = getAllNews();
      var found = allNews.find(function(n){ return n.title.toLowerCase().includes(title.toLowerCase().slice(0,30)); });
      openArticle(found ? found.id : '1');
      return;
    }
  });

  // --- ESC key closes modals ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeSearch(); closeArticle(); }
  });

  // --- Active nav highlight ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Portfolio filter ---
  var filterBtns     = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');
      portfolioItems.forEach(function(item) {
        item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
      });
    });
  });

  // --- Contact form ---
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var answerEl = document.getElementById('captchaAnswer');
      var answer = answerEl ? parseInt(answerEl.value) : 13;
      if (answer === 13) {
        var name    = ((document.getElementById('firstName') ? document.getElementById('firstName').value : '') + ' ' + (document.getElementById('lastName') ? document.getElementById('lastName').value : '')).trim();
        var email   = document.getElementById('email')   ? document.getElementById('email').value : '';
        var subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
        var message = document.getElementById('message') ? document.getElementById('message').value : '';
        try {
          var msgs = JSON.parse(localStorage.getItem('ssnep_messages') || '[]');
          msgs.unshift({ id: Date.now(), name: name || 'Visitor', email: email, subject: subject || 'General Inquiry', message: message, date: new Date().toISOString().split('T')[0], read: false });
          localStorage.setItem('ssnep_messages', JSON.stringify(msgs));
        } catch(err) {}
        alert('Thank you! Your message has been sent to the SSNeP+ team.');
        contactForm.reset();
      } else {
        alert('Captcha incorrect. 6 + 7 = 13. Please try again.');
      }
    });
  }

  // --- Newsletter forms ---
  document.querySelectorAll('.newsletter-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        var email = input.value.trim();
        try {
          var subs = JSON.parse(localStorage.getItem('ssnep_subscribers') || '[]');
          if (!subs.some(function(s){ return s.email === email; })) {
            subs.push({ id: Date.now(), email: email, date: new Date().toISOString().split('T')[0] });
            localStorage.setItem('ssnep_subscribers', JSON.stringify(subs));
          }
        } catch(err) {}
        alert('Thank you for subscribing to the SSNeP+ newsletter!');
        input.value = '';
      }
    });
  });

  // --- Smooth scroll anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  // --- Search dropdown toggle in header ---
  document.querySelectorAll('.search-button').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var form = this.nextElementSibling || document.querySelector('.searchbar form');
      if (form) form.classList.toggle('active');
    });
  });

  document.addEventListener('click', function(e) {
    var searchForm = document.querySelector('.searchbar form');
    if (searchForm && !searchForm.contains(e.target) && !e.target.closest('.search-button')) {
      searchForm.classList.remove('active');
    }
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var faqItem = this.closest('.faq-item');
      var faqBody = faqItem ? faqItem.querySelector('.faq-body') : null;
      var isOpen = faqBody && faqBody.classList.contains('open');

      // Close all other FAQs
      document.querySelectorAll('.faq-body').forEach(function(b) { b.classList.remove('open'); });
      document.querySelectorAll('.faq-button').forEach(function(b) { b.classList.add('collapsed'); });

      if (!isOpen && faqBody) {
        faqBody.classList.add('open');
        this.classList.remove('collapsed');
      }
    });
  });

  // --- Video Modal ---
  document.querySelectorAll('[data-target="#myModal"], .video-button').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var vModal = document.getElementById('myModal');
      if (vModal) vModal.style.display = 'block';
    });
  });

  document.querySelectorAll('#myModal [data-dismiss="modal"]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var vModal = document.getElementById('myModal');
      if (vModal) vModal.style.display = 'none';
    });
  });

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('.program-card, .zero-card, .portfolio-item, .news-item, .choose-item, .feature-item');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // --- Team Carousel Slider ---
  var track = document.getElementById('teamCarouselTrack');
  var prevBtn = document.getElementById('teamPrevBtn');
  var nextBtn = document.getElementById('teamNextBtn');

  if (track && prevBtn && nextBtn) {
    var currentIndex = 0;

    function getItemsPerView() {
      var w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      if (w <= 1024) return 3;
      return 4;
    }

    function updateCarousel() {
      var items = track.querySelectorAll('.team-item');
      if (!items.length) return;
      var itemsPerView = getItemsPerView();
      var maxIndex = Math.max(0, items.length - itemsPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      var itemWidth = items[0].getBoundingClientRect().width;
      var gap = 24;
      var moveX = currentIndex * (itemWidth + gap);
      track.style.transform = 'translateX(-' + moveX + 'px)';
    }

    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currentIndex--;
      if (currentIndex < 0) {
        var items = track.querySelectorAll('.team-item');
        currentIndex = Math.max(0, items.length - getItemsPerView());
      }
      updateCarousel();
    });

    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var items = track.querySelectorAll('.team-item');
      var maxIndex = Math.max(0, items.length - getItemsPerView());
      currentIndex++;
      if (currentIndex > maxIndex) currentIndex = 0;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 200);
  }

});


