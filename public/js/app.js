/// ON PAGE LOAD: Get Current Page
function currentPage(){
    $('[data-toggle="popover"]').popover();
    if(window.location.pathname === "/"){
        $("#homeLink").addClass("active");
    }
    else if(window.location.pathname === "/saved"){
        $("#savedLink").addClass("active");
    }
};
currentPage();
/// SCRAPE
$("#scrapeLink").click(function(){
    $("#homeLink").removeClass("active");
    $("#scrapeLink").addClass("active");
    $("#articles").empty();
    $("#loading").modal("show");
    $("#scrapeMessage").show();
    $.ajax({ method: "GET", url: "/scrape" }).then(function(data){
        if(data){
            $("#successMessage").show();
            $("#scrapeMessage").hide();
            setTimeout(function(){ 
                $("#loading").modal("hide");
                location.reload();
            }, 3000);
        }
    }).catch(function(err){ console.log(err); });
});
/// BUTTONS
    // Save Button
    function saveButton(article){
        var id = $(article).parent().parent().attr("data-id");
        $.ajax({ method: "POST", url: `/saveArticle/${id}` }).then(function(data){
            location.reload();
        }).catch(function(err){ console.log(err); });
    };
    // Unsave Button
    function unsaveButton(article){
        var id = $(article).parent().parent().attr("data-id");
        $.ajax({ method: "POST", url: `/unsaveArticle/${id}` }).then(function(data){
            location.reload();
        }).catch(function(err){ console.log(err); });
    };
    // Notes
    $(".noteButton").click(function(){
        $("#noteInput").keyup(function(){
            var input = $(this).val();
            var charactersRemaining = 255 - input.length;
            if(charactersRemaining >= 0){
                $("#characters").text(charactersRemaining);
            }
            else{
                $(this).val(input.substring(0, input.length - 1));
            }
        });
    });
    // SAVE NOTE
    function saveNote(thisId){
        $.ajax({ method: "POST", url: "/saveNote/" + $(thisId).data("id"), data: { body: $("#noteInput").val() }
        }).then(function(data){ 
            location.reload();
        });
    };
    // REMOVE NOTE
    function deleteNote(thisId){
        $.ajax({ method: "POST", url: "/deleteNote/" + $(thisId).data("id")}).then(function(data){ 
            location.reload();
        });
    };