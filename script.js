async function loadSongs() {
    try {
        const response = await fetch('output.json'); // JSONファイルを取得
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const songs = await response.json(); // JSONデータを解析
        console.log('Loaded songs:', songs); // デバッグ用
        const songList = document.getElementById('song-list');
        songList.innerHTML = ''; // リストをクリア
        songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.曲名} - ${song.歌手}`;
            songList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading songs:', error);
        const songList = document.getElementById('song-list');
        songList.textContent = 'データの読み込みに失敗しました。';
    }
}

window.onload = loadSongs;