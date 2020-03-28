const requests = require('requests');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');


requests('https://ncov.dxy.cn/ncovh5/view/pneumonia')
    .on('data', function (chunk) {
        let window = {};
        const $ = cheerio.load(chunk);
        eval($('#getAreaStat').html());
        const data = window.getAreaStat;
        fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(data), () => {
            console.log('Save successfully!');
        })
    })
    .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);

        console.log('end');
    });