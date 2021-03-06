angular.module('starter.controllers', [])
.controller('homeController', function($scope, $stateParams, $ionicSlideBoxDelegate, $ionicLoading, personasService) {
//--------------------
  
  $scope.city = "Buscando Ciudad";

  $scope.categorias = [];
  $scope.subcategorias = [];
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };


  function configList(){

    for(var i = 0 ; i < $scope.categorias.length; i++){
      $scope.categorias[i].subcategorias = [];
      for(var j = 0; j < $scope.subcategorias.length; j++){

        if($scope.subcategorias[j].idCategoria == $scope.categorias[i].idCategoria){

          $scope.categorias[i].subcategorias.push($scope.subcategorias[j]);

        }

      }

    }

  }

//---------------------
    $("#slide").height( $(window).height()/3 );
    
    $scope.Pautas = [];

    var ciudad = session.getCiudad();
    if(ciudad){
      $scope.city = ciudad;
      showLoader();
      loadDatos(ciudad);
    }else{
      
      showLoader();
      navigator.geolocation.getCurrentPosition(function(position) {

          lat = position.coords.latitude;
          lng = position.coords.longitude;
          
          var geocoder = new google.maps.Geocoder();
          var yourLocation = new google.maps.LatLng(lat, lng);

          geocoder.geocode({'latLng': yourLocation}, processGeocoder);
      }, function() {
        hideLoader(); 
          alert("Error al Obtener la Posición de su dispositivo, intente activar el GPS !");
          return null;
      }, {enableHighAccuracy: true});

    }
    
    function showLoader(){
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    }

    function configSlide(){
        $("div.banner").css("top",($("#slide").height()-50)+"px");
    }

    function hideLoader(){
      $ionicLoading.hide();
    }

    function processGeocoder(results, status) {
    
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var dir = results[0].formatted_address;
                var array = dir.split(',');
                console.log(array);
                var ciudad = $.trim( array[1] );

                $scope.city = array[1];
                //$("#direccion").html(array[1]+", "+array[2]);
                session.setCiudad(ciudad);
                loadDatos(ciudad);

            } else {
                alert("Error al Obtener Dirección");
                hideLoader();
            }
            
        } else {
            hideLoader();
            alert("Error al Obtener Dirección");
        }

    }

    function loadDatos(ciudad) {
        var promiseGet = personasService.getDatos(ciudad); //The Method Call from service
        promiseGet.then(function (pl) {
            console.log(pl.data);
            
            $scope.Pautas = pl.data.pautas;
            $scope.categorias = pl.data.categorias;
            $scope.subcategorias = pl.data.subcategorias;
            configList()
            hideLoader();

            $ionicSlideBoxDelegate.update();

        },
              function (errorPl) {
                hideLoader();
                  console.log('failure loading Contactos', errorPl);
              });
    }

});