 // script.js

async function loadPrices() { const res = await fetch('https://alanchand.com/api/price-free?type=currencies'); const prices = await res.json(); const tbody = document.querySelector('tbody'); tbody.innerHTML = '';

let usd, gold, coin, btc;

prices.forEach(item => {
    tbody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.sell.toLocaleString()} تومان</td>
            <td class="${item.sell > item.open ? 'positive' : 'negative'}">
                ${(item.sell - item.open).toLocaleString()}
            </td>
        </tr>
    `;

    if (item.slug === 'usd') usd = item;
    if (item.slug === 'geram18') gold = item;
    if (item.slug === 'sekke-emami') coin = item;
    if (item.slug === 'btc') btc = item;
});

if (usd) updateCard('usd-card', usd);
if (gold) updateCard('gold-card', gold);
if (coin) updateCard('coin-card', coin);
if (btc) updateCard('btc-card', btc);

}

function updateCard(cardId, item) { const card = document.getElementById(cardId); card.querySelector('.price').textContent = ${item.sell.toLocaleString()} تومان; card.querySelector('.change').textContent = ${(item.sell - item.open).toLocaleString()} تومان; card.querySelector('.change').className = (item.sell > item.open) ? 'change positive' : 'change negative'; }

loadPrices(); setInterval(loadPrices, 60000);

