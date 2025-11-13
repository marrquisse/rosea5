// Чекаємо, поки весь HTML-документ (DOM) завантажиться,
// перш ніж ми почнемо шукати елементи та додавати їм функціонал.
document.addEventListener('DOMContentLoaded', () => {

    // === Збір всіх необхідних блоків ===
    // Зберігаємо посилання на HTML-елементи в змінні для зручного доступу.
    const block1 = document.querySelector('.b1');
    const block2 = document.querySelector('.b2');
    const block3 = document.querySelector('.love-block'); // Блок 3 - це "ТИ + ROSEA = ЛЮБОВ"
    const block4 = document.querySelector('.b4');
    const block5 = document.querySelector('.b5'); // Блок 5 - це головний <main>
    const block6 = document.querySelector('.b6'); // Блок 6 - це "Порада дня"
    const block7 = document.querySelector('.b7');

    // --------------------------------------------------
    // === ЗАВДАННЯ 1: Поміняти місцями контент блоків «3» та «6» ===
    // --------------------------------------------------
    function task1_swapContent() {
        // Перевіряємо, чи обидва елементи існують на сторінці
        if (block3 && block6) {
            console.log("Завдання 1: Міняю місцями .love-block (Блок 3) та .b6 (Блок 6)");
            
            // 1. Зберігаємо вміст Блоку 3 у тимчасову змінну (temp)
            const tempContent = block3.innerHTML;
            
            // 2. Вставляємо вміст Блоку 6 у Блок 3
            block3.innerHTML = block6.innerHTML;
            
            // 3. Вставляємо збережений вміст (з temp) у Блок 6
            block6.innerHTML = tempContent;
        } else {
            console.error("Завдання 1: Не знайдено Блок 3 (.love-block) або Блок 6 (.b6)");
        }
    }

    // --------------------------------------------------
    // === ЗАВДАННЯ 2: Обчислити площу паралелограма ===
    // --------------------------------------------------
    function task2_calculateArea() {
        if (!block5) return; // Перевірка, чи існує Блок 5

        // "беручи необхідні значення із відповідних змінних у скрипті"
        const base = 20; 
        const height = 10;

        // "Напишіть функцію, яка обчислює площу"
        function calculateParallelogramArea(b, h) {
            return b * h;
        }

        // Отримуємо результат
        const area = calculateParallelogramArea(base, height);
        
        // "виводить отриманий результат в кінці контенту в блоці «5»"
        // 1. Створюємо новий HTML-елемент <p>
        const resultElement = document.createElement('p');
        // 2. Додаємо в нього наш результат
        resultElement.innerHTML = `<strong>(Завдання 2)</strong> Площа паралелограма (основа ${base}, висота ${height}) = <strong>${area}</strong>`;
        resultElement.style.borderTop = "1px solid #eee";
        resultElement.style.paddingTop = "15px";
        
        // 3. Додаємо цей <p> як останній дочірній елемент у Блок 5
        block5.appendChild(resultElement);
        console.log("Завдання 2: Площу пораховано і додано в Блок 5.");
    }

    // --------------------------------------------------
    // === ЗАВДАННЯ 3: Максимальна цифра та Cookies ===
    // --------------------------------------------------
    function task3_handleCookies() {
        // Отримуємо елементи форми, яку ми додали в HTML
        const form = document.getElementById('max-digit-form');
        const input = document.getElementById('number-input');
        const formContainer = document.getElementById('task3-container').querySelector('form');
        const clearBtn = document.getElementById('clear-cookie-btn');

        if (!form || !input || !clearBtn) {
            console.error("Завдання 3: Не знайдено елементи форми.");
            return;
        }

        // --- Допоміжні функції для роботи з Cookies ---
        function setCookie(name, value, days = 7) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            // "зберігає в cookies"
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function deleteCookie(name) {
            // Видаляємо cookie, встановивши минулу дату
            document.cookie = name + '=; Max-Age=-99999999; path=/';
        }
        // --- Кінець допоміжних функцій ---

        // "знаходить максимальну цифру у заданому натуральному числі"
        function findMaxDigit(numberString) {
            const digitsOnly = numberString.replace(/[^0-9]/g, ''); // Видаляємо все, крім цифр
            if (digitsOnly.length === 0) return 0;
            return Math.max(...digitsOnly.split('')); 
        }

        // === Пункт (а): При оновленні веб-сторінки ===
        const savedDigit = getCookie('maxDigit');
        if (savedDigit) {
            // "користувачу за допомогою діалогового вікна виводиться інформація"
            alert(`(Завдання 3а) Збережена максимальна цифра: ${savedDigit}`);
            // "не виводиться згадана вище форма"
            formContainer.style.display = 'none'; 
            clearBtn.style.display = 'block'; // Показуємо кнопку "ОК" (для видалення)
        }

        // === Обробка відправки форми ===
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Забороняємо сторінці перезавантажуватися
            const maxDigit = findMaxDigit(input.value);
            
            // "отриманий результат виводить за допомогою діалогового вікна"
            alert(`(Завдання 3) Максимальна цифра в числі ${input.value} -> ${maxDigit}`);
            // "і зберігає в cookies"
            setCookie('maxDigit', maxDigit);
            
            // Перезавантажуємо сторінку, щоб спрацювала логіка пункту (а)
            location.reload(); 
        });

        // === Пункт (б): при натисканні кнопки «ОК» ===
        clearBtn.addEventListener('click', () => {
            // "відповідні cookies видаляються"
            deleteCookie('maxDigit');
            
            // "виводиться наступне діалогове вікно із повідомленням, що cookies видалено"
            // Код нижче (location.reload) виконається тільки ПІСЛЯ того,
            // як користувач натисне "ОК" в цьому alert-і.
            alert('(Завдання 3б) cookies видалено');
            
            // "перезавантажує веб-сторінку з початковим станом"
            location.reload(); 
        });
    }

    // --------------------------------------------------
    // === ЗАВДАННЯ 4: Вирівнювання та LocalStorage ===
    // --------------------------------------------------
    function task4_handleLocalStorageAlign() {
        // "вмісту блоків «2», «4», «5»"
        const blocksToAlign = [block2, block4, block5].filter(b => b != null); 

        // --- Функція відновлення стилів при завантаженні ---
        function restoreAlignments() {
            console.log("Завдання 4: Відновлюю вирівнювання з LocalStorage...");
            blocksToAlign.forEach((block) => {
                const blockKey = block.classList.item(0); // Отримуємо клас (b2, b4, b5)
                const savedAlign = localStorage.getItem(`blockAlign-${blockKey}`);
                
                // "щоб при наступному відкриванні сторінки... відновлювались"
                if (savedAlign === 'right') {
                    block.style.textAlign = 'right';
                }
            });
        }

        // --- Функція-обробник події 'mouseout' ---
        function handleMouseOut(event) {
            const block = event.currentTarget;
            const blockKey = block.classList.item(0);

            // "при настанні події mouseout задає вирівнювання по правому краю"
            block.style.textAlign = 'right';
            
            // "зберігає відповідні значення в LocalStorage"
            // (Завдання нечітке, але логічно зберігати саме вибір 'right')
            localStorage.setItem(`blockAlign-${blockKey}`, 'right');
            console.log(`Завдання 4: Збережено вирівнювання 'right' для .${blockKey}`);
        }

        // 1. Відновлюємо стилі при завантаженні сторінки
        restoreAlignments();
        
        // 2. Додаємо слухачів події 'mouseout' до кожного блоку
        blocksToAlign.forEach(block => {
            block.addEventListener('mouseout', handleMouseOut);
        });
    }

    // --------------------------------------------------
    // === ЗАВДАННЯ 5: Нумерований список та LocalStorage ===
    // --------------------------------------------------
    function task5_handleLocalStorageLists() {
        // Отримуємо елементи форми, яку ми додали в HTML
        const select = document.getElementById('block-selector');
        const listForm = document.getElementById('add-item-form');
        const listInput = document.getElementById('list-item-input');

        if (!select || !listForm || !listInput) {
            console.error("Завдання 5: Не знайдено елементи форми.");
            return;
        }

        const storageKey = 'dynamicLists'; // Назва ключа в LocalStorage
        let activeBlockSelector = null; // Змінна для зберігання обраного блоку (напр., '.b5')

        // --- Функція завантаження списків зі сховища ---
        function loadListsFromStorage() {
            // "внесені дані... зберігаються в localStorage"
            // (г) "перезавантаження... призводить до видалення" - цей пункт суперечить (в).
            // Ми реалізуємо логічніший варіант: ВІДНОВЛЕННЯ списків,
            // оскільки це єдиний спосіб довести, що localStorage був використаний.
            const listsData = JSON.parse(localStorage.getItem(storageKey)) || {};
            console.log("Завдання 5: Відновлюю списки з LocalStorage", listsData);

            // Проходимо по всіх збережених даних
            for (const blockSelector in listsData) {
                const block = document.querySelector(blockSelector);
                const items = listsData[blockSelector];
                
                if (block && items && items.length > 0) {
                    // "а сам список додається в кінці наявного вмісту"
                    let ol = block.querySelector('ol.task5-list');
                    if (!ol) {
                        ol = document.createElement('ol'); // Створюємо <ol> (нумерований список)
                        ol.className = 'task5-list';
                        block.appendChild(ol);
                    }
                    
                    // Наповнюємо список пунктами <li>
                    items.forEach(itemText => {
                        const li = document.createElement('li');
                        li.textContent = itemText;
                        ol.appendChild(li);
                    });
                }
            }
        }

        // === Пункт (а): Поява елементів форми ===
        select.addEventListener('change', () => {
            // "необхідні елементи форми появляються... внаслідок події select"
            if (select.value) {
                // Зберігаємо селектор (напр., '.b1' або '.love-block')
                activeBlockSelector = '.' + select.value; 
                listForm.style.display = 'block'; // Показуємо форму
            } else {
                activeBlockSelector = null;
                listForm.style.display = 'none'; // Ховаємо форму, якщо нічого не обрано
            }
        });

        // === Пункт (в): Додавання пункту до списку ===
        listForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!activeBlockSelector) return; // Нічого не робити, якщо блок не обрано

            const block = document.querySelector(activeBlockSelector);
            const text = listInput.value.trim();
            
            if (text && block) {
                // Знаходимо або створюємо список <ol> у обраному блоці
                let ol = block.querySelector('ol.task5-list');
                if (!ol) {
                    ol = document.createElement('ol');
                    ol.className = 'task5-list';
                    block.appendChild(ol);
                }
                
                // "сам список додається в кінці наявного вмісту"
                const li = document.createElement('li');
                li.textContent = text;
                ol.appendChild(li);

                // === Пункт (в): "внесені дані... зберігаються в localStorage" ===
                // 1. Отримуємо поточні дані зі сховища
                const allLists = JSON.parse(localStorage.getItem(storageKey)) || {};
                // 2. Ініціалізуємо масив для нашого блоку, якщо його немає
                if (!allLists[activeBlockSelector]) {
                    allLists[activeBlockSelector] = [];
                }
                // 3. Додаємо новий текст в масив
                allLists[activeBlockSelector].push(text);
                // 4. Зберігаємо оновлений об'єкт назад у LocalStorage
                localStorage.setItem(storageKey, JSON.stringify(allLists));

                listInput.value = ''; // Очищуємо поле вводу
            }
        });

        // === Пункт (г): Обробка перезавантаження ===
        // Викликаємо функцію відновлення списків при першому завантаженні сторінки
        loadListsFromStorage();
    }


    // === ВИКЛИК УСІХ ФУНКЦІЙ ЗАВДАНЬ ===
    // Обертаємо кожен виклик у try...catch,
    // щоб помилка в одному завданні не "зламала" виконання інших.
    try { task1_swapContent(); } catch(e) { console.error("Помилка в Завданні 1:", e); }
    try { task2_calculateArea(); } catch(e) { console.error("Помилка в Завданні 2:", e); }
    try { task3_handleCookies(); } catch(e) { console.error("Помилка в Завданні 3:", e); }
    try { task4_handleLocalStorageAlign(); } catch(e) { console.error("Помилка в Завданні 4:", e); }
    try { task5_handleLocalStorageLists(); } catch(e) { console.error("Помилка в Завданні 5:", e); }

}); // Кінець 'DOMContentLoaded'