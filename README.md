JS Simple Grid
===================

JS Simple Grid is lightweight plugin for grid of images.


----------


Install
-------------
Bower:
>bower install js-grid-system

NPM:
>npm instal js-grid-system

----------


Requirments
-------------------

Only jQuery 2.x.x


----------


Example of usage
-------------

index.html
```
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">

    <title>JS Simple Grid System | Example</title>
    
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="index">
    <div class="js-grid">
        <div class="js-grid-content">
            <div class="js-grid-item">
	            <img src="images/1.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/2.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/3.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/4.jpg" alt="">
			</div>
            <div class="js-grid-item">
	            <img src="images/5.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/6.jpg" alt="">
	        </div>
            <div class="js-grid-item">
		        <img src="images/7.jpg" alt="">
		    </div>
            <div class="js-grid-item">
	            <img src="images/3.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/1.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/2.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/4.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/7.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/5.jpg" alt="">
	        </div>
            <div class="js-grid-item">
	            <img src="images/6.jpg" alt="">
	        </div>
        </div>

        <div class="js-grid-result"></div>
    </div>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="js/js-grid-system.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

script.js
```
$(document).ready(function() {
    $(".js-grid").jsSimpleGrid({
        breakpoints: [1280, 800, 400],
        grid       : [   12,   4,   2]
    });
});
```

Restrictions
-------------
JS Simple Grid supports grid to 12 columns.
