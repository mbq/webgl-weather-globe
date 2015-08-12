// Embarassingly simple timebar component

var Timebar=function(s0,play0,mar,height,bottom){
 var k=document.createElement('canvas');
 k.style.position='fixed';
 k.style.bottom=''+bottom+'px';
 k.style.left='0px';
 k.width=window.innerWidth;
 k.height=height;
 document.body.appendChild(k);

 var c=k.getContext('2d');
 this.s=s0;
 this.play=play0;
 var myself=this;

 function paint(){
  c.clearRect(0,0,k.width,k.height);

  c.strokeStyle="rgba(170,170,170,0.5)";
  c.strokeWidth=20;
  c.fillStyle="rgba(170,170,170,0.5)";
  c.fillRect(mar*3-1,0,(k.width-4*mar)+1,k.height);

  if(myself.play) c.fillStyle="#eee";
  c.beginPath();
  c.moveTo(mar,0.1*k.height);
  c.lineTo(2.7*mar,k.height/2);
  c.lineTo(mar,0.9*k.height);
  c.lineTo(mar,0.1*k.height);
  c.fill();
  c.stroke();

  c.fillStyle="#eee";
  c.fillRect(mar*3,1,(k.width-4*mar)*myself.s,k.height-2);
  //c.strokeRect(mar*3,0,(k.width-4*mar),k.height);
 }
 this.repaint=paint;

 this.setS=function(newS){
  this.s=newS;
  if(this.s<0.) this.s=0.;
  if(this.s>1.) this.s=1.;
  paint();
 }

 function resizeHandler(ev){
  k.width=window.innerWidth;
  paint();
 }
 function moveHandler(ev){
  myself.s=(ev.clientX-mar*3)/(k.width-4*mar);
  if(myself.s<0.) myself.s=0.;
  if(myself.s>1.) myself.s=1.;
  paint();
  ev.stopPropagation();
 }
 var restorePlay=this.play;
 function downHandler(ev){
  if(ev.clientX<mar*3){
   //Toggle playing
   myself.play=!myself.play;
   paint();
  }else{
   //Drag
   window.addEventListener('mousemove',moveHandler,false);
   moveHandler(ev);
   window.addEventListener('mouseup',upHandler,false);
   //Disable playing for the time of drag
   restorePlay=myself.play;
   myself.play=false;
  }
  ev.stopPropagation();
 }

 function upHandler(ev){
  window.removeEventListener('mousemove',moveHandler,false);
  window.removeEventListener('mouseup',upHandler,false);
  myself.play=restorePlay;
  paint();
  ev.stopPropagation();
 }

 k.addEventListener('mousedown',downHandler,false);
 window.addEventListener('resize',resizeHandler,false);
 resizeHandler();
}
