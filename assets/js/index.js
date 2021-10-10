
$('#update_user').submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    });
    var weHaveSuccess = false;
    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data,
        "success": function(data,status,xhr){
            weHaveSuccess = true;
        },
        "error": function(xhr, status, error){
            toastr.error("Email is already exists!!!");
        },
        "complete": function(){
            if(weHaveSuccess){
                toastr.success("User Updated successfully!!!");
            }
        },
    }
    
    $.ajax(request);
   
        
});

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var deleteSuccess = false;
        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE",
            "success": function(data,status,xhr){
                deleteSuccess = true;
            },
            "error": function(xhr, status, error){
                toastr.error("Can not delete user of id:"+id);
            },
            "complete": function(){
                if(deleteSuccess){
                    toastr.success("User Deleted successfully!!!");
                }
            },
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request)
            .done(function(response){
                setInterval('location.reload()', 1000);
            })
        }

    })
}