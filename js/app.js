$(function(){
  $(".elemento").hide();
  tiempo = 0;
  min=2;
  seg=0;
  //intervalo = 0;
  //eliminar = 0;

  prenderTitulo();
  $(".btn-reinicio").on("click", function(){
    score=0;
  	mov=0;
    $(".btn-reinicio").text("Reiniciar");
    $(".elemento").show();
    $(".time").show();
    $(".panel-score").css("width","25%");
    $("#score-text").html("0");
  	$("#movimientos-text").html("0");
    clearInterval(tiempo);
    min=2;
    seg=0;
    //clearInterval(intervalo);
    //clearInterval(eliminar);
    ordenarBloques();
    //verificarCoincidencias();
    //borrarRepetidos();
    tiempo=setInterval(function(){
  		timer()
  	},1000);
    //intervalo=setInterval(function(){
  		//ordenarBloques()
  	//},600);
    //rellenarBloques();
  })
});

function prenderTitulo(){
  $(".main-titulo").animate({color:"#606060"}, 500, function(){
      apagarTitulo();
    }
  )
}

function apagarTitulo(){
  $(".main-titulo").animate({color: "#DCFF0E"}, 500, function(){
      prenderTitulo();
    }
  )
}

function ordenarBloques(){
  $(".elemento").draggable({disabled:true});
  var arreglo = $('.elemento').sort(function(a, b){return 0.5 - Math.random()});
  for (var i = 0; i < 50; i++) {
    var elemento1 = $('.elemento')[i];
    var nombre1 = $(elemento1).attr('src');
    var elemento2 = arreglo[i];
    var nombre2 = $(elemento2).attr('src');
    $(elemento1).attr("src",nombre2)
  }
  //if (i == 50){
    //clearInterval(intervalo);
  	//eliminar=setInterval(function(){
  borrarRepetidos();
  	//,150);
  //}
}

function verificarRepetidosHori(){
  arreglo = $('.elemento');
  var horizontal = 0;
  for (var i = 0; i < 50; i++) {
    var elemento = $('.elemento')[i];
    var posizquierda = $('.elemento')[i-7];
    var posderecha = $('.elemento')[i+7];
    if ($(elemento).attr('src') == $(posizquierda).attr('src') && $(elemento).attr('src') == $(posderecha).attr('src')){
      if (i != 42 && i != 1 && i != 43 && i != 2 && i != 44 && i != 3 && i != 45 && i != 4 && i != 46 && i != 5 && i != 47 && i != 6){
        $(arreglo[i-7]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+7]).attr("class","elemento activo");
        horizontal = 1;
      }
    }
  }
  return horizontal;
}

function verificarRepetidosVerti(){
  arreglo = $('.elemento');
  var vertical = 0;
  for (var i = 0; i < 50; i++) {
    var elemento = $('.elemento')[i];
    var posarriba = $('.elemento')[i-1];
    var posabajo = $('.elemento')[i+1];
    if ($(elemento).attr('src') == $(posarriba).attr('src') && $(elemento).attr('src') == $(posabajo).attr('src')){
      if (i != 6 && i != 7 && i != 13 && i != 14 && i != 20 && i != 21 && i != 27 && i != 28 && i != 34 && i != 35 && i != 41 && i != 42){
        $(arreglo[i-1]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+1]).attr("class","elemento activo");
        vertical = 1;
      }
    }
  }
  return vertical;
}

function borrarRepetidos(){
  repetidoshori = verificarRepetidosHori();
  repetidosverti = verificarRepetidosVerti();
  total = $('.elemento').length;
  //alert (repetidoshori,"  ",repetidosverti,"  ",total);
  if(repetidoshori == 1 || repetidosverti == 1){
    //alert ("si coincidencias");
    //$(".elemento").draggable({disabled:true});
    nroborrar = $('.activo').length;
    $(".activo").hide("pulsate", 1000, function(){

      $(".activo").remove("img");
      score = score + (nroborrar * 10);
      $("#score-text").html(score);
      //buscarNuevosDulces=0;
  		//nuevosDulces=setInterval(function(){
  		rellenarBloques();
  		//},600);
      borrarRepetidos();
      //score = score + scoretmp * 10;
    });

  }
  //if(repetidoshori == 0 && repetidosverti == 0 && total == 49){
    //alert ("no coincidencias, panel lleno");

  //}
  //if(repetidoshori == 0 && repetidosverti == 0 && total != 49){
    //alert ("no coincidencias, panel no lleno");
		//clearInterval(eliminar);
		//buscarNuevosDulces=0;
		//rellenarBloques=setInterval(function(){
		//rellenarBloques();
		//},600);
    //borrarRepetidos();
  //}
}

function rellenarBloques(){
  for (var j = 1; j < 8; j++) {
    columna = $(".col-"+j).find(".elemento");
    nrollenar = 7 - columna.length;
    if (nrollenar > 0){
      for (var k = 1; k < nrollenar+1; k++){
        numero=Math.floor(Math.random()*4)+1;
        imagen="image/"+numero+".png";

        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");//.css("display","none");
        //$(".col-"+j[nrollenar-k]).hide();
        //$(".col-"+j[0]).slideDown(4000);

      }
    }
  }
  arreglo = $(".elemento");
  console.log (arreglo)
  //clearInterval(nuevosDulces);
  //eliminar=setInterval(function(){
    //eliminarhorver()
  //},150);
}

function timer(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){
			//clearInterval(eliminar);
			//clearInterval(nuevosDulces);
			//clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",abrirPantalla);
			$(".time").hide();}
		seg=59;
		min=min-1;}
  if(seg<10 && seg>=0){
    seg = "0"+seg;
  }
	$("#timer").html("0"+min+":"+seg);
};

function abrirPantalla(){
	$( ".panel-score" ).animate({width:'100%'},3000);
	$(".termino").css({"display":"block","text-align":"center"});
};
