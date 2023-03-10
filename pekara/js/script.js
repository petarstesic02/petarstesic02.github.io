//Ajax funkcija za dohvatanje json fajlova - reusable
function getData(file,selektor,funkcija){
    $.ajax({
        url:"json/"+file+".json",
        method:"get",
        dataType:"json",
        success:funkcija,
        error:function(xhr){
           console.log(xhr.responseText);
        }
    });
}

var categories=[];

//selektor je div za ispis kartica
let selektor="";

//Smestanje svih kategorija u niz
getData("categories",selektor,function(data){
    categories=data;
});

//Proverava da li je home stranica
var daLiHome=document.getElementById("home");
if(daLiHome){selektor="specijal";}

//Proverava da li je shop stranica
var daLiShop=document.getElementById("shop");
if(daLiShop){selektor="shopper";}

//Proverava da li je korpa stranica
var daLiKorpa=document.getElementById("korpa");

//dohvatanje kategorija
function showCategories(kat){
    let ispisKat="";
        for(let i=0;i<kat.length;i++){
            categories.forEach((x,index)=>{
                if(x.id==kat[i]){
                    if(i==kat.length-1){
                        ispisKat+=x.ime;
                    }
                    else{
                        ispisKat+=x.ime+", ";
                    }
                }
            });
        }
    return ispisKat;
}

//funkcija za ispis kartica za proizvode ako je stranica home ili shop
if(daLiHome||daLiShop){
    function showProduct(data){
        let ispis="";

        data=filterSpecijal(data);
        data=filterCategories(data);
        data=sortByPrice(data);
        data=filterPosno(data);
        data=searchFilter(data);

        data.forEach(x=>{
            ispis+=`<div class="col-lg-6 mb-12" id="${x.slika.alt}">
                        <div class="card-h-100 product">
                            <a href="shop.html#${x.slika.alt}">
                                <img class="card-img-top" src="img/${x.slika.src}" alt="${x.slika.alt}"/>
                            </a>
                            <div class="card-body popup">
                                <h4 class="card-title">
                                    <a href="shop.html#${x.slika.alt}">${x.ime}</a>
                                </h4>
                                <h6>${x.posno?"Posno":"Mrsno"}</h6>
                                <s>${x.cenaPopust?"RSD "+x.cena:" "}</s>
                                <h5>RSD ${x.cenaPopust?x.cenaPopust:x.cena}</h5>
                                <p class="card-text kategs">
                                    ${showCategories(x.kategorije)}
                                </p>
                                <p class="card-text">${x.opis}</p>`;
                                if(daLiShop){//proizvodi se mogu dodati u korpu samo na shop strani. na index je samo izlog specijalnih proizvoda
                                    ispis+=`<input data-id="${x.id}" type="button" value="Dodaj u korpu" class="button btn btn-dark dodaj-u-korpu"/>
                                            <span id="popup${x.id}" class="popuptext">Proizvod je dodat u korpu.</span>
                                            </div>
                                        </div>
                                    </div>`;
                                }
                                else{
                                    ispis+=`</div></div></div>`
                                }
        });
            document.getElementById(selektor).innerHTML=ispis;
        $('.dodaj-u-korpu').click(dodajUKorpu);
    }
}

//pozivanje funkcije za ispis proizvoda
getData("products",selektor,showProduct);

//funkcija za filtriranje samo specijalnih proizvoda na pocetnoj stranici, ako stranica nije pocetna, funkcija ne radi nista. Dnevno uvek ima 2 specijalna proizvoda koji se rucno menjaju.
function filterSpecijal(data){
    if(daLiHome)
        return data.filter(x=>x.specijal==true);
    else
        return data;
}
let ispisSortiranja="sortDiv";

//Ispis checkboxa za filtriranje po kategorijama i mrsno/Posno ako je stranica shop
if(daLiShop){
    getData("categories",ispisSortiranja,function(data){
        let ispis="";
        ispis+=`<h4 id="sort">Izaberite kategorije</h4>`;
        ispis+=`<ul class="list-group">`;
        data.forEach(k=>{
            ispis+=`<li class="list-group-item">
                        <input type="checkbox" value="${k.id}" class="categoryCb" name="categories"/>${k.ime}
                    </li>`;
        });
        ispis+=`</ul>`;
        ispis+=`<div id="post"><h4 id="sort">Posno/Mrsno</h4>`;
        ispis+=`<ul class="list-group">`;
        ispis+=`<li class="list-group-item">
                    <input type="checkbox" value="0" class="posnoCb" name="posno"/>Mrsno
                </li>
                <li class="list-group-item">
                    <input type="checkbox" value="1" class="posnoCb" name="posno"/>Posno
                </li>`;
        ispis+=`</ul></div>`;
            document.getElementById(ispisSortiranja).innerHTML+=ispis;
    });
}

//Filter po kategorijama
function filterCategories(data){
    if(daLiShop){
        let chosenCategories=[];
        chosenCategories=document.querySelectorAll('input[name="categories"]:checked');
        if(chosenCategories.length!=0){
            for(let i=0;i<chosenCategories.length;i++){
                return data.filter(x=>x.kategorije.some(y=>chosenCategories[i].value.includes(y)));
            }
        }
        return data;
    }
    else{
        return data;
    }
}

//Filter posno/mrsn0
function filterPosno(data){
    if(daLiShop){
        let chosenOption=[];
        chosenOption=document.querySelectorAll('input[name="posno"]:checked');
        if(chosenOption.length!=0){
            for(let i=0;i<chosenOption.length;i++){
                return data.filter(x=>Number(x.posno)==chosenOption[i].value);
            }
        }
        return data;
    }
    else{
        return data;
    }
}

//search bar filter
function searchFilter(data){
    if(daLiShop){
        let pretraga=$('#searchInput').val().toLowerCase();
        if(pretraga!=""){
            return data.filter(x=>x.ime.toLowerCase().includes(pretraga));
        }
        return data;
    }
    return data;
}

//funkcije za promenu filtera
$('#sortDiv').change(function(){
    filterChange();
});
function filterChange(){
    getData("products",selektor,showProduct);
}

//funkcija za sortiranje po ceni
function sortByPrice(data){
    if(daLiShop){
        const typeOfSort=document.getElementById('inputGroupSelect').value;
        if(typeOfSort=='asc'){
            return data.sort((x,y)=>x.cenaPopust>y.cenaPopust?1:-1);
        }
        else if(typeOfSort=='az'){
            return data.sort((x,y)=>x.ime>y.ime?1:-1);
        }
        else if(typeOfSort=='za'){
            return data.sort((x,y)=>x.ime<y.ime?1:-1);
        }
        return data.sort((x,y)=>x.cenaPopust<y.cenaPopust?1:-1);
    }
    else
        return data;
}

//VALIDACIJA FORME
$('#formMain').change(function(){
    provera();
});


function provera(){
    var rating=document.getElementById("rateSelect").value;
    var proveraVar=false;
    var email=document.getElementById("emailInput").value;
    var question=document.getElementById("textAreaForm").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (rating < 1 || rating > 5) {
        document.querySelector("#ocenaLabel").innerHTML=`OCENITE NAŠE USLUGE - <span style="color:red; font-weight:bold">Molimo vas izaberite ocenu od 1 do 5</span>`;
        proveraVar=false;
    }
    else if(rating>0){
        document.querySelector("#ocenaLabel").innerHTML="OCENITE NAŠE USLUGE";
        proveraVar=true;
    }

    else if(!emailRegex.test(email)){
        document.getElementById("emailLabel").innerHTML=`EMAIL - <span style="color:red; font-weight:bold">Neispravan e-mail</span>`;
        proveraVar=false;
    }
    else if(emailRegex.test(email)){
        document.getElementById("emailLabel").innerHTML=`EMAIL`;
        proveraVar=true;
    }

    else if (question == "") {
        console.log(question);
        document.getElementById("questionLabel").innerHTML=`VAŠE PITANJE - <span style="color:red; font-weight:bold">Pitanje ne sme ostati prazno</span>`;
    }
    else if(question!=""){
        document.getElementById("questionLabel").innerHTML=`VAŠE PITANJE`;
    }
    else if(question.trim()===""){
        proveraVar=false;
    }
    return proveraVar;
}

//onSubmit funkcija
function validateForm(){
    return provera();
}


//KORPA

//pozivanje funkcije koja ispisuje broj proizvoda u korpi pored linka za korpu
kolikoProizvodaUKorpi();

//cuvanje svih proizvoda u localstorage radi uporedjivanja za ispis tabele korpe
getData("products",selektor,function(data){
    saveToLocalStorage("proizvod",data);
});

//funkcija za cuvanje u localstorage
function saveToLocalStorage(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}

//dodavanje proizvoda u localstorage item za korpu
function dodajUKorpu(){
    let id=$(this).data('id');

    //POPUP DA JE PROIZVOD DODAT NA KORPU
    setTimeout(function(){
        document.getElementById(`popup${id}`).classList.toggle('show');
    },200);
    setTimeout(function(){
        document.getElementById(`popup${id}`).classList.toggle('show');
    },3000);


    var proizvodiUKorpi=getFromLocalStorage("productsKorpa");
    if(proizvodiUKorpi){
        if(proizvodiUKorpi.filter(x=>x.id==id).length){
            let proizvodi=getFromLocalStorage("productsKorpa");
            for(let i in proizvodi){
                if(proizvodi[i].id==id){
                    proizvodi[i].quantity++;
                    break;
                }
            }
            saveToLocalStorage("productsKorpa",proizvodi);
        }
        else{
            let proizvodi=getFromLocalStorage("productsKorpa");
            proizvodi.push({
                id:id,
                quantity:1
            });
            saveToLocalStorage("productsKorpa",proizvodi);
        }
    }
    else{
        let proizvodi=[];
        proizvodi[0]={
            id:id,
            quantity:1
        };
        saveToLocalStorage("productsKorpa",proizvodi);
    }
    kolikoProizvodaUKorpi();
}

//funkcija za dohvatanje itema iz localstorage
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

//funkcija za ispis koliko proizvoda je u korpi
function kolikoProizvodaUKorpi(){
    let proizvodi=getFromLocalStorage("productsKorpa");
    var span=document.getElementById("brojKorpa");
    var br=0;
    if(proizvodi){
        for(let i in proizvodi){
            br+=proizvodi[i].quantity;
            span.innerHTML=` (${br})`;
        }
    }
    else{
        span.innerHTML="";
    }
}

//funkcija za prikaz tabele korpe ako je korpa puna, a prikazuje "NEMA PROIZVODA U KORPI" ako je korpa prazna
function showKorpa(){
            let proizvodi=getFromLocalStorage('productsKorpa');
            let ispis="";
            let div=document.getElementById("cart");
            let proizvodTrenutni=[];
            var k=0;
            var ukupnaCena=0;
            ispis+=`<div class="table-responsive table">`;
            if(proizvodi){
                let proizvodiSvi=getFromLocalStorage('proizvod');
                //console.log(proizvodi);
                ispis+=`<table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">IME</th>
                                    <th scope="col">CENA(KOMAD)</th>
                                    <th scope="col">POSNO</th>
                                    <th scope="col">KOLIČINA</th>
                                    <th scope="col">CENA(UKUPNA)</th>
                                    <th scope="col">OBRISI</th>
                                </tr>
                            </thead>
                            <tbody>`;
                for(let i in proizvodi){
                    var indeks=Number(i);
                    for(let j in proizvodiSvi){
                        if(proizvodiSvi[j].id==proizvodi[i].id){
                        proizvodTrenutni[k++]=proizvodiSvi[j];
                        ispis+=`<tr>
                                    <th scope="row">${indeks+1}</th>
                                    <td>${proizvodTrenutni[i].ime}</td>
                                    <td>${proizvodTrenutni[i].cenaPopust?proizvodTrenutni[i].cenaPopust:proizvodTrenutni[i].cena} RSD</td>
                                    <td>${proizvodTrenutni[i].posno?"DA":"NE"}</td>  
                                    <td>${proizvodi[i].quantity}</td>
                                    <td>${Number(proizvodTrenutni[i].cenaPopust?proizvodTrenutni[i].cenaPopust*proizvodi[i].quantity:proizvodTrenutni[i].cena*proizvodi[i].quantity)}</td>
                                    <td><input type="button" class="btn btn-dark obrisi" value="OBRISI PROIZVOD IZ KORPE" data-id="${proizvodTrenutni[i].id}"/></td>
                                </tr>`;
                        ukupnaCena+=Number(proizvodTrenutni[i].cenaPopust?proizvodTrenutni[i].cenaPopust*proizvodi[i].quantity:proizvodTrenutni[i].cena*proizvodi[i].quantity);
                        console.log(ukupnaCena);
                        }
                    }
                }
                ispis+=`</tbody></table></div>`;
                ispis+=`<div class="row text-center align-items-center">
                            <p class="card-text">UKUPNA CENA: ${ukupnaCena}</p>
                            <button class="btn btn-warning"><b>PLATI</b></button>
                        </div>`;
            }
            else{
                ispis=`<div class="row text-center"><h3 class="display-3">NEMA PROIZVODA U KORPI</h3></div>`;
            }
            div.innerHTML=ispis;
}

//korpa se ispisuje samo ako je stranica korpa
if(daLiKorpa){showKorpa();}

//funkcija za brisanje proizvoda iz korpe. location.reload() je stavljen da bi bilo moguce obrisati poslednji proizvod.
$('.obrisi').on('click',function(){
    var index=$(this).parent().parent().index();
    index=index-1;
    $(this).parent().parent().remove();
    var korpa=getFromLocalStorage('productsKorpa');
    korpa.splice(index,1);
    console.log(korpa);
    saveToLocalStorage('productsKorpa',korpa);
    if(getFromLocalStorage('productsKorpa').length===0){
        localStorage.removeItem('productsKorpa');
    }
    location.reload();
    showKorpa();
    kolikoProizvodaUKorpi();
});
