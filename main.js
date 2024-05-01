let points = 1000

let pointBtns = document.querySelectorAll('.point')
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

        gameBtn.innerHTML = "Играть"
        gameBtn.setAttribute('data-action', "start")
    } else {
        // Начать игру 

        gameBtn.innerHTML = "Закончить игру"
        gameBtn.setAttribute('data-action', "stop")

    }

}