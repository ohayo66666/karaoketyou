import Airtable from './airtable.browser.js';

// 新しいACCESSトークン
const apiKey = 'patwjHZtEqvMsKIa5'; 
const baseId = 'appwZI1fI2TvlsnFA';
const tableName = 'tblx8EMhrtRnVyEfh';

// Airtableのインスタンス作成
const airtable = Airtable.configure({ apiKey: apiKey });
const base = airtable.base(baseId);

// データを取得する処理
base(tableName).select({
  maxRecords: 3,
  view: 'Grid view'
}).eachPage(function page(records, fetchNextPage) {
  records.forEach(function(record) {
    console.log(record.get('Field Name'));
  });
  fetchNextPage();
}, function done(err) {
  if (err) { console.error(err); return; }
});  // ここで閉じ括弧を追加
