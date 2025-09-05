const digitalClock = document.querySelector('.digital-clock');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const body = document.body;
const messageEl = document.querySelector('.message');

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // デジタル時計の表示
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    digitalClock.textContent = timeString;

    // アナログ時計の針の角度計算
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

    // 針の回転
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    // 時間帯とメッセージの切り替え
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

// 1秒ごとに更新
setInterval(updateClock, 1000);
updateClock();