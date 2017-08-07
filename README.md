# showElement

ShowElement shows a element based on scroll position or time.
You might want use it when you need to show certain element after x seconds the user is on the page, or when he reaches certain scroll position.

## Including files

```html

<!-- jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- Plugin file -->
<script src="jquery.showelement.min.js"></script>

```

```css

.is-hidden { display: none }

```

## Initializing

```javascript

$(document).ready( function() {
  $('.selector').showElement();
});

```

## Settings
ShowElement accepts settings from an object of key/value pairs.

##### Example:
```javascript
$('.selector').showElement({
  key: value,
  key: value
});
```

## List of settings

#### activation:
*String*: This can be either 'scroll' or 'time', sets how the element should be activated

*Default*: `time`

#### scrollPosition:
*Integer*: If activation is 'scroll' set the percentage to show the element

*Default*: `100`

#### timeActivation:
*Integer*: If activation is 'time' set the milliseconds after should be shown

*Default*: `0`

#### cookieName:
*String*: Name of the cookie set after the element is hide for not seeing it again

*Default*: `showElementShown`

#### cookieDuration:
*Integer*: Duration in days of the cookie

*Default*: `365`

#### closeClass:
*String*: Class that triggers the close

*Default*: `js-close`

#### hideClass:
*String*: Class that is applied on the element to hide it

*Default*: `is-hidden`

#### showClass:
*String*: Class that is applied on the element to show it

*Default*: `is-visible`

## Event Hooks
`hideElement` : This event is triggered when the element is hidden

`showElement` : This event is triggered when the element is show

##### Example:
```javascript
$('.selector').on( 'showElement', function( event ) {
  // Your code here
});
```

## Credits

Copyright (c) 2017 Daniel Duches - [Fabio Quarantini](http://www.fabioquarantini.com)

## License

[MIT License](http://opensource.org/licenses/MIT)
