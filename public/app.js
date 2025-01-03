let dataCache = []; // データをキャッシュしてソートやレンダリングに利用
let originalData = []; // 元のデータを保持
let sortOrder = {}; // カラムごとのソート順を保持

// データ取得
fetch('/data')
    .then(response => response.json())
    .then(data => {
        dataCache = data;
        originalData = [...data]; // 元のデータを保持
        renderTable(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('karaoke-table-body').innerHTML = '<tr><td colspan="8">Error loading data</td></tr>';
    });

// テーブル描画
function renderTable(data) {
    const tableBody = document.getElementById('karaoke-table-body');
    tableBody.innerHTML = ''; // 初期化

    data.forEach((row, index) => {
        const tr = document.createElement('tr');

        // Airtableの日付を取得して、フォーマットする
        const dateString = row['日付']; // Airtableの日付（ISO形式）
        let formattedDate = '';
        if (dateString) {
            const date = new Date(dateString);
            formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row['曲名']}</td>
            <td>${row['歌手']}</td>
            <td>${row['作詞']}</td>
            <td>${row['作曲']}</td>
            <td>${formattedDate || ''}</td> <!-- フォーマット済み日付 -->
            <td>${row['タグ'] || ''}</td>
            <td>${row['分類'] || ''}</td>
        `;

        // 詳細表示のイベント
        tr.addEventListener('click', () => {
            showDetails(row);
        });

        tableBody.appendChild(tr);
    });
}

// 詳細表示用モーダル
function showDetails(row) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    document.getElementById('modal-content').innerHTML = `
        <h2>${row['曲名']}</h2>
        <p><strong>歌詞リンク:</strong> <a href="${row['歌詞リンク']}" target="_blank">${row['歌詞リンク']}</a></p>
        <p><strong>DAMリンク:</strong> <a href="${row['DAMリンク']}" target="_blank">${row['DAMリンク']}</a></p>
        <p><strong>詳細:</strong> ${row['詳細']}</p>
        <p><strong>ソートキー:</strong> ${row['sortKey']}</p>
    `;
}

// モーダルを閉じる
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// ソート処理
function sortTable(column, order) {
    const sortedData = [...dataCache].sort((a, b) => {
        if (column === '日付') { // '日付' カラムの場合
            const dateA = new Date(a['日付']); // '日付' カラムを使う
            const dateB = new Date(b['日付']);

            console.log('dateAの値:', dateA); // デバッグ用
            console.log('dateBの値:', dateB); // デバッグ用

            // 日付の比較
            if (dateA > dateB) return order === 'asc' ? 1 : -1;
            if (dateA < dateB) return order === 'asc' ? -1 : 1;
            return 0;
        } else {
            // 他のカラムの場合、通常の比較処理
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            return 0;
        }
    });

    sortOrder[column] = order;
    renderTable(sortedData);
}

// ソートイベント
document.querySelectorAll('.sort-btn').forEach(button => {
    button.addEventListener('click', () => {
        const column = button.dataset.column;
        const order = button.dataset.order;
        sortTable(column, order);
    });
});

// 元に戻るボタン
document.getElementById('reset-button').addEventListener('click', () => {
    dataCache = [...originalData]; // キャッシュを元データに戻す
    renderTable(dataCache);
});
