document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const timeOutput = document.getElementById('time-output');
    const tempoOptions = document.querySelectorAll('input[name="tempo"]');

    // Подсветка активного темпа
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

    // Получить текущий темп (слов в минуту)
    function getTempo() {
        const checked = document.querySelector('input[name="tempo"]:checked');
        return checked ? parseInt(checked.value) : 120;
    }

    // Подсчёт времени
    function calculateTime() {
        const text = textInput.value.trim();
        if (!text) {
            timeOutput.textContent = '0:00';
            return;
        }

        // Считаем слова (разделители: пробелы, переносы строк, знаки табуляции)
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const wpm = getTempo();

        if (wordCount === 0) {
            timeOutput.textContent = '0:00';
            return;
        }

        // Время в минутах
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

    // Обработчики
    textInput.addEventListener('input', calculateTime);

    tempoOptions.forEach(radio => {
        radio.addEventListener('change', () => {
            updateActiveTempo();
            calculateTime();
        });
    });

    // Инициализация
    updateActiveTempo();
});
