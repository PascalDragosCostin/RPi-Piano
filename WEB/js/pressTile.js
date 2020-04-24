var octave;

function change_octave() {
  $.ajax({
    url: "/set_octave",
    type: "POST",
    data: { octave: octave },
  });
}

function keys_text(octave) {
  $("#k1").html("C" + octave);
  $("#k2").html("CS" + octave);
  $("#k3").html("D" + octave);
  $("#k4").html("DS" + octave);
  $("#k5").html("E" + octave);
  $("#k6").html("F" + octave);
  $("#k7").html("FS" + octave);
  $("#k8").html("G" + octave);
  $("#k9").html("GS" + octave);
  $("#k10").html("A" + octave);
  $("#k11").html("AS" + octave);
  $("#k12").html("B" + octave);
};

$(document).ready(function () {
  $.getJSON("/refresh", function (e) {
    octave = e.octave;
    keys_text(octave);
  });
});

$("button").on("click", function () {
  octave = this.id;
  keys_text(octave);
  change_octave();
});

$("#c1").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/c_note");
  $("#c1").css("background", "#D8D5D4");
});

$("#c2").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/cs_note");
  $("#c2").css("background", "#585757");
});

$("#c3").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/d_note");
  $("#c3").css("background", "#D8D5D4");
});

$("#c4").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/ds_note");
  $("#c4").css("background", "#585757");
});

$("#c5").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/e_note");
  $("#c5").css("background", "#D8D5D4");
});

$("#c6").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/f_note");
  $("#c6").css("background", "#D8D5D4");
});

$("#c7").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/fs_note");
  $("#c7").css("background", "#585757");
});

$("#c8").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/g_note");
  $("#c8").css("background", "#D8D5D4");
});

$("#c9").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/gs_note");
  $("#c9").css("background", "#585757");
});

$("#c10").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/a_note");
  $("#c10").css("background", "#D8D5D4");
});

$("#c11").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("as_note");
  $("#c11").css("background", "#585757");
});

$("#c12").on("mousedown touchstart", function (e) {
  e.preventDefault();
  $.ajax("/b_note");
  $("#c12").css("background", "#D8D5D4");
});

$("#c1,#c3,#c5,#c6,#c8,#c10,#c12").mouseout(function () {
  $(this).css("background", "white");
  $.ajax("/off");
});

$("#c2,#c4,#c7,#c9,#c11").mouseout(function () {
  $(this).css("background", "black");
  $.ajax("/off");
});

$("#c1,#c3,#c5,#c6,#c8,#c10,#c12").on("mouseup touchend", function (e) {
  e.preventDefault();
  $.ajax("/off");
  $(this).css("background", "white");
});

$("#c2,#c4,#c7,#c9,#c11").on("mouseup touchend", function (e) {
  e.preventDefault();
  $.ajax("/off");
  $(this).css("background", "black");
});

$("#c1").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c3").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c5").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c6").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c8").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c10").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});
$("#c12").mouseover(function () {
  $(this).css("background", "#E7E0DF");
});

$("#c2").mouseover(function () {
  $(this).css("background", "#464646");
});
$("#c4").mouseover(function () {
  $(this).css("background", "#464646");
});
$("#c7").mouseover(function () {
  $(this).css("background", "#464646");
});
$("#c9").mouseover(function () {
  $(this).css("background", "#464646");
});
$("#c11").mouseover(function () {
  $(this).css("background", "#464646");
});

var action = true;
$("body").on("keydown", function (e) {
  if (action == true) {
    action = false;
    var key = e.which;
    switch (key) {
      case 90:
        $.ajax("/c_note");
        $("#c1").css("background", "#D8D5D4");
        break;
      case 83:
        $.ajax("/cs_note");
        $("#c2").css("background", "#585757");
        break;
      case 88:
        $.ajax("/d_note");
        $("#c3").css("background", "#D8D5D4");
        break;
      case 68:
        $.ajax("/ds_note");
        $("#c4").css("background", "#585757");
        break;
      case 67:
        $.ajax("/e_note");
        $("#c5").css("background", "#D8D5D4");
        break;
      case 86:
        $.ajax("/f_note");
        $("#c6").css("background", "#D8D5D4");
        break;
      case 71:
        $.ajax("/fs_note");
        $("#c7").css("background", "#585757");
        break;
      case 66:
        $.ajax("/g_note");
        $("#c8").css("background", "#D8D5D4");
        break;
      case 72:
        $.ajax("/gs_note");
        $("#c9").css("background", "#585757");
        break;
      case 78:
        $.ajax("/a_note");
        $("#c10").css("background", "#D8D5D4");
        break;
      case 74:
        $.ajax("/as_note");
        $("#c11").css("background", "#585757");
        break;
      case 77:
        $.ajax("/b_note");
        $("#c12").css("background", "#D8D5D4");
        break;
    }
  }
});

$("body").on("keyup", function (e) {
  action = true;
  var key = e.which;
  if (key == 90 || key == 88 || key == 67 || key == 86 || key == 66 || key == 78 || key == 77) {
    $.ajax("/off");
    $("#c1,#c3,#c5,#c6,#c8,#c10,#c12").css("background", "white");
  }

  if (key == 83 || key == 68 || key == 71 || key == 72 || key == 74) {
    $.ajax("/off");
    $("#c2,#c4,#c7,#c9,#c11").css("background", "black");
  }
});