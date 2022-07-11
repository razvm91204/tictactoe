const winCon = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]
let gameBoard=['','','','','','','','',''];
let player = new Player('Player', 'X');
let AI = new Ai('AI', 'O');



let squares = Array.from(document.getElementsByClassName('square'));
squares.forEach((e)=>{
     e.addEventListener('click', player.markSign);
})

function Player(name, sign){
    let positions=[];
    this.name=name;
    this.sign=sign;
    function markSign(){
        if(gameBoard[this.dataset.key]==''){
            this.classList.add('me');
            this.classList.remove('hoverable');
            positions.push(parseInt(this.dataset.key));
            renderBoard(this, this.dataset.key, sign)
            if(checkWinner(positions)){
                document.getElementById('status').textContent=`${name} wins!`;
                document.getElementById('status').classList.add('fade');
            }
            else
                AI.makeMove();
        }
        if(gameBoard.indexOf('')<0){
            document.getElementById('status').textContent='Draw!';
            document.getElementById('status').classList.add('fade');
        }
    }
    function logger(){
        console.log(name, gameBoard);
    }
    return {markSign, logger};
}

function checkWinner(positions){
    for(let i = 0; i < winCon.length; i++){
        let win=true;
        for(let j = 0; j < winCon[i].length; j++){
            if(positions.indexOf(winCon[i][j])<0)
                win=false;
        }
        if(win)
            return win;
    }
}

function renderBoard(source, index, sign){
    gameBoard[index]=sign;
    source.textContent=gameBoard[index];
    player.logger()
}

function Ai(name, sign){
    this.name=name;
    this.sign=sign;
    let positions=[];
    function makeMove(){
        if(gameBoard.indexOf('')<0){
            document.getElementById('status').textContent='Draw!';
            document.getElementById('status').classList.add('fade');
        }
        else{
            let move=Math.floor(Math.random()*9);
            if(gameBoard[move]=='')
                markSign('AI', move)
            else
                makeMove();
        }
    }
    function markSign(name, move){
        squares[move].classList.add('enemy');
        // this.classList.add('enemy');
        squares[move].classList.remove('hoverable');
        positions.push(move);
        renderBoard(squares[move], move, sign)
        if(checkWinner(positions)){
            document.getElementById('status').textContent=`${name} wins!`;
            document.getElementById('status').classList.add('fade');
        }
    }
    return {makeMove}; 
}
