// Images for each piece
var pieces = [
    '<img src="../img/001.jpg" alt="" data-piece="0" class="jigsaw-piece"/>',
    '<img src="../img/002.jpg" alt="" data-piece="1" class="jigsaw-piece"/>',
    '<img src="../img/003.jpg" alt="" data-piece="2" class="jigsaw-piece"/>',
    '<img src="../img/004.jpg" alt="" data-piece="3" class="jigsaw-piece"/>',
    '<img src="../img/005.jpg" alt="" data-piece="4" class="jigsaw-piece"/>',
    '<img src="../img/006.jpg" alt="" data-piece="5" class="jigsaw-piece"/>',
    '<img src="../img/007.jpg" alt="" data-piece="6" class="jigsaw-piece"/>',
    '<img src="../img/008.jpg" alt="" data-piece="7" class="jigsaw-piece"/>',
    '<img src="../img/009.jpg" alt="" data-piece="8" class="jigsaw-piece"/>',
    '<img src="../img/010.jpg" alt="" data-piece="9" class="jigsaw-piece"/>',
    '<img src="../img/011.jpg" alt="" data-piece="10" class="jigsaw-piece"/>',
    '<img src="../img/012.jpg" alt="" data-piece="11" class="jigsaw-piece"/>'
  ];
  
  // Function to shuffle array
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  
  // Function to print a puzzle piece in its div
  function printPiece(item, index) {
    document.getElementById("puzzle-pieces-area").innerHTML += '<div class="col-3 jigsaw-space">' + item + '</div>';
  }
  
  // Function to use when the jigsaw is complete
  function jigsawComplete() {
    $("#puzzle-pieces-area").slideUp();
    $("#jigsaw-complete-video").slideDown();
    $("#puzzle-working-area").hide();
    $("#jigsaw-complete").show();
  }
  
  // Shuffle the pieces
  shuffle(pieces);
  // Print the pieces
  pieces.forEach(printPiece);
  
  // Jigsaw puzzle status - true if the piece is in the correct place, false otherwise
  var jigsawStatus = Array(pieces.length).fill(false);
  
  $( document ).ready(function() {
    // Make pieces draggable
    $(".jigsaw-piece").draggable({
      // Snap to the puzzle grid
      snap: ".jigsaw-space-holder",
      snapMode: "inner",
      // When a piece starts to move, mark it as in the wrong place
      start: function( event, ui ) {
        jigsawStatus[$(this).data("piece")] = false;
      }
    });
    
    // Make the puzzle grid droppable
    $(".jigsaw-drop-space").droppable({
      // When something is dropped in a grid square
      drop: function(event, ui) {
        // Check if this is the right place for the piece or not, and update the array
        if ($(this).data("piece") == ui.draggable.data("piece")) {
           jigsawStatus[$(this).data("piece")] = true;
         } else {
           jigsawStatus[$(this).data("piece")] = false;
         }
        
        // If every item in the puzzle is in the correct place, the jigsaw is complete!
        if (jigsawStatus.every(function (value) { return value; })) {
          jigsawComplete();
        }
      }
    });
  });