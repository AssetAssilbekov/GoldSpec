const search = document.querySelector('input');
const autocomplete = document.querySelector('#autocomplete');


search.addEventListener('input', ()=> {
  autocomplete.innerHTML = '';
  let num = 0;
  let val = search.value;
  database.forEach((item, i) => {
    if(item.name.toLowerCase().includes(val.toLowerCase())&&num<5&&val!='') {
      autocomplete.innerHTML += `<li><a href="https://assetassilbekov.github.io/GoldSpec/page/index.html?id=${item.address}" style="color:black;text-decoration:none;">${item.name}</a></li>`;
      num++;
    };
  });
});
