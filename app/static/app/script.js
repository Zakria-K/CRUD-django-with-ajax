$(document).ready(function(){
    showServices("http://127.0.0.1:8000/api/generic/services/?limit=6");
    
});

function showServices(url){
    $.ajax({
        url: url,
        method:"GET",
        dataType:"json",
        success: function (res){
            // console.log(res);
            data = res.results;
            var output = "";
            var i;
            for(i=0; i<data.length; i++){
                output += "<tr style='font-size:14px'><td>"+data[i].id+
                    "</td><td>"+data[i].title+
                    "</td><td>"+data[i].description.substr(0, 50)+
                    "...</td><td><img class='img-thumbnail' width='50' src='"+data[i].image+
                    "'></td><td><button class='btn btn-warning btn-sm' id='edititem' data-sid='"+data[i].id+"'>Edit</button></td><td> <button class='btn btn-danger btn-sm' id='deleteitem' data-sid='"+data[i].id+"'>Delete</button></td>"
            }
            $('#tdata').html(output);
            $("#pagination").html("<div class='my-2'><button data-sid='"+res.previous+"' id='nextload' class='btn btn-primary btn-sm'>Previous</button>  <button data-sid='"+res.next+"' id='nextload' class='btn btn-primary btn-sm'>Next</button></div>");
    
        }
    });
}

$("#saveService").click(function(e){
    e.preventDefault();
    let id=$("#itemid").val();
    let title=$("#title").val();
    let desc=$("#desc").val();
    var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');

    let user=1;
    if(id!=""){
        let user=$("#user").val();
        content = {id:id, title:title, description:desc, by:user};
    $.ajax({
        url:"http://127.0.0.1:8000/api/generic/services/"+id+"/",
        method:'PUT',
        contentType: "application/json",
        data : JSON.stringify(content),
        headers:{"X-CSRFToken": $crf_token},
        success:function(){
            $("#msg").html("<div class='alert alert-info text-center p-2'>Service Updated Successfully</div>");
            $('#addItemForm')[0].reset();
            showServices("http://127.0.0.1:8000/api/generic/services/?limit=6");
        }
    })
    }else{
        // content = {title:title, description:desc, by:user, image:image};
        var fd = new FormData();
        var files = $('#image')[0].files;
        fd.append('image',files[0]);
        fd.append('title',title);
        fd.append('description',desc);
        fd.append('by',user);
        
        $.ajax({
            url:'http://127.0.0.1:8000/api/generic/services/',
            method:'POST',
            data : fd,
            contentType: false,
            processData: false,
            headers:{"X-CSRFToken": $crf_token},
            // data : new FormData(this),
            success:function(){
                $("#msg").html("<div class='alert alert-info text-center p-2'>Service Added Successfully</div>");
                $('#addItemForm')[0].reset();
                showServices("http://127.0.0.1:8000/api/generic/services/?limit=6");
            }
        });
    }
});

$("#tdata").on("click", "#edititem", function(){
    let id = $(this).data("sid");
    // console.log(id);
    content = {id:id};
    // console.log(content);
    $.ajax({
        url:"http://127.0.0.1:8000/api/generic/services/"+id+"/",
        method:"GET",
        success:function(result){
            $("#itemid").val(result.id);
            $("#title").val(result.title);
            $("#desc").val(result.description);
            $("#user").val(result.by);
        },
        error:function(err){
            console.log(err);
        }
    });
});

$("#tdata").on("click", "#deleteitem", function(){
    let id = $(this).data("sid");
    // console.log(id);
    content = {id:id};
    var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
    // console.log(content);
    $.ajax({
        url:"http://127.0.0.1:8000/api/generic/services/"+id+"/",
        method:"DELETE",
        headers:{"X-CSRFToken": $crf_token},
        success:function(result){
            $("#msg").html("<div class='alert alert-danger text-center p-2'>Service Deleted Successfully</div>");
            showServices("http://127.0.0.1:8000/api/generic/services/?limit=6");
        },
        error:function(err){
            console.log(err);
        }
    });
});

$("#pagination").on("click","#nextload",function(){
    let url = $(this).data("sid");
    showServices(url);
})