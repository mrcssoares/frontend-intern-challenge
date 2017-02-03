var xmlhttp = new XMLHttpRequest();
var url = 'https://raw.githubusercontent.com/chaordic/frontend-intern-challenge/master/Assets/urls.json';
//var url = 'http://localhost/frontend-intern-challenge/Assets/urls.json';
var links;
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        links = JSON.parse(this.responseText);
    }
    //ordena pelos maiores hit
    links.sort(function(a,b) {return  b.hits - a.hits});
    var html ='';
	for(var i = 0; i < 5; i++){
		html += '<div class="row"><a class="text-danger">'+ links[i].shortUrl+ '</a> <a class="text-support"> ' + formatNumber(links[i].hits) +'</a></div>';
	}
	document.querySelector("#top5").innerHTML = html;
	//contador de hits
	var totalHits = 0;
	for(var j = 0; j < links.length; j++){
		totalHits += links[j].hits;
	}
	totalHits = formatNumber(totalHits);
	document.querySelector('.title-danger-hits').innerHTML = totalHits
};

//encurtador de url
function shorten(){
	var button = document.getElementById('btn_link');
	if(document.getElementById('btn_link').value == 'COPIAR'){
		var copyText = document.querySelector('.input-text');
		copyText.select();
		try{
			var successful = document.execCommand('copy');
			document.getElementById('link').value = '';
			document.getElementById('btn_link').value = 'ENCURTAR';
			alert('link copiado para area de transferencia');
		}catch(err){
			console.log('aconteceu um problema :(');
		}
	}else{
		var element = document.getElementById('link');
		var url = element.value;
		//verificando link vazio ou incorreto
		if(url == "" || url.match(/^(http:\/\/)?(w{3})?\w+(\.\w+)+$/) == null){
			alert('Link inserido não corresponde ao padão: dominio.link');
		}else{
			url = short(url);
			document.getElementById('link').value = url;
			document.getElementById('link').style.color = '#fff';
			document.getElementById('btn_link').value = 'COPIAR';
		}
	}
	
};
//geraurl
function short(url){
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVSZabcdefghiklmnopqrstuvwxyz";
	var urlshort = '';
    for (var i = 0; i < 6; i++) {
        var randomchar = Math.floor(Math.random() * chars.length);
        urlshort += chars.substring(randomchar, randomchar + 1);
    }
    url = 'http://chr.dc/' + urlshort;
    return url;
};

function formatNumber(num){
 	num = num.toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
 	num = num.replace('.00000', '');
 	return num;
};