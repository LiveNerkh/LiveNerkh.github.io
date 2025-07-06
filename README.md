  <!DOCTYPE html><html lang="fa">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Nerkh - قیمت آنلاین</title>
    <style>
        body {
            font-family: Tahoma, sans-serif;
            background-color: #f0f2f5;
            color: #333;
            text-align: center;
            padding: 20px;
            direction: rtl;
        }
        h1 {
            color: #2c3e50;
            font-size: 32px;
            margin-bottom: 20px;
        }
        ul {
            list-style: none;
            padding: 0;
            max-width: 400px;
            margin: 0 auto;
            text-align: right;
        }
        li {
            background-color: #fff;
            margin: 8px 0;
            padding: 10px 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-size: 18px;
        }
        .ticker {
            background-color: #ffd700;
            padding: 10px;
            overflow: hidden;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .ticker-content {
            display: inline-block;
            padding-left: 100%;
            animation: scroll 15s linear infinite;
        }
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #777;
        }
        .news-section {
            margin-top: 30px;
            text-align: right;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .news-section h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .news-section ul li {
            font-size: 16px;
        }
        .counter {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>قیمت‌های آنلاین لحظه‌ای</h1><!-- اسلایدر متحرک -->
<div class="ticker">
    <div id="ticker-content" class="ticker-content">در حال دریافت قیمت‌ها...</div>
</div>

<!-- لیست قیمت‌ها -->
<ul id="prices"></ul>

<!-- بخش آمار بازدید -->
<div class="counter" id="visit-counter"></div>

<!-- بخش اخبار -->
<div class="news-section">
    <h2>اخبار لحظه‌ای</h2>
    <ul id="news-list"></ul>
</div>

<div class="footer">بروزرسانی خودکار هر 60 ثانیه</div>

<script>
    const serverURL = 'https://script.google.com/macros/s/AKfycbz5onLLlPoiPsA_ifobSczCxBPM_BUuE5s974lSSDgIweMpaTg2RG3Hg3Eiyu5kOV1sVA/exec';
    const newsURL = 'https://script.google.com/macros/s/AKfycbz5onLLlPoiPsA_ifobSczCxBPM_BUuE5s974lSSDgIweMpaTg2RG3Hg3Eiyu5kOV1sVA/exec?news=1';

    // بارگذاری قیمت‌ها
    async function loadPrices() {
        try {
            const response = await fetch(serverURL);
            const data = await response.json();

            let priceList = `
                <li>دلار: ${data.dollar}</li>
                <li>یورو: ${data.euro}</li>
                <li>درهم امارات: ${data.aed}</li>
                <li>لیر ترکیه: ${data.try}</li>
                <li>پوند انگلیس: ${data.gbp}</li>
                <li>ین ژاپن: ${data.jpy}</li>
                <li>یوان چین: ${data.cny}</li>
                <li>منات آذربایجان: ${data.azn}</li>
                <li>افغانی افغانستان: ${data.afn}</li>
                <li>روبل روسیه: ${data.rub}</li>
                <li>طلا 18 عیار: ${data.gold18}</li>
                <li>سکه امامی: ${data.sekebahar}</li>
                <li>سکه بهار آزادی: ${data.sekheba}</li>
                <li>نیم سکه: ${data.nim}</li>
                <li>ربع سکه: ${data.rob}</li>
                <li>سکه گرمی: ${data.gerami}</li>
                <li>تتر: ${data.usdt}</li>
                <li>آخرین به‌روزرسانی: ${new Date(data.updated).toLocaleString()}</li>
            `;
            document.getElementById('prices').innerHTML = priceList;

            // پر کردن اسلایدر
            document.getElementById('ticker-content').innerText = 
                `دلار: ${data.dollar} | یورو: ${data.euro} | درهم: ${data.aed} | طلا: ${data.gold18} | تتر: ${data.usdt}`;

        } catch (e) {
            console.error('خطا در دریافت قیمت‌ها:', e);
            document.getElementById('ticker-content').innerText = 'خطا در دریافت قیمت‌ها!';
        }
    }

    // بارگذاری اخبار
    async function loadNews() {
        try {
            const response = await fetch(newsURL);
            const data = await response.json();

            let newsList = '';
            data.news.forEach(item => {
                newsList += `<li>${item}</li>`;
            });

            document.getElementById('news-list').innerHTML = newsList;
        } catch (e) {
            console.error('خطا در دریافت اخبار:', e);
            document.getElementById('news-list').innerHTML = '<li>خطا در دریافت اخبار!</li>';
        }
    }

    // شمارنده بازدید
    function updateVisitCounter() {
        const today = new Date().toLocaleDateString();
        let visits = JSON.parse(localStorage.getItem('visits')) || {};
        if (visits[today]) {
            visits[today] += 1;
        } else {
            visits[today] = 1;
        }
        localStorage.setItem('visits', JSON.stringify(visits));
        document.getElementById('visit-counter').innerText = `تعداد بازدید امروز: ${visits[today]}`;
    }

    loadPrices();
    loadNews();
    setInterval(loadPrices, 60000);
    setInterval(loadNews, 300000);
    updateVisitCounter();
</script>

</body>
</html> 
