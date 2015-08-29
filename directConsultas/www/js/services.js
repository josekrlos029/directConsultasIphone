angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service("pautasService", function ($http) {
    
    var uri = "http://app.directconsultas.com/administrador/";
    this.getByIdSubcategoria = function(object){
        
        var url = uri+'consultarPautasbySubcategoria';
        console.log(url+"-"+ JSON.stringify(object));
       var formData=new FormData();
        formData.append('idSubcategoria',object.idSubcategoria);
        formData.append('ciudad', object.ciudad);
        var req = $http.post(url, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        //var req = $http.post(uri+'consultarPautasbySubcategoria', 'idSubcategoria='+object.idSubcategoria+"&ciudad="+object.ciudad);
        
    };
    
})

.service("personasService", function ($http) {
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
    };

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
