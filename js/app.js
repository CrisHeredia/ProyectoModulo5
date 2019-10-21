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
  var arreglo = $('.elemento').sort(function(a, b){return 0.5 - Math.random()});
  for (var i = 0; i < 50; i++) {
    var elemento1 = $('.elemento')[i];
    var nombre1 = $(elemento1).attr('src');
    var elemento2 = arreglo[i];
    var nombre2 = $(elemento2).attr('src');
    $(elemento1).attr("src",nombre2)
  }
}

function verificarCoincidencias(){
  // Barrida del arreglo de elementos para verificar filas y columnas que tienen coincidencias
  arraycoincide = [];
  var arreglo = $('.elemento');
  for (var i = 0; i < 50; i++) {
    var elemento = $('.elemento')[i];
    var posarriba = $('.elemento')[i-1];
    var posabajo = $('.elemento')[i+1];
    var posizquierda = $('.elemento')[i-7];
    var posderecha = $('.elemento')[i+7];
    if ($(elemento).attr('src') == $(posarriba).attr('src') && $(elemento).attr('src') == $(posabajo).attr('src')){
      if (i != 6 && i != 7 && i != 13 && i != 14 && i != 20 && i != 21 && i != 27 && i != 28 && i != 34 && i != 35 && i != 41 && i != 42){
        $(arreglo[i-1]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+1]).attr("class","elemento activo");
        //arraycoincide.push([i-1]);
        //arraycoincide.push([i]);
        //arraycoincide.push([i+1]);
      }
    }
    if ($(elemento).attr('src') == $(posizquierda).attr('src') && $(elemento).attr('src') == $(posderecha).attr('src')){
      if (i != 42 && i != 1 && i != 43 && i != 2 && i != 44 && i != 3 && i != 45 && i != 4 && i != 46 && i != 5 && i != 47 && i != 6){
        $(arreglo[i-7]).attr("class","elemento activo");
        $(arreglo[i]).attr("class","elemento activo");
        $(arreglo[i+7]).attr("class","elemento activo");
        //arraycoincide.push([i-7]);
        //arraycoincide.push([i]);
        //arraycoincide.push([i+7]);
      }
    }
  }
  console.log(arreglo);
}

function borrarRepetidos(){
  //for (var i = 0; i < arraycoincide.length; i++){
    //var indice = arraycoincide[i];

    //$(arreglo[indice]).attr("alt","pasivo");
    //$(arreglo[indice]).hide("pulsate", 1000, function(){
    $(".activo").hide("pulsate", 1000, function(){
      //arreglo.splice(indice, 1);
      $(".activo").remove("img");
      //delete $(arreglo)[indice];
      //$(arreglo)[indice].detach("img");
      //$(arreglo)[indice] = "";
    })
  //}

}

function rellenarBloques(){
  alert("rellenar bloques");
  //console.log (arreglo);
  columna1 = $('.col-1').find(".elemento");
  //vacio = $(columna1).attr("alt");
  //console.log (columna1);
  //console.log (vacio);
  var j = 6;
  do {
    var elemento1 = $(columna1)[j];
    var nombre1 = $(elemento1).attr("alt");
    if (nombre1 == "pasivo"){
      $(columna1[j]).replaceWith(columna1[j-1]);
    }
    j -= 1;
  } while (j < 7 && j>=0);
  console.log (columna1);
}

$(function(){
  $(".elemento").hide();
  $(".btn-reinicio").on("click", function(){
    $(".btn-reinicio").text("Reiniciar");
    $(".elemento").show();
    prenderTitulo();
    ordenarBloques();
    verificarCoincidencias();
    borrarRepetidos();
    //rellenarBloques();
  })
});
