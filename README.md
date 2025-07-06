 <!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Nerkh - قیمت آنلاین</title>
    <style>
        body { font-family: Tahoma, sans-serif; background-color: #f0f2f5; color: #333; text-align: center; padding: 20px; direction: rtl; }
        h1 { color: #2c3e50; font-size: 32px; margin-bottom: 20px; }
        ul { list-style: none; padding: 0; max-width: 400px; margin: 0 auto; text-align: right; }
        li { background-color: #fff; margin: 8px 0; padding: 10px 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-size: 18px; }
        .ticker { background-color: #ffd700; padding: 10px; overflow: hidden; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .ticker-content { display: inline-block; padding-left: 100%; animation: scroll 15s linear infinite; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .footer { margin-top: 40px; font-size: 14px; color: #777; }
    </style>
</head>
<body>
    <h1>قیمت‌های آنلاین لحظه‌ای</h1>
    <div class="ticker">
        <div id="ticker-content" class="ticker-content">در حال دریافت قیمت‌ها...</div>
    </div>
    <ul id="prices"></ul>
    <div class="footer">بروزرسانی خودکار هر 60 ثانیه</div>

    <script>
        const apiURL = 'https://api.tgju.online/v1/telegram';

        async function loadPrices() {
            try {
                const response = await fetch(apiURL);
                const json = await response.json();

                const dollar = json.results.dollar.value;
                const euro = json.results.eur.value;
                const gold = json.results.sekee.value;
                const coin = json.results.coin.value;
                const usdt = json.results.usdt.value;

                document.getElementById('prices').innerHTML = `
                    <li>دلار: ${dollar}</li>
                    <li>یورو: ${euro}</li>
                    <li>طلا 18 عیار: ${gold}</li>
                    <li>سکه امامی: ${coin}</li>
                    <li>تتر: ${usdt}</li>
                `;

                document.getElementById('ticker-content').innerText = 
                    `دلار: ${dollar} | یورو: ${euro} | طلا: ${gold} | سکه امامی: ${coin} | تتر: ${usdt}`;

            } catch (e) {
                console.error('خطا در دریافت قیمت‌ها:', e);
                document.getElementById('ticker-content').innerText = 'خطا در دریافت قیمت‌ها!';
            }
        }

        loadPrices();
        setInterval(loadPrices, 60000);
    </script>
</body>
</html> 
