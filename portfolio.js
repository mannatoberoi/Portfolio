// Portfolio Website JavaScript and React Components

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll indicator and lightweight scroll choreography
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.transform = `scaleX(${Math.min(scrolled / 100, 1)})`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-text, .skill-category, .stat-item, .education-item, .contact-info'
    );
    animatedElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
});


// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#4f46e5';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Glowing name interaction
document.addEventListener('DOMContentLoaded', function() {
    const glowText = document.querySelector('.glow-text');
    if (glowText) {
        glowText.addEventListener('click', function() {
            // Add a special glow effect when clicked
            this.style.textShadow = `
                0 0 20px #fbbf24,
                0 0 40px #fbbf24,
                0 0 60px #fbbf24,
                0 0 80px #fbbf24,
                0 0 100px #fbbf24
            `;
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.textShadow = '';
                this.style.transform = '';
            }, 1000);
            
            // Show a welcome message
            showNotification('👋 Welcome to my portfolio!', 'success');
        });
    }
});
// Alternating typing animation for subtitle
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const texts = [
            'Computer Science Engineering Student',
            'Developer',
            'Learner'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseTime = 2000;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = deletingSpeed;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeText, typingSpeed);
        }

        // Start typing animation immediately since hero title has no typing
        setTimeout(typeText, 1000);
    }
});

// React Components
const { useState, useEffect } = React;

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let startTime;
        const startCount = 0;
        
        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - startCount) + startCount);
            setCount(currentCount);
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    }, [end, duration]);
    
    return React.createElement('span', null, count);
}

// Skill Progress Bar Component
function SkillProgressBar({ skill, percentage }) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );
        
        const element = document.getElementById(`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`);
        if (element) {
            observer.observe(element);
        }
        
        return () => observer.disconnect();
    }, [skill]);
    
    return React.createElement('div', {
        id: `skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
        className: 'skill-progress'
    }, [
        React.createElement('div', {
            key: 'label',
            className: 'skill-label'
        }, [
            React.createElement('span', { key: 'name' }, skill),
            React.createElement('span', { key: 'percentage' }, `${percentage}%`)
        ]),
        React.createElement('div', {
            key: 'bar',
            className: 'progress-bar'
        }, React.createElement('div', {
            className: 'progress-fill',
            style: {
                width: isVisible ? `${percentage}%` : '0%',
                transition: 'width 1.5s ease-in-out'
            }
        }))
    ]);
}



// Initialize React components
document.addEventListener('DOMContentLoaded', function() {
    const reactRoot = document.getElementById('react-root');
    
    if (reactRoot) {
        // Add theme toggle to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            const themeToggleContainer = document.createElement('div');
            themeToggleContainer.id = 'theme-toggle-container';
            navContainer.appendChild(themeToggleContainer);
            
            ReactDOM.render(React.createElement(ThemeToggle), themeToggleContainer);
        }
        
        // Add skill progress bars
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const progressContainer = document.createElement('div');
            progressContainer.id = 'skill-progress-container';
            progressContainer.className = 'skill-progress-container';
            skillsSection.appendChild(progressContainer);
            
            const skills = [
                { name: 'Python', percentage: 85 },
                { name: 'JavaScript', percentage: 75 },
                { name: 'HTML/CSS', percentage: 90 },
                { name: 'React', percentage: 70 },
                { name: 'C Programming', percentage: 80 }
            ];
            
            ReactDOM.render(
                React.createElement('div', { className: 'skills-progress' },
                    skills.map(skill => 
                        React.createElement(SkillProgressBar, {
                            key: skill.name,
                            skill: skill.name,
                            percentage: skill.percentage
                        })
                    )
                ),
                progressContainer
            );
        }
    }
});

// Add CSS for React components
const additionalStyles = `
.skill-progress-container {
    margin-top: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.skill-progress {
    margin-bottom: 1.5rem;
}

.skill-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.progress-bar {
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 4px;
}

.theme-toggle {
    background: none;
    border: none;
    color: #333;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background-color: #f3f4f6;
    transform: scale(1.1);
}

.dark-theme {
    background-color: #1f2937;
    color: #f9fafb;
}

.dark-theme .navbar {
    background: rgba(31, 41, 55, 0.95);
}

.dark-theme .section-title {
    color: #f9fafb;
}

.dark-theme .skill-category {
    background-color: #374151;
    color: #f9fafb;
}

.dark-theme .about {
    background-color: #111827;
}




.dark-theme .theme-toggle {
    color: #f9fafb;
}

.dark-theme .theme-toggle:hover {
    background-color: #4b5563;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add loading states and error handling
window.addEventListener('load', function() {
    // Remove loading class from body
    document.body.classList.remove('loading');
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found';
            this.alt = 'Image not available';
        });
    });
});

// Penguin interaction
document.addEventListener('DOMContentLoaded', function() {
    const penguin = document.querySelector('.penguin');
    if (penguin) {
        penguin.addEventListener('click', function() {
            // Add a special animation when clicked
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'penguinBounce 0.6s ease-in-out 3';
            
            // Show a fun message
            showNotification('🐧 Penguin says: "Hello! Nice to meet you!"', 'info');
        });
        
        // Add random waddle animation occasionally
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                penguin.style.animation = 'penguin3D 2s ease-in-out';
                setTimeout(() => {
                    penguin.style.animation = 'penguin3D 3s ease-in-out infinite';
                }, 2000);
            }
        }, 10000); // Check every 10 seconds
    }
});

console.log('Portfolio website loaded successfully! 🚀');
