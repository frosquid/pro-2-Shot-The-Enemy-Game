
function Player(nama, id, speed){
    this.nama = nama;
    this.id = id;
    this.speed = speed;
    this.y = 45;
    this.x = 45;
}
Player.prototype.Reset = function (){
    document.querySelector('.player').style.top = `${this.y}%`;
    document.querySelector('.player').style.left = `${this.x}%`;
}
function Control(trigerStart,trigerEnd,device,id,...arg){
    this.trigerStart = trigerStart;
    this.trigerEnd = trigerEnd;
    this.device = device;
    this.id = id;
    this.arg = arg;
    this.key = {};
    this.y = 0;
    this.x = 0;
    
}
Control.prototype.keyBind = function(){
    for(let i = 0 ; i < this.arg.length ; i++){
        let doc = this.device == 'dekstop'? document : document.querySelector(`.${this.arg[i][0]} .${this.arg[i][0]}`);
        doc.addEventListener(this.trigerStart, key => {this.key[this.device == 'dekstop'?key.key :this.arg[i][0]] = true});
        doc.addEventListener(this.trigerEnd, key => {this.key[this.device == 'dekstop'?key.key :this.arg[i][0]] = false});
    }
}
Control.prototype.Run = function(){
    for(let i = 0 ; i < this.arg.length ; i++){
        for(let j = 0 ; j < this.arg[i].length ; j++){
            if(this.key[this.arg[i][j]]){
                (this.arg[i][j+1])(this.arg[i][j+2])
            }
        }
    }
}

const player1 = new Player('andi','.player',1);

player1.Reset();

function move([command,object,cordinate]){
    let cssStyle = '';
    cordinate == 'y'? cssStyle = 'top':cssStyle = 'left';
    command == 'add'? object[cordinate]+=object.speed :object[cordinate]-=object.speed;
    const elemen = document.querySelector('.player');
    elemen.style[cssStyle] = `${object[cordinate]}%`;
}

const playerMoveDekstop = new Control(
    'keydown','keyup','dekstop','.player',
    ['s',move,['add',player1,'y']],
    ['w',move,['remove',player1,'y']],
    ['d',move,['add',player1,'x']],
    ['a',move,['remove',player1,'x']]);
const playerMoveMobile = new Control(
    'touchstart','touchend','mobile','.player',
    ['down',move,['add',player1,'y']],
    ['up',move,['remove',player1,'y']],
    ['right',move,['add',player1,'x']],
    ['left',move,['remove',player1,'x']]);
    playerMoveDekstop.keyBind();
    playerMoveMobile.keyBind();
    let fps = 0;
    let cek = 0;
    function draw (){
    fps++ 
    playerMoveDekstop.Run();
    playerMoveMobile.Run();

    window.requestAnimationFrame(draw)
    }
    setInterval(function(){
        document.querySelector('.fps').innerHTML = `${fps} FPS`;
        fps = 0;
    },1000)
    window.requestAnimationFrame(draw)