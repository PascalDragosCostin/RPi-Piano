var selected_octave;
var selected_theme = 0;

// CHANGE THEME

themes = [["var(--bright-color)", "var(--bright-color-hover)", "var(--bright-color-pressed)",
    "var(--dark-color)", "var(--dark-color-hover)", "var(--dark-color-pressed)"],
["var(--bright-color2)", "var(--bright-color-hover2)", "var(--bright-color-pressed2)",
    "var(--dark-color2)", "var(--dark-color-hover2)", "var(--dark-color-pressed2)"],
["var(--bright-color3)", "var(--bright-color-hover3)", "var(--bright-color-pressed3)",
    "var(--dark-color3)", "var(--dark-color-hover3)", "var(--dark-color-pressed3)"],
["var(--bright-color4)", "var(--bright-color-hover4)", "var(--bright-color-pressed4)",
    "var(--dark-color4)", "var(--dark-color-hover4)", "var(--dark-color-pressed4)"]
];


function keys_color(selected_theme) {
    $("#c1").css("background", themes[selected_theme][0]);
    $("#c2").css("background", themes[selected_theme][3]);
    $("#c3").css("background", themes[selected_theme][0]);
    $("#c4").css("background", themes[selected_theme][3]);
    $("#c5").css("background", themes[selected_theme][0]);
    $("#c6").css("background", themes[selected_theme][0]);
    $("#c7").css("background", themes[selected_theme][3]);
    $("#c8").css("background", themes[selected_theme][0]);
    $("#c9").css("background", themes[selected_theme][3]);
    $("#c10").css("background", themes[selected_theme][0]);
    $("#c11").css("background", themes[selected_theme][3]);
    $("#c12").css("background", themes[selected_theme][0]);
    $(".brightTileText").css("color", themes[selected_theme][3]);
    $(".darkTileText").css("color", themes[selected_theme][0]);
};


function change_theme() {
    $.ajax({
        url: "/set_theme",
        type: "POST",
        data: { selected_theme: selected_theme },
    });
}

$("#theme").on("change", function () {
    selected_theme = this.selectedIndex;  // Number of selected_octave
    // alert(selected_theme);
    keys_color(selected_theme);  // change text on tiles
    change_theme();
});




// CHANGE OCTAVE

function change_octave() {
    $.ajax({
        url: "/set_octave",
        type: "POST",
        data: { selected_octave: selected_octave },
    });
}

function keys_text(selected_octave) {
    $("#k1").html("C" + selected_octave);
    $("#k2").html("CS" + selected_octave);
    $("#k3").html("D" + selected_octave);
    $("#k4").html("DS" + selected_octave);
    $("#k5").html("E" + selected_octave);
    $("#k6").html("F" + selected_octave);
    $("#k7").html("FS" + selected_octave);
    $("#k8").html("G" + selected_octave);
    $("#k9").html("GS" + selected_octave);
    $("#k10").html("A" + selected_octave);
    $("#k11").html("AS" + selected_octave);
    $("#k12").html("B" + selected_octave);
   
};



$(document).ready(function () {
  $.getJSON("/refresh", function (e) {
    console.log(e);
    selected_octave = e.octave;
    selected_theme = e.theme
    $("#theme").val(selected_theme).change();
    //keys_color(selected_theme);
    keys_text(selected_octave);

  });
});


$("button").on("click", function () {
    selected_octave = this.id;  // Number of selected_octave
    keys_text(selected_octave);  // change text on tiles
    change_octave();
});



// TILE PRESSED 

$("#c1").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/c_note");
    $("#c1").css("background", themes[selected_theme][2]);
});

$("#c2").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/cs_note");
    $("#c2").css("background", themes[selected_theme][5]);
});

$("#c3").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/d_note");
    $("#c3").css("background", themes[selected_theme][2]);
});

$("#c4").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/ds_note");
    $("#c4").css("background", themes[selected_theme][5]);
});

$("#c5").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/e_note");
    $("#c5").css("background", themes[selected_theme][2]);
});

$("#c6").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/f_note");
    $("#c6").css("background", themes[selected_theme][2]);
});

$("#c7").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/fs_note");
    $("#c7").css("background", themes[selected_theme][5]);
});

$("#c8").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/g_note");
    $("#c8").css("background", themes[selected_theme][2]);
});

$("#c9").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/gs_note");
    $("#c9").css("background", themes[selected_theme][5]);
});

$("#c10").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/a_note");
    $("#c10").css("background", themes[selected_theme][2]);
});

$("#c11").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("as_note");
    $("#c11").css("background", themes[selected_theme][5]);
});

$("#c12").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $.ajax("/b_note");
    $("#c12").css("background", themes[selected_theme][2]);
});


// TILED RELEASED

$("#c1,#c3,#c5,#c6,#c8,#c10,#c12").mouseout(function () {
    $(this).css("background", themes[selected_theme][0]);
  //  $.ajax("/off");
});

$("#c2,#c4,#c7,#c9,#c11").mouseout(function () {
    $(this).css("background", themes[selected_theme][3]);
  //  $.ajax("/off");
});

$("#c1,#c3,#c5,#c6,#c8,#c10,#c12").on("mouseup touchend", function (e) {
    e.preventDefault();
    $.ajax("/off");
    $(this).css("background", themes[selected_theme][0]);
});

$("#c2,#c4,#c7,#c9,#c11").on("mouseup touchend", function (e) {
    e.preventDefault();
    $.ajax("/off");
    $(this).css("background", themes[selected_theme][3]);
});


// TILE HOVER

$("#c1").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c3").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c5").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c6").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c8").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c10").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});
$("#c12").mouseover(function () {
    $(this).css("background", themes[selected_theme][1]);
});

$("#c2").mouseover(function () {
    $(this).css("background", themes[selected_theme][4]);
});
$("#c4").mouseover(function () {
    $(this).css("background", themes[selected_theme][4]);
});
$("#c7").mouseover(function () {
    $(this).css("background", themes[selected_theme][4]);
});
$("#c9").mouseover(function () {
    $(this).css("background", themes[selected_theme][4]);
});
$("#c11").mouseover(function () {
    $(this).css("background", themes[selected_theme][4]);
});


// TILE PRESSED KEYBOARD
var map = {}
$("body").on("keydown", function (e) {
    var key = e.which;
    console.log(map)
    console.log(map[key])
    console.log(map[key] == undefined || map[key] == false)

    if (map[key] == undefined || map[key] == false) {
        map[key] = true;
        console.log("HEEERE")
        switch (key) {
            case 90:
                $.ajax("/cs_note");
                $("#c1").css("background", themes[selected_theme][2]);
                break;
            case 83:
                $.ajax("/cs_note");
                $("#c2").css("background", themes[selected_theme][5]);
                break;
            case 88:
                $.ajax("/d_note");
                $("#c3").css("background", themes[selected_theme][2]);
                break;
            case 68:
                $.ajax("/ds_note");
                $("#c4").css("background", themes[selected_theme][5]);
                break;
            case 67:
                $.ajax("/e_note");
                $("#c5").css("background", themes[selected_theme][2]);
                break;
            case 86:
                $.ajax("/f_note");
                $("#c6").css("background", themes[selected_theme][2]);
                break;
            case 71:
                $.ajax("/fs_note");
                $("#c7").css("background", themes[selected_theme][5]);
                break;
            case 66:
                $.ajax("/g_note");
                $("#c8").css("background", themes[selected_theme][2]);
                break;
            case 72:
                $.ajax("/gs_note");
                $("#c9").css("background", themes[selected_theme][5]);
                break;
            case 78:
                $.ajax("/a_note");
                $("#c10").css("background", themes[selected_theme][2]);
                break;
            case 74:
                $.ajax("/as_note");
                $("#c11").css("background", themes[selected_theme][5]);
                break;
            case 77:
                $.ajax("/b_note");
                $("#c12").css("background", themes[selected_theme][2]);
                break;
        }
    }
});


// TILE RELEASED KEYBOARD

$("body").on("keyup", function (e) {
    var key = e.which;
    map[key] = false;
    if (key == 90 || key == 88 || key == 67 || key == 86 || key == 66 || key == 78 || key == 77) {
        $.ajax("/off");
        $("#c1,#c3,#c5,#c6,#c8,#c10,#c12").css("background", themes[selected_theme][0]);
    }

    if (key == 83 || key == 68 || key == 71 || key == 72 || key == 74) {
        $.ajax("/off");
        $("#c2,#c4,#c7,#c9,#c11").css("background", themes[selected_theme][3]);
    }
});