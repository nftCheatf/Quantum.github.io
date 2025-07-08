// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Закрываем все открытые ответы
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer && !item.classList.contains('hidden')) {
                    item.classList.add('hidden');
                    item.previousElementSibling.querySelector('i').classList.remove('rotate-180');
                }
            });
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Переключение валют
    const currencyButtons = {
        'currencyUah': { 
            button: document.getElementById('currencyUah'), 
            prices: document.querySelectorAll('.uah-price'), 
            others: ['.usd-price', '.rub-price'],
            exchangeRate: 1
        },
        'currencyUsd': { 
            button: document.getElementById('currencyUsd'), 
            prices: document.querySelectorAll('.usd-price'), 
            others: ['.uah-price', '.rub-price'],
            exchangeRate: 0.024 // Примерный курс
        },
        'currencyRub': { 
            button: document.getElementById('currencyRub'), 
            prices: document.querySelectorAll('.rub-price'), 
            others: ['.uah-price', '.usd-price'],
            exchangeRate: 2.4 // Примерный курс
        }
    };

    function switchCurrency(activeId) {
        // Обновляем кнопки
        for (const [id, data] of Object.entries(currencyButtons)) {
            if (id === activeId) {
                data.button.classList.remove('bg-gray-700');
                data.button.classList.add('bg-blue-600');
                
                // Обновляем цены
                data.prices.forEach(price => {
                    const originalPrice = parseFloat(price.dataset.original || price.textContent);
                    const convertedPrice = (originalPrice * data.exchangeRate).toFixed(2);
                    price.textContent = convertedPrice;
                    price.classList.remove('hidden');
                });
                
                // Скрываем другие валюты
                data.others.forEach(otherClass => {
                    document.querySelectorAll(otherClass).forEach(el => el.classList.add('hidden'));
                });
            } else {
                data.button.classList.remove('bg-blue-600');
                data.button.classList.add('bg-gray-700');
            }
        }
    }

    // Сохраняем оригинальные цены
    document.querySelectorAll('.uah-price').forEach(price => {
        price.dataset.original = price.textContent;
    });

    // Инициализация валют
    switchCurrency('currencyUah');

    // Обработчики кликов
    document.getElementById('currencyUah').addEventListener('click', () => switchCurrency('currencyUah'));
    document.getElementById('currencyUsd').addEventListener('click', () => switchCurrency('currencyUsd'));
    document.getElementById('currencyRub').addEventListener('click', () => switchCurrency('currencyRub'));

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                const mobileMenu = document.getElementById('mobileMenu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Анимация при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .price-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Таймер обратного отсчета для акции
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const diff = endOfDay - now;
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Инициализация таймера, если есть элемент
    if (document.getElementById('countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});