//Part 2

const url = 'https://deckofcardsapi.com/api/deck/'
let game = false;
let deckId;

//#1
async function cardDraw(){
    const res = await axios.get(`${url}new/draw/`)
    const suit = res.data.cards[0].suit.toLowerCase();
    const value = res.data.cards[0].value.toLowerCase();
    console.log('#1', `${value} of ${suit}`);
}
cardDraw();

//#2
let firstCard;
async function twoCardDraw(){
    const res = await axios.get(`${url}new/draw`)
    firstCard = res.data.cards[0];
    deckId = res.data.deck_id;
    const secondRes = await axios.get(`${url}${deckId}/draw/`);
    const secondCard = secondRes.data.cards[0];
    [firstCard, secondCard].forEach(function(card){
        console.log('#2', `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
    });
}

twoCardDraw();

//#3
async function processBtn(evt) {
    evt.preventDefault();
    // making request to shuffle the cards
    if (game == false){
        const res = await axios.get(`${url}new/draw/?count=1`)
        game = true;
        deckId = res.data.deck_id
    }
    //making request to draw a card
    const res = await axios.get(`${url}${deckId}/draw/?count=1`);
    const data = res.data
    showImg(data);
    if (data.remaining == 0) $btn.remove();
}

function showImg (data){
    let img = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    const $imgDiv = $('#img-div');
    $imgDiv.append($('<img>', {
        src: img,
        css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
    }))

}

const $btn = $('#btn');
$btn.on('click', processBtn);
