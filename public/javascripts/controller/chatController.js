app.controller('chatController',['$scope',($scope)=>{
    $scope.onlineList=[];
    $scope.roomList=[];
    $scope.activeTab = 1;
    $scope.chatClick = false;
    $scope.chatName ="";
    $scope.roomId="";
    $scope.message="";

    const socket = io.connect('http://localhost:3000');

    socket.on('onlineList',users =>{
        $scope.onlineList = users;
        $scope.$apply();
    });


    $scope.newRoom = () =>{
        //let randomName = Math.random().toString(36).substring(7);
        let roomName = window.prompt("Oda İsmi Giriniz.");
        if(roomName != null && roomName != ''){
            socket.emit('newRoom',roomName);
        }
    };

    $scope.switchRoom = room =>{
        $scope.chatName = room.roomName;
        $scope.roomId=room.id;
        $scope.chatClick = true;
    };

    $scope.newMessage = () =>{
        socket.emit('newMessage',{
            message:$scope.message,
            roomId: $scope.roomId
        })
        $scope.message ="";
    };





    socket.on('roomList',rooms=>{
        $scope.roomList = rooms;
        $scope.$apply();
    });



    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };
    
    
}]);