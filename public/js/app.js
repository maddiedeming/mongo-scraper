$.getJSON("/articles", function(data) {
    $("#articles").empty();
    for (var i = 0; i < data.length; i++) {
      $("#articles").append(`
      <div class="row">
        <div data-id="${data[i]._id}" class="card bg-light mx-auto">
            <div class="card-body">
                <a href="${data[i].link}"><h5 class="card-title">${data[i].title}</h5></a>
                <h6 class="card-subtitle mb-2 text-muted">${data[i].byline}</h6>
                <p class="card-text">${data[i].summary}</p>
                <button class="btn btn-success">Save</button>
                <button class="btn btn-info">Comment</button>
            </div>
        </div>
    </div>
    `);
    }
  });
  
  $(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });