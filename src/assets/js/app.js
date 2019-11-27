import $ from 'jquery';
import 'what-input';

import {debounce} from './debounce';

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

$(document).foundation();

/* if(!$('.tabs-panel')[0].classList.contains("is-active"))
  $('.tabs-panel')[0].classList.add("is-active") */

function elementExists(e) {
  //takes a jQUery selector and checks if the element is present on the page
  return ( $(e).length != 0 ) ? true : false;
};

//GENERAL

//layout
if( elementExists('.grid-container.view') ){
  var resize = debounce(function() {
    $('.grid-container.view').each(function(i){
      $(this).css("width", $('body').innerWidth() + "px" );
      $(this).css("left", "");
      $(this).css("left", "-" + $(this).offset().left + "px" );
    });
  }, 100);

  resize();

  $(window).on('resize', function(e){
    resize();
  });
}

//Reveal
if( elementExists('.reveal') ) {
  $('.reveal').on('open.zf.reveal', function() {
    $( $(this).children('.close-button') ).appendTo('.reveal-overlay');
  });

  $('.reveal').on('closed.zf.reveal', function() {
    $('.sticky').removeClass('is-anchored').addClass('is-stuck');
  });
}

//Sortable Tables
if( elementExists('.table-sortable') ) {
  $('[data-table-header-sort]').click(function(e) {
    //Sort by date
    let parent = $( e.target ).closest('tr');
    let thIndex = parent.children().index( e.target );
    let table = $( e.target ).parents('table');
    let rows = table.find('tr');
    let ar = rows.get();

    ar.sort(function(a,b){
      let c = $(a).children().eq(thIndex).text();
      let d = $(b).children().eq(thIndex).text();

      return c.localeCompare(d)
    });

    for (let i = 0; i < ar.length; i++) {
      table.append(ar[i]);
    }

    // rows.each(function(i){
    //   console.log($(this).children().eq(thIndex).text());
    // });
  });

  $('[data-table-header-filter]').bind("propertychange change click keyup input paste", function(e) {
    let parent = $( e.target ).closest('tr');
    let thIndex = parent.children().index( e.target.closest('th') );
    let table = $( e.target ).parents('table');
    let rows = table.find('tr');

    rows.each(function(i){
      console.log($(this).children().eq(thIndex).text());
    });
  });
}

//FRONT PAGE

//Tabs
if( elementExists('#front-page-tabs') ) {
  console.log(this);
}

//Button

if( $('.button-icon-expand').length != 0 ) {
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

//Releases $ so that Drupal administration interface doesn't break

$.noConflict( true );
