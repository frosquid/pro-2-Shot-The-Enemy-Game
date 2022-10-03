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
a.requestFullscreen()
}


    
