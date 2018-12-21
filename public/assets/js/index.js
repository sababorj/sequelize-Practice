$(document).ready( function(){
    $.getJSON('/api/users', function(data){
        if(data){
            for(var i=0;i<data.length;i++){
                var tr = $("<tr>");
                tr.append(`<td>${data[i].id}</td><td>${data[i].email}</td><td>${data[i].password}</td>`);
                $("tbody").append(tr);
            }
        }
    })
})