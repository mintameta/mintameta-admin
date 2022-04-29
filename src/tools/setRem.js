// set rem
function setRem () {
    //  PC
    //console.log('pc')

    var baseSize = 100;
    let basePc = baseSize / 1920; //
    let vW = window.innerWidth; //
    let vH = window.innerHeight; //
    //
    let dueH = vW * 1080 / 1920
    if (vH < dueH) { //
      vW = vH * 1920 /1080
    }
    let rem = vW * basePc; //
    document.documentElement.style.fontSize =  rem + "px";
}
// init
setRem();
//
window.onresize = function () {
  setRem()
};
