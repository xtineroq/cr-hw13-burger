// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devourBtn").on("click", function(event) {
    let id = $(this).data("id");
    let newDevour = $(this).data("newdevour");

    let newDevourState = {
      devoured: newDevour
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(function() {
        console.log("changed devour to", newDevour);
        $(".devourBtn").removeClass('btn-warning devourBtn').addClass('btn-danger deleteBtn');
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newBurger = {
      burger_name: $("#burgerName").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".deleteBtn").on("click", function(event) {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});