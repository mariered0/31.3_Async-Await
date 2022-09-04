url = 'http://numbersapi.com/'

//Part 1 - #1
const favoriteNum = 29
async function favoriteNumFact(){
    const res = await axios.get(`${url}${favoriteNum}/?json`)
    console.log(res)
}
favoriteNumFact();



//#2
const favNums = [10, 29, 19, 87]

async function multiNumFacts(){
    const res = await axios.get(`${url}${favNums}/?json`)
    console.log(res.data);
}
multiNumFacts();

//#3
const $divMultiFavNums = $('#multi-fav-nums')

async function showFavNumFacts(){
    const promises = []
    for (let i = 0; i < 4; i ++){
        promises.push(await axios.get(`${url}${favoriteNum}/?json`))
        }
    Promise.all(promises);
    for (let i = 0; i < 4; i ++){
        const {data:{ text }} = promises[i]
        $divMultiFavNums.append(`<p>${text}</p>`)
    }
}

showFavNumFacts();






