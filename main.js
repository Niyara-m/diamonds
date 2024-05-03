let points = 1000
let username = 'Yura'
let pointBtns = document.querySelectorAll('.point')
let gameId
let level

getUser()

pointBtns.forEach( point => {
    point.addEventListener('click', setPoints)
})

document.querySelector('#gameButton').addEventListener('click', startOrStopGame)

function setPoints() {
    let userBtn = event.target

    document.querySelector('.point.active').classList.remove('active')

    userBtn.classList.add('active')
    points = +userBtn.innerHTML
}

function startOrStopGame(){
    let gameBtn = event.target
    let action =gameBtn.getAttribute('data-action')
    if(action == "stop") {
        //Закончить игру
        let isWon  = stopGame()
        if (isWon){
            gameBtn.innerHTML = "Играть"
            gameBtn.setAttribute('data-action', "start")
        }
    } else {
        // Начать игру 
        let isStartGame = newGame()

        if(isStartGame){
            gameBtn.innerHTML = "Закончить игру"
            gameBtn.setAttribute('data-action', "stop")
            level = 1
            activatedLine()
        }
    }

}

async function sendRequest(url, method, data) {
    url = `https://tg-api.tehnikum.school/tehnikum_course/${url}`
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        return response
    }
}


async  function getUser() {
    let user = await sendRequest(
        "get_user",
        "POST",
        {"username": username}
    )
    if (user.error) {
        alert(user.message)
    } else {
        let userInfo = document.querySelector(".userInfo")
        userInfo.innerHTML=`[Логин: ${user.username}, Баланс: ${user.balance}]`
    }
}

async function newGame() {
    let newGame = await sendRequest(
        "new_game",
        "POST",
        {"username": username, "points": +points,}
    )

    if (newGame.error) {
        alert(newGame.message)
        return false
    } else {
        gameId = newGame.game_id
        console.log(gameId)
        return true
    }
}

async function stopGame() {
    let stop = await sendRequest("game_win","POST",
        {
            "username": username,
            "game_id": gameId,
            "level": level,
        }
    )
    console.log(stop)
    if (stop.error) {
        alert(stop.message)
        return false
    } else {
        getUser()
        return true
    }
}

function activatedLine(){
    let gameBlocks = document.querySelectorAll(".line:last-child .gameBlock")
    gameBlocks.forEach((elem, i) => {
        setInterval(()=> elem.classList.add("active"), 50*i)
    })
}