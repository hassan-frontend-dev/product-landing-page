document.addEventListener('DOMContentLoaded', () => {
    // 1. إعادة الصفحة لأعلى عند التحميل لمنع نزولها تلقائياً
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
    window.scrollTo(0, 0);

    // 2. التحكم في الوضع الليلي (Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.textContent = '🌙';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // 3. التحكم في تغيير اللغة (Language Toggle)
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('site_lang') || 'ar';

    const translations = {
        ar: {
            pageTitle: "تكنو-فجن | حلول البرمجيات والتحول الرقمي",
            navHome: "الرئيسية",
            navServices: "خدماتنا",
            navAbout: "من نحن",
            navContact: "تواصل معنا",
            btnStart: "ابدأ مشروعك",
            heroTitle: "نبني الحلول الرقمية التي تقود عملك نحو المستقبل",
            heroDesc: "نساعد الشركات والأعمال على النمو من خلال تصميم وتطوير أنظمة ومواقع إلكترونية حديثة ومخصصة لأهدافك.",
            btnExplore: "استكشف خدماتنا",
            btnConsult: "استشارة مجانية",
            stat1: "مشروع مكتمل",
            stat2: "نسبة رضا العملاء",
            stat3: "سنوات خبرة",
            servicesHeading: "خدماتنا المتميزة",
            servicesSub: "نقدم مجموعة متكاملة من الخدمات التقنية لتحقيق أهدافك الرقمية",
            srv1Title: "تطوير المواقع والمنصات",
            srv1Desc: "بناء مواقع وبرمجيات ويب متجاوبة وسريعة وآمنة باستخدام أحدث التقنيات.",
            srv2Title: "تطبيقات الهواتف الذكية",
            srv2Desc: "تصميم وتطوير تطبيقات أندرويد و iOS سلسة وذات أداء عالٍ.",
            srv3Title: "تصميم واجهات المستخدم (UI/UX)",
            srv3Desc: "تقديم تجارب مستخدم ممتازة وتصاميم واجهات عملية وجذابة.",
            aboutHeading: "من نحن",
            aboutSub: "تعرف على شريكك التقني الموثوق لبناء المستقبل الرقمي",
            aboutTitle: "نحن نمكن الشركات من تحقيق أقصى إمكانياتها الرقمية",
            aboutText: "في تكنوفجن، نبتكر حلولاً برمجية متكاملة تهدف إلى دعم الشركات والمؤسسات في رحلتها نحو التحول الرقمي. يضم فريقنا مجموعة من الخبراء والشغوفين بالتكنولوجيا، حيث نعمل معاً لتقديم منتجات تقنية ترتقي بتجربة المستخدم وتحقق أهداف أعمالك بفاعلية.",
            feat1: "حلول مخصصة تناسب حجم ونشاط عملك",
            feat2: "التزام بأعلى معايير الجودة والمهنية",
            feat3: "دعم فني واستشاري مستمر بعد التسليم",
            contactHeading: "تواصل معنا اليوم",
            contactSub: "هل لديك فكرة مشروع؟ دعنا نساعدك في تحويلها إلى واقع.",
            placeholderName: "الاسم بالكامل",
            placeholderEmail: "البريد الإلكتروني",
            placeholderMsg: "تفاصيل مشروعك...",
            btnSend: "إرسال الرسالة",
            footerText: "&copy; 2026 تكنوفجن. جميع الحقوق محفوظة."
        },
        en: {
            pageTitle: "Techno-Vision | Software Solutions & Digital Transformation",
            navHome: "Home",
            navServices: "Services",
            navAbout: "About Us",
            navContact: "Contact Us",
            btnStart: "Start Project",
            heroTitle: "We Build Digital Solutions That Drive Your Business Forward",
            heroDesc: "We help companies and businesses grow by designing and developing modern, custom websites and systems tailored to your goals.",
            btnExplore: "Explore Services",
            btnConsult: "Free Consultation",
            stat1: "Completed Projects",
            stat2: "Client Satisfaction",
            stat3: "Years of Experience",
            servicesHeading: "Our Featured Services",
            servicesSub: "We offer a comprehensive suite of tech services to achieve your digital goals",
            srv1Title: "Web & Platform Development",
            srv1Desc: "Building responsive, fast, and secure web applications using cutting-edge technologies.",
            srv2Title: "Mobile Applications",
            srv2Desc: "Designing and developing smooth, high-performance Android and iOS apps.",
            srv3Title: "UI/UX Design",
            srv3Desc: "Delivering exceptional user experiences and functional, attractive interfaces.",
            aboutHeading: "About Us",
            aboutSub: "Meet your trusted tech partner for building the digital future",
            aboutTitle: "We Empower Businesses to Unlock Their Maximum Digital Potential",
            aboutText: "At Techno-Vision, we create integrated software solutions designed to support companies and institutions on their digital transformation journey. Our team of passionate tech experts works together to deliver digital products that elevate user experience and drive your business goals effectively.",
            feat1: "Customized solutions tailored to your business scale",
            feat2: "Commitment to the highest standards of quality",
            feat3: "Continuous technical support and consulting post-delivery",
            contactHeading: "Contact Us Today",
            contactSub: "Have a project idea? Let us help you turn it into reality.",
            placeholderName: "Full Name",
            placeholderEmail: "Email Address",
            placeholderMsg: "Project Details...",
            btnSend: "Send Message",
            footerText: "&copy; 2026 Techno-Vision. All rights reserved."
        }
    };

    // دالة تغيير اللغة مع تأثير التلاشي الناعم (Fade Effect)
    function setLanguage(lang) {
        // تقليل الشفافية لبدء التلاشي
        document.body.style.opacity = '0.2';

        setTimeout(() => {
            currentLang = lang;
            localStorage.setItem('site_lang', lang);
            
            const isAr = lang === 'ar';
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
            
            if (langLabel) {
                langLabel.textContent = isAr ? 'EN' : 'عربي';
            }

            // تحديث النصوص العادية
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    if (key === 'footerText') {
                        el.innerHTML = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            });

            // تحديث النصوص البديلة (Placeholders)
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[lang][key]) {
                    el.placeholder = translations[lang][key];
                }
            });

            // إعادة ظهور الصفحة بنعومة تامة
            document.body.style.opacity = '1';
        }, 200); 
    }

    // تطبيق اللغة المحفوظة عند تحميل الصفحة لأول مرة
    setLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
        });
    }

    // 4. التعامل مع نموذج التواصل (Contact Form)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (formStatus) {
                formStatus.style.color = '#22c55e';
                formStatus.textContent = currentLang === 'ar' 
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
                    : 'Your message has been sent successfully! We will contact you soon.';
            }

            contactForm.reset();
        });
    }
});