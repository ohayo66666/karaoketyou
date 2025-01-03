import Airtable from './airtable.browser.js';

// 新しいACCESSトークン
const apiKey = 'patwjHZtEqvMsKIa5'; 
const baseId = 'appwZI1fI2TvlsnFA';
const tableName = 'tblx8EMhrtRnVyEfh';

// Airtableのインスタンス作成
const airtable = new Airtable({ apiKey });
const base = airtable.base(baseId);

base(tableName).select({
    maxRecords: 3,
    view: 'Grid view'
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(record => {
        console.log(record.fields);
    });
    fetchNextPage();
}, function done(err) {
    if (err) {
        console.error(err);
        return;
    }
});
