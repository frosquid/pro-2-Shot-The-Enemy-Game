// variabel untuk melihat ukuran layar
const mediaScreen = window.matchMedia('(max-width: 700px)');
// variabel untuk mengambil element .canvas
const canvas = document.querySelector('.canvas');
// variabel untuk mengambill style yang ada di .screen
const screen =  window.getComputedStyle(document.querySelector('.screen'));
const logo =  window.getComputedStyle(document.querySelector('.logo'));
// fungsi untuk responsive layout
function responsive(e){
    // jika mediascreen true
    if(mediaScreen.matches){
        // variabel untuk mengambil nilai dari height pada style
        const sizeY = screen.getPropertyValue('height');
        // variabel untuk mengambil nilai dari height pada style
        const sizeX = screen.getPropertyValue('width');
        
        let size = sizeY < sizeX? sizeY : sizeX;
        // mengubah style lebar pada canvas menjadi nilai dari variabel sizeY
        canvas.style.width = `${size}` ;
        // mengubah style tinggi pada canvas menjadi nilai dari variabel sizeY
        canvas.style.height = `${size}`;
    }
    // jika tidak sama sekali
    else{
        const logoY = logo.getPropertyValue('height');
        // ubah lebar canvas dengan 
        canvas.style.width = `calc(100vmin - ${logoY})`;
        // ubah tinggi canvas dengan
        canvas.style.height = `calc(100vmin - ${logoY})`;
    }
}
// jika web di load di awal
window.addEventListener('load', responsive);
// jika di browser di resize
window.addEventListener('resize', responsive);
// fungsi mengaktifkan fullscren mode
function fullscreen(){
    // variabel untuk mengambil seluruh element dalam document
    const elemen = document.documentElement;
    // membuat seluruh elemen menjadi fullscreen
    elemen.requestFullscreen()
}
// fungsi deklarasi object untuk tombol hover
function HoverBUtton(a,b,...arg){
    this.a = a;
    this.b = b;
    this.arg = arg;
}
// menambahkan prototype sebuah fungsi ke object hoverbutton
HoverBUtton.prototype.Run = function(){
    // mengulang this.arg sesuai panjangnya
    this.arg.forEach(a => {
        // variabel untuk mengambil elemen didalam document
        const elemen = document.querySelector(`${a} span`);
        // highorder fungsi untuk berjalanketika di tekan
        elemen.addEventListener('touchstart', a => {elemen.style.boxShadow = this.a })
        // highorder fungsi untuk berjalanketika di lepas tekannannya
        elemen.addEventListener('touchend', a => {elemen.style.boxShadow = this.b})
    })
}
// membuat instance baru dari object hoverbutton menjadi constrolerHover
const elemen = document.querySelector('.controller div span');
const value = window.getComputedStyle(elemen).getPropertyValue('box-shadow');
let colorString = '';
for(let i = 0; i < value.length ; i++){
    if(value[i] == 'r' && value[i+1] == 'g' && value[i+2] == 'b' && value[i+3] == 'a'){
        for(let j = i; j < value.length ; j++){
            if(value[j] != ')'){
                colorString+=value[j]
            }
            else{
                colorString+=value[j];
                colorString+='|'
                break
            }
        }
    }
}
const colorArray = colorString.split('|');
const constrolerHover =  new HoverBUtton(`-1px -1px 6px 1px ${colorArray[0]} , 
1px 1px 0px 1px ${colorArray[1]} inset,
-1px -1px 0px 1px ${colorArray[2]} inset,
1px 1px 0px 1px ${colorArray[3]}`,value,
'.up','.left','.right','.down','.shot');
// menjalankan instance constrolerHover
constrolerHover.Run()
