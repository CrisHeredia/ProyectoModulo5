$(function(){
  prenderTitulo();
  $(".btn-reinicio").on("click", function(){
	  i=0;
	  score=0;
	  mov=0;
    intervalo=0;
    borrar=0;
    tiempo=0;
	  $(".panel-score").css("width","25%");
	  $(".panel-tablero").show();
	  $(".time").show();
	  $("#score-text").html("0");
	  $("#movimientos-text").html("0");
	  $(this).html("Reiniciar")
	  clearInterval(intervalo);
	  clearInterval(borrar);
	  clearInterval(tiempo);
	  min=2;
	  seg=0;
    $(".elemento").detach();
	  intervalo=setInterval(function(){
		  llenarTablero()
	  },600);
	  tiempo=setInterval(function(){
		  timer()
	  },1000);
  })
});
//-------------------------------------------------------------------
function prenderTitulo(){
  $(".main-titulo").animate({color:"#606060"}, 500, function(){
      apagarTitulo();
    })
};
//---------------------------------------------------------------------
function apagarTitulo(){
  $(".main-titulo").animate({color: "#DCFF0E"}, 500, function(){
      prenderTitulo();
    })
};
//--------------------------------------------------------------------
function llenarTablero(){
	i=i+1
	$(".elemento").draggable({disabled:true});
  if (i < 8){
    for(var j=1;j<8;j++){
      numero=Math.floor(Math.random()*4)+1;
      imagen="image/"+numero+".png";
      $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start");
    }
  }
	if(i==8){
	clearInterval(intervalo);
	borrar=setInterval(function(){
		borrarRepetidos()
	},150);}
};
//----------------------------------------------------------------------
function timer(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){
			clearInterval(borrar);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",function(){
        $( ".panel-score" ).animate({width:'100%'},3000);});
			$(".time").hide();}
		seg=59;
		min=min-1;}
    if(seg<10 && seg>=0){
      seg = "0"+seg;
    }
	$("#timer").html("0"+min+":"+seg);
};
//---------------------------------------------------------------------
function borrarRepetidos(){
	repetidoshori=verificarRepetidosHori();
	repetidosverti=verificarRepetidosVerti();
  total = $('.elemento').length;
	if(repetidoshori==0 && repetidosverti==0 && total!=49){
			rellenarTablero()
  }
	if(repetidoshori==1||repetidosverti==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").remove("img");
			score=score+scoretmp*10;
			$("#score-text").html(score);
      rellenarTablero();
      borrarRepetidos();
		});
	}
	if(repetidoshori==0 && repetidosverti==0 && total==49){
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
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
      do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			repetidoshori=verificarRepetidosHori();
			repetidosverti=verificarRepetidosVerti();
			if(repetidoshori==0 && repetidosverti==0){
				dropped.swap($(droppedOn));}
			if(repetidoshori==1 || repetidosverti==1){
				//clearInterval(nuevosDulces);
				clearInterval(borrar);
				borrar=setInterval(function(){
					borrarRepetidos()
				},150);
			}
			},
	});
};
//---------------------------------------------------------------------------
jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};
//---------------------------------------------------------------------------
function rellenarTablero(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
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
  borrarRepetidos();
};
//--------------------------------------------------------------------------
function verificarRepetidosHori(){
  arreglo = $('.elemento');
	var busquedaHori=0;
  for (var i = 0; i < 50; i++) {
    var elemento = $('.elemento')[i];
    var posizquierda = $('.elemento')[i-7];
    var posderecha = $('.elemento')[i+7];
    if ($(elemento).attr('src') == $(posizquierda).attr('src') && $(elemento).attr('src') == $(posderecha).attr('src')){
      if (i != 42 && i != 1 && i != 43 && i != 2 && i != 44 && i != 3 && i != 45 && i != 4 && i != 46 && i != 5 && i != 47 && i != 6){
        $(arreglo[i-7]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+7]).attr("class","elemento activo");
        busquedaHori = 1;
      }
    }
  }
	return busquedaHori;
};
//-------------------------------------------------------------------------
function verificarRepetidosVerti(){
  arreglo = $('.elemento');
	var busquedaVerti=0;
  for (var i = 0; i < 50; i++) {
    var elemento = $('.elemento')[i];
    var posarriba = $('.elemento')[i-1];
    var posabajo = $('.elemento')[i+1];
    if ($(elemento).attr('src') == $(posarriba).attr('src') && $(elemento).attr('src') == $(posabajo).attr('src')){
      if (i != 6 && i != 7 && i != 13 && i != 14 && i != 20 && i != 21 && i != 27 && i != 28 && i != 34 && i != 35 && i != 41 && i != 42){
        $(arreglo[i-1]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+1]).attr("class","elemento activo");
        busquedaVerti = 1;
      }
    }
  }
	return busquedaVerti;
};
