$(document).ready( function(){
    function getAllUserData(){
        $.getJSON('/api/users', function(data){
            if(data){
                $("tbody").empty()
                for(var i=0;i<data.length;i++){
                    var tr = $("<tr>");
                    tr.append(`<td>${data[i].id}</td><td>${data[i].email}</td><td>${data[i].password}</td>`);
                    $("tbody").append(tr);
                }
            }
        })
    }

    getAllUserData();
    $("#user-form").on("submit", function(e){
        e.preventDefault();
        var userObj = {
            email: $("#user-email").val().trim(),
            password: $("#user-password").val().trim(),
            luckyNumber: $("#user-lucky-number").val().trim(),
        };
        $.post("/api/users", userObj, function(data){
            if(data) {
                console.log(data);
                getAllUserData();
                $("#user-email").val("");
                $("#user-password").val("");
                $("#user-lucky-number").val("");
            }
        });
    });
   
})