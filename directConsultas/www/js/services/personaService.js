angular.module('starter.services', []).service("personasService", function ($http) {
    var uri = "http://app.directconsultas.com/administrador/";
    
    this.getByRol = function (idRol) {
        
        var req = $http.get(uri+'/api/rol/' + idRol + "/persona");
        return req;
    };
    
    this.getByLogin = function (user) {
        
        var req = $http.post(uri+'login',user);
        return req;
        
    };
    
    this.getDatos = function(ciudad){
        var req = $http.get(uri+'getDatos/'+ciudad);
        return req;
    }

    this.getByCedula = function (cedula) {
        
        var req = $http.get(uri+'/api/persona/cedula/' + cedula );
        return req;
    };
    
    
    this.get = function (id) {
        var req = $http.get(uri+'/api/persona/' + id);
        return req;
    };
    
    this.getAll = function () {
        var req = $http.get(uri+'/api/persona');
        return req;
    };
    
    this.post = function (persona) {
        
        var req = $http.post(uri+'/api/persona', persona);
        return req;
        
    };
    
    this.put = function (id,persona) {
        
        var req = $http.put(uri+'/api/persona/' + id, persona);
        return req;
        
    };
});