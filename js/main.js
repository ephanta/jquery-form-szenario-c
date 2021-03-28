$(document).ready(function () {
  $("#form").submit(function (event) {
    event.preventDefault();
    var checked = $("input[type=checkbox]:checked").length;
    if (!checked) {
      alert("Sie müssen mindestens eine Farbauswahl treffen.");
      return false;
    }
    var dataArray = $(this).serializeArray();
    for (var i = 0; i < dataArray.length; i++) {
      switch (dataArray[i].name) {
        case "day":
          var day = dataArray[i].value;
          $(".answers .answer.day").html(day + ". ");
          break;
        case "month":
          var month = dataArray[i].value;
          $(".answers .answer.month").html(month + " ");
          break;
        case "color1":
        case "color2":
        case "color3":
        case "color4":
          var color = dataArray[i].value;
          $(".answers .answer." + color).prop("checked", true);
          break;
        default:
          var val = dataArray[i].value;
          $(".answers .answer." + dataArray[i].name).html(val);
          break;
      }
    }
    var formData = $(this).serialize();
    $.ajax({
        method: 'post',
        url: '/ajax/ajax.php',
        data: {
            ajaxHandler: "save",
            data: formData,
        },
        success: function(data){
            console.log("Success");
        },
        error: function(type) {
            alert("Error");
        }
    });
  });
});