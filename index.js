 // index.js

const express = require('express'); const fetch = require('node-fetch'); const app = express(); const PORT = process.env.PORT || 3000;

// اجازه دسترسی CORS app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); next(); });

// روت: قیمت ارزها از ExchangeRate app.get('/api/rates', async (req, res) => { try { const response = await fetch('https://api.exchangerate.host/latest?base=USD'); const data = await response.json(); res.json(data); } catch (error) { res.status(500).json({ error: 'Error fetching rates' }); } });

// روت: قیمت رمز ارزها از Coingecko app.get('/api/crypto', async (req, res) => { try { const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usdt&order=market_cap_desc&per_page=100&page=1'); const data = await response.json(); res.json(data); } catch (error) { res.status(500).json({ error: 'Error fetching crypto prices' }); } });

// روت: دریافت اخبار از تسنیم app.get('/api/news', async (req, res) => { try { const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.tasnimnews.com/fa/rss/allnews'); const data = await response.json(); res.json(data); } catch (error) { res.status(500).json({ error:

