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
