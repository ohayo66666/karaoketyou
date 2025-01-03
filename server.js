const express = require('express');
const Airtable = require('airtable');
const path = require('path');

const app = express();
const port = 3000;

const apiKey = 'patwjHZtEqvMsKIa5.0cfa4d8b0378c6617593c379671d2fd3e03dc2fe05a971f25598046838875522'; 
const baseId = 'appwZI1fI2TvlsnFA';
const tableName = 'tblx8EMhrtRnVyEfh';

const base = new Airtable({ apiKey }).base(baseId);

// 静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

// /ルートにアクセスしたときの処理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /data にアクセスしたときにAirtableからデータを取得
app.get('/data', (req, res) => {
  base(tableName)
    .select({ maxRecords: 10, view: 'Grid view' })
    .eachPage(
      (records, fetchNextPage) => {
        const data = records.map((record) => record.fields);
        res.json(data);
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data');
        }
      }
    );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});