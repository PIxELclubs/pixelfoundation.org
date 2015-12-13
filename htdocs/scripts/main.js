window.onload = function() {

  // this hack, thanks to: 
  // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isChrome = !!window.chrome && !isOpera;
  var isIE = false || !!document.documentMode;
  
  if(!isChrome) {
    document.getElementById('logo-x').setAttribute("fill", "");
  }
};

window.requestAnimationFrame = window.requestAnimationFrame || function (func) {
  return setTimeout(func, 0);
};

function drawCanvas() {
  var svg = document.querySelector('svg');
  var svgScale = svg.height.animVal.value / svg.viewBox.animVal.height;
  var canvas = document.getElementById('main-canvas');
  var x = document.getElementById('logo-x');
  var rect = x.getBoundingClientRect();
  var vid = document.querySelector('video');
  var ctx = canvas.getContext('2d');
  ctx.save();

  function rectToStyle(rect, el) {
    el.width = rect.width / svgScale;
    el.height = rect.height / svgScale;
    el.style.top = rect.top + 'px';
    el.style.bottom = rect.bottom + 'px';
    el.style.left = rect.left + 'px';
    el.style.right = rect.right + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
  }

  rectToStyle(rect, canvas);

  var p = new Path2D('M 0 0 v 199 h 200 V0H0z m40.656 43h35.906L99.72 79.97 122.56 43h36.094l-38.406 57.313L161.28 161h-35.905L99.72 121.375 74.06 161H38l41.22-60.5L40.655 43z');
  svg.style.fill = '#fff';
  ctx.fillStyle = '#fff';
  ctx.clip(p);
  window.p = p;
  window.ctx = ctx;

  function draw() {
    ctx.drawImage(vid, 200, 380, 250, 250, 0, 0, 500, 500);
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
window.addEventListener('load', drawCanvas);
window.addEventListener('resize', drawCanvas);
