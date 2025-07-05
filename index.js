 const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// تابع تبدیل اعداد فارسی به انگلیسی
function faToEnNumbers(str) {
  const faNums = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  const enNums = ['0','1','2','3','4','5','6','7','8','9'];
  let result = '';
  for(let ch of str){
    const index = faNums.indexOf(ch);
    result += index >= 0 ? enNums[index] : ch;
  }
  return result;
}

app.get('/api/gold', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.tgju.org/profile/mt18');
    const $ = cheerio.load(data);

    // استخراج قیمت طلا 18 عیار
    let priceText = $('.profile-table .table tbody tr')
      .first()
      .find('td.price')
      .text()
      .trim();

    priceText = faToEnNumbers(priceText);
    const price = parseInt(priceText.replace(/,/g, ''));

    if (isNaN(price)) throw new Error('قیمت نامعتبر است');

    res.json({ price });
  } catch (error) {
    console.error('Error fetching gold price:', error.message);
    res.status(500).json({ error: 'خطا در دریافت داده از TGJU' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
