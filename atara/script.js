document.addEventListener('DOMContentLoaded', () => {
    // ▼ ここをサプライズを公開したい日時に設定してください。
    // 例: 2025年10月23日15時00分00秒
    const targetDate = new Date(2025, 8, 23, 7, 3, 0); 
    
    // 表示させる要素
    const countdownSection = document.getElementById('countdown-section');
    const countdownText = document.getElementById('countdown-text');
    const readySection = document.getElementById('ready-section');

    function updatePage() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            // 時間を過ぎたら「更新してね」のメッセージを表示
            countdownSection.style.display = 'none';
            readySection.style.display = 'block';
        } else {
            // まだ時間になっていない場合はカウントダウンを表示
            countdownSection.style.display = 'block';
            readySection.style.display = 'none';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) {
                countdownText.textContent = `${days}日 ${hours}時間`;
            } else {
                countdownText.textContent = `${hours}時間 ${minutes}分 ${seconds}秒`;
            }
        }
    }

    // 1秒ごとに更新
    setInterval(updatePage, 1000);
    // 初回実行
    updatePage();
});