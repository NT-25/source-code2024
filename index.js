//カードを入れる配列を作成
const cards = [];
const row = [0, 1];
const line = [0, 1, 2, 3];

//オブジェクトをつくる
function Card(row, line){
    this.row = row;
    this.line = line;
    this.front = `result${this.row}${this.line}.jpg`;
    this.link = `result${this.row}${this.line}.html`;
}

//カード情報を配列に格納
for(let i=0; i<row.length; i++) {
    for(let j=0; j<line.length; j++) {
        let card = new Card(row[i], line[j]);
        cards.push(card);
    }
}

//カードをシャッフルした後に表示
const table = document.querySelector(".table");
function shuffle(arrays) {
    const array = arrays.slice();
    for(let i = array.length - 1; i>=0; i--) {
       const randomIndex = Math.floor(Math.random()*(i+1));
       [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

function shuffleCard(){
    const shuffled = shuffle(cards);
    for(let i = 0; i < row.length; i++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for(let j = 0; j< line.length; j++) {
            const td = document.createElement("td");
            td.classList.add('card', 'back'); 
            td.onclick = flip;
            td.style.backgroundImage = `url(./${shuffled[i*4+j].front})`;
            td.card = shuffled[i*4+j];
            tr.appendChild(td);
        }
    }
}
shuffleCard();

//カードをフリップした後に結果ページへ飛ぶ
function flip(e){
    let flipCard = e.target;
    flipCard.classList.remove('back');
    const link = flipCard.card.link;
    setTimeout(() => {
        window.location.href = link;
    }, 500);
};