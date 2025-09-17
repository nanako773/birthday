// 誕生日を設定（月は0から始まるので、9月は8になります）
const birthday = new Date(new Date().getFullYear(), 8, 23, 7, 3, 0);

const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 8, 23, 7, 3, 0);

    // 今年が終わっている場合は、来年の誕生日を設定
    if (now > targetDate) {
        targetDate = new Date(now.getFullYear() + 1, 8, 23);
    }
    
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
        countdownElement.innerHTML = `${days}日`;
    } else {
        countdownElement.innerHTML = `${hours}時間 ${minutes}分 ${seconds}秒`;
    }
}

// ページ読み込み時に1度実行
updateCountdown();

// 1秒ごとに更新
setInterval(updateCountdown, 1000);



    // ▼ここを、表示させたい日時に合わせて修正してください
    // 月は0から始まるので、10月は9になります
    const targetDate = new Date(2025, 9, 16, 21, 3); // 例: 2025年10月23日15時00分
    
    // 表示させる要素を取得
    const myLink = document.getElementById('my-link');
    const myMessage = document.getElementById('my-message');

    function checkTime() {
        const now = new Date();
        
        // 現在の日時が目標の日時を過ぎていたら表示
        if (now >= targetDate) {
            myLink.style.display = 'block'; // aタグを表示
            myMessage.style.display = 'block'; // pタグを表示
        } else {
            // まだ時間になっていない場合は非表示を維持
            myLink.style.display = 'none';
            myMessage.style.display = 'none';
        }
    }

    // ページ読み込み時に一度実行
    checkTime();

    // 1分ごとにチェックを繰り返す
    setInterval(checkTime, 60000); // 60000ミリ秒 = 1分