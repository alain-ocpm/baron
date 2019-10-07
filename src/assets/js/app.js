import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
//import test from './lib/test';

$(document).foundation();

/* if(!$('.tabs-panel')[0].classList.contains("is-active"))
  $('.tabs-panel')[0].classList.add("is-active") */

//FRONT PAGE

//Tabs
if( $('#front-page-tabs').length != 0) {

}

//Button

if( $('.button-icon-expand').length != 0) {
}

//Show More Article Cards

if( $('#article-card-show-more').length != 0) {
  $('#article-card-show-more').on( "click", function() {
    for (var i = 0; i < 3; i++) {
      $( $(this).siblings( ".article-card-container").children(".is-hidden")[0] ).removeClass("is-hidden");
    }

    var hiddenElements = $(this).siblings(".article-card-container").children(".is-hidden").length;

    if(!hiddenElements) {
      $("#article-card-show-more").addClass("button-icon-expand");
    }
  });
}
