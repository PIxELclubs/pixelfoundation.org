window.requestAnimationFrame = window.requestAnimationFrame || function (func) {
  return setTimeout(func, 0);
};

window.onload = function() {

  // this hack, thanks to: 
  // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isChrome = !!window.chrome && !isOpera;
  var isIE = false || !!document.documentMode;
  
  if (!isChrome && !isFirefox) {
    document.getElementById('logo-x').setAttribute('fill', '');
  }

  initCanvas();
};

function initCanvas() {
  var svg = document.querySelector('svg');
  var canvas = document.getElementById('main-canvas');
  var x = document.getElementById('logo-x');
  var vid = document.querySelector('video');
  var ctx = canvas.getContext('2d');
  ctx.save();

  function rectToStyle(rect, origRect, el) {
    el.width = origRect.width;
    el.height = origRect.height;
    el.style.top = rect.top + 'px';
    el.style.bottom = rect.bottom + 'px';
    el.style.left = rect.left + 'px';
    el.style.right = rect.right + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
  }

  svg.style.fill = '#fff';
  var p = new Path2D('M 0 0 v 199 h 200 V0H0z m40.656 43h35.906L99.72 79.97 122.56 43h36.094l-38.406 57.313L161.28 161h-35.905L99.72 121.375 74.06 161H38l41.22-60.5L40.655 43z');
  ctx.fillStyle = '#fff';

  function draw() {
    rectToStyle(x.getBoundingClientRect(), x.getBBox(), canvas);
    ctx.clip(p);
    ctx.drawImage(vid, 200, 380, 250, 250, 0, 0, 500, 500);
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
