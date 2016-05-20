var app = angular.module('app2',['ngRoute']);
app.controller('formsController',function($scope,$http){
      	
 $scope.showdata = function(student){
 	 	// alert();
    $scope.post_id=student
      $http.get("http://192.168.199.239:3000/posts/"+student)
      .then(function(response){
      $scope.postshow = response.data.post;
        $scope.comment_details = response.data.comment;
      // alert(response.data.post);
         console.log($scope.postshow);
          console.log($scope.comment_details);
      
     });

 }

 $scope.indexdata = function(){
 	 	// alert();
      $http.get("http://192.168.199.239:3000/posts")
      .then(function(response){
      $scope.posts = response.data.post;
      // alert(response.data.post);
         // console.log($scope.posts[1].title);
     });
 }

 $scope.editpost = function(id){

  $http.get("http://192.168.199.239:3000/posts/"+id)
  .then(function(response){
    $scope.edit_post = response.data.post;
    $scope.post = $scope.edit_post;
  });
}

$scope.update = function(post){
    // alert(student);
          $http.put("http://192.168.199.239:3000/posts/"+post,$scope.post)
    .then(function(response){

      $http.get("http://192.168.199.239:3000/posts")
        .then(function(response){
          $scope.post=response.data.posts;
        });
       
    });
}

$scope.destroy = function(id){
   // window.location = "show.html";
  var r = confirm("Do you want to delete ?");
if (r == true) {
  $http.delete("http://192.168.199.239:3000/posts/"+id)
       .then(function(response){
           // $scope.student_delete = response.data.student;
           alert("your data is deleted")
        });
            } 
else {
    alert("your data is safe")
    } 
}

$scope.destroycomment = function(comment,id){
  $http.delete("http://192.168.199.239:3000/posts/"+id+"/comments/"+comment)
  .then(function(response){
    alert();
});
}

	$scope.createpost = function(post){
        $http.post("http://192.168.199.239:3000/posts",post)
      .then(function(response){
      $scope.post_details = response.data.post;
         console.log($scope.post)
    });
 }

$scope.createcomment = function(comment,post_id){
        $http.post("http://192.168.199.239:3000/posts/"+post_id+"/comments",comment)
      .then(function(response){
      	$scope.comment_details = response.data.comment;
      	console.log($scope.comment_details);
    });
 }

});


app.config(['$routeProvider' ,function($routeProvider){
          $routeProvider.when('/newpost',{
            templateUrl: 'postform.html'
          });

        $routeProvider.when('/allposts',{
              templateUrl: 'posts.html'
          });


        $routeProvider.when('/showpost',{
              templateUrl: 'show.html'
          });

        $routeProvider.when('/commentform',{
              templateUrl: 'commentform.html'
          });

        $routeProvider.when('/edit',{
              templateUrl: 'posteditform.html'
        });

}]);




