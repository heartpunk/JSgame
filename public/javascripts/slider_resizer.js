$(function() {
  $( "#vertSlider" ).slider({
    orientation: "vertical",
    value: 50,
    slide: function( event, ui ) {
      $(".tops").css("height", function() {
        var height = 90 - ui.value;
        return (height.toString() + "vh");
      });
      $(".bottoms").css("height", function() {
        var height = ui.value;
        return (height.toString() + "vh");
      });

      // resize canvas element
      $("#canvas").attr("height", $(".tops").innerHeight() );
      respondCanvas();

      // resize bottom right iframe
      $("#wiki").attr("height", $(".bottoms").innerHeight() );
    }
  });
});

$(function() {
  $( "#horizSlider" ).slider({
    orientation: "horizontal",
    value: 50,
    slide: function( event, ui ) {
      $(".lefts").css("width", function() {
        var width = ui.value;
        return (width.toString() + "vw");
      });
      $(".rights").css("width", function() {
        var width = 98 - ui.value;
        return (width.toString() + "vw");
      });

      // resize canvas element
      $("#canvas").attr("width", $(".lefts").innerWidth() );
      respondCanvas();

      // resize bottom right iframe
      $("#wiki").attr("width", $(".rights").innerWidth() );
    }
  });
});