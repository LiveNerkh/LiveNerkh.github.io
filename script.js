// دریافت قیمت دلار لحظه‌ای (مثال با API رایگان)
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const rate = data.rates.IRR;
        document.getElementById('live-news').innerText = `قیمت دلار: ${rate} تومان`;
    })
    .catch(error => {
        document.getElementById('live-news').innerText = 'عدم دریافت قیمت';
    });

// دریافت اخبار نمونه (می‌تونی به RSS وصل کنی)
const newsList = document.getElementById('news-list');
newsList.innerHTML = `
    <li>قیمت دلار افزایش یافت</li>
    <li>بازار طلا با نوسان همراه است</li>
    <li>بیت‌کوین در مسیر صعودی</li>
`;
