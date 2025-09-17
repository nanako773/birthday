document.addEventListener('DOMContentLoaded', () => {
    const seal = document.getElementById('seal');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    
    seal.addEventListener('click', () => {
        // 封筒のフラップを開けるアニメーション
        envelope.classList.add('open');
        
        // アニメーションが終わるのを待ってから手紙を出す
        setTimeout(() => {
            letter.classList.add('show');
            seal.style.display = 'none'; // 封印を非表示にする
            envelope.style.display = 'none'; // ★封筒全体を非表示にする
        }, 1000); // CSSのtransition時間(1s)に合わせる
    });
});