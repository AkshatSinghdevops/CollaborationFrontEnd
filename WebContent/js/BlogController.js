'use strict'
angular.module('myApp').controller('BlogController', ['$scope','BlogService','$http', function($scope, BlogService,$http) {
    var self = this;
    self.blog={id:null,user_id:'',blog_name:'',description:''};
    self.blogs=[];
    $scope.userblog=[];
    
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllBlogs();
    getUserBlog();
    
 /* =========================================================================================================== */  
    
    	
    	/*$scope.selectUploadFile;
    	
    	$scope.uploadFile=function(){
    		
    		var formData = new FromData();
    		for(e in $scope.selectUploadFile){
    			fromData.append(e,$scope.selectUploadFile[e])
    		}
    		
    		var file = $('#file')[0].files[0];
    		console.log(file)
    		formData.append('file',$scope.selectUploadFile);
    		$http.post('api/uploa',formData,{
    			transformRequest:angular.indentity,
    			headers:{'Content-Type':multipart/from-data}
    		}).success(function(){
    			console.log('success upload file',file);
    		});
    		
    	};*/
    	
    	
    
    	
    	
    	
	
	 /* ================================================================================================================== */  	
 
    function fetchAllBlogs(){
        BlogService.fetchAllBlogs()
            .then(
            function(d) {
                self.blogs = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
    
    function getUserBlog(){
    	console.log("enter getUserBlog in controller")
        BlogService.getUserBlog()
            .then(fetchAllBlogs(),
            function(d) {
                $scope.userblog = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
 
    function createBlog(blog){
        BlogService.createBlog(blog)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while creating Blog in controller error');
            }
        );
    }
 
    function updateBlog(blog, id){
        BlogService.updateBlog(blog, id)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while updating Blog');
            }
        );
    }
 
    function deleteBlog(id){
        BlogService.deleteBlog(id)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while deleting Blog');
            }
        );
    }
 
    function submit() {
        if(self.blog.id===null){
            console.log('Saving New Blog', self.blog);
            createBlog(self.blog);
        }else{
            updateBlog(self.blog, self.blog.id);
            console.log('Blog updated with id ', self.blog.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.blogs.length; i++){
            if(self.blogs[i].id === id) {
                self.blog = angular.copy(self.blogs[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.blog.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteBlog(id);
    }
 
 
    function reset(){
        self.blog={id:null,user_id:'',blog_name:'',description:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);