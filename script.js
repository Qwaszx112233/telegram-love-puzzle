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
            "Ти - відповідь на всі мої молитви 🙏"
        ];
        
        this.GRID_W = 5;
        this.GRID_H = 8;
        this.bonusCosts = { destroy: 5, shuffle: 10, explosion: 20 };
        
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
        
        this.createFloatingHearts();
        this.initializeEventListeners();
        this.showScreen('mainMenu');
        
        document.addEventListener('dblclick', (e) => e.preventDefault());
    }
    
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
            
            document.getElementById('settingsBtn').addEventListener('click', () => {
                this.showScreen('settings');
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
            
            document.getElementById('bonus-destroy').addEventListener('click', () => this.activateBonus('destroy'));
            document.getElementById('bonus-shuffle').addEventListener('click', () => this.activateBonus('shuffle'));
            document.getElementById('bonus-explosion').addEventListener('click', () => this.activateBonus('explosion'));
            
            document.addEventListener('contextmenu', e => e.preventDefault());
            
        } catch (error) {
            console.error("Ошибка инициализации обработчиков событий:", error);
        }
    }
    
    startGame() {
        try {
            this.initGame(0);
            this.showScreen('game');
        } catch (error) {
            console.error("Ошибка запуска игры:", error);
        }
    }
    
    initGame(levelNum = 0) {
        try {
            this.currentLevel = levelNum;
            const level = this.levels[this.currentLevel];
            
            this.xp = 0;
            this.xpToNext = level.xpToNext;
            this.maxNumber = level.max;
            this.selected = [];
            this.isDragging = false;
            this.chainNumbers = [];
            this.grid = [];
            this.activeBonus = null;
            this.gameState = 'playing';
            this.messageCount = 0;
            
            document.getElementById('messageCount').textContent = '0';
            
            for (let x = 0; x < this.GRID_W; x++) {
                this.grid[x] = [];
                for (let y = 0; y < this.GRID_H; y++) {
                    this.grid[x][y] = { 
                        number: level.numbers[Math.floor(Math.random() * level.numbers.length)], 
                        merged: false 
                    };
                }
            }
            
            this.render();
            this.updateInfo();
            this.showLoveMessage("Об'єднуй числа та отримуй любовні фрази! 💕");
            this.updateBonusButtons();
            this.showLevelSelect();
            
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
                    
                    cell.addEventListener('mousedown', (e) => this.handleCellStart(e, x, y));
                    cell.addEventListener('touchstart', (e) => this.handleCellStart(e, x, y), { passive: false });
                    
                    const inner = document.createElement('div');
                    inner.className = 'cell-inner';
                    inner.textContent = this.formatNumber(this.grid[x][y].number);
                    cell.appendChild(inner);
                    
                    gridDiv.appendChild(cell);
                }
            }
            
            document.addEventListener('mousemove', (e) => this.handleMove(e));
            document.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
            document.addEventListener('mouseup', () => this.handleEnd());
            document.addEventListener('touchend', () => this.handleEnd());
            
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
    
    handleEnd() {
        if (!this.isDragging) return;
        
        try {
            if (this.selected.length >= 2) {
                this.mergeChain();
            } else {
                this.selected = [];
                this.chainNumbers = [];
                this.render();
            }
            
            this.isDragging = false;
        } catch (error) {
            console.error("Ошибка обработки завершения выбора:", error);
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
            
            setTimeout(() => {
                for (let x = 0; x < this.GRID_W; x++) {
                    for (let y = 0; y < this.GRID_H; y++) {
                        this.grid[x][y].merged = false;
                    }
                }
                
                this.render();
                this.checkWin();
            }, 350);
            
            this.selected = [];
            this.chainNumbers = [];
            this.render();
            this.updateInfo();
            this.updateBonusButtons();
        } catch (error) {
            console.error("Ошибка объединения цепочки:", error);
        }
    }
    
    showRandomLoveMessage(chainLength) {
        try {
            this.messageCount++;
            document.getElementById('messageCount').textContent = this.messageCount;
            
            let message;
            if (chainLength >= 6) {
                message = "Вау! Ти геній кохання! 💖 Наша любов така ж сильна!";
            } else if (chainLength >= 4) {
                message = "Чудово! Наша любов росте як твої навички! 🌟";
            } else {
                const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
                message = this.loveMessages[randomIndex];
            }
            
            this.showLoveMessage(message);
            this.createHeartsAnimation();
        } catch (error) {
            console.error("Ошибка показа сообщения:", error);
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
        return level.numbers.includes(num) || level.newNumbers.includes(num);
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
            if (this.activeBonus === bonusType) {
                this.activeBonus = null;
                this.updateBonusButtons();
                this.render();
                return;
            }
            
            if (this.xp < this.bonusCosts[bonusType]) {
                this.showLoveMessage("Недостатньо очків кохання! ❤️‍🔥");
                return;
            }
            
            if (bonusType === 'shuffle') {
                this.xp -= this.bonusCosts.shuffle;
                this.shuffleGrid();
                this.showLoveMessage("Поле перемішано з любов'ю! 💫");
                this.updateBonusButtons();
                return;
            }
            
            this.activeBonus = bonusType;
            this.updateBonusButtons();
            this.render();
            this.showLoveMessage("Бонус активовано! 💫");
        } catch (error) {
            console.error("Ошибка активации бонуса:", error);
        }
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
            this.grid[x][y].number = this.getRandomInitialNumber();
            this.xp -= this.bonusCosts.destroy;
            this.activeBonus = null;
            this.updateBonusButtons();
            this.render();
            this.updateInfo();
            this.showLoveMessage("Клітинку розбито з любов'ю! 💖");
        } catch (error) {
            console.error("Ошибка использования бонуса разрушения:", error);
        }
    }
    
    useExplosionBonus(x, y) {
        try {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    
                    if (nx >= 0 && nx < this.GRID_W && ny >= 0 && ny < this.GRID_H) {
                        this.grid[nx][ny].number = this.getRandomInitialNumber();
                    }
                }
            }
            
            this.xp -= this.bonusCosts.explosion;
            this.activeBonus = null;
            this.updateBonusButtons();
            this.render();
            this.updateInfo();
            this.showLoveMessage("Вибух кохання! 💥❤️");
        } catch (error) {
            console.error("Ошибка использования бонуса взрыва:", error);
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
                } else {
                    btn.classList.remove('active');
                }
                
                if (this.xp < cost && this.activeBonus !== bonus) {
                    btn.disabled = true;
                } else {
                    btn.disabled = false;
                }
            });
        } catch (error) {
            console.error("Ошибка обновления кнопок бонусов:", error);
        }
    }
    
    showLevelSelect() {
        try {
            const sel = document.getElementById('level-select');
            if (!sel) return;
            
            sel.innerHTML = "";
            
            for (let i = 0; i < this.levels.length; i++) {
                const btn = document.createElement('button');
                btn.className = "level-btn";
                btn.textContent = i + 1;
                
                if (i === this.currentLevel) {
                    btn.classList.add("selected");
                }
                
                btn.addEventListener('click', () => {
                    this.currentLevel = i;
                    this.initGame(i);
                });
                
                sel.appendChild(btn);
            }
        } catch (error) {
            console.error("Ошибка показа выбора уровня:", error);
        }
    }
    
    autoNextLevel() {
        try {
            if (this.currentLevel < this.MAX_LEVEL - 1) {
                setTimeout(() => {
                    this.showLoveMessage(`Автоматичний перехід на рівень ${this.currentLevel + 2} через 3 секунди... ⏱️`);
                    setTimeout(() => {
                        this.initGame(this.currentLevel + 1);
                        this.showLoveMessage(`Рівень ${this.currentLevel + 1}! Нові можливості! 🚀`);
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
        } catch (error) {
            console.error("Ошибка сброса игры:", error);
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