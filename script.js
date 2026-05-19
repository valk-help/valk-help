
/*
  script.js
  Contains two primary effects for the Valk GUIDBOOK site:
  1. Animated snowflakes overlay, adding ambiance to the dark theme.
  2. Interactive 3D tilt effect on the central guide box, reacting to
     mouse movement to provide depth and engagement.
*/

(function(){
  // Redirect any old NFAs URL to lowercase /nfa
  try {
    const pathname = window.location.pathname || '';

    if (pathname.toLowerCase().includes('/nfas')) {
      window.location.replace('https://valk.help/nfa');
    }
  } catch (e) {
    // Fail silently
  }
})();
    // Fail silently if redirect not possible
  }
  // Snow effect settings
  const SNOW_COUNT = 160;
  const SNOW_SPEED = 1.0;
  const WIND = 0.12;
  const wrap = document.getElementById('snow-canvas-wrap');
  if (!wrap) return;

  // Create a full-viewport canvas for flakes
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.zIndex = '60';
  canvas.style.pointerEvents = 'none';
  wrap.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpi = window.devicePixelRatio || 1;

  function resize(){
    dpi = window.devicePixelRatio || 1;
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    canvas.width = Math.floor(width * dpi);
    canvas.height = Math.floor(height * dpi);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
  }

  window.addEventListener('resize', resize, {passive: true});
  resize();

  function Snowflake(){ this.reset(); }
  Snowflake.prototype.reset = function(){
    this.x = Math.random()*width;
    this.y = Math.random()*-height;
    this.radius = 0.8 + Math.random()*3.6;
    this.speed = (0.25 + Math.random()*1.1) * SNOW_SPEED;
    this.angle = Math.random()*Math.PI*2;
    this.opacity = 0.12 + Math.random()*0.9;
    this.wind = WIND*(0.2 + Math.random()*1.1);
  };
  Snowflake.prototype.update = function(delta){
    this.y += (this.speed + Math.sin(this.angle)*0.3) * delta;
    this.x += this.wind + Math.cos(this.angle)*0.25;
    this.angle += 0.008*(0.5 + Math.random()*0.7);
    if(this.y > height+25 || this.x < -60 || this.x > width+60) this.reset();
  };
  Snowflake.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,'+this.opacity+')';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  };

  const flakes = [];
  for(let i = 0; i < SNOW_COUNT; i++) flakes.push(new Snowflake());

  let last = performance.now();
  function loop(now){
    const delta = Math.min(1.5, (now-last)/16.66);
    last = now;
    ctx.clearRect(0,0,width,height);
    for(let i = 0; i < flakes.length; i++){
      flakes[i].update(delta);
      flakes[i].draw(ctx);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// 3D tilt effect for the guide box
document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.guide-box');
  if (!box) return;
  const maxTilt = 10; // degrees
  function handleMove(e) {
    const rect = box.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const percentX = dx / (rect.width / 2);
    const percentY = dy / (rect.height / 2);
    const tiltX = percentY * maxTilt;
    const tiltY = -percentX * maxTilt;
    box.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
  function resetTilt() {
    box.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }
  box.addEventListener('mousemove', handleMove);
  box.addEventListener('mouseleave', resetTilt);
});
