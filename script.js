class LoveNumberPuzzle {
    constructor() {
        // Инициализация Telegram Web App
        try {
            this.tg = window.Telegram?.WebApp;
            if (this.tg) {
                console.log("Telegram Web App обнаружен, инициализация...");
                this.initTelegramApp();
            } else {
                console.log("Telegram Web App не обнаружен, запуск в standalone режиме");
                this.isTelegram = false;
            }
        } catch (error) {
            console.log("Ошибка инициализации Telegram Web App:", error);
            this.isTelegram = false;
        }
        
        // Инициализация игры
        this.levels = this.generateLevels(30);
        this.MAX_LEVEL = this.levels.length;
        
        this.loveMessages = [
            "Ти - моє сонечко, що освітлює кожен мій день 🌞",
            "Кохання до тебе з кожним днем стає сильнішим 💖",
            "Твої очі - це зірки, що вказують мені шлях ✨",
            "З тобою кожна мить - це казка 🏰",
            "Ти - найніжніша мрія моєї душі 💭",
            "Твої обійми - мій улюблений захист 🤗",
            "Кожна частинка тебе чарівна 🪄",
            "Ти робиш моє життя солодшим 🍯",
            "Ти - моя улюблена панда серед усіх панд 🐼",
            "Люблю тебе сильніше, ніж коти люблять коробки 📦",
            "Ти - моє щастя, як морозиво в спекотний день 🍦",
            "Твоя посмішка - найкрасивіший пейзаж 😊",
            "Любов до тебе - вічна і безмежна ♾️",
            "Ти - мій спокій серед бурі 🌊",
            "З тобою я знайшов справжнє щастя 🥹",
            "Твоє серце - мій найцінніший скарб 💎",
            "Кожна мить з тобою - це подарунок 🎁",
            "Ти робиш моє життя яскравішим 🌈",
            "Моє кохання до тебе безмежне, як океан 🌊",
            "Ти - причина моєї посмішки кожного дня 😊",
            "Твоя любов - найкраще, що сталося в моєму житті 💝",
            "З тобою я можу досягти будь-чого! 🚀",
            "Ти - моя муза та натхнення 🎨",
            "Кожен день з тобою - це нова пригода 🗺️",
            "Твоя присутність робить все кращим ✨",
            "Ти - моя тиха гавань у бурхливому морі ⚓",
            "Люблю тебе більше, ніж слова можуть передати 💌",
            "Ти - мій щасливий квиток у житті 🎫",
            "З тобою кожен день - свято 🎉",
            "Ти - відповідь на всі мої молитви 🙏",
            "Твоє кохання - моя найцінніша річ у житті 💎",
            "Кожен день з тобою - це подарунок від всесвіту 🎁",
            "Ти робиш моє серце щасливим кожну секунду 💓",
            "Наша любов як вічність - без початку і кінця ♾️",
            "Ти - моя мрія, яка стала реальністю 🌠",
            "З тобою я можу будь-що, навіть злітати до зірок 🚀",
            "Твоя посмішка - це сонячне проміння в моєму житті ☀️",
            "Кохання до тебе з кожним днем стає сильнішим і ніжнішим 💖",
            "Ти - моя тиха гавань у бурхливому морі життя ⚓",
            "Кожна мить з тобою - це маленьке диво ✨",
            "Твої руки - найбезпечніше місце на землі 👐",
            "Ти навчив мене, що таке справжнє кохання 📚",
            "Наше кохання - найкраща історія, яку я коли-небудь читав 📖",
            "Ти - мій ангел-охоронець 😇",
            "З тобою навіть дощові дні яскраві 🌧️🌈",
            "Твоє серце б'ється в униз з моїм 💞",
            "Ти - моє найщасливіше зараз 🥰",
            "Кохання до тебе - це музика мого серця 🎵",
            "Ти - крапля роси на квітці мого життя 🌸",
            "З тобою я знайшов свій дім 🏡",
            "Твоя любов - це енергія, що живить мене ⚡",
            "Ти - найкращий сценарій мого життя 🎬",
            "Наше кохання - це танець двох душ 💃🕺",
            "Ти - північний зірка мого життя 🌟",
            "З тобою кожен момент - це справжнє щастя 😌",
            "Твоя любов - це сад, де ростуть мої мрії 🌷",
            "Ти - відображення всіх моїх найкращих якостей 👑",
            "Наше кохання - це вогонь, що ніколи не згасає 🔥",
            "Ти - найніжніша мелодія мого серця 🎶",
            "З тобою я відчуваю, що все можливо 💫",
            "Твоя любов - це компас, що веде мене до щастя 🧭",
            "Ти - краще за всі зірки на небі 🌌",
            "Наше кохання - це безмежний океан почуттів 🌊",
            "Ти - ключ до мого щастя 🔑",
            "З тобою я відчуваю, що знайшов свою другу половинку 🧩",
            "Твоя любов - це сонце, що освітлює мій шлях ☀️",
            "Ти - найцінніший скарб моєї душі 🏆",
            "Наше кохання - це вічний танець двох сердець 💖",
            "Ти - найкрасивіша казка мого життя 📚",
            "З тобою я відчуваю, що життя прекрасне 🌺",
            "Твоя любов - це крила, що піднімають мене до небес 🕊️",
            "Ти - найсвітліша зірка в моєму всесвіті 🌠",
            "Наше кохання - це мелодія, що звучить вічно 🎼",
            "Ти - найніжніший дотик моєї душі 👆",
            "З тобою я відчуваю, що все має сенс 💭",
            "Твоя любов - це еліксир життя 🧪",
            "Ти - найтепліше проміння в моєму житті 🔆",
            "Наше кохання - це бездонний океан ніжності 🌊",
            "Ти - найкращий подарунок долі 🎁",
            "З тобою я відчуваю, що знайшов свій шлях 🛣️",
            "Твоя любов - це джерело моєї сили 💪",
            "Ти - найчарівніша казка моєї реальносты 🧚",
            "Наше кохання - це вічне полум'я пристрасті 🔥",
            "Ти - найніжніша мрія, яка стала явью 🌙",
            "З тобою я відчуваю, що все можливо ✨",
            "Твоя любов - це найкрасивіша пісня мого серця 🎤"
        ];
        
        this.GRID_W = 5;
        this.GRID_H = 8;
        this.bonusCosts = { destroy: 5, shuffle: 10, explosion: 20 };
        
        // Система сохранения
        this.userId = this.getUserId();
        this.isSaving = false;

        // Инициализация с загрузкой сохранения
        this.currentLevel = 0;
        this.grid = [];
        this.selected = [];
        this.isDragging = false;
        this.chainNumbers = [];
        this.xp = 0;
        this.xpToNext = 10;
        this.maxNumber = 8;
        this.activeBonus = null;
        this.gameState = 'playing';
        this.messageCount = 0;
        this.lastSaveNotify = null;
        
        this.createFloatingHearts();
        this.initializeEventListeners();
        this.showScreen('mainMenu');
        this.setupThemeHandling();
        
        this.initializeEventListeners();
        this.showScreen('mainMenu');

        // Добавляем обработку темной темы
        this.setupThemeHandling();
        
        // Загружаем сохраненный прогресс
        this.loadGameProgress().then(() => {
            console.log('Игра инициализирована с загруженным прогрессом');
        });

        // Автосохранение
        this.setupAutoSave();
        
        document.addEventListener('dblclick', (e) => e.preventDefault());
    }
    
    // Новая функция для показа экрана выбора уровня
    showLevelSelectScreen() {
        console.log("Показываем экран выбора уровня");
        this.showScreen('levelSelect');
        this.renderLevelSelectLarge();
    }

    // Новая функция отрисовки большого выбора уровней
    renderLevelSelectLarge() {
        const container = document.getElementById('levelSelectLarge');
        if (!container) {
            console.error("Контейнер levelSelectLarge не найден!");
            return;
        }
        
        container.innerHTML = "";
        
        for (let i = 0; i < this.levels.length; i++) {
            const btn = document.createElement('button');
            btn.className = "level-btn-large";
            
            // Определяем текст кнопки в зависимости от прогресса
            if (i < this.currentLevel) {
                btn.textContent = "⭐ " + (i + 1); // Пройденные уровни
            } else if (i === this.currentLevel) {
                btn.textContent = "🎯 " + (i + 1); // Текущий уровень
                btn.classList.add("selected");
            } else {
                btn.textContent = (i + 1); // Будущие уровни
            }
            
            btn.addEventListener('click', () => {
                console.log("Выбран уровень:", i + 1);
                this.currentLevel = i;
                this.initGame(i);
                this.showScreen('game');
                this.saveGameProgress();
                this.showLoveMessage(`Обрано рівень ${i + 1}! 💫`);
            });
            
            container.appendChild(btn);
        }
        
        console.log("Отрисовано кнопок уровней:", this.levels.length);
    }

    debugBonuses() {
        console.log("=== ДЕБАГ БОНУСОВ ===");
        console.log("Текущие очки XP:", this.xp);
        console.log("Стоимость бонусов:", this.bonusCosts);
        console.log("Активный бонус:", this.activeBonus);
        console.log("Достаточно XP для разрушения:", this.xp >= this.bonusCosts.destroy);
        console.log("Достаточно XP для взрыва:", this.xp >= this.bonusCosts.explosion);
        console.log("Достаточно XP для перемешивания:", this.xp >= this.bonusCosts.shuffle);
        
        // Дополнительная информация о состоянии игры
        console.log("Состояние игры:", this.gameState);
        console.log("Выбранные клетки:", this.selected);
        console.log("Режим перетаскивания:", this.isDragging);
    }

    // ==================== СИСТЕМА СОХРАНЕНИЯ ====================
    
    getUserId() {
        // Для Telegram Web App используем ID пользователя, для браузера - локальное хранилище
        if (this.tg && this.tg.initDataUnsafe && this.tg.initDataUnsafe.user) {
            return 'tg_' + this.tg.initDataUnsafe.user.id;
        }
        return 'user_' + (localStorage.getItem('lovePuzzleUserId') || Date.now().toString());
    }
    
    setupAutoSave() {
        // Автосохранение каждые 30 секунд
        setInterval(() => {
            if (this.gameState === 'playing' && !this.isSaving) {
                this.saveGameProgress();
            }
        }, 30000);
        
        // Сохранение при закрытии страницы
        window.addEventListener('beforeunload', () => {
            this.saveGameProgress();
        });
    }
    
     setupThemeHandling() {
        // Проверяем предпочтения пользователя
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Применяем тему соответственно
        if (prefersDark) {
            document.body.classList.add('dark-theme');
        }
        
        // Слушаем изменения темы
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }
    

    async saveGameProgress() {
        if (this.isSaving) {
            console.log('🔄 Уже сохраняем, пропускаем...');
            return;
        }
        
        this.isSaving = true;
        const saveId = Date.now();
        
        try {
            console.log(`💾 Начинаем сохранение #${saveId}...`);
            
            const gameState = {
                currentLevel: this.currentLevel,
                xp: this.xp,
                messageCount: this.messageCount,
                grid: JSON.parse(JSON.stringify(this.grid)), // глибока копія!
                maxNumber: this.maxNumber,
                timestamp: Date.now(),
                version: '2.1'
            };
    
            
            // 🔄 МНОГОУРОВНЕВОЕ СОХРАНЕНИЕ
            
            // 1. Основное сохранение
            const mainSave = JSON.stringify(gameState);
            localStorage.setItem('lovePuzzle_main', mainSave);
            console.log('✅ Основное сохранение завершено');
            
            // 2. Резервная копия 1 (немедленно)
            localStorage.setItem('lovePuzzle_backup1', mainSave);
            
            // 3. Резервная копия 2 (через 100мс)
            setTimeout(() => {
                localStorage.setItem('lovePuzzle_backup2', mainSave);
                console.log('✅ Резервная копия 2 создана');
            }, 100);
            
            // 4. Резервная копия 3 (в другом формате)
            const compactSave = JSON.stringify({
                level: this.currentLevel,
                xp: this.xp,
                messages: this.messageCount,
                t: Date.now()
            });
            localStorage.setItem('lovePuzzle_compact', compactSave);
            
            // 5. Сохранение в SessionStorage как дополнительная защита
            sessionStorage.setItem('lovePuzzle_session', mainSave);
            
            console.log('💾 Прогресс сохранен:', {
                level: this.currentLevel,
                xp: this.xp,
                messages: this.messageCount,
                saveId: saveId
            });
            
            // Показываем подтверждение (только раз в 10 секунд)
            const now = Date.now();
            if (!this.lastSaveNotify || now - this.lastSaveNotify > 10000) {
                this.showLoveMessage("Прогрес збережено! 💾");
                this.lastSaveNotify = now;
            }
            
        } catch (error) {
            console.error('❌ Критическая ошибка сохранения:', error);
            
            // Попытка экстренного сохранения минимальных данных
            try {
                const emergencySave = JSON.stringify({
                    level: this.currentLevel,
                    xp: this.xp,
                    messages: this.messageCount,
                    emergency: true,
                    timestamp: Date.now()
                });
                localStorage.setItem('lovePuzzle_emergency', emergencySave);
                console.log('🚨 Экстренное сохранение выполнено');
            } catch (e) {
                console.error('💥 Даже экстренное сохранение не удалось:', e);
            }
        } finally {
            this.isSaving = false;
        }
    }

    async loadGameProgress() {
        try {
            console.log('🔄 Загрузка прогресса...');
            
            // 🔍 ПОПЫТКИ ЗАГРУЗКИ В ПОРЯДКЕ ПРИОРИТЕТА
            
            let loadedData = null;
            let source = '';
            
            // 1. Основное сохранение
            try {
                const saved = localStorage.getItem('lovePuzzle_main');
                if (saved) {
                    loadedData = JSON.parse(saved);
                    source = 'main';
                    console.log('✅ Загружено из основного сохранения');
                }
            } catch (e) {
                console.log('❌ Ошибка загрузки основного сохранения:', e);
            }
            
            // 2. Резервная копия 1 (если основное не загрузилось)
            if (!loadedData) {
                try {
                    const saved = localStorage.getItem('lovePuzzle_backup1');
                    if (saved) {
                        loadedData = JSON.parse(saved);
                        source = 'backup1';
                        console.log('✅ Загружено из резервной копии 1');
                    }
                } catch (e) {
                    console.log('❌ Ошибка загрузки резервной копии 1:', e);
                }
            }
            
            // 3. Резервная копия 2
            if (!loadedData) {
                try {
                    const saved = localStorage.getItem('lovePuzzle_backup2');
                    if (saved) {
                        loadedData = JSON.parse(saved);
                        source = 'backup2';
                        console.log('✅ Загружено из резервной копии 2');
                    }
                } catch (e) {
                    console.log('❌ Ошибка загрузки резервной копии 2:', e);
                }
            }
            
            // 4. Компактное сохранение
            if (!loadedData) {
                try {
                    const saved = localStorage.getItem('lovePuzzle_compact');
                    if (saved) {
                        loadedData = JSON.parse(saved);
                        // Восстанавливаем полную структуру из компактной
                        loadedData = {
                            currentLevel: loadedData.level,
                            xp: loadedData.xp,
                            messageCount: loadedData.messages,
                            grid: [],
                            maxNumber: 8,
                            gameState: 'playing'
                        };
                        source = 'compact';
                        console.log('✅ Загружено из компактного сохранения');
                    }
                } catch (e) {
                    console.log('❌ Ошибка загрузки компактного сохранения:', e);
                }
            }
            
            // 5. SessionStorage (последняя попытка)
            if (!loadedData) {
                try {
                    const saved = sessionStorage.getItem('lovePuzzle_session');
                    if (saved) {
                        loadedData = JSON.parse(saved);
                        source = 'session';
                        console.log('✅ Загружено из sessionStorage');
                    }
                } catch (e) {
                    console.log('❌ Ошибка загрузки из sessionStorage:', e);
                }
            }
            
            // 6. Экстренное сохранение
            if (!loadedData) {
                try {
                    const saved = localStorage.getItem('lovePuzzle_emergency');
                    if (saved) {
                        loadedData = JSON.parse(saved);
                        source = 'emergency';
                        console.log('🚨 Загружено из экстренного сохранения');
                    }
                } catch (e) {
                    console.log('❌ Ошибка загрузки экстренного сохранения:', e);
                }
            }
            
            if (loadedData && this.isValidSaveData(loadedData)) {
                // Восстанавливаем состояние игры
                this.currentLevel = loadedData.currentLevel || 0;
                this.xp = loadedData.xp || 0;
                this.messageCount = loadedData.messageCount || 0;
                this.grid = loadedData.grid || [];
                this.maxNumber = loadedData.maxNumber || 8;
                this.gameState = loadedData.gameState || 'playing';
                
                // Після всіх відновлень даних — обов’язково оновлюємо лічильник на екрані!
                const messageCounterEl = document.getElementById('messageCount');
                if (messageCounterEl) {
                    messageCounterEl.textContent = this.messageCount;
                }

                // Обновляем интерфейс
                this.updateInfo();
                this.updateBonusButtons();
                
                console.log('🎮 Прогресс загружен:', {
                    level: this.currentLevel,
                    xp: this.xp,
                    messages: this.messageCount,
                    source: source
                });
                
                this.showLoveMessage(`Прогрес відновлено! (${source}) 💾`);
                return true;
            } else {
                console.log('ℹ️ Сохранение не найдено или повреждено');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Общая ошибка загрузки прогресса:', error);
            return false;
        }
    }

    async recoverSaveData() {
        console.log('🛠️ Запуск восстановления данных...');
        
        const saves = [
            'lovePuzzle_main',
            'lovePuzzle_backup1', 
            'lovePuzzle_backup2',
            'lovePuzzle_compact',
            'lovePuzzle_emergency'
        ];
        
        let recovered = false;
        
        for (const saveKey of saves) {
            try {
                const saved = localStorage.getItem(saveKey);
                if (saved) {
                    const data = JSON.parse(saved);
                    if (this.isValidSaveData(data)) {
                        console.log(`✅ Восстановлено из ${saveKey}`);
                        await this.loadGameProgress();
                        recovered = true;
                        break;
                    }
                }
            } catch (e) {
                console.log(`❌ Ошибка восстановления из ${saveKey}:`, e);
            }
        }
        
        if (recovered) {
            this.showLoveMessage("Дані відновлено! 🛠️");
        } else {
            this.showLoveMessage("Не вдалося відновити дані 😔");
        }
        
        return recovered;
    }

    isValidSaveData(data) {
        try {
            // Базовые проверки
            if (!data || typeof data !== 'object') return false;
            
            // Проверяем обязательные поля
            if (typeof data.currentLevel !== 'number' || data.currentLevel < 0) return false;
            if (typeof data.xp !== 'number' || data.xp < 0) return false;
            if (typeof data.messageCount !== 'number' || data.messageCount < 0) return false;
            
            // Проверяем уровень (не больше максимального)
            if (data.currentLevel >= this.levels.length) return false;
            
            // Проверяем сетку (если есть)
            if (data.grid && !Array.isArray(data.grid)) return false;
            
            console.log('✅ Данные сохранения валидны');
            return true;
            
        } catch (error) {
            console.error('❌ Ошибка валидации данных:', error);
            return false;
        }
    }

    // ==================== ОСНОВНЫЕ МЕТОДЫ ИГРЫ ====================

    initTelegramApp() {
        try {
            this.tg.expand();
            this.tg.enableClosingConfirmation();
            this.applyTelegramTheme();

            this.tg.onEvent('themeChanged', this.applyTelegramTheme.bind(this));

            this.isTelegram = true;
            console.log("Telegram Web App успешно инициализирован");
        } catch (error) {
            console.error("Ошибка инициализации Telegram Web App:", error);
            this.isTelegram = false;
        }
    }

    applyTelegramTheme() {
        try {
            const themeParams = this.tg.themeParams;

            if (themeParams.bg_color) {
                document.documentElement.style.setProperty('--bg-color', themeParams.bg_color);
                document.body.style.background = themeParams.bg_color;
            }

            if (themeParams.text_color) {
                document.documentElement.style.setProperty('--text-color', themeParams.text_color);
            }

            if (themeParams.button_color) {
                document.documentElement.style.setProperty('--primary-color', themeParams.button_color);
                document.documentElement.style.setProperty('--secondary-color', this.adjustColor(themeParams.button_color, 20));
            }

            if (themeParams.button_text_color) {
                document.documentElement.style.setProperty('--white', themeParams.button_text_color);
            }

        } catch (error) {
            console.error("Ошибка применения темы Telegram:", error);
        }
    }

    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => 
            ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        );
    }

    createFloatingHearts() {
        const container = document.getElementById('floatingHearts');
        if (!container) return;

        const heartCount = 12;
        container.innerHTML = '';

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.fontSize = (Math.random() * 0.8 + 0.8) + 'em';
            container.appendChild(heart);
        }
    }

    showScreen(screenName) {
        try {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.add('hidden');
            });

            const targetScreen = document.getElementById(screenName + 'Screen');
            if (targetScreen) {
                targetScreen.classList.remove('hidden');
            }
        } catch (error) {
            console.error("Ошибка показа экрана:", error);
        }
    }

    showVictoryScreen() {
        try {
            const victoryOverlay = document.getElementById('victoryOverlay');
            const victoryMessage = document.getElementById('victoryMessage');

            if (victoryOverlay && victoryMessage) {
                victoryMessage.textContent = `Ти пройшла всі ${this.MAX_LEVEL} рівнів! Ти найкраща! 💝`;
                victoryOverlay.classList.remove('hidden');
            }
        } catch (error) {
            console.error("Ошибка показа экрана победы:", error);
        }
    }

    hideVictoryScreen() {
        try {
            const victoryOverlay = document.getElementById('victoryOverlay');
            if (victoryOverlay) {
                victoryOverlay.classList.add('hidden');
            }
        } catch (error) {
            console.error("Ошибка скрытия экрана победы:", error);
        }
    }

    initializeEventListeners() {
        try {
             // Main menu buttons
            document.getElementById('playBtn').addEventListener('click', () => {
                this.startGame();
            });

            document.getElementById('levelSelectBtn').addEventListener('click', () => {
                console.log("Кнопка 'Обрати рівень' нажата");
                this.showLevelSelectScreen();
            });

            document.getElementById('settingsBtn').addEventListener('click', () => {
                this.showScreen('settings');
            });

            document.getElementById('backFromLevelSelectBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            document.getElementById('aboutBtn').addEventListener('click', () => {
                this.showScreen('about');
            });

            // Home button in game screen
            document.getElementById('homeBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            // Back buttons
            document.getElementById('backBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            document.getElementById('backFromSettingsBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            document.getElementById('backFromAboutBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            // Victory screen buttons
            document.getElementById('playAgainBtn').addEventListener('click', () => {
                this.hideVictoryScreen();
                this.startGame();
            });

            document.getElementById('closeWebAppBtn').addEventListener('click', () => {
                if (this.isTelegram) {
                    this.tg.close();
                } else {
                    this.showScreen('mainMenu');
                }
            });

            // Settings
            document.getElementById('saveSettingsBtn').addEventListener('click', () => {
                this.showScreen('mainMenu');
            });

            // Game buttons
            document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
            document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
            document.getElementById('saveGameBtn').addEventListener('click', () => this.manualSave());
            document.getElementById('resetProgressBtn').addEventListener('click', () => this.resetProgress());

            document.getElementById('bonus-destroy').addEventListener('click', () => this.activateBonus('destroy'));
            document.getElementById('bonus-shuffle').addEventListener('click', () => this.activateBonus('shuffle'));
            document.getElementById('bonus-explosion').addEventListener('click', () => this.activateBonus('explosion'));

            document.addEventListener('contextmenu', e => e.preventDefault());

            // ДОБАВЛЕНО: Инициализация обработки касаний для сетки (Pointer Events)
            this.initializeGridTouchHandling();

        } catch (error) {
            console.error("Ошибка инициализации обработчиков событий:", error);
        }
    }

    // ================= Pointer Events: единая, корректная обработка касаний/мыши =================
    initializeGridTouchHandling() {
        const grid = document.getElementById('grid');
        if (!grid) return;

        // Отключаем системные жесты (скролл/зум) на элементе сетки
        grid.style.touchAction = 'none';

        // Используем Pointer Events — единая модель для мыши, тача и стилуса
        grid.addEventListener('pointerdown', (e) => {
            // предотвращаем выбор/системные действия
            e.preventDefault();
            // захват указателя (если нужно) для стабильного получения pointermove/pointerup
            try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch (err) {}
            this.handlePointerStart(e);
        }, { passive: false });

        // Слушаем движение и окончание на документе, чтобы не терять события, если палец уходит за пределы grid
        document.addEventListener('pointermove', (e) => {
            this.handlePointerMove(e);
        }, { passive: false });

        document.addEventListener('pointerup', (e) => {
            try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId); } catch (err) {}
            this.handlePointerEnd(e);
        });

        document.addEventListener('pointercancel', (e) => {
            this.handlePointerEnd(e);
        });

        // Предотвращаем контекстное меню
        grid.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    handlePointerStart(e) {
    try {
        if (this.gameState !== 'playing') return;

        const clientX = e.clientX;
        const clientY = e.clientY;
        if (clientX == null || clientY == null) return;

        const cell = this.getCellFromPoint(clientX, clientY);
        if (!cell) return;

        console.log(`Клік на клітинку: ${cell.x},${cell.y}, активний бонус: ${this.activeBonus}`); // ДЛЯ ДЕБАГА

        // ПРОВЕРЯЕМ АКТИВНЫЕ БОНУСЫ
        if (this.activeBonus === 'destroy') {
            this.useDestroyBonus(cell.x, cell.y);
            return;
        }

        if (this.activeBonus === 'explosion') {
            this.useExplosionBonus(cell.x, cell.y);
            return;
        }

        // Обычный игровой процесс
        this.isDragging = true;
        this.selected = [{x: cell.x, y: cell.y}];
        this.chainNumbers = [this.grid[cell.x][cell.y].number];
        this.render();

    } catch (error) {
        console.error("Помилка handlePointerStart:", error);
    }
}

    handlePointerMove(e) {
        try {
            if (!this.isDragging || this.activeBonus) return;

            const clientX = (typeof e.clientX === 'number') ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
            const clientY = (typeof e.clientY === 'number') ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY);
            if (clientX == null || clientY == null) return;

            const cell = this.getCellFromPoint(clientX, clientY);
            if (!cell) return;

            this.handleCellHover(cell.x, cell.y);
        } catch (error) {
            console.error("Ошибка handlePointerMove:", error);
        }
    }

    handlePointerEnd() {
        try {
            if (!this.isDragging) return;

            if (this.selected.length >= 2) {
                this.mergeChain();
            } else {
                this.selected = [];
                this.chainNumbers = [];
                this.render();
            }

            this.isDragging = false;
        } catch (error) {
            console.error("Ошибка handlePointerEnd:", error);
        }
    }

    getCellFromPoint(clientX, clientY) {
        const grid = document.getElementById('grid');
        if (!grid) return null;

        const rect = grid.getBoundingClientRect();

        // Проверяем, что координаты внутри сетки
        if (clientX < rect.left || clientX > rect.right || 
            clientY < rect.top || clientY > rect.bottom) {
            return null;
        }

        const cellWidth = rect.width / this.GRID_W;
        const cellHeight = rect.height / this.GRID_H;

        const gridX = clientX - rect.left;
        const gridY = clientY - rect.top;

        const cellX = Math.floor(gridX / cellWidth);
        const cellY = Math.floor(gridY / cellHeight);

        if (cellX >= 0 && cellX < this.GRID_W && cellY >= 0 && cellY < this.GRID_H) {
            return { x: cellX, y: cellY };
        }

        return null;
    }
    // =========================================================================================

    startGame() {
        try {
            // Если есть сохраненная игра, продолжаем, иначе начинаем заново
            if (this.grid && this.grid.length > 0 && this.currentLevel > 0) {
                this.showScreen('game');
                this.render();
                this.showLoveMessage("Продовжуємо гру! 💝");
            } else {
                this.initGame(0);
                this.showScreen('game');
            }
        } catch (error) {
            console.error("Ошибка запуска игры:", error);
        }
    }

    initGame(levelNum = 0) {
        try {
            this.currentLevel = levelNum;
            const level = this.levels[this.currentLevel];

            this.xpToNext = level.xpToNext;  // тільки скільки треба до наступного рівня
            this.maxNumber = level.max;
            this.selected = [];
            this.isDragging = false;
            this.chainNumbers = [];
            this.activeBonus = null;
            this.gameState = 'playing';

            // Створюємо нову сітку ТІЛЬКИ якщо її немає або вона порожня
            if (!this.grid || this.grid.length === 0 || this.grid[0].length === 0) {
                this.grid = [];
                for (let x = 0; x < this.GRID_W; x++) {
                    this.grid[x] = [];
                    for (let y = 0; y < this.GRID_H; y++) {
                        this.grid[x][y] = {
                            number: level.numbers[Math.floor(Math.random() * level.numbers.length)],
                            merged: false
                        };
                    }
                }
            }
            // Якщо сітка вже є (збереження) — залишаємо її як є

            document.getElementById('messageCount').textContent = this.messageCount;

            this.render();
            this.updateInfo();
            this.showLoveMessage("Об'єднуй числа та отримуй любовні фрази! 💕");
            this.updateBonusButtons();

        } catch (error) {
            console.error("Ошибка инициализации игры:", error);
        }
    }

    render() {
        try {
            const gridDiv = document.getElementById('grid');
            if (!gridDiv) return;

            gridDiv.innerHTML = '';

            for (let y = 0; y < this.GRID_H; y++) {
                for (let x = 0; x < this.GRID_W; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.x = x;
                    cell.dataset.y = y;
                    cell.dataset.number = this.grid[x][y].number;

                    if (this.selected.some(sel => sel.x === x && sel.y === y)) {
                        cell.classList.add('selected');
                    }

                    if (this.grid[x][y].merged) {
                        cell.classList.add('merged');
                    }

                    const inner = document.createElement('div');
                    inner.className = 'cell-inner';
                    inner.textContent = this.formatNumber(this.grid[x][y].number);
                    cell.appendChild(inner);

                    gridDiv.appendChild(cell);
                }
            }

            this.updateXPBar();

        } catch (error) {
            console.error("Ошибка рендеринга:", error);
        }
    }

    handleCellStart(e, x, y) {
        try {
            e.preventDefault();
            if (this.gameState !== 'playing') return;
            
            if (this.activeBonus === 'destroy') {
                this.useDestroyBonus(x, y);
                return;
            }
            
            if (this.activeBonus === 'explosion') {
                this.useExplosionBonus(x, y);
                return;
            }
            
            if (this.isDragging) return;
            
            this.selected = [{x, y}];
            this.chainNumbers = [this.grid[x][y].number];
            this.isDragging = true;
            this.render();
        } catch (error) {
            console.error("Ошибка обработки начала выбора:", error);
        }
    }
    
    handleMove(e) {
        if (!this.isDragging || this.activeBonus) return;
        
        try {
            e.preventDefault();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            if (!clientX || !clientY) return;
            
            const element = document.elementFromPoint(clientX, clientY);
            if (element && element.classList.contains('cell')) {
                const x = parseInt(element.dataset.x);
                const y = parseInt(element.dataset.y);
                
                this.handleCellHover(x, y);
            }
        } catch (error) {
            console.error("Ошибка обработки перемещения:", error);
        }
    }
    
    handleCellHover(x, y) {
        if (!this.isDragging || this.activeBonus) return;
        
        try {
            if (this.selected.some(sel => sel.x === x && sel.y === y)) return;
            
            const last = this.selected[this.selected.length - 1];
            if (!this.isAdjacent(last, {x, y})) return;
            
            const newNum = this.grid[x][y].number;
            const prevNum = this.chainNumbers[this.chainNumbers.length - 1];
            if (newNum === prevNum || newNum === prevNum * 2 || prevNum === newNum * 2) {
                this.selected.push({x, y});
                this.chainNumbers.push(newNum);
                this.render();
            }
        } catch (error) {
            console.error("Ошибка обработки наведения на ячейку:", error);
        }
    }
    
    isAdjacent(a, b) {
        return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
    }
    
    mergeChain() {
        try {
            const last = this.selected[this.selected.length - 1];
            const newValue = this.chainNumbers.reduce((sum, val) => sum + val, 0);
            
            if (!this.isValidResultNumber(newValue)) {
                this.showLoveMessage("Спробуй іншу комбінацію, кохана! 💕");
                this.selected = [];
                this.chainNumbers = [];
                this.render();
                return;
            }
            
            this.grid[last.x][last.y].number = newValue;
            this.grid[last.x][last.y].merged = true;
            
            for (let i = 0; i < this.selected.length - 1; i++) {
                const {x, y} = this.selected[i];
                this.grid[x][y].number = this.getRandomInitialNumber();
                this.grid[x][y].merged = false;
            }
            
            const xpEarned = this.calculateXP(this.selected.length);
            this.xp += xpEarned;
            
            this.showRandomLoveMessage(this.selected.length);
            
            if (newValue > this.maxNumber) {
                this.maxNumber = newValue;
            }
            
            // ОБНОВЛЯЕМ ИНФОРМАЦИЮ СРАЗУ ПОСЛЕ ДОБАВЛЕНИЯ XP
            this.updateInfo();
            this.updateBonusButtons();

            setTimeout(() => {
                for (let x = 0; x < this.GRID_W; x++) {
                    for (let y = 0; y < this.GRID_H; y++) {
                        this.grid[x][y].merged = false;
                    }
                }
                
                this.render();
                this.checkWin();

                // 🔄 СОХРАНЕНИЕ ТЕПЕРЬ ЗДЕСЬ - ПОСЛЕ ВСЕХ ИЗМЕНЕНИЙ!
                this.saveGameProgress();

            }, 350);
            
            this.selected = [];
            this.chainNumbers = [];
            this.render();
            
            // СОХРАНЕНИЕ ПОСЛЕ КАЖДОГО ХОДА
            this.saveGameProgress();
            
        } catch (error) {
            console.error("Ошибка объединения цепочки:", error);
        }
    }
    
    // ОБНОВЛЕННАЯ функция показа случайного сообщения
    showRandomLoveMessage(chainLength) {
        try {
            this.messageCount++;
            document.getElementById('messageCount').textContent = this.messageCount;
            
            let message;
            let phraseId = null;
            
            if (chainLength >= 6) {
                message = "Вау! Ти геній кохання! 💖 Наша любов така ж сильна!";
                phraseId = 1;
            } else if (chainLength >= 4) {
                message = "Чудово! Наша любов росте як твої навички! 🌟";
                phraseId = 2;
            } else {
                const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
                message = this.loveMessages[randomIndex];
                phraseId = randomIndex + 3; // ID начинаются с 3 для обычных фраз
            }
            
            this.showLoveMessage(message);
            this.createHeartsAnimation();
            
            // Сохраняем фразу в бота
            if (phraseId && this.isTelegram) {
                this.addPhraseToBot(phraseId);
            }
            
        } catch (error) {
            console.error("❌ Ошибка показа сообщения:", error);
        }
    }
    
    showLoveMessage(text) {
        try {
            const messageEl = document.getElementById('messageText');
            if (messageEl) {
                messageEl.classList.remove('fade-in');
                setTimeout(() => {
                    messageEl.textContent = text;
                    messageEl.classList.add('fade-in');
                }, 100);
            }
        } catch (error) {
            console.error("Ошибка показа любовного сообщения:", error);
        }
    }
    
    createHeartsAnimation() {
        try {
            const heartsContainer = document.getElementById('hearts');
            if (!heartsContainer) return;
            
            heartsContainer.innerHTML = '';
            const heartCount = 5;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 80 + 10 + '%';
                heart.style.animationDelay = Math.random() * 0.5 + 's';
                heartsContainer.appendChild(heart);
            }
        } catch (error) {
            console.error("Ошибка создания анимации сердец:", error);
        }
    }
    
    formatNumber(num) {
        if (num >= 1_000_000_000) return (num/1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B";
        if (num >= 1_000_000) return (num/1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
        if (num >= 10_000) return (num/1_000).toFixed(0) + "К";
        if (num >= 1_000) return (num/1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + "К";
        return num;
    }
    
    isValidResultNumber(num) {
    const level = this.levels[this.currentLevel];
    
    // Разрешаем ВСЕ числа, которые могут быть получены в игре:
    // 1. Все базовые числа уровня
    // 2. Все числа из newNumbers уровня  
    // 3. Любые числа, которые являются степенью двойки И меньше или равны целевого числа
    
    const isInLevelNumbers = level.numbers.includes(num);
    const isInNewNumbers = level.newNumbers.includes(num);
    
    // Проверяем, является ли число степенью двойки и не превышает цель уровня
    const isPowerOfTwo = (num & (num - 1)) === 0 && num !== 0;
    const isWithinLevelRange = num <= level.target * 2; // Разрешаем немного больше цели
    
    // Разрешаем число если:
    // - Оно есть в разрешенных числах уровня ИЛИ
    // - Это степень двойки в пределах уровня ИЛИ  
    // - Оно есть в новых числах уровня
    return isInLevelNumbers || isInNewNumbers || (isPowerOfTwo && isWithinLevelRange);
}
    
    getRandomInitialNumber() {
        const level = this.levels[this.currentLevel];
        return level.numbers[Math.floor(Math.random() * level.numbers.length)];
    }
    
    calculateXP(chainLen) {
        if (chainLen === 2) return 1;
        if (chainLen === 3) return 4;
        if (chainLen === 4) return 8;
        if (chainLen === 5) return 15;
        if (chainLen >= 6) return 25;
        return 0;
    }
    
    updateXPBar() {
        try {
            const xpBar = document.getElementById('xpBar');
            const xpText = document.getElementById('xpText');
            
            if (xpBar && xpText) {
                const percent = Math.min(1, this.xp / this.xpToNext);
                xpBar.style.width = (percent * 100) + '%';
                xpText.textContent = `${this.xp}/${this.xpToNext}`;
            }
        } catch (error) {
            console.error("Ошибка обновления XP бара:", error);
        }
    }
    
    updateInfo() {
        try {
            const level = this.levels[this.currentLevel];
            const currentLevelEl = document.getElementById('currentLevel');
            const targetValueEl = document.getElementById('targetValue');
            
            if (currentLevelEl) {
                currentLevelEl.textContent = this.currentLevel + 1;
            }
            if (targetValueEl) {
                targetValueEl.textContent = this.formatNumber(level.target);
            }
        } catch (error) {
            console.error("Ошибка обновления информации:", error);
        }
    }
    
    activateBonus(bonusType) {
    try {
        console.log(`Активируем бонус: ${bonusType}`);
        
        // Проверяем достаточно ли XP
        if (this.xp < this.bonusCosts[bonusType]) {
            this.showLoveMessage(`Потрібно ${this.bonusCosts[bonusType]} очків кохання! ❤️‍🔥`);
            return;
        }
        
        // Если бонус "shuffle" - сразу используем
        if (bonusType === 'shuffle') {
            this.xp -= this.bonusCosts.shuffle;
            this.shuffleGrid();
            this.showLoveMessage("Поле перемішано з любов'ю! 💫");
            this.updateBonusButtons();
            this.saveGameProgress();
            return;
        }
        
        // Для destroy и explosion - активируем режим выбора
        if (this.activeBonus === bonusType) {
            // Уже активен этот бонус - ничего не делаем, ждем выбора клетки
            this.showLoveMessage(`Обери клітинку для бонусу "${this.getBonusName(bonusType)}" 🎯`);
            return;
        }
        
        // Активируем новый бонус
        this.activeBonus = bonusType;
        this.updateBonusButtons();
        this.render();
        this.showLoveMessage(`Обери клітинку для бонусу "${this.getBonusName(bonusType)}" 🎯`);
        
    } catch (error) {
        console.error("Помилка активації бонуса:", error);
    }
}

getBonusName(bonusType) {
    const names = {
        'destroy': 'Розбити',
        'explosion': 'Вибух кохання',
        'shuffle': 'Перемішати'
    };
    return names[bonusType] || bonusType;
}
    
    shuffleGrid() {
        try {
            const all = [];
            for (let x = 0; x < this.GRID_W; x++) {
                for (let y = 0; y < this.GRID_H; y++) {
                    all.push(this.grid[x][y].number);
                }
            }
            
            for (let i = all.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [all[i], all[j]] = [all[j], all[i]];
            }
            
            let k = 0;
            for (let x = 0; x < this.GRID_W; x++) {
                for (let y = 0; y < this.GRID_H; y++) {
                    this.grid[x][y].number = all[k++];
                }
            }
            
            this.render();
        } catch (error) {
            console.error("Ошибка перемешивания сетки:", error);
        }
    }
    
    useDestroyBonus(x, y) {
    try {
        console.log(`Використовуємо бонус розбиття на ${x},${y}`); // ДЛЯ ДЕБАГА
        
        // Проверяем достаточно ли XP
        if (this.xp < this.bonusCosts.destroy) {
            this.showLoveMessage("Недостатньо очків для бонусу! ❤️‍🔥");
            this.activeBonus = null;
            this.updateInfo();
            this.updateBonusButtons();
            this.saveGameProgress();
            return;
        }
        
        this.grid[x][y].number = this.getRandomInitialNumber();
        this.xp -= this.bonusCosts.destroy;
        this.activeBonus = null;
        this.updateBonusButtons();
        this.render();
        this.updateInfo();
        this.showLoveMessage("Клітинку розбито з любов'ю! 💖");
        
        this.saveGameProgress();
        
    } catch (error) {
        console.error("Помилка використання бонусу руйнування:", error);
    }
}

useExplosionBonus(x, y) {
    try {
        console.log(`Використовуємо бонус вибуху на ${x},${y}`); // ДЛЯ ДЕБАГА
        
        // Проверяем достаточно ли XP
        if (this.xp < this.bonusCosts.explosion) {
            this.showLoveMessage("Недостатньо очків для бонусу! ❤️‍🔥");
            this.activeBonus = null;
            this.updateInfo();
            this.updateBonusButtons();
            this.saveGameProgress();
            return;
        }
        
        let affectedCells = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < this.GRID_W && ny >= 0 && ny < this.GRID_H) {
                    this.grid[nx][ny].number = this.getRandomInitialNumber();
                    affectedCells++;
                }
            }
        }
        
        this.xp -= this.bonusCosts.explosion;
        this.activeBonus = null;
        this.updateBonusButtons();
        this.render();
        this.updateInfo();
        this.showLoveMessage(`Вибух кохання! Пошкоджено ${affectedCells} клітинок! 💥❤️`);
        
        this.saveGameProgress();
        
    } catch (error) {
        console.error("Помилка використання бонусу вибуху:", error);
    }
}
    
    updateBonusButtons() {
    try {
        const bonuses = ['destroy', 'shuffle', 'explosion'];
        
        bonuses.forEach(bonus => {
            const btn = document.getElementById(`bonus-${bonus}`);
            if (!btn) return;
            
            const cost = this.bonusCosts[bonus];
            
            if (this.activeBonus === bonus) {
                btn.classList.add('active');
                btn.innerHTML = `✅ ${this.getBonusName(bonus)} <span class="bonus-cost">${cost}</span>`; // Добавляем галочку
            } else {
                btn.classList.remove('active');
                btn.innerHTML = `${this.getBonusEmoji(bonus)} ${this.getBonusName(bonus)} <span class="bonus-cost">${cost}</span>`;
            }
            
            if (this.xp < cost && this.activeBonus !== bonus) {
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }
        });
        
        // Показываем подсказку если бонус активен
        if (this.activeBonus) {
            this.showLoveMessage(`Бонус "${this.getBonusName(this.activeBonus)}" активовано! Клацни на клітинку 🎯`);
        }
    } catch (error) {
        console.error("Ошибка обновления кнопок бонусов:", error);
    }
}

// Добавьте эту функцию для эмодзи
getBonusEmoji(bonusType) {
    const emojis = {
        'destroy': '💖',
        'shuffle': '🔄', 
        'explosion': '💥'
    };
    return emojis[bonusType] || '🎁';
}

    autoNextLevel() {
        try {
            if (this.currentLevel < this.MAX_LEVEL - 1) {
                setTimeout(() => {
                    this.showLoveMessage(`Автоматичний перехід на рівень ${this.currentLevel + 2} через 3 секунди... ⏱️`);
                    setTimeout(() => {
                        this.initGame(this.currentLevel + 1);
                        this.showLoveMessage(`Рівень ${this.currentLevel + 1}! Нові можливості! 🚀`);
                        
                        // СОХРАНЕНИЕ ПРИ ПЕРЕХОДЕ НА НОВЫЙ УРОВЕНЬ
                        this.saveGameProgress();
                    }, 3000);
                }, 2000);
            } else {
                setTimeout(() => {
                    this.showVictoryScreen();
                }, 2000);
            }
        } catch (error) {
            console.error("Ошибка автоматического перехода на следующий уровень:", error);
        }
    }
    
    checkWin() {
        try {
            const level = this.levels[this.currentLevel];
            
            for (let x = 0; x < this.GRID_W; x++) {
                for (let y = 0; y < this.GRID_H; y++) {
                    if (this.grid[x][y].number === level.target) {
                        this.gameState = 'win';
                        this.showLoveMessage(`Вітаю! Ти досягла цілі ${this.formatNumber(level.target)}! 🎉❤️`);
                        this.autoNextLevel();
                        return;
                    }
                }
            }
            
            if (this.xp >= this.xpToNext) {
                this.showLoveMessage("Ти готова до нового рівня кохання! 💖");
            }
        } catch (error) {
            console.error("Ошибка проверки победы:", error);
        }
    }
    
    nextLevel() {
        try {
            if (this.currentLevel < this.MAX_LEVEL - 1) {
                if (this.xp >= this.xpToNext) {
                    this.initGame(this.currentLevel + 1);
                    this.showLoveMessage(`Рівень ${this.currentLevel + 1}! Нові виклики! 🌟`);
                    
                    // СОХРАНЕНИЕ ПРИ ПЕРЕХОДЕ НА НОВЫЙ УРОВЕНЬ
                    this.saveGameProgress();
                } else {
                    this.showLoveMessage(`Потрібно ${this.xpToNext} очків кохання! ❤️`);
                }
            } else {
                this.showVictoryScreen();
            }
        } catch (error) {
            console.error("Ошибка перехода на следующий уровень:", error);
        }
    }
    
    resetGame() {
        try {
            this.initGame(this.currentLevel);
            
            // СОХРАНЕНИЕ ПОСЛЕ СБРОСА ИГРЫ
            this.saveGameProgress();
        } catch (error) {
            console.error("Ошибка сброса игры:", error);
        }
    }
    
    manualSave() {
        this.saveGameProgress();
        this.showLoveMessage("Гру збережено! 💾");
    }
    
    resetProgress() {
        if (confirm("Точно скинути весь прогрес? Цю дію не можна скасувати!")) {
            this.resetSaveData();
        }
    }
    
    generateLevels(count) {
        const levels = [];
        let target = 64;
        let baseNumbers = [2, 4, 8];
        
        for (let i = 0; i < count; i++) {
            const level = {
                numbers: [...baseNumbers],
                target: target,
                newNumbers: this.generateNewNumbers(target),
                max: baseNumbers[baseNumbers.length - 1],
                xpToNext: 10 + Math.floor(i * 2.5)
            };
            
            levels.push(level);
            
            target *= 2;
            
            if (i % 3 === 2 && baseNumbers.length < 5) {
                baseNumbers.push(baseNumbers[baseNumbers.length - 1] * 2);
            }
            
            if (i >= 15 && baseNumbers.length < 6) {
                baseNumbers.push(baseNumbers[baseNumbers.length - 1] * 2);
            }
        }
        
        return levels;
    }
    
    generateNewNumbers(target) {
        const newNumbers = [];
        let num = target / 8;
        for (let i = 0; i < 8; i++) {
            if (num <= target) {
                newNumbers.push(num);
                num *= 2;
            }
        }
        return newNumbers;
    }
}

// Инициализация игры
function initializeGame() {
    try {
        if (window.Telegram?.WebApp) {
            Telegram.WebApp.ready();
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            window.game = new LoveNumberPuzzle();
        });
    } catch (error) {
        console.error("Ошибка инициализации игры:", error);
        document.addEventListener('DOMContentLoaded', () => {
            window.game = new LoveNumberPuzzle();
        });
    }
}

initializeGame();