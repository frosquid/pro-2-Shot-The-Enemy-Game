// variabel untuk melihat ukuran layar
const mediaScreen = window.matchMedia('(max-width: 700px)');
// variabel untuk mengambil element .canvas
const canvas = document.querySelector('.canvas');
// variabel untuk mengambill style yang ada di .screen
const screen =  window.getComputedStyle(document.querySelector('.screen'));
// fungsi untuk responsive layout
function responsive(e){
    // jika mediascreen true
    if(mediaScreen.matches){
        // variabel untuk mengambil nilai dari height pada style
        const sizeY = screen.getPropertyValue('height');
        // mengubah style lebar pada canvas menjadi nilai dari variabel sizeY
        canvas.style.width = sizeY;
        // mengubah style tinggi pada canvas menjadi nilai dari variabel sizeY
        canvas.style.height = sizeY;
    }
    // jika tidak sama sekali
    else{
        // ubah lebar canvas dengan 
        canvas.style.width = '100vmin';
        // ubah tinggi canvas dengan
        canvas.style.height = '100vmin';
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
const constrolerHover =  new HoverBUtton(`-1px -1px 6px 1px #d780b84b , 
1px 1px 0px 1px #D780B8 inset,
-1px -1px 0px 1px #790252 inset,
1px 1px 0px 1px #26001a`,`-2px -2px 6px 1px #d780b84b , 
2px 2px 0px 1px #D780B8 inset,
-5px -5px 0px 1px #790252 inset,
5px 5px 0px 1px #26001a`,
'.up','.left','.right','.down','.shot');
// menjalankan instance constrolerHover
constrolerHover.Run()
