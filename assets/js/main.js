/**
 * Main JavaScript for Sitapur Educational Institute
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.classList.add('hidden');
                }, 500);
            }, 300); // Small delay to ensure smooth transition
        });
    }

    // 2. Dark/Light Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    // Mobile theme toggle
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            if (themeToggleLightIcon) {
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
            }
            if (themeToggleLightIconMobile) {
                themeToggleLightIconMobile.classList.remove('hidden');
                themeToggleDarkIconMobile.classList.add('hidden');
            }
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleDarkIcon) {
                themeToggleDarkIcon.classList.remove('hidden');
                themeToggleLightIcon.classList.add('hidden');
            }
            if (themeToggleDarkIconMobile) {
                themeToggleDarkIconMobile.classList.remove('hidden');
                themeToggleLightIconMobile.classList.add('hidden');
            }
            localStorage.setItem('color-theme', 'light');
        }
    }

    // Initialize Theme
    const initTheme = () => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    };
    initTheme();

    // Toggle event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(!isDark);
        });
    }
    
    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(!isDark);
        });
    }

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // 4. Sticky Navbar & Back to Top behavior
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) {
                navbar.classList.add('shadow-md');
                // Opt: slightly transparent when scrolling
            }
            if (backToTop) {
                backToTop.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
                backToTop.classList.add('opacity-100', 'translate-y-0');
            }
        } else {
            if (navbar) {
                navbar.classList.remove('shadow-md');
            }
            if (backToTop) {
                backToTop.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
                backToTop.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    });

    // 5. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach((el) => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load

    // 6. Button Ripple Effect
    const btnRipples = document.querySelectorAll('.btn-ripple');
    btnRipples.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripples = document.createElement('span');
            ripples.className = 'ripple';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // 7. Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                lightboxImg.src = src;
                
                // Show Lightbox
                lightbox.classList.remove('hidden');
                // Small delay to allow display block to apply before opacity transition
                setTimeout(() => {
                    lightbox.classList.remove('opacity-0');
                    lightbox.classList.add('opacity-100');
                    lightboxImg.classList.remove('scale-95');
                    lightboxImg.classList.add('scale-100');
                }, 10);
                
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightboxImg.src = '';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }

    // 8. Dynamic Copyright Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 9. Simple Testimonial Slider logic (if present)
    const testSlider = document.getElementById('testimonial-slider');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (testSlider && dots.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            testSlider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('bg-primary-600');
                dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
            });
            dots[index].classList.remove('bg-gray-300', 'dark:bg-gray-600');
            dots[index].classList.add('bg-primary-600');
            
            currentSlide = parseInt(index);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
        });

        const nextSlide = () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= dots.length) nextIndex = 0;
            goToSlide(nextIndex);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // 5 sec per slide
        };

        // Initialize slider
        resetInterval();
    }

});
