const API_KEY = "ae3dc8ce5d24dd81f5b47604f260a628";
const BASE_URL = "https://api.themoviedb.org/3";

let data;

async function loadData(){
    const content = await fetch('data.json')
    data = await content.json()
}
loadData()

function getRandomMovie() {
    const index = Math.floor(Math.random() * data.length)
    return data[index]              
}

document.getElementById('btn').addEventListener('click', async () => {
    const random = getRandomMovie()
    document.querySelector('.container').style.display = 'flex'  

    const search = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${random.name}`)
    const searchResult = await search.json()
    const movieID = searchResult.results[0].id

    const summary = await fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=pt-BR`)
    const summaryPt = await summary.json()
    if(!summaryPt.overview){
      document.getElementById('desc').textContent = `Em 1965, o governo da Indonésia foi derrubado por militares que, ao assumirem o 
      poder, passaram a assassinar os opositores acusados de comunistas. Neste documentário, os executores falam e recriam suas ações.`
    } else {
      document.getElementById('desc').textContent = summaryPt.overview
    }
    

    const details = await fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`)
    const detailsEng = await details.json()
    //document.getElementById('pos').textContent = random.rank
    document.getElementById('movie').textContent = `${random.rank} ${detailsEng.title} (${detailsEng.release_date.split("-")[0]})`
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${detailsEng.poster_path}`
    
    const credits = await fetch(`${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`)
    const creditsRes = await credits.json()
    const director = creditsRes.crew.filter(({job})=> job === 'Director')
    document.getElementById('director').textContent = 'by ' + director[0].name

    document.querySelector('.container').style.display = 'flex'

})