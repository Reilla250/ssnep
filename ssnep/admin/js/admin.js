// ====================================================
//  SSNeP+ Admin — Full System Controller
//  admin/js/admin.js
// ====================================================

// ---- Auth Guard ----
(function() {
  if (!sessionStorage.getItem('ssnep_admin')) {
    window.location.href = 'login.html';
  }
})();

// ====================================================
//  STORE ENGINE
// ====================================================
const Store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('ssnep_' + key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem('ssnep_' + key, JSON.stringify(val)); },
  remove(key)   { localStorage.removeItem('ssnep_' + key); },

  DEFAULTS: {
    settings: {
      orgName:'South Sudan Network of People Living with HIV', orgAbbr:'SSNeP+',
      email:'info@ssneps.org',
      phone:'+211 925 222 012', fax:'+211 921 406 329',
      address:'Nimra Talata — Behind MCC building\nJuba, South Sudan',
      facebook:'#', twitter:'#',
      primaryColor:'#1565C0',
      heroTitle:'We Work to Improve Lives of PLHIV in South Sudan',
      heroSubtitle:'SSNeP+ is a national umbrella organization that brings together various state networks, associations, and support groups of PLHIV across South Sudan.',
      heroBtnText:'Read More',
      missionLabel:'We Are On Mission',
      missionTitle:'Changing Lives<br>for Good',
      missionText:'SSNeP+ coordinates the interests and activities of member associations and support groups of People Living with HIV/AIDS throughout South Sudan.',
      aboutP1:'<strong>South Sudan Network of People Living with HIV (SSNeP+)</strong> is a national umbrella body that represents and coordinates the interests and activities of member associations and groups. SSNeP+ is an umbrella of State networks, member associations and support groups of <a href="#">PLHIV</a> in South Sudan.',
      aboutP2:'SSNeP+ is fully committed to its vision of creating an environment in which PLHIV live longer, positively and productively. SSNeP+ subscribes to the three (3) \'zeros\' of the Joint United Nations Joint Programme on HIV/AIDS (UNAIDS).',
      adminUser:'admin', adminPass:'ssnep@2024',
      metaDesc:'SSNeP+ is a national umbrella body representing PLHIV in South Sudan.',
      metaKeywords:'SSNeP, HIV, South Sudan, PLHIV, AIDS awareness',
      copyrightText:'Copyright © 2024, SSNEP. All Rights Reserved.',
      ctaBannerText:'Join SSNEP community and support our mission to supporting PLHIV',
      ctaBtnText:'Read More',
      maintenanceMode: false,
    },
    team: [
      {id:1,name:'Alice Okuo Amadra',role:'Program Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'AO',color:'#37474F',status:'active'},
      {id:2,name:'Lole Laila Lole',role:'Executive Director',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'LL',color:'#1565C0',status:'active'},
      {id:3,name:'Samuel Bullen',role:'Finance Administrator',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'SB',color:'#2E7D32',status:'active'},
      {id:4,name:'Wani Isaac',role:'Clinical Project Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'WI',color:'#4A148C',status:'active'},
      {id:5,name:'Kiden Sarah',role:'Finance Assistant',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'KS',color:'#B71C1C',status:'active'},
      {id:6,name:'Koma Williams',role:'Clinical Project Nurse',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'KW',color:'#E65100',status:'active'},
      {id:7,name:'Poni Rose',role:'HIV Advocacy and Prevention Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'PR',color:'#00695C',status:'active'},
      {id:8,name:'Obulejo Jackson',role:'M&E Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'OJ',color:'#283593',status:'active'},
      {id:9,name:'Likambo Moses John',role:'SBCC Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'LM',color:'#558B2F',status:'active'},
      {id:10,name:'Joseph Oniku Karlino',role:'SBCC Officer',email:'',phone:'',bio:'',facebook:'',twitter:'',linkedin:'',initials:'JO',color:'#1565C0',status:'active'},
    ],
    news: [
      {id:1,title:'Optimization of targeted provider and client-initiated HIV testing services',category:'HIV/AIDS',date:'2024-08-01',status:'published',excerpt:'SSNeP+ continues to optimize targeted provider-initiated and client-initiated HIV testing services across South Sudan.'},
      {id:2,title:'Malaria Program — Insecticide Treated Mosquito Nets (ITMNs) Distribution',category:'Malaria',date:'2024-07-15',status:'published',excerpt:'SSNeP+ successfully distributed insecticide-treated mosquito nets to vulnerable PLHIV households.'},
      {id:3,title:'HIV/AIDS Awareness Programme Reaches Thousands in Juba County',category:'Awareness',date:'2024-06-10',status:'published',excerpt:'Awareness campaigns reached thousands of community members in Juba County.'},
      {id:4,title:'Quarterly Board Meeting Strengthens Organizational Governance',category:'Governance',date:'2024-05-20',status:'published',excerpt:'SSNeP+ held its quarterly board meeting bringing together leadership from member associations.'},
      {id:5,title:'Capacity Building for PLHIV Member Associations Completed',category:'Capacity Building',date:'2024-04-05',status:'draft',excerpt:'Comprehensive capacity building program for PLHIV member associations completed.'},
    ],
    programs: [
      {id:1,title:'Malaria Programs',icon:'🦟',status:'active',description:'Malaria is a serious threat in South Sudan. We focus on prevention, quick diagnosis, and proper treatment.'},
      {id:2,title:'HIV/AIDS Awareness',icon:'🎗️',status:'active',description:'With awareness and access to resources, we can make a difference in the fight against HIV/AIDS.'},
      {id:3,title:'Tuberculosis',icon:'🩺',status:'active',description:'SSNeP plays a crucial role in addressing the dual burden of HIV and Tuberculosis in South Sudan.'},
      {id:4,title:'Monitoring & Evaluation',icon:'📊',status:'active',description:'SSNeP+ has developed key quality assurance mechanisms for HIV prevention, treatment, care, and retention.'},
      {id:5,title:'Reporting',icon:'📋',status:'active',description:'SSNeP uses different reporting approaches with key consideration on donor requirements and National Strategic Plan.'},
      {id:6,title:'Stigma & Discrimination',icon:'🤝',status:'active',description:'"Silence can be damaging" — eliminating stigma and discrimination against PLHIV in healthcare settings.'},
    ],
    portfolio: [
      {id:1,title:'Quarterly Board Meetings',category:'institutional',icon:'📋',description:'Institutional Capacity Building'},
      {id:2,title:'Capacity Building to PLHIV Member Associations',category:'institutional',icon:'🎓',description:'Institutional Capacity Building'},
      {id:3,title:'Food Distribution and Care to PLHIVs',category:'health',icon:'🍱',description:'Health Program'},
      {id:4,title:'Tuberculosis Treatment Program',category:'health',icon:'🩺',description:'Health Program'},
      {id:5,title:'Malaria Program — ITMNs Distribution',category:'health',icon:'🦟',description:'Health Program'},
      {id:6,title:'HIV/AIDS Awareness Programme',category:'advocacy',icon:'🎗️',description:'Advocacy and Resource Mobilization'},
    ],
    messages: [
      {id:1,name:'John Deng',email:'john@example.com',subject:'Partnership Inquiry',message:'We would like to partner with SSNeP+ on an upcoming health initiative.',date:'2024-08-20',read:false},
      {id:2,name:'Mary Ayen',email:'mary@example.com',subject:'Volunteer Application',message:'I am interested in volunteering with SSNeP+ as a community health educator.',date:'2024-08-18',read:false},
      {id:3,name:'Peter Lado',email:'peter@example.com',subject:'Media Request',message:'We are working on a documentary and would like to interview the Executive Director.',date:'2024-08-15',read:true},
    ],
    subscribers: [
      {id:1,email:'subscriber1@example.com',date:'2024-08-10'},
      {id:2,email:'subscriber2@example.com',date:'2024-08-12'},
    ],
    activity: [
      {text:'Dashboard initialized',color:'blue',time:'Just now'},
    ],
    pages: [
      {id:'index',name:'Home',slug:'index.html',metaTitle:'SSNeP+ | Home',metaDesc:'National umbrella body for PLHIV in South Sudan.'},
      {id:'about',name:'About',slug:'about.html',metaTitle:'About Us | SSNeP+',metaDesc:'Learn about SSNeP+ mission and vision.'},
      {id:'team',name:'Team',slug:'team.html',metaTitle:'Our Team | SSNeP+',metaDesc:'Meet the dedicated SSNeP+ team.'},
      {id:'programs',name:'Service',slug:'programs.html',metaTitle:'Programs | SSNeP+',metaDesc:'SSNeP+ programs in HIV, Malaria, TB and more.'},
      {id:'portfolio',name:'Portfolio',slug:'portfolio.html',metaTitle:'Portfolio | SSNeP+',metaDesc:'SSNeP+ project portfolio.'},
      {id:'news',name:'News',slug:'news.html',metaTitle:'News | SSNeP+',metaDesc:'Latest news from SSNeP+.'},
      {id:'contact',name:'Contact',slug:'contact.html',metaTitle:'Contact | SSNeP+',metaDesc:'Contact SSNeP+ in Juba, South Sudan.'},
    ],
    navLinks: [
      {id:1,label:'Home',href:'../index.html',active:true},
      {id:2,label:'About',href:'../about.html',active:true},
      {id:3,label:'Team',href:'../team.html',active:true},
      {id:4,label:'Service',href:'../programs.html',active:true},
      {id:5,label:'Portfolio',href:'../portfolio.html',active:true},
      {id:6,label:'News',href:'../news.html',active:true},
      {id:7,label:'Contact',href:'../contact.html',active:true},
    ],
  },

  init() {
    Object.keys(this.DEFAULTS).forEach(key => {
      if (!localStorage.getItem('ssnep_' + key)) this.set(key, this.DEFAULTS[key]);
    });
  }
};

// ====================================================
//  UTILS
// ====================================================
let _uid = Date.now();
const uid = () => ++_uid;
const initials = name => name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—';
const esc = str => String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ====================================================
//  TOAST
// ====================================================
function toast(msg, type='success') {
  const icons = {success:'check-circle',error:'times-circle',warning:'exclamation-triangle',info:'info-circle'};
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas fa-${icons[type]||icons.success}"></i>${msg}`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(()=>el.remove(), 3500);
}

// ====================================================
//  MODAL
// ====================================================
const openModal  = id => document.getElementById(id).classList.add('open');
const closeModal = id => document.getElementById(id).classList.remove('open');
const closeAllModals = () => document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('open'));

// ====================================================
//  ACTIVITY LOG
// ====================================================
function logActivity(text, color='blue') {
  let a = Store.get('activity',[]);
  a.unshift({text, color, time: new Date().toLocaleTimeString()});
  if (a.length>30) a=a.slice(0,30);
  Store.set('activity', a);
}

// ====================================================
//  NAVIGATION
// ====================================================
let currentSection = 'dashboard';

function navigate(section) {
  document.querySelectorAll('.nav-item[data-nav]').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  const navEl = document.querySelector(`[data-nav="${section}"]`);
  if (navEl) navEl.classList.add('active');
  const panelEl = document.getElementById('panel-'+section);
  if (panelEl) panelEl.classList.add('active');
  currentSection = section;
  const titles = {
    dashboard:   ['Dashboard','System overview & quick controls'],
    team:        ['Team Members','Full control over staff profiles'],
    news:        ['News & Posts','Manage all news articles'],
    programs:    ['Programs','Manage service programs'],
    portfolio:   ['Portfolio','Manage project gallery'],
    messages:    ['Contact Messages','All contact form submissions'],
    subscribers: ['Newsletter Subscribers','Email subscriber management'],
    pages:       ['Page Manager','Manage SEO & page settings'],
    nav:         ['Navigation Manager','Control website menu links'],
    theme:       ['Theme & Branding','Colors, fonts & design'],
    settings:    ['Site Settings','All system configuration'],
    backup:      ['Backup & Restore','Export/Import all data'],
  };
  const t = titles[section]||['Admin',''];
  document.getElementById('topbarTitle').textContent = t[0];
  document.getElementById('topbarSub').textContent   = t[1];
  const renders = {
    dashboard:   renderDashboard,
    team:        renderTeam,
    news:        renderNews,
    programs:    renderPrograms,
    portfolio:   renderPortfolio,
    messages:    renderMessages,
    subscribers: renderSubscribers,
    pages:       renderPages,
    nav:         renderNav,
    theme:       renderTheme,
    settings:    renderSettings,
    backup:      renderBackup,
  };
  if (renders[section]) renders[section]();
  updateBadges();
}

function updateBadges() {
  const msgs = Store.get('messages',[]);
  const unread = msgs.filter(m=>!m.read).length;
  document.getElementById('msgBadge').textContent = unread;
  document.getElementById('msgBadge').style.display = unread?'inline':'none';
}

// ====================================================
//  DASHBOARD
// ====================================================
function renderDashboard() {
  const team     = Store.get('team',[]);
  const news     = Store.get('news',[]);
  const programs = Store.get('programs',[]);
  const msgs     = Store.get('messages',[]);
  const subs     = Store.get('subscribers',[]);
  const activity = Store.get('activity',[]);
  const s        = Store.get('settings',{});

  document.getElementById('statTeam').textContent        = team.length;
  document.getElementById('statNews').textContent        = news.filter(n=>n.status==='published').length;
  document.getElementById('statPrograms').textContent    = programs.length;
  document.getElementById('statMessages').textContent    = msgs.filter(m=>!m.read).length;
  document.getElementById('statSubscribers').textContent = subs.length;
  document.getElementById('statDraft').textContent       = news.filter(n=>n.status==='draft').length;
  document.getElementById('statActive').textContent      = team.filter(m=>m.status==='active').length;
  document.getElementById('statPortfolio').textContent   = Store.get('portfolio',[]).length;

  // Maintenance mode indicator
  const mmBadge = document.getElementById('maintenanceBadge');
  if (mmBadge) {
    mmBadge.textContent = s.maintenanceMode ? '🔴 Maintenance ON' : '🟢 Site Live';
    mmBadge.className = 'badge ' + (s.maintenanceMode ? 'badge-red' : 'badge-green');
  }

  // Recent news
  const rNews = [...news].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
  document.getElementById('dashRecentNews').innerHTML = rNews.map(n=>`
    <tr>
      <td><div class="td-name" style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(n.title)}</div></td>
      <td><span class="badge badge-blue">${esc(n.category)}</span></td>
      <td>${fmtDate(n.date)}</td>
      <td><span class="badge ${n.status==='published'?'badge-green':'badge-orange'}">${n.status}</span></td>
      <td>
        <button class="btn-icon edit" onclick="editNews(${n.id})"><i class="fas fa-pen"></i></button>
        <button class="btn-icon del"  onclick="deleteNews(${n.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

  // Recent messages
  document.getElementById('dashRecentMessages').innerHTML = msgs.slice(0,5).map(m=>`
    <div class="message-item ${m.read?'':'unread'}" onclick="viewMessage(${m.id})">
      <div class="msg-header">
        <span class="msg-name">${esc(m.name)} ${!m.read?'<span class="badge badge-blue" style="font-size:10px;">New</span>':''}</span>
        <span class="msg-date">${fmtDate(m.date)}</span>
      </div>
      <div class="msg-subject">${esc(m.subject)}</div>
      <div class="msg-preview">${esc(m.message.substring(0,80))}…</div>
    </div>
  `).join('');

  // Activity feed
  document.getElementById('dashActivity').innerHTML = activity.slice(0,8).map(a=>`
    <div class="activity-item">
      <div class="activity-dot ${a.color||'blue'}"></div>
      <div><p>${esc(a.text)}</p><span>${esc(a.time)}</span></div>
    </div>
  `).join('');
}

// ====================================================
//  TEAM MANAGEMENT
// ====================================================
let editTeamId = null, teamSearch = '';

function renderTeam() {
  const team = Store.get('team',[]);
  const filtered = team.filter(m =>
    m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(teamSearch.toLowerCase())
  );
  document.getElementById('teamCount').textContent = `${team.length} members`;
  document.getElementById('teamTableBody').innerHTML = filtered.map(m=>`
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="td-avatar" style="background:${m.color||'#1565C0'}">${esc(m.initials||initials(m.name))}</div>
          <div>
            <div class="td-name">${esc(m.name)}</div>
            <div class="td-sub">${esc(m.email||'No email')}</div>
          </div>
        </div>
      </td>
      <td>${esc(m.role)}</td>
      <td>${esc(m.phone||'—')}</td>
      <td><span class="badge ${m.status==='active'?'badge-green':'badge-gray'}">${esc(m.status)}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn-icon edit" onclick="editTeam(${m.id})" title="Edit"><i class="fas fa-pen"></i></button>
          <button class="btn-icon del"  onclick="deleteTeam(${m.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('')||'<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:28px;">No members found.</td></tr>';
}

function openTeamModal(mode='add', id=null) {
  editTeamId = id;
  document.getElementById('teamModalTitle').textContent = mode==='add'?'Add Team Member':'Edit Team Member';
  if (mode==='edit' && id) {
    const m = Store.get('team',[]).find(t=>t.id===id); if (!m) return;
    ['name','role','email','phone','bio','facebook','twitter','linkedin','status'].forEach(f=>{
      const el = document.getElementById('tf_'+f); if(el) el.value = m[f]||'';
    });
    document.getElementById('tf_color').value = m.color||'#1565C0';
  } else {
    document.getElementById('teamForm').reset();
    document.getElementById('tf_color').value = ['#1565C0','#2E7D32','#4A148C','#E65100','#B71C1C','#00695C'][Math.floor(Math.random()*6)];
    document.getElementById('tf_status').value = 'active';
  }
  openModal('teamModal');
}

function editTeam(id) { openTeamModal('edit', id); }

function saveTeam() {
  const name   = document.getElementById('tf_name').value.trim();
  const role   = document.getElementById('tf_role').value.trim();
  if (!name||!role) { toast('Name and role required.','error'); return; }
  const data = {
    name, role,
    email:    document.getElementById('tf_email').value.trim(),
    phone:    document.getElementById('tf_phone').value.trim(),
    bio:      document.getElementById('tf_bio').value.trim(),
    facebook: document.getElementById('tf_facebook').value.trim(),
    twitter:  document.getElementById('tf_twitter').value.trim(),
    linkedin: document.getElementById('tf_linkedin').value.trim(),
    status:   document.getElementById('tf_status').value,
    color:    document.getElementById('tf_color').value,
    initials: initials(name),
  };
  let team = Store.get('team',[]);
  if (editTeamId) {
    team = team.map(m=>m.id===editTeamId?{...m,...data}:m);
    toast('Team member updated!'); logActivity(`Team: "${name}" updated`,'blue');
  } else {
    team.push({id:uid(),...data});
    toast('Team member added!'); logActivity(`Team: "${name}" added`,'green');
  }
  Store.set('team',team); closeModal('teamModal'); renderTeam();
}

function deleteTeam(id) {
  const m = Store.get('team',[]).find(t=>t.id===id);
  if (!confirm(`Delete "${m?.name}"?`)) return;
  Store.set('team', Store.get('team',[]).filter(t=>t.id!==id));
  toast('Deleted.','warning'); logActivity(`Team: "${m?.name}" deleted`,'orange');
  renderTeam();
}

// ====================================================
//  NEWS MANAGEMENT
// ====================================================
let editNewsId = null, newsSearch = '';

function renderNews() {
  const news = Store.get('news',[]);
  const filtered = news.filter(n=>n.title.toLowerCase().includes(newsSearch.toLowerCase())||n.category.toLowerCase().includes(newsSearch.toLowerCase()));
  document.getElementById('newsCount').textContent = `${news.length} posts`;
  document.getElementById('newsTableBody').innerHTML = filtered.map(n=>`
    <tr>
      <td>
        <div class="td-name" style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(n.title)}</div>
        <div class="td-sub">${esc((n.excerpt||'').substring(0,70))}…</div>
      </td>
      <td><span class="badge badge-blue">${esc(n.category)}</span></td>
      <td>${fmtDate(n.date)}</td>
      <td><span class="badge ${n.status==='published'?'badge-green':'badge-orange'}">${esc(n.status)}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn-icon edit" onclick="editNews(${n.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon del"  onclick="deleteNews(${n.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('')||'<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:28px;">No posts found.</td></tr>';
}

function openNewsModal(mode='add', id=null) {
  editNewsId = id;
  document.getElementById('newsModalTitle').textContent = mode==='add'?'New Post':'Edit Post';
  if (mode==='edit'&&id) {
    const n = Store.get('news',[]).find(x=>x.id===id); if(!n) return;
    document.getElementById('nf_title').value    = n.title;
    document.getElementById('nf_category').value = n.category;
    document.getElementById('nf_date').value     = n.date;
    document.getElementById('nf_status').value   = n.status;
    document.getElementById('nf_excerpt').value  = n.excerpt||'';
    document.getElementById('nf_content').value  = n.content||'';
    document.getElementById('nf_author').value   = n.author||'';
    document.getElementById('nf_tags').value     = n.tags||'';
  } else {
    document.getElementById('newsForm').reset();
    document.getElementById('nf_date').value   = new Date().toISOString().split('T')[0];
    document.getElementById('nf_status').value = 'draft';
    document.getElementById('nf_author').value = 'SSNeP+ Admin';
  }
  openModal('newsModal');
}

function editNews(id) { openNewsModal('edit', id); }

function saveNews() {
  const title    = document.getElementById('nf_title').value.trim();
  const category = document.getElementById('nf_category').value.trim();
  if (!title||!category) { toast('Title and category required.','error'); return; }
  const data = {
    title, category,
    date:    document.getElementById('nf_date').value,
    status:  document.getElementById('nf_status').value,
    excerpt: document.getElementById('nf_excerpt').value.trim(),
    content: document.getElementById('nf_content').value.trim(),
    author:  document.getElementById('nf_author').value.trim(),
    tags:    document.getElementById('nf_tags').value.trim(),
  };
  let news = Store.get('news',[]);
  if (editNewsId) {
    news = news.map(n=>n.id===editNewsId?{...n,...data}:n);
    toast('Post updated!'); logActivity(`News: "${title}" updated`,'blue');
  } else {
    news.push({id:uid(),...data});
    toast('Post created!'); logActivity(`News: "${title}" published`,'green');
  }
  Store.set('news',news); closeModal('newsModal'); renderNews(); renderDashboard();
}

function deleteNews(id) {
  const n = Store.get('news',[]).find(x=>x.id===id);
  if (!confirm(`Delete "${n?.title}"?`)) return;
  Store.set('news', Store.get('news',[]).filter(x=>x.id!==id));
  toast('Post deleted.','warning'); logActivity(`News: "${n?.title}" deleted`,'orange');
  renderNews(); renderDashboard();
}

// ====================================================
//  PROGRAMS
// ====================================================
let editProgramId = null;

function renderPrograms() {
  const programs = Store.get('programs',[]);
  document.getElementById('programCount').textContent = `${programs.length} programs`;
  document.getElementById('programTableBody').innerHTML = programs.map(p=>`
    <tr>
      <td style="font-size:24px;width:44px;">${p.icon||'📌'}</td>
      <td>
        <div class="td-name">${esc(p.title)}</div>
        <div class="td-sub">${esc((p.description||'').substring(0,80))}…</div>
      </td>
      <td><span class="badge ${p.status==='active'?'badge-green':'badge-gray'}">${esc(p.status)}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn-icon edit" onclick="editProgram(${p.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon del"  onclick="deleteProgram(${p.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('')||'<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:28px;">No programs.</td></tr>';
}

function openProgramModal(mode='add', id=null) {
  editProgramId = id;
  document.getElementById('programModalTitle').textContent = mode==='add'?'Add Program':'Edit Program';
  if (mode==='edit'&&id) {
    const p = Store.get('programs',[]).find(x=>x.id===id); if(!p) return;
    document.getElementById('pf_title').value       = p.title;
    document.getElementById('pf_icon').value        = p.icon||'';
    document.getElementById('pf_status').value      = p.status;
    document.getElementById('pf_description').value = p.description||'';
    document.getElementById('pf_fullDesc').value    = p.fullDesc||'';
  } else {
    document.getElementById('programForm').reset();
    document.getElementById('pf_status').value = 'active';
  }
  openModal('programModal');
}

function editProgram(id) { openProgramModal('edit', id); }

function saveProgram() {
  const title = document.getElementById('pf_title').value.trim();
  if (!title) { toast('Title required.','error'); return; }
  const data = {
    title,
    icon:        document.getElementById('pf_icon').value.trim()||'📌',
    status:      document.getElementById('pf_status').value,
    description: document.getElementById('pf_description').value.trim(),
    fullDesc:    document.getElementById('pf_fullDesc').value.trim(),
  };
  let programs = Store.get('programs',[]);
  if (editProgramId) {
    programs = programs.map(p=>p.id===editProgramId?{...p,...data}:p);
    toast('Program updated!');
  } else {
    programs.push({id:uid(),...data});
    toast('Program added!'); logActivity(`Program: "${title}" added`,'green');
  }
  Store.set('programs',programs); closeModal('programModal'); renderPrograms();
}

function deleteProgram(id) {
  const p = Store.get('programs',[]).find(x=>x.id===id);
  if (!confirm(`Delete "${p?.title}"?`)) return;
  Store.set('programs', Store.get('programs',[]).filter(x=>x.id!==id));
  toast('Deleted.','warning'); renderPrograms();
}

// ====================================================
//  PORTFOLIO
// ====================================================
let editPortfolioId = null;

function renderPortfolio() {
  const items = Store.get('portfolio',[]);
  document.getElementById('portfolioCount').textContent = `${items.length} items`;
  document.getElementById('portfolioTableBody').innerHTML = items.map(p=>`
    <tr>
      <td style="font-size:24px;width:44px;">${p.icon||'📁'}</td>
      <td>
        <div class="td-name">${esc(p.title)}</div>
        <div class="td-sub">${esc(p.description||'')}</div>
      </td>
      <td><span class="badge badge-blue">${esc(p.category)}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn-icon edit" onclick="editPortfolio(${p.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon del"  onclick="deletePortfolio(${p.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('')||'<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:28px;">No portfolio items.</td></tr>';
}

function openPortfolioModal(mode='add', id=null) {
  editPortfolioId = id;
  document.getElementById('portfolioModalTitle').textContent = mode==='add'?'Add Item':'Edit Item';
  if (mode==='edit'&&id) {
    const p = Store.get('portfolio',[]).find(x=>x.id===id); if(!p) return;
    document.getElementById('portf_title').value       = p.title;
    document.getElementById('portf_icon').value        = p.icon||'';
    document.getElementById('portf_category').value    = p.category;
    document.getElementById('portf_description').value = p.description||'';
  } else {
    document.getElementById('portfolioForm').reset();
    document.getElementById('portf_category').value = 'health';
  }
  openModal('portfolioModal');
}

function editPortfolio(id) { openPortfolioModal('edit', id); }

function savePortfolio() {
  const title = document.getElementById('portf_title').value.trim();
  if (!title) { toast('Title required.','error'); return; }
  const data = {
    title,
    icon:        document.getElementById('portf_icon').value.trim()||'📁',
    category:    document.getElementById('portf_category').value,
    description: document.getElementById('portf_description').value.trim(),
  };
  let items = Store.get('portfolio',[]);
  if (editPortfolioId) {
    items = items.map(p=>p.id===editPortfolioId?{...p,...data}:p);
    toast('Item updated!');
  } else {
    items.push({id:uid(),...data});
    toast('Item added!');
  }
  Store.set('portfolio',items); closeModal('portfolioModal'); renderPortfolio();
}

function deletePortfolio(id) {
  if (!confirm('Delete this item?')) return;
  Store.set('portfolio', Store.get('portfolio',[]).filter(p=>p.id!==id));
  toast('Deleted.','warning'); renderPortfolio();
}

// ====================================================
//  MESSAGES
// ====================================================
function renderMessages() {
  const msgs = Store.get('messages',[]);
  const unread = msgs.filter(m=>!m.read).length;
  document.getElementById('msgUnreadCount').textContent = `${unread} unread of ${msgs.length} total`;
  document.getElementById('messagesListBody').innerHTML = msgs.length ? msgs.map(m=>`
    <div class="message-item ${m.read?'':'unread'}" onclick="viewMessage(${m.id})">
      <div class="msg-header">
        <span class="msg-name">${esc(m.name)} — <em style="font-weight:400;color:#64748b;">${esc(m.email)}</em>
          ${!m.read?'<span class="badge badge-blue" style="font-size:10px;margin-left:6px;">New</span>':''}
        </span>
        <span class="msg-date">${fmtDate(m.date)}</span>
      </div>
      <div class="msg-subject"><strong>${esc(m.subject)}</strong></div>
      <div class="msg-preview">${esc(m.message.substring(0,120))}${m.message.length>120?'…':''}</div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();markRead(${m.id})">
          <i class="fas fa-check"></i> Mark Read
        </button>
        <a href="mailto:${esc(m.email)}?subject=Re: ${esc(m.subject)}" class="btn btn-sm btn-primary" onclick="event.stopPropagation()">
          <i class="fas fa-reply"></i> Reply
        </a>
        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation();deleteMessage(${m.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('') : '<div style="padding:50px;text-align:center;color:#94a3b8;"><i class="fas fa-inbox" style="font-size:40px;display:block;margin-bottom:12px;"></i>No messages yet.</div>';
  updateBadges();
}

function viewMessage(id) {
  const msgs = Store.get('messages',[]);
  const m = msgs.find(x=>x.id===id); if(!m) return;
  markRead(id);
  document.getElementById('viewMsgFrom').textContent    = m.name;
  document.getElementById('viewMsgEmail').textContent   = m.email;
  document.getElementById('viewMsgSubject').textContent = m.subject;
  document.getElementById('viewMsgDate').textContent    = fmtDate(m.date);
  document.getElementById('viewMsgBody').textContent    = m.message;
  document.getElementById('replyEmailLink').href        = `mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`;
  openModal('viewMsgModal');
}

function markRead(id) {
  Store.set('messages', Store.get('messages',[]).map(m=>m.id===id?{...m,read:true}:m));
  renderMessages();
}

function markAllRead() {
  Store.set('messages', Store.get('messages',[]).map(m=>({...m,read:true})));
  toast('All marked as read.'); renderMessages(); renderDashboard();
}

function deleteMessage(id) {
  if (!confirm('Delete this message?')) return;
  Store.set('messages', Store.get('messages',[]).filter(m=>m.id!==id));
  toast('Message deleted.','warning'); renderMessages(); renderDashboard();
}

// ====================================================
//  SUBSCRIBERS
// ====================================================
function renderSubscribers() {
  const subs = Store.get('subscribers',[]);
  document.getElementById('subCount').textContent = `${subs.length} subscribers`;
  document.getElementById('subscribersTableBody').innerHTML = subs.map(s=>`
    <tr>
      <td><i class="fas fa-envelope" style="color:#1565C0;margin-right:8px;"></i>${esc(s.email)}</td>
      <td>${fmtDate(s.date)}</td>
      <td>
        <button class="btn-icon del" onclick="deleteSub(${s.id})" title="Remove"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('')||'<tr><td colspan="3" style="text-align:center;color:#94a3b8;padding:28px;">No subscribers yet.</td></tr>';
}

function addSubscriber() {
  const email = document.getElementById('newSubEmail').value.trim();
  if (!email||!email.includes('@')) { toast('Enter a valid email.','error'); return; }
  let subs = Store.get('subscribers',[]);
  if (subs.find(s=>s.email===email)) { toast('Already subscribed.','warning'); return; }
  subs.push({id:uid(),email,date:new Date().toISOString().split('T')[0]});
  Store.set('subscribers',subs);
  document.getElementById('newSubEmail').value='';
  toast('Subscriber added!'); renderSubscribers();
}

function deleteSub(id) {
  if (!confirm('Remove this subscriber?')) return;
  Store.set('subscribers', Store.get('subscribers',[]).filter(s=>s.id!==id));
  toast('Removed.','warning'); renderSubscribers();
}

function exportSubscribers() {
  const subs = Store.get('subscribers',[]);
  const csv = 'Email,Date\n'+subs.map(s=>`${s.email},${s.date}`).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = 'ssnep_subscribers.csv';
  a.click();
  toast('Exported as CSV!');
}

// ====================================================
//  PAGE MANAGER
// ====================================================
function renderPages() {
  const pages = Store.get('pages', Store.DEFAULTS.pages);
  document.getElementById('pagesTableBody').innerHTML = pages.map(p=>`
    <tr>
      <td><strong>${esc(p.name)}</strong></td>
      <td><code style="background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:12px;">${esc(p.slug)}</code></td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(p.metaTitle)}</td>
      <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:#64748b;">${esc(p.metaDesc)}</td>
      <td>
        <button class="btn-icon edit" onclick="editPage('${p.id}')" title="Edit SEO"><i class="fas fa-pen"></i></button>
        <a href="../${p.slug}" target="_blank" class="btn-icon" style="background:#dcfce7;color:#16a34a;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;border-radius:7px;border:none;cursor:pointer;" title="View page"><i class="fas fa-external-link-alt"></i></a>
      </td>
    </tr>
  `).join('');
}

function editPage(id) {
  const pages = Store.get('pages', Store.DEFAULTS.pages);
  const p = pages.find(x=>x.id===id); if(!p) return;
  document.getElementById('pagef_id').value       = p.id;
  document.getElementById('pagef_metaTitle').value = p.metaTitle||'';
  document.getElementById('pagef_metaDesc').value  = p.metaDesc||'';
  document.getElementById('pagef_name').textContent = p.name;
  openModal('pageModal');
}

function savePage() {
  const id        = document.getElementById('pagef_id').value;
  const metaTitle = document.getElementById('pagef_metaTitle').value.trim();
  const metaDesc  = document.getElementById('pagef_metaDesc').value.trim();
  let pages = Store.get('pages', Store.DEFAULTS.pages);
  pages = pages.map(p=>p.id===id?{...p,metaTitle,metaDesc}:p);
  Store.set('pages',pages);
  toast('Page SEO updated!'); closeModal('pageModal'); renderPages();
  logActivity(`SEO updated for "${id}" page`,'blue');
}

// ====================================================
//  NAVIGATION MANAGER
// ====================================================
function renderNav() {
  const links = Store.get('navLinks', Store.DEFAULTS.navLinks);
  document.getElementById('navTableBody').innerHTML = links.map(l=>`
    <tr>
      <td><strong>${esc(l.label)}</strong></td>
      <td><code style="background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:12px;">${esc(l.href)}</code></td>
      <td>
        <label class="toggle-switch">
          <input type="checkbox" ${l.active?'checked':''} onchange="toggleNavLink(${l.id}, this.checked)">
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn-icon edit" onclick="editNavLink(${l.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon del"  onclick="deleteNavLink(${l.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleNavLink(id, active) {
  let links = Store.get('navLinks', Store.DEFAULTS.navLinks);
  links = links.map(l=>l.id===id?{...l,active}:l);
  Store.set('navLinks',links);
  toast(active?'Link enabled.':'Link hidden.', active?'success':'warning');
}

function editNavLink(id) {
  const l = Store.get('navLinks', Store.DEFAULTS.navLinks).find(x=>x.id===id); if(!l) return;
  document.getElementById('navf_id').value    = l.id;
  document.getElementById('navf_label').value = l.label;
  document.getElementById('navf_href').value  = l.href;
  openModal('navModal');
}

function saveNavLink() {
  const id    = parseInt(document.getElementById('navf_id').value)||null;
  const label = document.getElementById('navf_label').value.trim();
  const href  = document.getElementById('navf_href').value.trim();
  if (!label||!href) { toast('Label and URL required.','error'); return; }
  let links = Store.get('navLinks', Store.DEFAULTS.navLinks);
  if (id) {
    links = links.map(l=>l.id===id?{...l,label,href}:l);
    toast('Navigation link updated!');
  } else {
    links.push({id:uid(),label,href,active:true});
    toast('Navigation link added!');
  }
  Store.set('navLinks',links); closeModal('navModal'); renderNav();
}

function addNavLink() {
  document.getElementById('navf_id').value    = '';
  document.getElementById('navf_label').value = '';
  document.getElementById('navf_href').value  = '';
  openModal('navModal');
}

function deleteNavLink(id) {
  if (!confirm('Remove this navigation link?')) return;
  Store.set('navLinks', Store.get('navLinks', Store.DEFAULTS.navLinks).filter(l=>l.id!==id));
  toast('Link removed.','warning'); renderNav();
}

// ====================================================
//  THEME & BRANDING
// ====================================================
function renderTheme() {
  const s = Store.get('settings',{});
  document.getElementById('th_primaryColor').value  = s.primaryColor||'#1565C0';
  document.getElementById('th_primaryColor2').value = s.primaryColor||'#1565C0';
  document.getElementById('th_darkColor').value     = s.darkColor||'#0D47A1';
  document.getElementById('th_heroTitle').value     = s.heroTitle||'';
  document.getElementById('th_heroSubtitle').value  = s.heroSubtitle||'';
  document.getElementById('th_heroBtnText').value   = s.heroBtnText||'Read More';
  document.getElementById('th_missionLabel').value  = s.missionLabel||'';
  document.getElementById('th_missionTitle').value  = s.missionTitle||'';
  document.getElementById('th_missionText').value   = s.missionText||'';
  document.getElementById('th_ctaText').value       = s.ctaBannerText||'';
  document.getElementById('th_ctaBtn').value        = s.ctaBtnText||'Read More';
  document.getElementById('th_copyright').value     = s.copyrightText||'';
  // Live color preview
  document.getElementById('th_primaryColor').addEventListener('input', function() {
    document.getElementById('themeColorPreview').style.background = this.value;
    document.getElementById('th_primaryColor2').value = this.value;
  });
  document.getElementById('th_primaryColor2').addEventListener('input', function() {
    document.getElementById('themeColorPreview').style.background = this.value;
    document.getElementById('th_primaryColor').value = this.value;
  });
}

function saveTheme() {
  let s = Store.get('settings', Store.DEFAULTS.settings);
  s.primaryColor  = document.getElementById('th_primaryColor').value;
  s.darkColor     = document.getElementById('th_darkColor').value;
  s.heroTitle     = document.getElementById('th_heroTitle').value.trim();
  s.heroSubtitle  = document.getElementById('th_heroSubtitle').value.trim();
  s.heroBtnText   = document.getElementById('th_heroBtnText').value.trim();
  s.missionLabel  = document.getElementById('th_missionLabel').value.trim();
  s.missionTitle  = document.getElementById('th_missionTitle').value.trim();
  s.missionText   = document.getElementById('th_missionText').value.trim();
  s.ctaBannerText = document.getElementById('th_ctaText').value.trim();
  s.ctaBtnText    = document.getElementById('th_ctaBtn').value.trim();
  s.copyrightText = document.getElementById('th_copyright').value.trim();
  Store.set('settings',s);
  toast('Theme & content saved! Changes are now live on the website.');
  logActivity('Theme & branding updated','blue');
}

// ====================================================
//  SETTINGS
// ====================================================
function renderSettings() {
  const s = Store.get('settings', Store.DEFAULTS.settings);
  const fields = ['orgName','orgAbbr','email','phone','fax','address','facebook','twitter','adminUser','aboutP1','aboutP2'];
  fields.forEach(f => {
    const el = document.getElementById('set_'+f); if(el) el.value = s[f]||'';
  });
  document.getElementById('set_maintenanceMode').checked = !!s.maintenanceMode;
}

function saveSettings() {
  let s = Store.get('settings', Store.DEFAULTS.settings);
  const fields = ['orgName','orgAbbr','email','phone','fax','address','facebook','twitter','adminUser','aboutP1','aboutP2'];
  fields.forEach(f => { const el = document.getElementById('set_'+f); if(el) s[f] = el.value.trim(); });
  const newPass = document.getElementById('set_adminPass').value;
  if (newPass) s.adminPass = newPass;
  s.maintenanceMode = document.getElementById('set_maintenanceMode').checked;
  Store.set('settings',s);
  toast('Settings saved! Website updated.'); logActivity('Site settings saved','blue');
}

function toggleMaintenance() {
  let s = Store.get('settings', Store.DEFAULTS.settings);
  s.maintenanceMode = !s.maintenanceMode;
  Store.set('settings',s);
  const st = s.maintenanceMode;
  toast(st?'⚠️ Maintenance mode ON — site shows maintenance page.':'✅ Site is now live!', st?'warning':'success');
  logActivity(st?'Maintenance mode enabled':'Maintenance mode disabled', st?'orange':'green');
  renderDashboard();
}

// ====================================================
//  BACKUP & RESTORE
// ====================================================
function renderBackup() {
  const keys = ['settings','team','news','programs','portfolio','messages','subscribers','activity','pages','navLinks'];
  const stats = keys.map(k=>{
    const d = Store.get(k,null);
    const count = Array.isArray(d)?d.length:(d?1:0);
    return `<tr><td><strong>${k}</strong></td><td>${count} record(s)</td><td>${d?'<span class="badge badge-green">OK</span>':'<span class="badge badge-gray">Empty</span>'}</td></tr>`;
  });
  document.getElementById('backupStats').innerHTML = stats.join('');
}

function exportBackup() {
  const keys = ['settings','team','news','programs','portfolio','messages','subscribers','activity','pages','navLinks'];
  const data = {};
  keys.forEach(k => { data[k] = Store.get(k,null); });
  const json = JSON.stringify({version:'1.0',date:new Date().toISOString(),data},null,2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json],{type:'application/json'}));
  a.download = `ssnep_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  toast('Full backup exported!'); logActivity('System backup exported','blue');
}

function importBackup(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      const data = parsed.data || parsed;
      Object.keys(data).forEach(k => { if (data[k]!==null) Store.set(k, data[k]); });
      toast('Backup restored successfully! Reloading…','success');
      logActivity('System backup restored','green');
      setTimeout(()=>window.location.reload(), 1500);
    } catch {
      toast('Invalid backup file.','error');
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (!prompt('Type RESET to confirm clearing all data:')?.trim().toUpperCase()==='RESET') return;
  const keys = ['settings','team','news','programs','portfolio','messages','subscribers','activity','pages','navLinks'];
  keys.forEach(k => Store.remove(k));
  Store.init();
  toast('All data reset to defaults!','warning');
  setTimeout(()=>window.location.reload(),1500);
}

// ====================================================
//  INIT
// ====================================================
document.addEventListener('DOMContentLoaded', function() {
  Store.init();

  // Sidebar user display
  const user = sessionStorage.getItem('ssnep_admin_user')||'admin';
  const sidebarUserEl = document.getElementById('sidebarUser');
  if (sidebarUserEl) sidebarUserEl.textContent = user;

  // Nav item clicks
  document.querySelectorAll('.nav-item[data-nav]').forEach(btn => {
    btn.addEventListener('click', ()=>navigate(btn.getAttribute('data-nav')));
  });

  // Search boxes
  document.getElementById('teamSearch')?.addEventListener('input', e=>{ teamSearch=e.target.value; renderTeam(); });
  document.getElementById('newsSearch')?.addEventListener('input', e=>{ newsSearch=e.target.value; renderNews(); });

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e=>{ if(e.target===o) closeAllModals(); });
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', ()=>{
    sessionStorage.removeItem('ssnep_admin');
    sessionStorage.removeItem('ssnep_admin_user');
    window.location.href = 'login.html';
  });

  // Start on dashboard
  navigate('dashboard');
});
