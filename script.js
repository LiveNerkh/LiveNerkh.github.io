  // دریافت قیمت زنده دلار
function fetchPrice() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const price = data.rates.IRR;
            document.getElementById('live-price').innerText = `قیمت دلار: ${price} تومان`;
        })
        .catch(() => {
            document.getElementById('live-price').innerText = 'خطا در دریافت قیمت';
        });
}

// دریافت خودکار اخبار از RSS
function fetchNews() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.isna.ir/rss')
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            newsList.innerHTML = '';
            data.items.slice(0, 5).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
                newsList.appendChild(li);
            });
        })
        .catch(() => {
            document.getElementById('news-list').innerHTML = '<li>خطا در دریافت اخبار</li>';
        });
}

// اجرای اولیه
fetchPrice();
fetchNews();

// به‌روزرسانی هر 1 دقیقه
setInterval(fetchPrice, 60000);
setInterval(fetchNews, 60000);
