
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
let player = new Player('Player', 'X', []);
let AI = new Ai('AI', 'O', []);
let turn = 'X';

let squares = Array.from(document.getElementsByClassName('square'));
squares.forEach((e)=>{
    e.addEventListener('click', player.markSign);
})

function Player(name, sign, positions){
    this.positions=positions;
    this.name=name;
    this.sign=sign;
    function markSign(){
        if(gameBoard[this.dataset.key]=='' && turn==sign){
            this.classList.add('me');
            this.classList.remove('hoverable');
            positions.push(parseInt(this.dataset.key));
            console.log(positions);
            renderBoard(this, this.dataset.key, sign);
            if(gameBoard.indexOf('')<0){
                if(checkWinner(positions)){
                    renderWinner(true, name)
                }
                else{
                    renderWinner(false, name)
                }
    
            }
            else if(checkWinner(positions)){    
                renderWinner(true, name);
            }
            else{
                turn='O';
                setTimeout(()=>AI.makeMove(),300);
            }
        }
        
    }
    function clear(){
        positions.length=0;
    }
    return {positions,markSign, clear};
}

function Ai(name, sign, positions){
    this.name=name;
    this.sign=sign;
    this.positions=positions;
    function makeMove(){
        console.log(positions);
        if(gameBoard.indexOf('')<0){
            if(checkWinner(positions))        
                renderWinner(true, name)
            else   
                renderWinner(false, name)
        }
        else{
            if(turn==sign){
                let move=Math.floor(Math.random()*9);
                if(gameBoard[move]=='')
                    markSign('AI', move)
                else
                    makeMove();
            }
        }
    }
    
    function markSign(name, move){
        squares[move].classList.add('enemy');
        // this.classList.add('enemy');
        squares[move].classList.remove('hoverable');
        positions.push(move);
        renderBoard(squares[move], move, sign);
        turn='X';
        if(checkWinner(positions))
            renderWinner(true, name)
        
    }
    function clear(){
        positions.length=0;
    }
    return {positions, makeMove, clear}; 
}

function renderBoard(source, index, sign){
    gameBoard[index]=sign;
    source.textContent=gameBoard[index];
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

function renderWinner(status, name){
    turn='none';
    if(!status)
        document.getElementById('status').textContent=`Draw!`;
    else
        document.getElementById('status').textContent=`${name} wins!`;
    document.getElementById('status').classList.add('fade');
    button = document.createElement('button');
    button.textContent='Restart';
    button.id = 'restart';
    document.body.appendChild(button);
    button.classList.add('fade');
    button.onclick=restart;
    player.clear();
    AI.clear();
}

function restart(){
    turn='X';
    gameBoard=['','','','','','','','',''];

    squares.forEach(square=>{
        square.textContent='';
        square.classList.add('hoverable');
        square.classList.remove('me');
        square.classList.remove('enemy');
    })    
    document.getElementById('restart').remove();
    document.getElementById('status').textContent='';
}
