$(function(){
  $(".elemento").detach();
  intervalo = 0;
  tiempo = 0;
  //rellenar = 0;
  //borrar = 0;
  min=2;
  seg=0;
  //lencolum=["","","","","","",""];
  //lenrest=["","","","","","",""];
  //buscarNuevosDulces=0;
  //rellenarBloques=0;
  prenderTitulo();
  $(".btn-reinicio").on("click", function(){
    i = 0
    score = 0;
  	mov = 0;
    $(".btn-reinicio").text("Reiniciar");
    $(".panel-tablero").show();
    $(".elemento").show();
    $(".time").show();
    $(".panel-score").css("width","25%");
    $("#score-text").html("0");
  	$("#movimientos-text").html("0");
    $(".elemento").detach();
    min = 2;
    seg = 0;
    clearInterval(tiempo);
    clearInterval(intervalo);
    //clearInterval(borrar);
  	//clearInterval(rellenar);
    tiempo=setInterval(function(){
  		timer()
  	},1000);
    intervalo=setInterval(function(){
  		ordenarBloques()
  	},600);
  })
});
//-------------------------------------------------------------------
function prenderTitulo(){
  $(".main-titulo").animate({color:"#606060"}, 500, function(){
      apagarTitulo();
    }
  )
}
//---------------------------------------------------------------------
function apagarTitulo(){
  $(".main-titulo").animate({color: "#DCFF0E"}, 500, function(){
      prenderTitulo();
    }
  )
}
//-------------------------------------------------------------------
function ordenarBloques(){
  i = i + 1;
  $(".elemento").draggable({disabled:true});
  if (i < 8){
    for(var j=1;j<8;j++){
      numero=Math.floor(Math.random()*4)+1;
      imagen="image/"+numero+".png";
      $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
    }
  }
  if (i == 8){
    clearInterval(intervalo);
    //borrar=setInterval(function(){
  		borrarRepetidos()
  	//},150);
  }
    //borrarRepetidos();
};
//---------------------------------------------------------------
function verificarRepetidosHori(){
  arreglo = $('.elemento');
  var horizontal = 0;
  /*for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				horizontal=1;
			}
		}
	}*/
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
//-----------------------------------------------------------------
function verificarRepetidosVerti(){
  arreglo = $('.elemento');
  var vertical = 0;
  /*for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				vertical=1;
			}
		}
	}*/
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
//-------------------------------------------------------------------
function borrarRepetidos(){
  repetidoshori = verificarRepetidosHori();
  repetidosverti = verificarRepetidosVerti();
  total = $('.elemento').length;
  //alert (repetidoshori,"  ",repetidosverti,"  ",total);
  if(repetidoshori == 0 && repetidosverti == 0 && total != 49){
    //alert ("no coincidencias, panel no lleno");
		//clearInterval(borrar);
		//buscarNuevosDulces=0;
		//rellenar=setInterval(function(){
		  rellenarBloques();
		//},600);
    //borrarRepetidos();
  }
  if(repetidoshori == 1 || repetidosverti == 1){
    //alert ("si coincidencias");
    $(".elemento").draggable({disabled:true});
    $("div[class^='col']").css("justify-content","flex-end");

    $(".activo").hide("pulsate", 1000, function(){
      var nroborrar = $('.activo').length;
      $(".activo").remove("img");
      score = score + (nroborrar * 10);
      $("#score-text").html(score);
  		rellenarBloques();
      borrarRepetidos();
    });
  }
  if(repetidoshori == 0 && repetidosverti == 0 && total == 49){
    $(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mov=mov+1;
				$("#movimientos-text").html(mov);}
		});
  }
  $(".elemento").droppable({
		drop:function (event,ui){
			var dropped = ui.draggable;
      //console.log ("dropped",dropped);
			var droppedOn = this;
      //console.log ("droppedOn",droppedOn);
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
      repetidoshori=verificarRepetidosHori();
			repetidosverti=verificarRepetidosVerti();
			if(repetidoshori==0 && repetidosverti==0){
				dropped.swap($(droppedOn));}
			if(repetidoshori==1 || repetidosverti==1){
				//clearInterval(rellenar);
				//clearInterval(borrar);
				//borrar=setInterval(function(){
					borrarRepetidos()
				//},150);
			}
    },
	});
  //console.log ($(".elemento"));
};
//--------------------------------------------------
jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
  //a.parentNode.insertBefore(b,a);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};
//------------------------------------------------------
function rellenarBloques(){
  $(".elemento").draggable({disabled:true});
  $("div[class^='col']").css("justify-content","flex-start")
	/*for(var j=1;j<8;j++){
		lencolum[j-1]=$(".col-"+j).children().length;}
	if(buscarNuevosDulces==0){
		for(var j=0;j<7;j++){
			lenrest[j]=(7-lencolum[j]);}
		maximo=Math.max.apply(null,lenrest);
		contadorTotal=maximo;}
	if(maximo!=0){
		if(buscarNuevosDulces==1){
			for(var j=1;j<8;j++){
				if(contadorTotal>(maximo-lenrest[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenrest[j-1])+")").remove("img");}}
		}
		if(buscarNuevosDulces==0){
			buscarNuevosDulces=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(lenrest[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var j=1;j<8;j++){
			if(contadorTotal>(maximo-lenrest[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	//if(contadorTotal==1){
		//clearInterval(nuevosDulces);
		//eliminar=setInterval(function(){
			borrarRepetidos()
		//},150);
	//}
	contadorTotal=contadorTotal-1;*/
  for (var j = 1; j < 8; j++) {
    columna = $(".col-"+j).find(".elemento");
    nrollenar = 7 - columna.length;
    if (nrollenar > 0){
      for (var k = 1; k < nrollenar+1; k++){
        numero=Math.floor(Math.random()*4)+1;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");
      }
    }
  }
  //clearInterval(rellenar);
  //borrar=setInterval(function(){
    borrarRepetidos()
  //},150);
  //borrarRepetidos();
};
//-----------------------------------------------------------
function timer(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){
			clearInterval(borrar);
			clearInterval(rellenar);
			clearInterval(intervalo);
			clearInterval(tiempo);
			//$(".panel-tablero").hide("drop","slow",abrirPantalla);
      $( ".panel-score" ).animate({width:'100%'},3000);
			$(".time").hide();}
		seg=59;
		min=min-1;}
  if(seg<10 && seg>=0){
    seg = "0"+seg;
  }
	$("#timer").html("0"+min+":"+seg);
};
//-----------------------------------------------------------
//function abrirPantalla(){
	//$( ".panel-score" ).animate({width:'100%'},3000);
	//$(".termino").css({"display":"block","text-align":"center"});
//};
