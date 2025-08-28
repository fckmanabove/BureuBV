// Гарантирует, что страница всегда загружается с самого верха
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// --- 1. ОПРЕДЕЛЕНИЕ ВСЕХ ФУНКЦИЙ ---

// Регистрируем плагины GSAP один раз в самом начале
gsap.registerPlugin(ScrollTrigger);

// --- НОВАЯ ФУНКЦИЯ: Устанавливает рандомный фон для страницы проекта ---
function initFlaviProjectBackground() {
    // Находим именно тот элемент, который служит фоном для контентной части
    const backgroundElement = document.querySelector('.project-slide .content-wrapper');
    if (!backgroundElement) return;

    const pathPrefix = '../img/';
    const imageFiles = [
        'gallery_flavi1.png', 
        'gallery_flavi2.png', 
        'gallery_lsr1.png', 
        'gallery_lsr2.png', 
        'gallery_lsr3.png', 
        'gallery_flavi3.png', 
        'gallery_flavi5.png', 
        'gallery_lsr4.png'
    ];
    const images = imageFiles.map(file => pathPrefix + file);
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Устанавливаем фон с помощью GSAP
    gsap.set(backgroundElement, {
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    });
}


// --- Анимации для разных страниц ---
function initSinglePostAnimations() {
    const postElements = document.querySelectorAll('.post-header-full, .featured-media, .post-body');
    if (!postElements.length) return;
    gsap.from(postElements, { autoAlpha: 0, y: 80, duration: 1.2, ease: 'power3.out', stagger: 0.2 });
}
function initSingleProjectAnimations() {
    const sections = document.querySelectorAll('.project-content-wrapper > section');
    const heroTitle = document.querySelector('.project-hero h1');
    if (!sections.length && !heroTitle) return;
    if (heroTitle) {
        gsap.from(heroTitle, { autoAlpha: 0, y: 50, duration: 1.2, ease: 'power3.out' });
    }
    sections.forEach(section => {
        gsap.from(section, { autoAlpha: 0, y: 100, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 85%', once: true } });
    });
}
function initLikbezPageAnimations() {
    const posts = document.querySelectorAll('.likbez-post');
    if (!posts.length) return;
    posts.forEach(post => {
        gsap.from(post, { autoAlpha: 0, y: 100, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: post, start: 'top 90%', once: true } });
    });
}
function initRandomBackground() {
    const backgroundElement = document.querySelector('.page-background');
    if (!backgroundElement) return;
    const pathPrefix = '../img/';
    const imageFiles = ['gallery_flavi1.png', 'gallery_flavi2.png', 'gallery_lsr1.png', 'gallery_lsr2.png', 'gallery_lsr3.png', 'gallery_flavi3.png', 'gallery_flavi5.png', 'gallery_lsr4.png'];
    const images = imageFiles.map(file => pathPrefix + file);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    gsap.set(backgroundElement, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundImage: `url(${randomImage})`, backgroundSize: 'cover', backgroundPosition: 'center' });
}
function initContactPageAnimations() {
    const header = document.querySelector('.contact-header');
    const details = document.querySelector('.contact-details-block');
    const cta = document.querySelector('.contact-cta');
    if (!header || !details || !cta) return;
    gsap.from([header, details, cta], { autoAlpha: 0, y: 100, duration: 1.2, ease: 'power3.out', stagger: 0.2 });
}
function initGridAnimation() {
    const grid = document.querySelector('.products-grid');
    const gridItems = document.querySelectorAll('.product-item');
    if (gridItems.length === 0) return;
    grid.classList.add('is-animating-in');
    gsap.set(gridItems, { autoAlpha: 0, y: 500 });
    gsap.to(gridItems, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'sine.in', stagger: 0.15, delay: 0.2, onComplete: () => grid.classList.remove('is-animating-in') });
}
function initAboutPageAnimations() {
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) return;
    const sections = gsap.utils.toArray('.about-container > section');
    sections.forEach(section => {
        gsap.from(section, { autoAlpha: 0, y: 100, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 85%', once: true } });
    });
}
function initServicesPageAnimations() {
    const heroContent = document.querySelector('.services-hero > *');
    const serviceCards = document.querySelectorAll('.service-card');
    const approachSection = document.querySelector('.approach-section');
    if (!heroContent) return;
    gsap.from(heroContent, { autoAlpha: 0, y: 50, duration: 1.2, ease: 'power3.out', stagger: 0.1 });
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, { autoAlpha: 0, y: 100, stagger: 0.1, scrollTrigger: { trigger: ".services-grid", start: 'top 85%', once: true } });
    }
    if (approachSection) {
        gsap.from(approachSection, { autoAlpha: 0, y: 100, scrollTrigger: { trigger: approachSection, start: 'top 85%', once: true } });
    }
}

// --- Функции для страниц проектов (Flavi, LSR) ---
function initProjectSlider() {
    const container = document.querySelector('.project-page-slider');
    if (!container) return;
    const slides = container.querySelectorAll('.project-slide');
    if (slides.length < 2) return;
    let currentSlide = 0;
    let isAnimating = false;
    const throttleDelay = 800;
    let lastScrollTime = 0;
    function goToSlide(index) {
        if (isAnimating || index < 0 || index >= slides.length || index === currentSlide) return;
        isAnimating = true;
        currentSlide = index;
        container.style.transform = `translateY(-${currentSlide * 100}vh)`;
        setTimeout(() => { isAnimating = false; }, throttleDelay + 200);
    }
    window.addEventListener('wheel', (event) => {
        if (document.body.classList.contains('menu-is-open')) return;
        const now = Date.now();
        if (now - lastScrollTime < throttleDelay || isAnimating) return;
        lastScrollTime = now;
        const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
        const contentWrapper = slides[1].querySelector('.content-wrapper');
        const isContentScrolledToTop = contentWrapper.scrollTop === 0;
        if (scrollDirection === 'down' && currentSlide === 0) {
            goToSlide(1);
        } else if (scrollDirection === 'up' && currentSlide === 1 && isContentScrolledToTop) {
            goToSlide(0);
        }
    });
}
function initHorizontalSlider() {
    const slider = document.querySelector('.horizontal-slider');
    if (!slider) return;
    const slidesContainer = slider.querySelector('.slides-container-h');
    const slides = slider.querySelectorAll('.slide-h');
    const arrowLeft = slider.querySelector('.slider-arrow.left');
    const arrowRight = slider.querySelector('.slider-arrow.right');
    const dotsContainer = slider.querySelector('.slider-nav-h');
    if (!slidesContainer || slides.length === 0) return;
    let currentSlide = 0;
    const totalSlides = slides.length;
    const dots = [];
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot-h');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    }
    function goToSlide(slideIndex) {
        slides[currentSlide]?.querySelector('video')?.pause();
        currentSlide = slideIndex;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
        const newVideo = slides[currentSlide]?.querySelector('video');
        if (newVideo) {
            newVideo.currentTime = 0;
            newVideo.play().catch(() => {});
        }
    }
    arrowRight.addEventListener('click', () => goToSlide((currentSlide + 1) % totalSlides));
    arrowLeft.addEventListener('click', () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides));
    goToSlide(0);
}

// --- Общие функции (меню, скролл, почта) ---
function initLenis() {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return lenis;
}
function initAllMenus(lenis) {
    const burgerBtn = document.querySelector('.burger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (burgerBtn && menuOverlay) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('menu-is-open');
            isOpen ? lenis.stop() : lenis.start();
        });
        menuOverlay.addEventListener('click', (event) => {
            if (event.target === menuOverlay) {
                document.body.classList.remove('menu-is-open');
                lenis.start();
            }
        });
    }
    document.querySelectorAll('.has-submenu > a').forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            this.parentElement.classList.toggle('is-open');
        });
    });
}
function initAllMenusForSlider() {
    const burgerBtn = document.querySelector('.burger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (burgerBtn && menuOverlay) {
        burgerBtn.addEventListener('click', () => document.body.classList.toggle('menu-is-open'));
        menuOverlay.addEventListener('click', (event) => {
            if (event.target === menuOverlay) document.body.classList.remove('menu-is-open');
        });
    }
    document.querySelectorAll('.has-submenu > a').forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            this.parentElement.classList.toggle('is-open');
        });
    });
}
function initCustomScrollbar(lenis) {
    const track = document.querySelector('.custom-scrollbar-track');
    const thumb = document.querySelector('.custom-scrollbar-thumb');
    if (!track || !thumb) return;
    lenis.on('scroll', (e) => {
        if (e.limit === 0) { track.style.display = 'none'; return; }
        track.style.display = 'block';
        const trackHeight = track.clientHeight;
        const thumbBaseHeight = (window.innerHeight / document.documentElement.scrollHeight) * trackHeight;
        const thumbHeight = Math.max(20, thumbBaseHeight / 2.3);
        thumb.style.height = `${thumbHeight}px`;
        const thumbPosition = e.progress * (trackHeight - thumbHeight);
        thumb.style.transform = `translateX(-50%) translateY(${thumbPosition}px)`;
    });
    let isDragging = false;
    thumb.addEventListener('mousedown', (e) => { isDragging = true; document.body.classList.add('is-dragging'); e.preventDefault(); });
    window.addEventListener('mouseup', () => { isDragging = false; document.body.classList.remove('is-dragging'); });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const trackRect = track.getBoundingClientRect();
        const percent = (e.clientY - trackRect.top) / trackRect.height;
        lenis.scrollTo(percent * lenis.limit, { immediate: true });
    });
}
function initEmailCopy() {
    const copyBtn = document.getElementById('email-copy-btn');
    if (!copyBtn) return;
    const emailToCopy = 'a.basov@bureaubv.ru';
    const mobileBreakpoint = 768;
    if (window.innerWidth <= mobileBreakpoint) {
        copyBtn.href = `mailto:${emailToCopy}`;
    } else {
        const notification = document.getElementById('copy-notification');
        if (!notification) return;
        copyBtn.addEventListener('click', (event) => {
            event.preventDefault();
            navigator.clipboard.writeText(emailToCopy).then(() => {
                notification.classList.add('show');
                setTimeout(() => { notification.classList.remove('show'); }, 4000);
            }).catch(err => console.error('Ошибка: не удалось скопировать почту: ', err));
        });
    }
}
/**
 * Создает навигационные точки для слайдера.
 * @param {HTMLElement | null} container - DOM-элемент, куда будут добавлены точки.
 * @param {number} numDots - Количество точек, которое нужно создать.
 * @param {function(number): void} onDotClickCallback - Функция, которая вызывается при клике на точку.
 * @returns {function(number): void} - Возвращает функцию для обновления активной точки.
 */
function createSliderDots(container, numDots, onDotClickCallback) {
    // ---- ИСПРАВЛЕНИЕ: ----
    // 1. Проверяем, существует ли контейнер. Если нет - выходим.
    if (!container) {
        // 2. Возвращаем "пустую" функцию, чтобы код, который ее вызовет, не сломался.
        return () => {};
    }

    container.innerHTML = ''; // Теперь эта строка безопасна
    const dots = [];

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        dot.addEventListener('click', () => onDotClickCallback(i));
        container.appendChild(dot);
        dots.push(dot);
    }

    // Возвращаем функцию, которая будет обновлять активное состояние
    return function updateActiveDot(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    };
}

function initializeInteractiveGallery() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (!gallerySlider) return;

    const track = gallerySlider.querySelector('.gallery-slider-track');
    const slides = Array.from(gallerySlider.querySelectorAll('.gallery-slide'));
    const prevButton = gallerySlider.querySelector('.slider-arrow-gallery.prev');
    const nextButton = gallerySlider.querySelector('.slider-arrow-gallery.next');
    const navContainer = gallerySlider.querySelector('.gallery-slider-nav');

    const isMobile = window.innerWidth <= 768;
    const slidesToShow = isMobile ? 1 : 4;

    const totalSlides = slides.length;

    // --- ЛОГИКА СЛАЙДЕРА (остается без изменений) ---
    if (totalSlides > slidesToShow) {
        let currentIndex = 0;
        let isAnimatingSlider = false;
        
        const step = isMobile 
            ? slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight)
            : slides[1].offsetLeft - slides[0].offsetLeft;

        const numDots = totalSlides - slidesToShow + 1;

        const updateDots = createSliderDots(navContainer, numDots, (dotIndex) => {
            if (isAnimatingSlider || currentIndex === dotIndex) return;
            goToSlide(dotIndex);
        });
        
        const updateSliderState = () => {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= totalSlides - slidesToShow;
            updateDots(currentIndex);
        };

        const goToSlide = (index) => {
            isAnimatingSlider = true;
            currentIndex = index;
            gsap.to(track, {
                x: -currentIndex * step,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    updateSliderState();
                    isAnimatingSlider = false;
                }
            });
        };

        nextButton.addEventListener('click', () => {
            if (isAnimatingSlider || currentIndex >= totalSlides - slidesToShow) return;
            goToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            if (isAnimatingSlider || currentIndex === 0) return;
            goToSlide(currentIndex - 1);
        });
        
        if (isMobile) {
            let touchStartX = 0;
            let touchEndX = 0;
            const swipeThreshold = 50;

            track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchmove', (e) => { touchEndX = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchend', () => {
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) { nextButton.click(); } else { prevButton.click(); }
                }
            });
        }
        
        updateSliderState();

    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        if (navContainer) navContainer.style.display = 'none';
    }

    // --- ЛОГИКА АНИМАЦИИ FLIP (ИЗМЕНЕНИЯ ВНУТРИ expandImage) ---
    let activeImage = null;
    let isAnimatingFlip = false;
    gsap.delayedCall(0.1, () => Flip.getState(slides));

    track.addEventListener('click', (event) => {
        let clickedSlide = event.target.closest('.gallery-slide');
        if (clickedSlide && !isAnimatingFlip && !activeImage && !isMobile) {
            expandImage(clickedSlide);
        }
    });

    function expandImage(image) {
    isAnimatingFlip = true;
    activeImage = image;
    const container = image.closest('.project-content'); // Наша "подложка"
    const description = container.querySelector('.project-description'); // Блок с текстом
    const track = gallerySlider.querySelector('.gallery-slider-track'); // Нужен для поиска wrapper'а

    const imageClone = image.cloneNode(true);
    imageClone.classList.add('expanded-image-clone');
    container.appendChild(imageClone);

    gsap.to(gallerySlider, { autoAlpha: 0, duration: 0.4 });
    const state = Flip.getState(image);
    image.classList.add('is-hidden-original');

    // ========================================================================
    // --- НАЧАЛО ИЗМЕНЕНИЙ: НОВЫЙ БЛОК ВЫЧИСЛЕНИЙ ---
    // ========================================================================

    // 1. Находим родительский контейнер галереи для расчета базовой ширины.
    const sliderWrapper = track.closest('.gallery-slider-wrapper');
    const baseWidth = sliderWrapper.offsetWidth;

    // 2. Уменьшаем эту ширину в 1.3 раза для конечного размера.
    const finalWidth = baseWidth / 1.1;

    // 3. Высоту считаем по пропорции 16:9 от новой, уменьшенной ширины.
    const finalHeight = finalWidth / (16 / 9);

    // 4. Горизонтально центрируем уменьшенную картинку внутри "подложки".
    //    (Ширина подложки - Ширина картинки) / 2
    const finalLeft = (container.clientWidth - finalWidth) / 2;

    // 5. Вертикальную позицию рассчитываем как и раньше (под текстом и на 500px выше).
    const finalTop = (description.offsetTop + description.offsetHeight + 60) - 325;

    // ========================================================================
    // --- КОНЕЦ ИЗМЕНЕНИЙ ---
    // ========================================================================
    
    // Используем GSAP для установки финальных значений ПЕРЕД анимацией.
    gsap.set(imageClone, {
        position: 'absolute',
        width: finalWidth,
        height: finalHeight,
        top: finalTop,
        left: finalLeft
    });
    
    gsap.delayedCall(0, () => {
        Flip.from(state, {
            targets: imageClone,
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete: () => {
                isAnimatingFlip = false;
                imageClone.addEventListener('click', () => collapseImage(), { once: true });
            }
        });
    });
}

    function collapseImage() {
        if (isAnimatingFlip || !activeImage) return;
        isAnimatingFlip = true;
        const imageClone = document.querySelector('.expanded-image-clone');
        if (!imageClone) { isAnimatingFlip = false; return; }

        gsap.to(gallerySlider, { autoAlpha: 1, duration: 0.4, delay: 0.3 });
        const state = Flip.getState(activeImage);
        Flip.to(state, {
            targets: imageClone,
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete: () => {
                imageClone.remove();
                activeImage.classList.remove('is-hidden-original');
                activeImage = null;
                isAnimatingFlip = false;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // ИЗМЕНЕНИЕ: Мы ищем не контейнер, а конкретно картинку внутри него.
    const logoImage = document.querySelector('.logo img'); 
    const socialLinks = document.querySelector('.social-links');

    // Проверка, что оба элемента найдены
    if (!logoImage || !socialLinks) {
        console.error("Не удалось найти логотип или блок социальных ссылок.");
        return;
    }

    // Функция для выравнивания
    function alignSocialLinks() {
        // Получаем актуальные координаты самого ИЗОБРАЖЕНИЯ
        const logoImageRect = logoImage.getBoundingClientRect();
        
        // Применяем отступ картинки к блоку соцсетей
        socialLinks.style.left = `${logoImageRect.left}px`;
    }

    // Вызываем функцию один раз при загрузке
    alignSocialLinks();

    // И вызываем ее каждый раз при изменении размера окна
    window.addEventListener('resize', alignSocialLinks);

});

// --- 2. ГЛАВНЫЙ ЗАПУСК ВСЕГО ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ ---
window.addEventListener('load', () => {
    const isProjectPage = document.querySelector('.project-page-slider');
    const isMobile = window.innerWidth <= 768;
    let lenisInstance = null;
    if (isProjectPage && !isMobile) {
        // --- РЕЖИМ ДЕСКТОПА: запускаем дискретный слайдер ---
        initProjectSlider();
        initAllMenusForSlider();
        initHorizontalSlider();
        initEmailCopy();
        initializeInteractiveGallery();
        initFlaviProjectBackground(); // <--- ВЫЗЫВАЕМ ФУНКЦИЮ ФОНА
    } else {
        // --- РЕЖИМ МОБИЛЬНОГО или любая другая страница: запускаем обычный скролл ---
        lenisInstance = initLenis();
        initAllMenus(lenisInstance);
        initCustomScrollbar(lenisInstance);
        initEmailCopy();
        // Запускаем остальные анимации
        // initGridAnimation();
        initAboutPageAnimations();
        initRandomBackground(); // Старую функцию больше не вызываем здесь
        initSingleProjectAnimations();
        initContactPageAnimations();
        initLikbezPageAnimations();
        initSinglePostAnimations();
        initServicesPageAnimations();
        // Если это мобильная версия страницы проекта, запускаем нужные функции
        if (isProjectPage && isMobile) {
            initHorizontalSlider();
            initializeInteractiveGallery();
            initFlaviProjectBackground(); // <--- И ЗДЕСЬ ТОЖЕ ВЫЗЫВАЕМ
        }
    }
    // Обработчик нажатия клавиши Escape
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (document.body.classList.contains('menu-is-open')) {
                event.preventDefault();
                document.body.classList.remove('menu-is-open');
                if (lenisInstance) {
                    lenisInstance.start();
                }
            }
        }
    });
});