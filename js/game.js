
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
Control.prototype.Run = function(){
    this.arg.forEach((a,i) => {
    let doc = this.device == 'dekstop'? document : document.querySelector(`.${this.arg[i][0]} .${this.arg[i][0]}`);
    doc.addEventListener(this.trigerStart, key => {this.key[this.device == 'dekstop'?key.key :this.arg[i][0]] = true});
    doc.addEventListener(this.trigerEnd, key => {this.key[this.device == 'dekstop'?key.key :this.arg[i][0]] = false});
        this.arg[i].forEach((b,j) => {
            if(this.key[this.arg[i][j]]){
                const run = this.arg[i][j+1];
                console.log(this.arg[i][j+2]);
                run(this.arg[i][j+2]);
            }
        })
    })
}

const player1 = new Player('andi','.player',.5);
player1.Reset();
function move([command,object,cordinate]){
    let cssStyle = '';
    cordinate == 'y'? cssStyle = 'top':cssStyle = 'left';
    command == 'add'? object[cordinate]+=object.speed :object[cordinate]-=object.speed;
    const elemen = document.querySelector('.player');
    elemen.style[cssStyle] = `${object[cordinate]}%`;
    console.log(object[cordinate])
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

function draw(){
    playerMoveDekstop.Run();
    playerMoveMobile.Run();
    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)