/**
 * jQuery.fastClick.js
 * 
 * Work around some mobile browser's 300ms delay on the click event.
 * 
 * Code based on <http://code.google.com/mobile/articles/fast_buttons.html>
 * 
 * @license Under Creative Commons Attribution 3.0 License
 * @author Dave Hulbert (dave1010)
 * @version 0.1 2011-03-07
 */

/*global document, window, jQuery */

// TODO: check for touch support

(function($) {

$.fn.fastClick = function(handler) {
	return $(this).each(function(){
		$.FastButton($(this)[0], handler);
	});
};

$.FastButton = function(element, handler) {
  this.element = element;
  this.handler = handler;

  $(element).bind({
    touchstart: this.handleEvent,
    click: this.handleEvent
  });
};

$.FastButton.prototype.handleEvent = function(event) {
  switch (event.type) {
    case 'touchstart': this.onTouchStart(event); break;
    case 'touchmove': this.onTouchMove(event); break;
    case 'touchend': this.onClick(event); break;
    case 'click': this.onClick(event); break;
  }
};

$.FastButton.prototype.onTouchStart = function(event) {
  event.stopPropagation();

  $(this.element).bind('touchend', this.onClick);
  $(document.body).bind('touchmove', this.onTouchMove);

  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
};

$.FastButton.prototype.onTouchMove = function(event) {
  if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
      Math.abs(event.touches[0].clientY - this.startY) > 10) {
    this.reset();
  }
};

$.FastButton.prototype.onClick = function(event) {
  event.stopPropagation();
  this.reset();
  this.handler(event);

  if (event.type === 'touchend') {
    $.clickbuster.preventGhostClick(this.startX, this.startY);
  }
};

$.FastButton.prototype.reset = function() {
  this.element.removeEventListener('touchend', this, false);
  document.body.removeEventListener('touchmove', this, false);
};

$.clickbuster = {};

$.clickbuster.preventGhostClick = function(x, y) {
  $.clickbuster.coordinates.push(x, y);
  window.setTimeout($.clickbuster.pop, 2500);
};

$.clickbuster.pop = function() {
  $.clickbuster.coordinates.splice(0, 2);
};

$.clickbuster.onClick = function(event) {
  var x, y, i;
  for (i = 0; i < $.clickbuster.coordinates.length; i += 2) {
    x = $.clickbuster.coordinates[i];
    y = $.clickbuster.coordinates[i + 1];
    if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
};

document.addEventListener('click', $.clickbuster.onClick, true);
$.clickbuster.coordinates = [];

}(jQuery));
