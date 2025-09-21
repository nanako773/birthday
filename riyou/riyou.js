// 強制リロードを実行する時間（時と分）を設定します
// 例：午後3時30分に更新したい場合は、'15:30'と設定します
const reloadTime = '07:03'; // ここに更新したい時間をHH:mm形式で入力してください

function checkAndReload() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 現在の時間と設定された時間が一致するか確認します
  if (currentTime === reloadTime) {
    // 時間が一致したらページを強制的にリロードします
    location.reload(true);
  }
}

// 1分ごとに時間をチェックします
setInterval(checkAndReload, 60000);

// 初回実行
checkAndReload();