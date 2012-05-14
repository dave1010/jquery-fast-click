# jQuery fastClick plugin

Work around the 300ms delay for the click event in some mobile browsers (e.g. Android and iOS).
 
Code based on <http://code.google.com/mobile/articles/fast_buttons.html> (which has now gone :-( )
 
## Usage

    $('button').fastClick(function() {
      alert('clicked!');
    });

## Example

See <http://jsfiddle.net/p4BhA/4/> for a link that starts loading as soon as you tap on it.