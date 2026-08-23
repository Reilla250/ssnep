// SSNeP+ Website — Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Portfolio filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---- Contact captcha & submission ----
  const captchaForm = document.getElementById('contactForm');
  if (captchaForm) {
    captchaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const answerInput = document.getElementById('captchaAnswer');
      const answer = answerInput ? parseInt(answerInput.value) : 13;
      if (answer === 13) {
        const fName = document.getElementById('firstName')?.value || '';
        const lName = document.getElementById('lastName')?.value || '';
        const nameVal = (fName + ' ' + lName).trim() || 'Website Visitor';
        const emailVal = document.getElementById('email')?.value || 'visitor@example.com';
        const subjectVal = document.getElementById('subject')?.value || 'General Inquiry';
        const msgVal = document.getElementById('message')?.value || 'Submitted via contact form.';

        // Save message into ssnep_messages localStorage
        try {
          let msgs = JSON.parse(localStorage.getItem('ssnep_messages') || '[]');
          msgs.unshift({
            id: Date.now(),
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: msgVal,
            date: new Date().toISOString().split('T')[0],
            read: false
          });
          localStorage.setItem('ssnep_messages', JSON.stringify(msgs));
        } catch(err) { console.error(err); }

        alert('Thank you! Your message has been sent to the SSNeP+ team.');
        captchaForm.reset();
      } else {
        alert('Captcha incorrect. 6 + 7 = 13. Please try again.');
      }
    });
  }

  // ---- Newsletter form ----
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        const email = input.value.trim();
        try {
          let subs = JSON.parse(localStorage.getItem('ssnep_subscribers') || '[]');
          if (!subs.some(s => s.email === email)) {
            subs.push({ id: Date.now(), email: email, date: new Date().toISOString().split('T')[0] });
            localStorage.setItem('ssnep_subscribers', JSON.stringify(subs));
          }
        } catch(err) { console.error(err); }

        alert('Thank you for subscribing to ssneps.org newsletter!');
        input.value = '';
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll reveal animation ----
  const revealEls = document.querySelectorAll('.program-card, .team-card, .zero-card, .portfolio-item, .news-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

});
