  $(".eatburger").on("click", function(event) {
    var id = $(this).data("burgerid");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "PUT"
    }).then(
      function() {
        console.log("you ate ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#createburger").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger: $("#createburger [name=burger]").val().trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
