document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const timeOutput = document.getElementById('time-output');
    const charCount = document.getElementById('char-count');
    const charCountNoSpaces = document.getElementById('char-count-nospaces');
    const tempoOptions = document.querySelectorAll('input[name="tempo"]');
    const copyBtn = document.getElementById('copy-btn');
    const langToggle = document.getElementById('lang-toggle');
    const installAndroidBtn = document.getElementById('install-android');
    const installIosBtn = document.getElementById('install-ios');
    const installInstructions = document.getElementById('install-instructions');

    // Переводы
    const translations = {
        ru: {
            headerDesc: 'Расчёт времени профессиональной озвучки текста',
            tempoLabel: 'Темп речи:',
            slow: 'Размеренный',
            normal: 'Стандартный',
            fast: 'Быстрый',
            slowWpm: '100 сл/мин',
            normalWpm: '120 сл/мин',
            fastWpm: '140 сл/мин',
            placeholder: 'Введите или вставьте текст для озвучки...',
            charCount: 'Символов',
            noSpaces: 'Без пробелов',
            resultLabel: 'Время звучания:',
            copyTitle: 'Копировать результат',
            footerTitle: '📢 Заказ аудио и видеороликов',
            footerSub: 'Профессиональное производство. Всегда актуально.',
            serviceAudio: '<strong>Аудио:</strong> федеральные дикторы, озвучка любой сложности',
            serviceVideo: '<strong>Видео:</strong> моушн-дизайн, 3D, 2D, AI, монтаж, реклама, кино, документальное видео и любые другие задачи под ключ',
            installAndroid: '🤖 Установить на Android',
            installIos: '🍎 Установить на iOS',
            androidInstruction: '<p><strong>Android (Chrome):</strong> нажмите меню (⋮) → «Добавить на главный экран» или «Установить».</p>',
            iosInstruction: '<p><strong>iOS (Safari):</strong> нажмите кнопку «Поделиться» (↗) → «На экран «Домой»».</p>'
        },
        en: {
            headerDesc: 'Professional voiceover time calculator',
            tempoLabel: 'Speech rate:',
            slow: 'Slow',
            normal: 'Normal',
            fast: 'Fast',
            slowWpm: '110 wpm',
            normalWpm: '140 wpm',
            fastWpm: '160 wpm',
            placeholder: 'Enter or paste text for voiceover...',
            charCount: 'Characters',
            noSpaces: 'No spaces',
            resultLabel: 'Total time:',
            copyTitle: 'Copy result',
            footerTitle: '📢 Order audio and video production',
            footerSub: 'Professional production. Always available.',
            serviceAudio: '<strong>Audio:</strong> professional voice actors, any complexity',
            serviceVideo: '<strong>Video:</strong> motion design, 3D, 2D, AI, editing, advertising, film, documentaries and any other tasks',
            installAndroid: '🤖 Install on Android',
            installIos: '🍎 Install on iOS',
            androidInstruction: '<p><strong>Android (Chrome):</strong> menu (⋮) → "Add to Home screen" or "Install".</p>',
            iosInstruction: '<p><strong>iOS (Safari):</strong> share button (↗) → "Add to Home Screen".</p>'
        }
    };

    let currentLang = 'ru';

    function updateActiveTempo() {
        tempoOptions.forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            if (radio.checked) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    function getTempo() {
        const checked = document.querySelector('input[name="tempo"]:checked');
        return checked ? parseInt(checked.value) : (currentLang === 'ru' ? 120 : 140);
    }

    function updateStats() {
        const text = textInput.value;
        const totalChars = text.length;
        const charsWithoutSpaces = text.replace(/\s/g, '').length;
        const t = translations[currentLang];
        charCount.textContent = `${t.charCount}: ${totalChars}`;
        charCountNoSpaces.textContent = `${t.noSpaces}: ${charsWithoutSpaces}`;
    }

    function calculateTime() {
        const text = textInput.value.trim();
        if (!text) {
            timeOutput.textContent = '0:00';
            return;
        }
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const wpm = getTempo();
        if (wordCount === 0) {
            timeOutput.textContent = '0:00';
            return;
        }
        const totalMinutes = wordCount / wpm;
        const minutes = Math.floor(totalMinutes);
        const seconds = Math.round((totalMinutes - minutes) * 60);
        let result;
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            result = `${hours}:${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            result = `${minutes}:${String(seconds).padStart(2, '0')}`;
        }
        timeOutput.textContent = result;
    }

    function updateAll() {
        updateStats();
        calculateTime();
    }

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        document.getElementById('header-desc').textContent = t.headerDesc;
        document.getElementById('tempo-label').textContent = t.tempoLabel;
        document.getElementById('text-slow').innerHTML = `${t.slow} <em>${t.slowWpm}</em>`;
        document.getElementById('text-normal').innerHTML = `${t.normal} <em>${t.normalWpm}</em>`;
        document.getElementById('text-fast').innerHTML = `${t.fast} <em>${t.fastWpm}</em>`;
        textInput.placeholder = t.placeholder;
        document.getElementById('result-label').textContent = t.resultLabel;
        copyBtn.title = t.copyTitle;
        document.getElementById('footer-title').textContent = t.footerTitle;
        document.getElementById('footer-subtitle').textContent = t.footerSub;
        document.getElementById('service-audio').innerHTML = t.serviceAudio;
        document.getElementById('service-video').innerHTML = t.serviceVideo;

        installAndroidBtn.textContent = t.installAndroid;
        installIosBtn.textContent = t.installIos;

        const slowRadio = document.getElementById('tempo-slow');
        const normalRadio = document.getElementById('tempo-normal');
        const fastRadio = document.getElementById('tempo-fast');

        if (lang === 'ru') {
            slowRadio.value = 100;
            normalRadio.value = 120;
            fastRadio.value = 140;
        } else {
            slowRadio.value = 110;
            normalRadio.value = 140;
            fastRadio.value = 160;
        }

        langToggle.textContent = lang === 'ru' ? 'EN' : 'RU';
        updateAll();
        updateActiveTempo();
    }

    function copyResult() {
        const timeText = timeOutput.textContent;
        const t = translations[currentLang];
        const fullText = `${t.resultLabel} ${timeText}`;
        navigator.clipboard.writeText(fullText).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Скопировано';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1500);
        }).catch(() => {
            alert('Не удалось скопировать текст. Пожалуйста, скопируйте вручную.');
        });
    }

    textInput.addEventListener('input', updateAll);
    tempoOptions.forEach(radio => {
        radio.addEventListener('change', () => {
            updateActiveTempo();
            calculateTime();
        });
    });
    copyBtn.addEventListener('click', copyResult);
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
    });

    // === Логика установки ===
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installAndroidBtn.textContent = '🤖 Установить (доступно)';
        installAndroidBtn.style.background = '#c8e6c9';
    });

    function showInstructions(htmlContent) {
        installInstructions.innerHTML = htmlContent;
        installInstructions.style.display = 'block';
    }

    function hideInstructions() {
        installInstructions.style.display = 'none';
    }

    installAndroidBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA установлено');
                }
                deferredPrompt = null;
                installAndroidBtn.textContent = translations[currentLang].installAndroid;
                installAndroidBtn.style.background = '#e8f5e9';
                hideInstructions();
            });
        } else {
            const t = translations[currentLang];
            showInstructions(t.androidInstruction);
        }
    });

    installIosBtn.addEventListener('click', () => {
        const t = translations[currentLang];
        showInstructions(t.iosInstruction);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.install-btn') && !e.target.closest('#install-instructions')) {
            hideInstructions();
        }
    });

    // Инициализация
    setLanguage('ru');
});
