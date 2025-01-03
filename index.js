const Airtable = require('airtable');

const apiKey = 'patwjHZtEqvMsKIa5.0cfa4d8b0378c6617593c379671d2fd3e03dc2fe05a971f25598046838875522'; 
const baseId = 'appwZI1fI2TvlsnFA';
const tableName = 'tblx8EMhrtRnVyEfh';

const base = new Airtable({ apiKey }).base(baseId);

base(tableName)
  .select({ maxRecords: 3, view: 'Grid view' })
  .eachPage(
    (records, fetchNextPage) => {
      records.forEach((record) => {
        console.log(record.fields);
      });
      fetchNextPage();
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );