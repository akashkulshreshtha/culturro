
var app = angular.module('myApp',[]);
app.controller('Students',($scope,$http)=>{
	$scope.submit =  ()=>{
		var studentData = JSON.stringify({
			sName : $scope.name,
			sDob : $scope.dob,
			sGen: $scope.gender
		});

		console.log(studentData);
		$http.post('/delete',studentData).then((res)=>{
			console.log(res);
			console.log("successs")
		}).catch((err)=>{
			console.log(err);
			console.log("error");
		});
	}
});