document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const timeOutput = document.getElementById('time-output');
    const charCount = document.getElementById('char-count');
    const charCountNoSpaces = document.getElementById('char-count-nospaces');
    const tempoOptions = document.querySelectorAll('input[name="tempo"]');
    const copyBtn = document.getElementById('copy-btn');

    function updateActiveTempo() {
        tempoOptions.forEach(radio => {
            const label = radio.parentElement;
            if (radio.checked) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    function getTempo() {
        const checked = document.querySelector('input[name="tempo"]:checked');
        return checked ? parseInt(checked.value) : 120;
    }

    function updateStats() {
        const text = textInput.value;
        const totalChars = text.length;
        const charsWithoutSpaces = text.replace(/\s/g, '').length;
        charCount.textContent = `Символов: ${totalChars}`;
        charCountNoSpaces.textContent = `Без пробелов: ${charsWithoutSpaces}`;
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

    // Копирование результата
    function copyResult() {
        const timeText = timeOutput.textContent;
        const fullText = `Время звучания: ${timeText}`;
        navigator.clipboard.writeText(fullText).then(() => {
            const originalEmoji = copyBtn.textContent;
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = originalEmoji;
            }, 1500);
        }).catch(err => {
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

    // Инициализация
    updateActiveTempo();
    updateAll();
});
