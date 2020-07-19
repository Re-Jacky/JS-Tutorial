const guessInput = document.getElementById('guess-input')
const submitBtn = document.getElementById('guess-value')
const minNum = document.querySelector('span.min-num')
const maxNum = document.querySelector('span.max-num')
const message = document.querySelector('.message')
const game = document.querySelector('.game')



let min = 1,
    max = 10,
    retry = 3,
    number = getRandomNum(min,max)
    


minNum.textContent = min
maxNum.textContent = max


submitBtn.addEventListener('click',compareGuess)

game.addEventListener('mousedown',function(e){
    if (e.target.className === 'play-again'){
        window.location.reload()
    }
})


function compareGuess(e){
    let guess = parseInt(guessInput.value)
    if (isNaN(guess)){
        generateMessage("Please input your guess.",'red')
    } else if (guess >max || guess< min){
        generateMessage(`Please input a number between ${min} and ${max}`,'red')
    } 

    else if (guess ===number){
        gameOver(true, `${number} is correct! YOU WIN!!!`, 'green')
    } else{
        retry -= 1
        if(retry === 0){
            gameOver(false,`Game over, you lost, the correct num is ${number}`)
        }else {
            guessInput.style.borderColor = 'red'
            guessInput.value = ''
            generateMessage(`${guess} is not correct, you have ${retry} times left`,'red')
        }
    }
}

function gameOver(won,msg){
    let color 
    won === true? color = 'green' : color = 'red'
    guessInput.disabled = true
    guessInput.style.borderColor = color
    generateMessage(msg,color)
    playAgain()
}   

function playAgain(){
    submitBtn.value = 'Play Again'
    submitBtn.className = 'play-again'
}

function generateMessage(msg,color){
    message.style.color = color
    message.textContent=msg
}

function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+1)
}