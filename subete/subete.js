document.addEventListener('DOMContentLoaded', () => {
    // ページの読み込み時に訪問者数をカウント
    let count = localStorage.getItem('visitorCount');
    if (count === null) {
      count = 0;
    } else {
      count = parseInt(count, 10);
    }
  
    count++;
    localStorage.setItem('visitorCount', count);
    
    // カウンターの表示を更新（この時点では非表示）
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = count;
    }
});

// 管理者用コマンドをコンソールで実行
function showVisitorCount() {
    const counterWrapper = document.getElementById('counter-wrapper');
    if (counterWrapper) {
        counterWrapper.style.display = 'block';
        console.log('来場者カウンターを表示しました。');
    }
}

// ユーザーがコンソールで関数を実行できるようにグローバルスコープに公開
window.showVisitorCount = showVisitorCount;