// 右クリックの場合
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  console.log('右クリックは禁止されています。');
});

// Ctrl + Shift + C の場合
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'C') {
    event.preventDefault();
    console.log('開発者ツールの使用は禁止されています。 ');
  }
});

// Ctrl + Shift + L の場合
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'L') {
    event.preventDefault();
    console.log('このショートカットは禁止されています。');
  }
});

// 最初のタイマーを開始
resetInactivityTimer();

const body = document.body;
const messageEl = document.querySelector('.message');

function updateTime() {
    const now = new Date();
    const hours = now.getHours();

    let timeOfDay;
    let messageText;

    if (hours >= 4 && hours < 6) {
        timeOfDay = 'dawn';
        messageText = '夜明けです。新しい一日が始まります。🌅';
    } else if (hours >= 6 && hours < 10) {
        timeOfDay = 'morning';
        messageText = 'おはようございます。朝の光が気持ちいいですね。🌞';
    } else if (hours >= 10 && hours < 14) {
        timeOfDay = 'noon';
        messageText = '昼です。活気あふれる時間帯です。✨';
    } else if (hours >= 14 && hours < 17) {
        timeOfDay = 'afternoon';
        messageText = '午後のひととき。少し休憩しませんか。☕';
    } else if (hours >= 17 && hours < 18) {
        timeOfDay = 'evening';
        messageText = '夕方です。空がオレンジ色に染まります。🌆';
    } else if (hours >= 18 && hours < 20) {
        timeOfDay = 'dusk';
        messageText = '黄昏時です。美しい夕焼けが見えるかもしれません。🌇';
    } else {
        timeOfDay = 'night';
        messageText = '夜です。静かな時間が流れています。🌃';
    }

    body.className = timeOfDay;
    messageEl.textContent = messageText;
}

// 1分ごとに更新
setInterval(updateTime, 60000);
updateTime();