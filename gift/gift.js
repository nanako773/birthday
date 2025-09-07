document.addEventListener('DOMContentLoaded', () => {
    const birthday = new Date(new Date().getFullYear(), 8, 23, 0, 0, 0); // 9月23日 0時0分0秒
    const titleElement = document.getElementById('title');
    const countdownTextElement = document.getElementById('countdown-text');
    const giftBoxContainer = document.getElementById('gift-box-container');
    const countdownContainer = document.getElementById('countdown-container');
    const giftBox = document.getElementById('gift-box');
    const openButton = document.getElementById('open-button');
    const messageCard = document.getElementById('message-card');

    function updatePage() {
        const now = new Date();
        const diff = birthday - now;
        
        // 9月23日かどうかをチェック（その日じゅう）
        const isBirthday = (now.getFullYear() === birthday.getFullYear() && 
                            now.getMonth() === birthday.getMonth() && 
                            now.getDate() === birthday.getDate());

        if (isBirthday) {
            titleElement.textContent = "🎁 HAPPY BIRTHDAY 🎁";
            countdownContainer.style.display = 'none';
            giftBoxContainer.style.display = 'flex';
        } else {
            titleElement.textContent = "僕の誕生日まであと...";
            countdownContainer.style.display = 'block';
            giftBoxContainer.style.display = 'none';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) {
                countdownTextElement.textContent = `${days}日`;
            } else {
                countdownTextElement.textContent = `${hours}時間 ${minutes}分 ${seconds}秒`;
            }
        }
    }

    openButton.addEventListener('click', () => {
        giftBox.classList.add('open');
        setTimeout(() => {
            messageCard.classList.add('show');
            openButton.style.display = 'none';
        }, 1000); // アニメーション時間に合わせて調整
    });

    // 1秒ごとに更新
    setInterval(updatePage, 1000);
    // 初回実行
    updatePage();
});