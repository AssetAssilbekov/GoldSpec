/*
Sheet 4?
*/

/*
{
  "com":"asdf",
  "img":"https://upload.wikimedia.org/wikipedia/commons/2/29/TSMC-Logo.svg",
  "sector":"asdfghj",
  "tic":"asd",
  "id":"123abc",

  "fh":val,
  "gp":val,
  "risk":[worst,best],
  "iv":val,
  "profitability":val,

  "nwcm":[min,val,max],
  "ufcffcf":[min,val,max],
  "dtebitdar":[min,val,max],
  "dter":[min,val,max],

  "gfm":[min,val,max],
  "lyarg":[min,val,max],
  "epsit":[min,val,max],
  "rt":[min,val,max],
  "ee":[min,val,max],

  "sd":[min,val,max],
  "beta":[min,val,max],
  "sr":[min,val,max],

  "dcf":val,
  "per":[min,val,max],
  "psr":[min,val,max],

  "om":[min,val,max],
  "roa":[min,val,max],
  "roce":[min,val,max]
}
*/

const myURL = new URL(window.location.toLocaleString()).searchParams;
const entryID = myURL.get('id');
console.log(entryID);


let file = '';

function reqListener() {
  file = JSON.parse(this.responseText);
  console.log(file);
  document.querySelector('#loaded').style.display = "block";
  load();
  render();
  render2();
  document.querySelector('#loaded').style.opacity = 1;
  document.querySelector('#loading').style.opacity = 0;
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", `https://raw.githubusercontent.com/AssetAssilbekov/GoldSpec/main/page/companies/${entryID}.json`);
req.send();


const canvas = document.querySelector('#bars');
const ctx = canvas.getContext('2d');
let worstCase = false;

function load() {
  document.getElementById('6').innerText = file.com;
  document.getElementById('7').innerText = 'Sector:' + ' ' + file.sector;
  document.getElementById('8').innerText = file.tic;
  document.getElementById('9').src = file.img;

  document.getElementById('1').innerText = file.fh;
  document.getElementById('2').innerText = file.gp;
  document.getElementById('switchlabel').innerText = file.risk[1];
  document.getElementById('4').innerText = file.iv;
  document.getElementById('5').innerText = file.profitability;
}

function rect(x,y,width,height,color,text) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.fillRect(x,y-height,width,height);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.font = '10px Quicksand';
  ctx.fillText(text,(x+(width*.5))-ctx.measureText(text).width*.5,y-height-5);
}

function line(x1,y1,x2,y2) {
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function exp() {
  return 1-((100-t)*(100-t))/(100*100);
}
function bar(x,color,amount) {
  // max: 160px
  rect(((200/5)*x-(200/10))-10,180,20,(amount/10)*160*exp(),color,(exp()===1)?amount:Math.round(amount*exp()));
}

let t = 0;

function render() {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bar(1,'#e3c56b',file.fh);
  bar(2,'#e3c56b',file.gp);
  bar(3,'#e3c56b',(worstCase)?file.risk[0]:file.risk[1]);
  bar(4,'#e3c56b',file.iv);
  bar(5,'#e3c56b',file.profitability);
  line(0,180,200,180);
  if (t<100) t++;
  console.log('go');
}

const search = document.querySelector('input');
const autocomplete = document.querySelector('#autocomplete');

search.addEventListener('input', ()=> {
  autocomplete.innerHTML = '';
  let num = 0;
  let val = search.value;
  database.forEach((item, i) => {
    if(item.name.toLowerCase().includes(val.toLowerCase())&&num<5&&val!='') {
      autocomplete.innerHTML += `<li><a href="https://assetassilbekov.github.io/GoldSpec/page/index.html?id=${item.address}" style="color:black;text-decoration:none;">${item.name}<span style="float:right;font-weight:normal;">2023</span></a></li>`;
      num++;
    };
  });
});

document.querySelector('#worst').addEventListener('click', () => {
  worstCase = true;
  document.querySelector('#worst').classList.add('active');
  document.querySelector('#best').classList.remove('active');
  document.querySelector('#switchlabel').innerText = file.risk[0];
});
document.querySelector('#best').addEventListener('click', () => {
  worstCase = false;
  document.querySelector('#best').classList.add('active');
  document.querySelector('#worst').classList.remove('active');
  document.querySelector('#switchlabel').innerText = file.risk[1];
});

const networkingcapital = document.querySelector('#networkingcapital');
const ctx2 = networkingcapital.getContext('2d');
networkingcapital.width = innerWidth*.8;
networkingcapital.height = 250;

const growthpotential = document.querySelector('#growthpotential');
const ctx3 = growthpotential.getContext('2d');
growthpotential.width = innerWidth * .8;
growthpotential.height = 310;

const risk = document.querySelector('#risk');
const ctx4 = risk.getContext('2d');
risk.width = innerWidth * .8;
risk.height = 200;

const intrinsic = document.querySelector('#intrinsic');
const ctx5 = intrinsic.getContext('2d');
intrinsic.width = innerWidth * .8;
intrinsic.height = 200;

const profitability = document.querySelector('#profitability');
const ctx6 = profitability.getContext('2d');
profitability.width = innerWidth * .8;
profitability.height = 200;

function drawText(context,x,y,text) {
  context.fillStyle = 'black';
  context.font = '15px Serif'
  context.beginPath();
  context.fillText(text,x-context.measureText(text).width,y);
}

function renderScale(canvasContext,min,max,number,start,width,y) {
  if (min==="not") {
    return;
  }
  canvasContext.fillStyle = '#e3c56b';
  canvasContext.beginPath();
  canvasContext.fillRect(start,10+y,width,10);
  canvasContext.beginPath();
  canvasContext.font = '10px Quicksand';
  canvasContext.fillStyle = 'black';
  canvasContext.fillText(min,start-(ctx2.measureText(min).width)*.5,30+y);
  canvasContext.fillText(max,(width+start)-(ctx2.measureText(max).width)*.5,30+y);
  canvasContext.beginPath();
  let numeral = number;
  let x = start+width*((numeral-min)/(max-min));
  canvasContext.fillText(numeral,x-ctx2.measureText(numeral).width*.5,8+y);
  canvasContext.strokeText(numeral,x-ctx2.measureText(numeral).width*.5,8+y);
  canvasContext.beginPath();
  canvasContext.moveTo(x,10+y);
  canvasContext.lineTo(x,20+y);
  canvasContext.stroke();
}

function render2() {
  ctx2.clearRect(0,0,networkingcapital.width,networkingcapital.height);
  renderScale(ctx2,file.nwcm[0],file.nwcm[2],file.nwcm[1],networkingcapital.width/3,networkingcapital.width*.6,20);
  drawText(ctx2,networkingcapital.width/3-20,40,'Net Working Capital Margin (%)');
  renderScale(ctx2,file.ufcffcf[0],file.ufcffcf[2],file.ufcffcf[1],networkingcapital.width/3,networkingcapital.width*.6,80);
  drawText(ctx2,networkingcapital.width/3-20,100,'UFCF/FCF to Revenue Ratio (%)');
  renderScale(ctx2,file.dtebitdar[0],file.dtebitdar[2],file.dtebitdar[1],networkingcapital.width/3,networkingcapital.width*.6,140);
  drawText(ctx2,networkingcapital.width/3-20,160,'Debt to EBITDA Ratio');
  renderScale(ctx2,file.dter[0],file.dter[2],file.dter[1],networkingcapital.width/3,networkingcapital.width*.6,200);
  drawText(ctx2,networkingcapital.width/3-20,220,'Debt to Equity Ratio');

  ctx3.clearRect(0,0,growthpotential.width,growthpotential.height);
  renderScale(ctx3,file.gfm[0],file.gfm[2],file.gfm[1],growthpotential.width/3,growthpotential.width*.6,20);
  drawText(ctx3,growthpotential.width/3-20,40,'Growth Forecast Mean (%)');
  renderScale(ctx3,file.lyarg[0],file.lyarg[2],file.lyarg[1],growthpotential.width/3,growthpotential.width*.6,80);
  drawText(ctx3,growthpotential.width/3-20,100,'Last 3 Year Average Revenue Growth (%)');
  renderScale(ctx3,file.epsit[0],file.epsit[2],file.epsit[1],growthpotential.width/3,growthpotential.width*.6,140);
  drawText(ctx3,growthpotential.width/3-20,160,'EPS trend (2024) (%)');
  renderScale(ctx3,file.rt[0],file.rt[2],file.rt[1],growthpotential.width/3,growthpotential.width*.6,200);
  drawText(ctx3,growthpotential.width/3-20,220,'Revenue Trend (2024) (%)');
  renderScale(ctx3,file.ee[0],file.ee[2],file.ee[1],growthpotential.width/3,growthpotential.width*.6,260);
  drawText(ctx3,growthpotential.width/3-20,280,'Earnings Estimate (2024) (%)');

  ctx4.clearRect(0,0,risk.width,risk.height);
  renderScale(ctx4,file.sd[0],file.sd[2],file.sd[1],risk.width/3,risk.width*.6,20);
  drawText(ctx4,risk.width/3-20,40,'Standard Deviation');
  renderScale(ctx4,file.beta[0],file.beta[2],file.beta[1],risk.width/3,risk.width*.6,80);
  drawText(ctx4,risk.width/3-20,100,'Beta (5Y Monthly)');
  renderScale(ctx4,file.sr[0],file.sr[2],file.sr[1],risk.width/3,risk.width*.6,140);
  drawText(ctx4,risk.width/3-20,160,'Sharpe Ratio');

  ctx5.clearRect(0,0,intrinsic.width,intrinsic.height);
  drawText(ctx5,intrinsic.width/3+55,40,file.dcf);
  drawText(ctx5,intrinsic.width/3-20,40,'DCF Implied Share Price');
  renderScale(ctx5,file.per[0],file.per[2],file.per[1],intrinsic.width/3,intrinsic.width*.6,80);
  drawText(ctx5,intrinsic.width/3-20,100,'PE Ratio');
  renderScale(ctx5,file.psr[0],file.psr[2],file.psr[1],intrinsic.width/3,intrinsic.width*.6,140);
  drawText(ctx5,intrinsic.width/3-20,160,'PS Ratio');

  ctx6.clearRect(0,0,profitability.width,profitability.height);
  renderScale(ctx6,file.om[0],file.om[2],file.om[1],profitability.width/3,networkingcapital.width*.6,20);
  drawText(ctx6,profitability.width/3-20,40,'Operating Margin (%)');
  renderScale(ctx6,file.roa[0],file.roa[2],file.roa[1],profitability.width/3,profitability.width*.6,80);
  drawText(ctx6,profitability.width/3-20,100,'ROA (%)');
  renderScale(ctx6,file.roce[0],file.roce[2],file.roce[1],profitability.width/3,profitability.width*.6,140);
  drawText(ctx6,profitability.width/3-20,160,'Return on Caplital Employed (ROCE) (%)');
}
