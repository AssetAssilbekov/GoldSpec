/*
Sheet 4?
*/

/*
{
  "com":"asdf",
  "tic":"asd",
  "fin":"1",
  "gro":"1",
  "ris":"1",
  "int":"1",
  "pro":"1",
  "qua":"lorem"
}
*/

const myURL = new URL(window.location.toLocaleString()).searchParams;
const entryID = myURL.get('id');
console.log(entryID);

const canvas = document.querySelector('#bars');
const ctx = canvas.getContext('2d');
let worstCase = true;

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
  bar(1,'#e3c56b',8.75);
  bar(2,'#e3c56b',8.4);
  bar(3,'#e3c56b',7.33);
  bar(4,'#e3c56b',7.33);
  bar(5,'#e3c56b',9.67);
  line(0,180,200,180);
  if (t<100) t++;
}

render();

const search = document.querySelector('input');
const autocomplete = document.querySelector('#autocomplete');
class Company {
  constructor(name,logo,address) {
    this.name = name;
    this.logo = logo;
    this.address = address;
  }
}
const companies = [new Company('TSM','','')];


search.addEventListener('input', ()=> {
  autocomplete.innerHTML = '';
  let num = 0;
  let val = search.value;
  companies.forEach((item, i) => {
    if(item.name.toLowerCase().includes(val.toLowerCase())&&num<5&&val!='') {
      autocomplete.innerHTML += `<li><a href="/page/index.html?id=${item.address}" style="color:black;text-decoration:none;">${item.name}</a></li>`;
      num++;
    };
  });
});

document.querySelector('#worst').addEventListener('click', () => {
  worstCase = true;
  document.querySelector('#worst').classList.add('active');
  document.querySelector('#best').classList.remove('active');
  document.querySelector('#switchlabel').innerText = 7.66;
});
document.querySelector('#best').addEventListener('click', () => {
  worstCase = false;
  document.querySelector('#best').classList.add('active');
  document.querySelector('#worst').classList.remove('active');
  document.querySelector('#switchlabel').innerText = 7.33;
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
  renderScale(ctx2,53,65,56,networkingcapital.width/3,networkingcapital.width*.6,20);
  drawText(ctx2,networkingcapital.width/3-20,40,'Net Working Capital Margin (%)');
  renderScale(ctx2,-81,47,5,networkingcapital.width/3,networkingcapital.width*.6,80);
  drawText(ctx2,networkingcapital.width/3-20,100,'UFCF/FCF to Revenue Ratio (%)');
  renderScale(ctx2,.58,5.67,.58,networkingcapital.width/3,networkingcapital.width*.6,140);
  drawText(ctx2,networkingcapital.width/3-20,160,'Debt to EBITDA Ratio');
  renderScale(ctx2,.279,1.78,.279,networkingcapital.width/3,networkingcapital.width*.6,200);
  drawText(ctx2,networkingcapital.width/3-20,220,'Debt to Equity Ratio');

  ctx3.clearRect(0,0,growthpotential.width,growthpotential.height);
  renderScale(ctx3,5,30,20,growthpotential.width/3,growthpotential.width*.6,20);
  drawText(ctx3,growthpotential.width/3-20,40,'Growth Forecast Mean (%)');
  renderScale(ctx3,-3,38,29,growthpotential.width/3,growthpotential.width*.6,80);
  drawText(ctx3,growthpotential.width/3-20,100,'Last 3 Year Average Revenue Growth (%)');
  renderScale(ctx3,7,350,24,growthpotential.width/3,growthpotential.width*.6,140);
  drawText(ctx3,growthpotential.width/3-20,160,'EPS trend (2024) (%)');
  renderScale(ctx3,0,-5,0,growthpotential.width/3,growthpotential.width*.6,200);
  drawText(ctx3,growthpotential.width/3-20,220,'Revenue Trend (2024) (%)');
  renderScale(ctx3,0,-5,0,growthpotential.width/3,growthpotential.width*.6,260);
  drawText(ctx3,growthpotential.width/3-20,280,'Earnings Estimate (2024) (%)');

  ctx4.clearRect(0,0,risk.width,risk.height);
  renderScale(ctx4,1.5,2.8,1.78,risk.width/3,risk.width*.6,20);
  drawText(ctx4,risk.width/3-20,40,'Standard Deviation');
  renderScale(ctx4,.7,2,1.24,risk.width/3,risk.width*.6,80);
  drawText(ctx4,risk.width/3-20,100,'Beta (5Y Monthly)');
  renderScale(ctx4,-.6,.3,.11,risk.width/3,risk.width*.6,140);
  drawText(ctx4,risk.width/3-20,160,'Sharpe Ratio');

  ctx5.clearRect(0,0,intrinsic.width,intrinsic.height);
  drawText(ctx5,intrinsic.width/3+55,40,'12,670');
  drawText(ctx5,intrinsic.width/3-20,40,'DCF Implied Share Price');
  renderScale(ctx5,9,50,29.2,intrinsic.width/3,intrinsic.width*.6,80);
  drawText(ctx5,intrinsic.width/3-20,100,'PE Ratio');
  renderScale(ctx5,2.11,7,6.4,intrinsic.width/3,intrinsic.width*.6,140);
  drawText(ctx5,intrinsic.width/3-20,160,'PS Ratio');

  ctx6.clearRect(0,0,profitability.width,profitability.height);
  renderScale(ctx6,10,45,44.72,profitability.width/3,networkingcapital.width*.6,20);
  drawText(ctx6,profitability.width/3-20,40,'Operating Margin (%)');
  renderScale(ctx6,0,20.3,20.3,profitability.width/3,profitability.width*.6,80);
  drawText(ctx6,profitability.width/3-20,100,'ROA (%)');
  renderScale(ctx6,0,35,26.5,profitability.width/3,profitability.width*.6,140);
  drawText(ctx6,profitability.width/3-20,160,'Return on Caplital Employed (ROCE) (%)');
}

render2();
