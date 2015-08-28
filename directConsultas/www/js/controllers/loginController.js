angular.module('starter.controllers', []).controller('loginController', function ($scope, personasService) {
    //VistaModelo
    $scope.Usuario = {}; //Objeto Actual
    
    
    $scope.iniciarSesion = function(){
        
        var usuario = {usuario:$scope.Usuario.email, pass:$scope.Usuario.clave};
        
        var promiseGet = personasService.getByLogin(usuario); //The Method Call from service
        promiseGet.then(function (pl) {
            if(pl.data.msj =="exito"){

                session.setUsuario(pl.data.usuario);
                location.href= "index.html";

            }else{
                alert("Email o Contraseña inválidos...");
            }
                
            
        },
              function (errorPl) {
                    alert("Usuario o Contraseña Inválidos !");
                  console.log('failure loading Empleados', errorPl);
              });
        
    };
    
    
    
    //Function to Reset Scope variables
    function initialize() {
        $scope.Usuario = {};
        $scope.Usuario.usuario = "";
        $scope.Usuario.clave = "";
    }
    
    
    $scope.add = function () {
        
        var Pers = {
            cedula: $scope.Persona.cedula,
            nombres:$scope.Persona.nombres,
            apellidos:$scope.Persona.apellidos,
            direccion: $scope.Persona.direccion,
            telefono: $scope.Persona.telefono,
            sexo: $scope.Persona.sexo,
            email: $scope.Persona.email,
            persona: "empleado"
        };
        
        var promisePost = personasService.post(Pers);
        promisePost.then(function (d) {
            
            //$scope.Persona.descripcion = d.data.resquest.descripcion;
            loadRecords();
            
            alert(d.data.message);
            initialize();
            $('#modal').closeModal();
            
        }, function (err) {
            if(err.status == 401){
                alert(err.data.message);
            }else{
                alert("Error Al Guardar El Empleado");
            }
            
            console.log("Some Error Occured "+ JSON.stringify(err));
        });
    };
    //Function to Cancel Form
    $scope.cancelForm = function () {
        initialize();
    };
    
    
    $scope.cerrarModal = function(){
        initialize(); 
        $('#modal').closeModal();
    };
    
    //Functin Para Actualizar
    $scope.update = function () {
        var Prod = {
            id: $scope.Persona.id,
            cedula: $scope.Persona.cedula,
            nombres:$scope.Persona.nombres,
            apellidos:$scope.Persona.apellidos,
            direccion: $scope.Persona.direccion,
            telefono: $scope.Persona.telefono,
            sexo: $scope.Persona.sexo,
            email: $scope.Persona.email
        };
        
        var promisePost = personasService.put(Prod.id, Prod);
        promisePost.then(function (d) {
            
            loadRecords();
            
            alert(d.data.message + ", " +d.data.request);
            initialize();
            $('#modal').closeModal();
            
        }, function (err) {
            alert("Error Al Modificar El Empleado");
            console.log("Some Error Occured "+ JSON.stringify(err));
        });
   }; 
    //Confirmar Para Eliminar
    $scope.showconfirm = function () {
         $scope.Persona = this.persona;
         if(confirm("Desea Eliminar El Empleado:" +$scope.Persona.descripcion)){
             alert("Implemente el método para eliminar" );
             //Invocar Servicio de Eliminación
             //Actualizar datos de $scope.Contacts 
         }
     };
});