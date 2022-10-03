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

console.log(mediaScreen);
// jika web di load di awal
window.addEventListener('load', responsive);
// jika di browser di resize
window.addEventListener('resize', responsive);
function fullscreen(){
    let c = document.documentElement;
c.requestFullscreen()
}


    
function buttonHover(...arg){
    arg.forEach((a,i) => {
        const cot = document.querySelector(`${a} span`);
    cot.addEventListener('touchstart', a => {cot.style.boxShadow = '-1px -1px 6px 1px #d780b84b , 1px 1px 0px 1px #D780B8 inset,-1px -1px 0px 1px #790252 inset,1px 1px 0px 1px #26001a'})
    cot.addEventListener('touchend', a => {cot.style.boxShadow = '-2px -2px 6px 1px #d780b84b , 2px 2px 0px 1px #D780B8 inset,-5px -5px 0px 1px #790252 inset,5px 5px 0px 1px #26001a'})
    })
}
buttonHover('.up','.left','.right','.down','.shot')
