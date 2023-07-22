//axios import buraya gelecek
import axios from "axios";

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


// Make a request for a user with a given ID


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

const cardYapici = (data)=>{
	const card = document.createElement("div");
	card.classList.add("card");

	const bayrak = document.createElement("img");
	bayrak.setAttribute("src", data?.["ülkebayrağı"]);
	card.append(bayrak);

	const cardInf= document.createElement("div");
	cardInf.classList.add("card-info");
	card.append(cardInf);

	const baslik = document.createElement("h3");
	baslik.classList.add("ip");
	baslik.textContent= `IP: ${data?.sorgu}`;
	cardInf.append(baslik);

	const ulkeBl= document.createElement("p");
	ulkeBl.classList.add("ulke");
	ulkeBl.textContent=`${data?.["ülke"]} (${data?.["ülkeKodu"]})`;
	cardInf.append(ulkeBl);

	const enlBoyl = document.createElement("p");
	enlBoyl.textContent= `Enlem:${data?.enlem} Boylam:${data?.boylam}`;
	cardInf.append(enlBoyl);

	const sehirBlg= document.createElement("p");
	sehirBlg.textContent=`Şehir: ${data?.bölgeAdı}`;
	cardInf.append(sehirBlg);

	const saatDilimi= document.createElement("p");
	saatDilimi.textContent= `Saat dilimi: ${data?.saatdilimi}`;
	cardInf.append(saatDilimi);

	const parBir = document.createElement("p");
	parBir.textContent=`Para birimi: ${data?.parabirimi}`;
	cardInf.append(parBir);

	const isp= document.createElement("p");
	isp.textContent=`ISP: ${data?.isp}`;
	cardInf.append(isp);

	return card;


}

const cardContainer= document.querySelector(".cards");
let myIp= null;
async function getMyIp (){
	
	await axios
	  .get("https://apis.ergineer.com/ipadresim")
	  .then(function (response) {
		myIp=response.data;
		return myIp;
		// handle success
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .finally(function () {
		console.log("myIp" ,myIp)
		// always executed
	  });
}

async function getApi (){
	await getMyIp();
	
	axios
	  .get(`https://apis.ergineer.com/ipgeoapi/${myIp}`)
	  .then(function (response) {
		
		cardContainer.append(cardYapici(response.data));
		// handle success
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  
}
 getApi();
console.log("aaa", getApi());

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/


/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek