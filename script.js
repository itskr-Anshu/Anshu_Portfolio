const nav=document.querySelector('.nav');
const progress=document.querySelector('.progress');
const glow=document.querySelector('.cursor-glow');
const menu=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>30);
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/h*100)+'%';
});
window.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
});
menu.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const countObs=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target, target=+el.dataset.count; let n=0;
   const step=Math.max(1,Math.ceil(target/45));
   const tick=()=>{n=Math.min(n+step,target);el.textContent=n;if(n<target)requestAnimationFrame(tick)};
   tick();countObs.unobserve(el);
 });
},{threshold:.7});
counters.forEach(c=>countObs.observe(c));
