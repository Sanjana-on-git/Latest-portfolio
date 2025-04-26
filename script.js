document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
      navLinks?.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  
    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      fadeInObserver.observe(element);
    });
  
    // Skill Bars Animation
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkills = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          const skillLevel = entry.target.dataset.skill;
          if (progressBar) {
            progressBar.style.width = `${skillLevel}%`;
          }
        }
      });
    };
    
    const skillsObserver = new IntersectionObserver(animateSkills, {
      threshold: 0.5
    });
    
    skillCards.forEach(card => {
      skillsObserver.observe(card);
    });
  
    // Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        projects.forEach(project => {
          if (filter === 'all' || project.dataset.category === filter) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple form validation
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      
      if (name && email && message) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
          
          setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
              submitButton.disabled = false;
              submitButton.textContent = 'Send Message';
            }, 3000);
          }, 1500);
        }
      }
    });
  
    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    
    const toggleBackToTop = () => {
      if (backToTop) {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    };
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTop?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    const handleHeaderScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (header) {
        if (currentScroll <= 0) {
          header.classList.remove('scrolled');
        } else {
          header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
      }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
  });