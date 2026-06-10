document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Localization (Language Toggle)
    // ==========================================
    const i18nData = {
        "ko": {
            "nav-company": "COMPANY",
            "nav-projects": "OUR GAME",
            "nav-team": "TEAM",
            "nav-careers": "CAREERS",
            "nav-news": "NEWS",
            "nav-contact": "CONTACT",
            "hero-desc": "우리는 공포를 단순한 자극이 아닌,<br>몰입과 감정의 경험으로 설계합니다.",
            "btn-about": "ABOUT D3B3",
            "tag-overview": "COMPANY OVERVIEW",
            "overview-title": "게임을 넘어,<br>경험을 설계하는 D3B3",
            "overview-desc": "D3B3는 심리적 공포와 세계관 중심의 서사를 기반으로 한 차세대 공포 게임을 개발하는 스튜디오입니다. AI 기술과 몰입형 연출을 결합하여, 플레이어가 현실과 가상이 경계를 잃는 순간을 만듭니다.",
            "btn-viewmore": "VIEW MORE",
            "projects-header-title": "OUR PROJECTS",
            "tag-echoes": "PSYCHOLOGICAL HORROR",
            "tag-abyss": "SURVIVAL HORROR",
            "tag-beyond": "COSMIC HORROR",
            "details-echoes-desc": "환청과 침묵이 반복되는 폐쇄 시설. 플레이어는 사라진 사람들의 목소리를 따라 기억 속에 숨겨진 진실을 추적합니다.<br><br>소리 / 반복 / 고립 / 기억",
            "details-abyss-desc": "심해 연구 기지 아래에서 깨어난 미지의 존재. 플레이어는 한정된 산소와 어둠 속에서 인간이 이해할 수 없는 심연과 마주합니다.<br><br>고립 / 생존 / 압박 / 미지",
            "details-beyond-desc": "우주 너머에서 도착한 마지막 신호. 플레이어는 파괴된 우주 정거장에서 인류가 접촉해서는 안 되는 존재의 흔적을 발견합니다.<br><br>우주 / 신호 / 접촉 / 초월",
            "btn-viewdetails": "VIEW DETAILS",
            "tag-ourgame": "OUR GAME",
            "ourgame-desc": "AI가 만든 낙원 속에서 플레이어는 오류를 발견하고, 탈출을 시도하는 순간, 낙원은 적대적인 공간으로 변합니다.",
            "game-tag-1": "PSYCHOLOGICAL HORROR",
            "game-tag-2": "SURVIVAL ESCAPE",
            "game-tag-3": "SINGLE PLAYER",
            "platforms-title": "PLATFORMS",
            "protocols-title-main": "CORE PROTOCOLS",
            "proto-desc-1": "점프 스퀘어에 의존하지 않고 다양한 플레이 방식을 지원합니다.",
            "proto-desc-2": "플레이어의 상상력을 적극 활용하여 플레이어의 심리적 압박을 선사합니다.",
            "proto-desc-3": "치밀한 세계관을 구성해 플레이어가 세계관의 매력을 느낍니다.",
            "proto-desc-4": "'그냥 멋있어 보여서'는 D3B3에는 존재하지 않습니다. 오로지 세계관에 근거한 디자인입니다.",
            "proto-desc-5": "플레이어의 또다른 직업은 '상징 추적자'입니다. 게임 내 존재하는 다양한 요소의 상징을 찾아 나섭니다.",
            "proto-desc-6": "우리의 게임은 어렵습니다. 스스로 학습하는 게임 알고리즘은 공략을 우습게 만듭니다. 플레이어는 많은 연구를 통해 게임을 진행합니다.",
            "tag-fear-principle": "FEAR OPERATING PRINCIPLE",
            "fear-trust-desc": "사용자가 공간, 인물, 분위기를 자연스럽게 받아들이도록 안정적인 세계를 설계한다.<br>공포는 처음부터 드러나지 않고, 신뢰가 형성된 뒤에 작동하기 시작한다.",
            "fear-doubt-desc": "반복되는 소리, 어긋난 기억, 부자연스러운 시선, 깨진 신호를 통해 사용자가 세계를 의심하게 만든다.<br>이 단계에서 공포는 직접 나타나지 않고 불안으로 자란다.",
            "fear-resistance-desc": "사용자가 진실에 가까워지거나 벗어나려는 순간, 공간, 인물, 시스템이 동시에 반응한다.<br>공포는 하나의 위협이 아니라, 세계 전체가 나를 밀어내는 경험으로 완성된다.",
            "btn-readmore": "더 보기",
            "stats-tag": "VOID IN NUMBERS",
            "stats-founded": "FOUNDED",
            "stats-team": "TEAM MEMBERS",
            "stats-projects": "PROJECTS IN DEVELOPMENT",
            "stats-possibilities": "POSSIBILITIES",
            "tag-careers-small": "CAREERS",
            "careers-cta-title": "Join the team<br>designing the next<br>dimension of fear.",
            "btn-viewcareers": "VIEW CAREERS",
            "tag-news-small": "NEWS",
            "news-cta-title": "Latest updates<br>from D3B3 Studio.",
            "btn-viewnews": "VIEW NEWS",
            "foot-col-1": "COMPANY",
            "foot-col-2": "OUR GAME",
            "foot-col-3": "TEAM",
            "foot-col-4": "CAREERS",
            "foot-company-1": "Overview",
            "foot-company-2": "Vision",
            "foot-company-3": "Values",
            "foot-game-1": "VOID",
            "foot-game-2": "World",
            "foot-game-3": "Protocol",
            "foot-team-1": "Leadership",
            "foot-team-2": "Culture",
            "foot-careers-1": "Jobs",
            "foot-careers-2": "Benefits",
            "foot-follow": "Follow us for more updates"
        },
        "en": {
            "nav-company": "COMPANY",
            "nav-projects": "OUR GAME",
            "nav-team": "TEAM",
            "nav-careers": "CAREERS",
            "nav-news": "NEWS",
            "nav-contact": "CONTACT",
            "hero-desc": "We design fear not as simple stimulation,<br>but as an experience of immersion and emotion.",
            "btn-about": "ABOUT D3B3",
            "tag-overview": "COMPANY OVERVIEW",
            "overview-title": "Beyond Games,<br>Designing Experiences: D3B3",
            "overview-desc": "D3B3 is a studio developing next-generation horror games based on psychological fear and world-building narratives. By combining AI technology and immersive direction, we create moments where players lose the boundary between reality and virtuality.",
            "btn-viewmore": "VIEW MORE",
            "projects-header-title": "OUR PROJECTS",
            "tag-echoes": "PSYCHOLOGICAL HORROR",
            "tag-abyss": "SURVIVAL HORROR",
            "tag-beyond": "COSMIC HORROR",
            "details-echoes-desc": "A closed facility where auditory hallucinations and silence repeat. Players track hidden truths in memories following the voices of the disappeared.<br><br>Sound / Repetition / Isolation / Memory",
            "details-abyss-desc": "An unknown entity awakened beneath the deep-sea research base. Players face an abyss beyond human comprehension amidst limited oxygen and darkness.<br><br>Isolation / Survival / Pressure / Unknown",
            "details-beyond-desc": "The final signal arriving from beyond space. Players discover traces of an entity that humanity should have never contacted in a destroyed space station.<br><br>Space / Signal / Contact / Transcendence",
            "btn-viewdetails": "VIEW DETAILS",
            "tag-ourgame": "OUR GAME",
            "ourgame-desc": "In a paradise built by AI, the player discovers an error, and the moment they attempt to escape, the paradise transforms into a hostile space.",
            "game-tag-1": "PSYCHOLOGICAL HORROR",
            "game-tag-2": "SURVIVAL ESCAPE",
            "game-tag-3": "SINGLE PLAYER",
            "platforms-title": "PLATFORMS",
            "protocols-title-main": "CORE PROTOCOLS",
            "proto-desc-1": "We support a variety of playstyles without relying on jump scares.",
            "proto-desc-2": "We actively utilize the player's imagination to deliver psychological pressure.",
            "proto-desc-3": "We construct an intricate worldview so players can feel the charm of our universe.",
            "proto-desc-4": "'Just looking cool' does not exist in D3B3. It is a design solely grounded in the worldview.",
            "proto-desc-5": "Another name for the player is the 'Symbol Tracker'. They seek the symbols of various elements in the game.",
            "proto-desc-6": "Our game is difficult. A self-learning game algorithm makes walk-throughs useless. Players progress through research.",
            "tag-fear-principle": "FEAR OPERATING PRINCIPLE",
            "fear-trust-desc": "Design a stable world so the user naturally accepts the space, characters, and atmosphere.<br>Fear is not revealed from the start, but begins operating after trust is established.",
            "fear-doubt-desc": "Make the user doubt the world through repetitive sounds, distorted memories, unnatural gazes, and broken signals.<br>At this stage, fear does not appear directly but grows as anxiety.",
            "fear-resistance-desc": "The moment the user gets closer to the truth or tries to escape, the space, characters, and system react simultaneously.<br>Fear is not a single threat, but is completed as an experience of the entire world pushing me out.",
            "btn-readmore": "READ MORE",
            "stats-tag": "VOID IN NUMBERS",
            "stats-founded": "FOUNDED",
            "stats-team": "TEAM MEMBERS",
            "stats-projects": "PROJECTS IN DEVELOPMENT",
            "stats-possibilities": "POSSIBILITIES",
            "tag-careers-small": "CAREERS",
            "careers-cta-title": "Join the team<br>designing the next<br>dimension of fear.",
            "btn-viewcareers": "VIEW CAREERS",
            "tag-news-small": "NEWS",
            "news-cta-title": "Latest updates<br>from D3B3 Studio.",
            "btn-viewnews": "VIEW NEWS",
            "foot-col-1": "COMPANY",
            "foot-col-2": "OUR GAME",
            "foot-col-3": "TEAM",
            "foot-col-4": "CAREERS",
            "foot-company-1": "Overview",
            "foot-company-2": "Vision",
            "foot-company-3": "Values",
            "foot-game-1": "VOID",
            "foot-game-2": "World",
            "foot-game-3": "Protocol",
            "foot-team-1": "Leadership",
            "foot-team-2": "Culture",
            "foot-careers-1": "Jobs",
            "foot-careers-2": "Benefits",
            "foot-follow": "Follow us for more updates"
        }
    };

    let currentLang = 'ko';

    function setLanguage(lang) {
        if (!i18nData[lang]) return;
        currentLang = lang;
        
        // Update document language tag
        document.documentElement.lang = lang;
        
        // Update elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nData[lang][key]) {
                el.innerHTML = i18nData[lang][key];
            }
        });
        
        // Toggle language button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Attach click events to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });


    // ==========================================
    // 2. Scroll Actions & Header Visual State
    // ==========================================
    const header = document.querySelector('.navigation');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            // Reset fullpage scroll index to 0 (Hero)
            currentSectionIdx = 0;
            // Update side indicators
            indicators.forEach(ind => {
                if (ind.getAttribute('data-sec') === 'hero') {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ==========================================
    // 3. JS Fullpage Wheel Snapping (Desktop Only)
    // ==========================================
    const indicators = document.querySelectorAll('.side-indicators .indicator');
    
    // Ordered scrolling targets
    const scrollTargets = [
        'hero',
        'company',
        'projects',
        'our-game',
        'protocols',
        'fear-principles',
        'stats',
        'cta',
        'footer' // Last is footer
    ];

    let currentSectionIdx = 0;
    let isScrolling = false;

    const fearSection = document.getElementById('fear-principles');
    const fearSegments = fearSection ? Array.from(fearSection.querySelectorAll('.fear-segment')) : [];
    let fearPanelIndex = 0;

    function setFearPanel(index, flicker = true) {
        if (!fearSection || !fearSegments.length) return;
        const maxIndex = fearSegments.length - 1;
        fearPanelIndex = Math.max(0, Math.min(index, maxIndex));
        const panelWidth = fearSection.clientWidth || window.innerWidth;

        fearSection.scrollTo({
            left: fearPanelIndex * panelWidth,
            behavior: 'smooth'
        });

        fearSegments.forEach((segment, idx) => {
            segment.classList.toggle('is-active', idx === fearPanelIndex);
            segment.classList.remove('flicker-in');
        });

        if (flicker && fearSegments[fearPanelIndex]) {
            void fearSegments[fearPanelIndex].offsetWidth;
            fearSegments[fearPanelIndex].classList.add('flicker-in');
        }
    }

    function scrollToSection(index) {
        if (index < 0 || index >= scrollTargets.length) return;
        const previousSectionIdx = currentSectionIdx;
        isScrolling = true;
        currentSectionIdx = index;
        
        const targetId = scrollTargets[index];
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
            if (targetId === 'fear-principles') {
                window.setTimeout(() => {
                    setFearPanel(previousSectionIdx > index ? fearSegments.length - 1 : 0, false);
                }, 80);
            }

            let offsetPosition;
            if (targetId === 'footer') {
                // Scroll to absolute page bottom
                offsetPosition = document.documentElement.scrollHeight - window.innerHeight;
            } else {
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update floating indicators active state
            let activeSec = targetId;
            if (targetId === 'footer') {
                activeSec = 'cta';
            }

            indicators.forEach(ind => {
                if (ind.getAttribute('data-sec') === activeSec) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });

            // Cooldown prevents skipping multiple sections in single mousewheel flick
            setTimeout(() => {
                isScrolling = false;
            }, 800); // 800ms cooldown matches smooth animation durations
        }
    }

    // Indicator Click Handler
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-sec');
            let targetId = sectionId;
            const idx = scrollTargets.indexOf(targetId);
            if (idx !== -1) {
                scrollToSection(idx);
            }
        });
    });

    // Wheel Event Manager (Desktop Scroll Interceptor) with sensitivity control
    function handleWheel(e) {
        if (window.innerWidth <= 1024) return; // Ignore on mobile

        e.preventDefault(); // Intercept browser default scroll
        if (isScrolling) return;

        // Define a sensitivity threshold (pixels) to make scrolling less jumpy
        const wheelThreshold = 30; // adjust as needed
        if (Math.abs(e.deltaY) < wheelThreshold) return; // ignore small wheel movements

        if (scrollTargets[currentSectionIdx] === 'fear-principles' && fearSegments.length) {
            const maxFearIndex = fearSegments.length - 1;
            if (e.deltaY > 0 && fearPanelIndex < maxFearIndex) {
                isScrolling = true;
                setFearPanel(fearPanelIndex + 1, true);
                setTimeout(() => { isScrolling = false; }, 760);
                return;
            }
            if (e.deltaY < 0 && fearPanelIndex > 0) {
                isScrolling = true;
                setFearPanel(fearPanelIndex - 1, true);
                setTimeout(() => { isScrolling = false; }, 760);
                return;
            }
        }

        if (e.deltaY > 0) {
            // Mousewheel down -> Next Section
            if (currentSectionIdx < scrollTargets.length - 1) {
                scrollToSection(currentSectionIdx + 1);
            }
        } else {
            // Mousewheel up -> Previous Section
            if (currentSectionIdx > 0) {
                scrollToSection(currentSectionIdx - 1);
            }
        }
    }

    // Enable wheel interception with non-passive listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Keydown event manager for desktop slides
    function handleKeyDown(e) {
        if (window.innerWidth <= 1024) return;
        
        const scrollKeys = ['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp'];
        if (scrollKeys.includes(e.code)) {
            e.preventDefault(); // Intercept browser key scrolling
            if (isScrolling) return;

            if (e.code === 'ArrowDown' || e.code === 'Space' || e.code === 'PageDown') {
                if (currentSectionIdx < scrollTargets.length - 1) {
                    scrollToSection(currentSectionIdx + 1);
                }
            } else if (e.code === 'ArrowUp' || e.code === 'PageUp') {
                if (currentSectionIdx > 0) {
                    scrollToSection(currentSectionIdx - 1);
                }
            }
        }
    }

    // Enable key listeners
    window.addEventListener('keydown', handleKeyDown);


    // ==========================================
    // 4. Scroll Reveal Animations
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // ==========================================
    // 5. Interactive Details Card Animation / Nav Arrows
    // ==========================================
    const prevBtn = document.querySelector('.carousel-nav .prev');
    const nextBtn = document.querySelector('.carousel-nav .next');
    const cards = document.querySelectorAll('.projects-grid .project-card');
    const detailCards = document.querySelectorAll('.details-grid .detail-card');
    const detailsGrid = document.querySelector('.details-grid');
    let activeCardIndex = 0;

    function focusCard(index) {
        cards.forEach((card, idx) => {
            if (idx === index) {
                card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                const overlay = card.querySelector('.card-hover-overlay');
                if (overlay) overlay.style.opacity = '1';
                card.querySelector('.card-img-wrapper img').style.transform = 'scale(1.08)';
                
                // Active matching text detail card
                if (detailCards[idx]) detailCards[idx].classList.add('active');
            } else {
                card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                const overlay = card.querySelector('.card-hover-overlay');
                if (overlay) overlay.style.opacity = '0';
                card.querySelector('.card-img-wrapper img').style.transform = 'scale(1)';
                
                // Deactivate other text cards
                if (detailCards[idx]) detailCards[idx].classList.remove('active');
            }
        });
        
        if (detailsGrid) {
            detailsGrid.classList.add('has-hovered');
        }
        activeCardIndex = index;
    }

    if (cards.length > 0) {
        // Project Image Card Mouse Listeners
        cards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => {
                focusCard(idx);
            });
            card.addEventListener('mouseleave', () => {
                if (detailsGrid) detailsGrid.classList.remove('has-hovered');
                if (detailCards[idx]) detailCards[idx].classList.remove('active');
                
                card.style.borderColor = '';
                const overlay = card.querySelector('.card-hover-overlay');
                if (overlay) overlay.style.opacity = '';
                card.querySelector('.card-img-wrapper img').style.transform = '';
            });
            // Project cards should not expand on left click.
            // Hover/focus behavior remains, but click expansion is disabled for all three cards.
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Project Text Detail Card Mouse Listeners
        detailCards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => {
                focusCard(idx);
            });
            card.addEventListener('mouseleave', () => {
                if (detailsGrid) detailsGrid.classList.remove('has-hovered');
                card.classList.remove('active');
                
                const projectCard = cards[idx];
                if (projectCard) {
                    projectCard.style.borderColor = '';
                    const overlay = projectCard.querySelector('.card-hover-overlay');
                    if (overlay) overlay.style.opacity = '';
                    projectCard.querySelector('.card-img-wrapper img').style.transform = '';
                }
            });
        });
    }


    if (prevBtn && nextBtn && cards.length > 0) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (activeCardIndex + 1) % cards.length;
            focusCard(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = (activeCardIndex - 1 + cards.length) % cards.length;
            focusCard(prevIndex);
        });
    }

    if (fearSegments.length) {
        setFearPanel(0, false);
    }

    window.addEventListener('resize', () => {
        if (fearSegments.length) setFearPanel(fearPanelIndex, false);
    });

    // Initialize localization to Korean (default)
    setLanguage('ko');

    // ==========================================
    // 6. Video Modal Handling
    // - open only buttons that have data-video
    // - close on ESC
    // - close on wheel scroll while video is open
    // - close when clicking outside the video area
    // ==========================================
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');

    function isVideoModalOpen() {
        return videoModal && videoModal.getAttribute('aria-hidden') === 'false';
    }

    function closeVideoModal() {
        if (!videoModal || !videoPlayer) return;
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('video-modal-open');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
    }

    function openVideoModal(videoSrc) {
        if (!videoModal || !videoPlayer || !videoSrc) return;
        videoPlayer.src = videoSrc;
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('video-modal-open');
        videoPlayer.play().catch(() => {
            // Browser may block autoplay with sound; controls remain visible.
        });
    }

    document.querySelectorAll('a.btn-text[data-video]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            openVideoModal(link.getAttribute('data-video'));
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isVideoModalOpen()) {
            closeVideoModal();
        }
    });

    // Close when clicking any dark area outside the video itself.
    if (videoModal) {
        videoModal.addEventListener('click', e => {
            if (!isVideoModalOpen()) return;
            if (videoPlayer && videoPlayer.contains(e.target)) return;
            closeVideoModal();
        });
    }

    // While a video is open, any wheel scroll closes the modal first.
    // Use capture so the page fullpage wheel handler does not slide underneath.
    window.addEventListener('wheel', e => {
        if (!isVideoModalOpen()) return;
        e.preventDefault();
        e.stopPropagation();
        closeVideoModal();
    }, { passive: false, capture: true });
});
