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