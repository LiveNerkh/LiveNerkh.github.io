

async function loadPrices() {
    const res = await fetch('https://alanchand.com/api/price-free?type=currencies');
    const prices = await res.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

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
    });
}

loadPrices();
setInterval(loadPrices, 60000); // هر ۱ دقیقه آپدیت میشه
