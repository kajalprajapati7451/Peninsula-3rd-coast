 // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNavLinks = document.getElementById('mainNavLinks');
        
        mobileMenuToggle.addEventListener('click', () => {
            mainNavLinks.classList.toggle('active');
            mobileMenuToggle.innerHTML = mainNavLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Custom CAPTCHA Implementation
        class CaptchaSystem {
            constructor() {
                this.captchaCodeElement = document.getElementById('captchaCode');
                this.captchaInputElement = document.getElementById('captchaInput');
                this.captchaMessageElement = document.getElementById('captchaMessage');
                this.refreshButton = document.getElementById('refreshCaptcha');
                this.currentCaptcha = '';
                
                this.init();
            }
            
            // Initialize CAPTCHA system
            init() {
                this.generateCaptcha();
                this.setupEventListeners();
            }
            
            // Generate random alphanumeric CAPTCHA code
            generateCaptcha() {
                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
                let captcha = '';
                
                for(let i = 0; i < 5; i++) {
                    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                this.currentCaptcha = captcha;
                this.captchaCodeElement.textContent = captcha;
                this.clearCaptchaMessage();
            }
            
            // Validate CAPTCHA input
            validateCaptcha() {
                const userInput = this.captchaInputElement.value.trim();
                
                if (!userInput) {
                    this.showMessage('Please enter the CAPTCHA code', 'error');
                    return false;
                }
                
                if (userInput === this.currentCaptcha) {
                    this.showMessage('CAPTCHA verified successfully!', 'success');
                    return true;
                } else {
                    this.showMessage('CAPTCHA code does not match. Please try again.', 'error');
                    return false;
                }
            }
            
            // Show CAPTCHA validation message
            showMessage(message, type) {
                this.captchaMessageElement.textContent = message;
                this.captchaMessageElement.className = 'captcha-message';
                
                if (type === 'success') {
                    this.captchaMessageElement.classList.add('captcha-success');
                } else if (type === 'error') {
                    this.captchaMessageElement.classList.add('captcha-error');
                }
            }
            
            // Clear CAPTCHA message
            clearCaptchaMessage() {
                this.captchaMessageElement.textContent = '';
                this.captchaMessageElement.className = 'captcha-message';
                this.captchaMessageElement.style.display = 'none';
            }
            
            // Setup event listeners
            setupEventListeners() {
                // Refresh CAPTCHA button
                this.refreshButton.addEventListener('click', () => {
                    this.generateCaptcha();
                    this.captchaInputElement.value = '';
                    
                    // Add rotation animation
                    this.refreshButton.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        this.refreshButton.style.transform = 'rotate(0deg)';
                    }, 300);
                });
                
                // Validate CAPTCHA on input change
                this.captchaInputElement.addEventListener('input', () => {
                    const userInput = this.captchaInputElement.value.trim();
                    
                    if (!userInput) {
                        this.clearCaptchaMessage();
                        return;
                    }
                    
                    if (userInput === this.currentCaptcha) {
                        this.showMessage('CAPTCHA verified successfully!', 'success');
                    }
                });
            }
        }
        
        // Initialize CAPTCHA system
        const captchaSystem = new CaptchaSystem();
        
        // Form submission handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if(!name || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9]{10,}$/;
            if(!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid phone number (at least 10 digits).');
                return;
            }
            
            // Validate CAPTCHA
            if (!captchaSystem.validateCaptcha()) {
                return;
            }
            
            // Get form data
            const formData = {
                name: name,
                email: email,
                phone: phone,
                interest: document.getElementById('interest').value,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message with animation
            const submitBtn = document.getElementById('submitButton');
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
            
            // Success animation
            submitBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 300);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                captchaSystem.generateCaptcha();
                captchaSystem.captchaInputElement.value = '';
                
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = originalBg;
                
                // Show thank you message
                alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
            }, 2000);
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Adjust hero height based on screen size
        function adjustHeroHeight() {
            const heroSection = document.querySelector('.hero-section');
            
            if(window.innerWidth <= 768) {
                heroSection.style.minHeight = '500px';
            } else if(window.innerWidth <= 576) {
                heroSection.style.minHeight = '450px';
            } else if(window.innerWidth <= 400) {
                heroSection.style.minHeight = '400px';
            } else {
                heroSection.style.minHeight = '600px';
            }
        }
        
        // Initial call
        adjustHeroHeight();
        
        // Adjust on resize
        window.addEventListener('resize', adjustHeroHeight);
        
        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        });