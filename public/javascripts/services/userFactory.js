app.factory('userFactory',['$http','env',($http,env)=>{
    const getUser = () => {
      return $http({  
        url: env.SERVICE_URL+'/getUser',
        method: 'GET'
    }).then(response=>{
        return response.data;
    },(err)=>{
        console.error(err);
    })
  };

  return {
      getUser
  }
}]);

//chat sayfası ile ilgili tüm http isteklerini yapan servisleri içeriyor
