const pinyin = require("pinyin");

function getPinYin(string) {
    return pinyin(string, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格，返回拼音字符串，不带音标
    }).map(item => item[0]).join('');
}

module.exports = {
    getPinYin,
};
