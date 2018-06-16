$(function() {

    $('#new-form').submit(function (event) {
      event.preventDefault();
      var textbox = $('.new-todo');
      var payload = {
        task: {
          title: textbox.val()
        }
      };
      $.post("/tasks/", payload).success( function (data) {
        console.log(data);
        var ulTodos = $('.todo-list');
        var currentHTML = ulTodos.html();
        currentHTML += taskHTML(data);
        ulTodos.html(currentHTML);

        $('.toggle').change(toggleTask);
        $('.new-todo').val('');
      });
    });

    function taskHTML(task) {
      var checkedStatus = task.done ? "checked" : "";
      var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
        " data-id='" + task.id + "'" + 
        checkedStatus + 
        '><label>' +
        task.title +
        '</label></div></li>';
      return liElement;
    }

    function toggleTask(event) {
      var itemID = $(event.target).data("id");
      var doneValue = Boolean($(event.target).is(':checked'));
      $.post("/tasks/" + itemID, {
        _method: "PUT",
        task: {
          done: doneValue
        }
      });
    }

    $.get("/tasks").success( function( data ) {
      var htmlString = "";
      $.each(data, function(index, task) {
        htmlString += taskHTML(task);
      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);

      $('.toggle').change(toggleTask);


    });
  });