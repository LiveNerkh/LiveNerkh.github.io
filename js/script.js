
// 📄 js/script.js
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
            `دلار: ${dollar} | یورو: ${euro} | طلا: ${gold} | سکه: ${coin} | تتر: ${usdt}`;

    } catch (e) {
        console.error('خطا در دریافت قیمت‌ها:', e);
        document.getElementById('ticker-content').innerText = 'خطا در دریافت قیمت‌ها!';
    }
}

loadPrices();
setInterval(loadPrices, 60000);
  
