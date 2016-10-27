# Like-dislike

A simple jQuery plugin that allows you to create a rating bar with two buttons: Like and Dislike.

- See [demos](http://uagrace.github.io/like-dislike)


## Installation

If you use [Bower](http://bower.io/search/?q=like-dislike), you can type into the command line prompt in your project folder:

`$ bower install like-dislike` 

Or press "Download ZIP" button on the main GitHub page to get all the files and manually add them to your project.


## Preparation

Add jQuery and like-dislike into your document:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="js/like-dislike.min.js"></script>
```


## Usage

```html
<div id="rating">
    <button class="like">Like</button>
    <span class="likes">0</span>
    <button class="dislike">Dislike</button>
    <span class="dislikes">0</span>
</div>

<script type="text/javascript">
    $('#rating').likeDislike({
        initialValue: 0,
        click: function (value, l, d, event) {
            var likes = $(this.element).find('.likes');
            var dislikes = $(this.element).find('.dislikes');

            likes.text(parseInt(likes.text()) + l);
            dislikes.text(parseInt(dislikes.text()) + d);

            // $.ajax({
            //     url: 'url',
            //     type: 'post',
            //     data: 'value=' + value,
            // });
        }
    });
</script>
```


## Options

```javascript

// This callback function is called when the button is pressed.
click: null, // function(value, l, d, event) {}

// If specified, this callback function will be called before 'click'.
// To prevent 'click', you need to return false instead of true.
beforeClick: null,  // boolean function(event) {}

// Sets the initial value of the vote.
initialValue: 0,  // number (0, 1 or -1)

// Sets the initial state of the buttons (locks or unlocks).
readOnly: false,  // boolean

// Enables or disables the possibility to reverse the vote.
reverseMode: true,  // boolean

// The class name of the Like button.
likeBtnClass: 'like',  // string

// The class name of the Dislike button.
dislikeBtnClass: 'dislike',  // string

// The class name of the active button.
activeClass: 'active',  // string

// The class name of the disabled button.
disabledClass: 'disabled',  // string

```

## Methods

`readOnly(state)` Locks or unlocks the buttons.

```js
this.readOnly(true);  // locks the buttons
this.readOnly(false);  // unlocks the buttons
```
