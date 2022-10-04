function Canvas(y,x,unit){
    this.y = y;
    this.x = x;
    this.unit = unit;
}
Canvas.prototype.height = function(){
   const canvas = document.querySelector('.canvas');
   return (window.getComputedStyle(canvas).getPropertyValue('height'))
}

const canva = new Canvas(100,100,'%');


function RigidBody(nama, id, speed){
    this.nama = nama;
    this.id = id;
    this.speed = speed;
    this.y = 45;
    this.x = 45;
}
RigidBody.prototype.Reset = function (){
    const data = [['top','left'],[this.y,this.x]];
    for(let i = 0; i < data.length; i++){
        document.querySelector(this.id).style[data[0][i]] = `${data[1][i]}${canva.unit}`;
    }
}

const player1 = new RigidBody('andi','.player',1);
player1.Reset();


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
function Collider(){
    this.arg = arg;
}

function move([command,object,cordinate]){
    let cssStyle = '';
    cordinate == 'y'? cssStyle = 'top':cssStyle = 'left';
    command == 'add'? object[cordinate]+=object.speed :object[cordinate]-=object.speed;
    const elemen = document.querySelector(object.id);
    elemen.style[cssStyle] = `${object[cordinate]}${canva.unit}`;
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