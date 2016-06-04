(function ( $ ) {
    var element           = null,
        currentGrid       = 1,
        jsGridItems       = [],
        imagePointer      = 0,
        jsGridColumns     = [],
        windowWidth       = 0,
        columnWidth       = 0,
        amountImages      = 0,
        currentBreakpoint = 400,
        currentInfo       = [],
        i                 = 0,
        settings          = {
            breakpoints   : [],
            grid          : []
        };

    function checkGrid(array) {
        var arrayLength = array.length;

        for(i = 0; i < arrayLength; i++) {
            if((array[i] > 12) || (array[i] < 1)) {
                return false;
            }
        }
        return true;
    }

    function setGrid(windowWidth) {
        if(settings.breakpoints.length === settings.grid.length) {
            if(checkGrid(settings.grid)) {
                var arrayLength = settings.breakpoints.length - 1;
                checkGrid(settings.grid);

                if(windowWidth > settings.breakpoints[0]) {
                    currentGrid       = settings.grid[0];
                    currentBreakpoint = settings.breakpoints[0];
                } else if(windowWidth < settings.breakpoints[arrayLength]) {
                    currentGrid       = settings.grid[arrayLength];
                    currentBreakpoint = settings.breakpoints[arrayLength];
                } else {
                    for(i = arrayLength; i >= 0; i--) {
                        if(windowWidth >= settings.breakpoints[i]) {
                            currentGrid       = settings.grid[i];
                            currentBreakpoint = settings.breakpoints[i];
                        }
                    }
                }

                return [
                    currentGrid,
                    currentBreakpoint
                ];
            } else {
                console.error("JS grid system config error (grid contains more than 12 columns or less then 1 column)");
                return false;
            }
        } else {
            console.error("JS grid system config error (amount of breakpoints does not equal amount of grid)");
            return false;
        }
    }

    function indexOfSmallest(array) {
        var lowest = 0,
            arrayLength = array.length;

        for (i = 1; i < arrayLength; i++) {
            if (array[i] < array[lowest]) lowest = i;
        }
        return lowest;
    }

    function getImgInfo() {
        jsGridItems  = [];
        imagePointer = 0;

        element.find(".js-grid-item").each(function() {
            var currentImg        = $(this).find("img"),
                imageHeight       = currentImg.height(),
                imageWidth        = currentImg.width(),
                currentImageWidth = (imageHeight * columnWidth) / imageWidth;

            jsGridItems.push([
                currentImageWidth,
                currentImg.attr("src")
            ]);
        });

        amountImages = jsGridItems.length;
    }

    function resetColumns() {
        element.find(".js-grid-result").empty();
        jsGridColumns = [];
    }

    function makeColumns() {
        for(i = 0; i < currentGrid; i++) {
            element.find(".js-grid-result").append("<div class=\"js-grid-column\"></div>");

            element.find(".js-grid-column").eq(i).append("<img src=\"" + jsGridItems[imagePointer][1] + "\" />");
            jsGridColumns[i] = jsGridItems[imagePointer][0];
            imagePointer++;
        }
    }

    function fillColumnsWithImages() {
        while(imagePointer < amountImages) {
            var shortestColumnIndex = indexOfSmallest(jsGridColumns);

            element.find(".js-grid-column").eq(shortestColumnIndex).append("<img src=\"" + jsGridItems[imagePointer][1] + "\" />");
            jsGridColumns[shortestColumnIndex] += jsGridItems[imagePointer][0];
            imagePointer++;
        }
    }

    function jsSimpleGridInit() {
        currentInfo       = setGrid($(window).width());

        if(currentInfo !== false) {
            currentGrid       = currentInfo[0];
            currentBreakpoint = currentInfo[1];
            windowWidth       = $(window).width();
            columnWidth       = windowWidth / currentGrid;

            getImgInfo();
            makeColumns();
            fillColumnsWithImages();
        }
    }

    function jsSimpleGridRWD() {
        var oldBreakpoint = currentBreakpoint;
        currentInfo       = setGrid($(window).width());

        if(currentInfo !== false) {
            currentGrid       = currentInfo[0];
            currentBreakpoint = currentInfo[1];
            windowWidth       = $(window).width();
            columnWidth       = windowWidth / currentGrid;

            if(oldBreakpoint != currentBreakpoint) {
                getImgInfo();
                resetColumns();
                makeColumns();
                fillColumnsWithImages();
            }
        }
    }

    $.fn.jsSimpleGrid = function(options) {
        element = this;

        settings = $.extend({
            breakpoints : [1280, 960, 800, 640, 400],
            grid        : [   5,   4,   3,   2,   1],
        }, options );

        jsSimpleGridInit();

        $(window).resize(function() {
            jsSimpleGridRWD();
        });

        return this;
    };

}( jQuery ));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcy1ncmlkLXN5c3RlbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCAkICkge1xuICAgIHZhciBlbGVtZW50ICAgICAgICAgICA9IG51bGwsXG4gICAgICAgIGN1cnJlbnRHcmlkICAgICAgID0gMSxcbiAgICAgICAganNHcmlkSXRlbXMgICAgICAgPSBbXSxcbiAgICAgICAgaW1hZ2VQb2ludGVyICAgICAgPSAwLFxuICAgICAgICBqc0dyaWRDb2x1bW5zICAgICA9IFtdLFxuICAgICAgICB3aW5kb3dXaWR0aCAgICAgICA9IDAsXG4gICAgICAgIGNvbHVtbldpZHRoICAgICAgID0gMCxcbiAgICAgICAgYW1vdW50SW1hZ2VzICAgICAgPSAwLFxuICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IDQwMCxcbiAgICAgICAgY3VycmVudEluZm8gICAgICAgPSBbXSxcbiAgICAgICAgaSAgICAgICAgICAgICAgICAgPSAwLFxuICAgICAgICBzZXR0aW5ncyAgICAgICAgICA9IHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzICAgOiBbXSxcbiAgICAgICAgICAgIGdyaWQgICAgICAgICAgOiBbXVxuICAgICAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hlY2tHcmlkKGFycmF5KSB7XG4gICAgICAgIHZhciBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZigoYXJyYXlbaV0gPiAxMikgfHwgKGFycmF5W2ldIDwgMSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0R3JpZCh3aW5kb3dXaWR0aCkge1xuICAgICAgICBpZihzZXR0aW5ncy5icmVha3BvaW50cy5sZW5ndGggPT09IHNldHRpbmdzLmdyaWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZihjaGVja0dyaWQoc2V0dGluZ3MuZ3JpZCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXlMZW5ndGggPSBzZXR0aW5ncy5icmVha3BvaW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGNoZWNrR3JpZChzZXR0aW5ncy5ncmlkKTtcblxuICAgICAgICAgICAgICAgIGlmKHdpbmRvd1dpZHRoID4gc2V0dGluZ3MuYnJlYWtwb2ludHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEdyaWQgICAgICAgPSBzZXR0aW5ncy5ncmlkWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHNldHRpbmdzLmJyZWFrcG9pbnRzWzBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih3aW5kb3dXaWR0aCA8IHNldHRpbmdzLmJyZWFrcG9pbnRzW2FycmF5TGVuZ3RoXSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50R3JpZCAgICAgICA9IHNldHRpbmdzLmdyaWRbYXJyYXlMZW5ndGhdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHNldHRpbmdzLmJyZWFrcG9pbnRzW2FycmF5TGVuZ3RoXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IGFycmF5TGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2luZG93V2lkdGggPj0gc2V0dGluZ3MuYnJlYWtwb2ludHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50R3JpZCAgICAgICA9IHNldHRpbmdzLmdyaWRbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJyZWFrcG9pbnQgPSBzZXR0aW5ncy5icmVha3BvaW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHcmlkLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJKUyBncmlkIHN5c3RlbSBjb25maWcgZXJyb3IgKGdyaWQgY29udGFpbnMgbW9yZSB0aGFuIDEyIGNvbHVtbnMgb3IgbGVzcyB0aGVuIDEgY29sdW1uKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSlMgZ3JpZCBzeXN0ZW0gY29uZmlnIGVycm9yIChhbW91bnQgb2YgYnJlYWtwb2ludHMgZG9lcyBub3QgZXF1YWwgYW1vdW50IG9mIGdyaWQpXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5kZXhPZlNtYWxsZXN0KGFycmF5KSB7XG4gICAgICAgIHZhciBsb3dlc3QgPSAwLFxuICAgICAgICAgICAgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA8IGFycmF5W2xvd2VzdF0pIGxvd2VzdCA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvd2VzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbWdJbmZvKCkge1xuICAgICAgICBqc0dyaWRJdGVtcyAgPSBbXTtcbiAgICAgICAgaW1hZ2VQb2ludGVyID0gMDtcblxuICAgICAgICBlbGVtZW50LmZpbmQoXCIuanMtZ3JpZC1pdGVtXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEltZyAgICAgICAgPSAkKHRoaXMpLmZpbmQoXCJpbWdcIiksXG4gICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgICAgICAgPSBjdXJyZW50SW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGltYWdlV2lkdGggICAgICAgID0gY3VycmVudEltZy53aWR0aCgpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZVdpZHRoID0gKGltYWdlSGVpZ2h0ICogY29sdW1uV2lkdGgpIC8gaW1hZ2VXaWR0aDtcblxuICAgICAgICAgICAganNHcmlkSXRlbXMucHVzaChbXG4gICAgICAgICAgICAgICAgY3VycmVudEltYWdlV2lkdGgsXG4gICAgICAgICAgICAgICAgY3VycmVudEltZy5hdHRyKFwic3JjXCIpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW1vdW50SW1hZ2VzID0ganNHcmlkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0Q29sdW1ucygpIHtcbiAgICAgICAgZWxlbWVudC5maW5kKFwiLmpzLWdyaWQtcmVzdWx0XCIpLmVtcHR5KCk7XG4gICAgICAgIGpzR3JpZENvbHVtbnMgPSBbXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQ29sdW1ucygpIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY3VycmVudEdyaWQ7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKFwiLmpzLWdyaWQtcmVzdWx0XCIpLmFwcGVuZChcIjxkaXYgY2xhc3M9XFxcImpzLWdyaWQtY29sdW1uXFxcIj48L2Rpdj5cIik7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZmluZChcIi5qcy1ncmlkLWNvbHVtblwiKS5lcShpKS5hcHBlbmQoXCI8aW1nIHNyYz1cXFwiXCIgKyBqc0dyaWRJdGVtc1tpbWFnZVBvaW50ZXJdWzFdICsgXCJcXFwiIC8+XCIpO1xuICAgICAgICAgICAganNHcmlkQ29sdW1uc1tpXSA9IGpzR3JpZEl0ZW1zW2ltYWdlUG9pbnRlcl1bMF07XG4gICAgICAgICAgICBpbWFnZVBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbGxDb2x1bW5zV2l0aEltYWdlcygpIHtcbiAgICAgICAgd2hpbGUoaW1hZ2VQb2ludGVyIDwgYW1vdW50SW1hZ2VzKSB7XG4gICAgICAgICAgICB2YXIgc2hvcnRlc3RDb2x1bW5JbmRleCA9IGluZGV4T2ZTbWFsbGVzdChqc0dyaWRDb2x1bW5zKTtcblxuICAgICAgICAgICAgZWxlbWVudC5maW5kKFwiLmpzLWdyaWQtY29sdW1uXCIpLmVxKHNob3J0ZXN0Q29sdW1uSW5kZXgpLmFwcGVuZChcIjxpbWcgc3JjPVxcXCJcIiArIGpzR3JpZEl0ZW1zW2ltYWdlUG9pbnRlcl1bMV0gKyBcIlxcXCIgLz5cIik7XG4gICAgICAgICAgICBqc0dyaWRDb2x1bW5zW3Nob3J0ZXN0Q29sdW1uSW5kZXhdICs9IGpzR3JpZEl0ZW1zW2ltYWdlUG9pbnRlcl1bMF07XG4gICAgICAgICAgICBpbWFnZVBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGpzU2ltcGxlR3JpZEluaXQoKSB7XG4gICAgICAgIGN1cnJlbnRJbmZvICAgICAgID0gc2V0R3JpZCgkKHdpbmRvdykud2lkdGgoKSk7XG5cbiAgICAgICAgaWYoY3VycmVudEluZm8gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjdXJyZW50R3JpZCAgICAgICA9IGN1cnJlbnRJbmZvWzBdO1xuICAgICAgICAgICAgY3VycmVudEJyZWFrcG9pbnQgPSBjdXJyZW50SW5mb1sxXTtcbiAgICAgICAgICAgIHdpbmRvd1dpZHRoICAgICAgID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgICAgICBjb2x1bW5XaWR0aCAgICAgICA9IHdpbmRvd1dpZHRoIC8gY3VycmVudEdyaWQ7XG5cbiAgICAgICAgICAgIGdldEltZ0luZm8oKTtcbiAgICAgICAgICAgIG1ha2VDb2x1bW5zKCk7XG4gICAgICAgICAgICBmaWxsQ29sdW1uc1dpdGhJbWFnZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGpzU2ltcGxlR3JpZFJXRCgpIHtcbiAgICAgICAgdmFyIG9sZEJyZWFrcG9pbnQgPSBjdXJyZW50QnJlYWtwb2ludDtcbiAgICAgICAgY3VycmVudEluZm8gICAgICAgPSBzZXRHcmlkKCQod2luZG93KS53aWR0aCgpKTtcblxuICAgICAgICBpZihjdXJyZW50SW5mbyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRHcmlkICAgICAgID0gY3VycmVudEluZm9bMF07XG4gICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IGN1cnJlbnRJbmZvWzFdO1xuICAgICAgICAgICAgd2luZG93V2lkdGggICAgICAgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgIGNvbHVtbldpZHRoICAgICAgID0gd2luZG93V2lkdGggLyBjdXJyZW50R3JpZDtcblxuICAgICAgICAgICAgaWYob2xkQnJlYWtwb2ludCAhPSBjdXJyZW50QnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgIGdldEltZ0luZm8oKTtcbiAgICAgICAgICAgICAgICByZXNldENvbHVtbnMoKTtcbiAgICAgICAgICAgICAgICBtYWtlQ29sdW1ucygpO1xuICAgICAgICAgICAgICAgIGZpbGxDb2x1bW5zV2l0aEltYWdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJC5mbi5qc1NpbXBsZUdyaWQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzO1xuXG4gICAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgYnJlYWtwb2ludHMgOiBbMTI4MCwgOTYwLCA4MDAsIDY0MCwgNDAwXSxcbiAgICAgICAgICAgIGdyaWQgICAgICAgIDogWyAgIDUsICAgNCwgICAzLCAgIDIsICAgMV0sXG4gICAgICAgIH0sIG9wdGlvbnMgKTtcblxuICAgICAgICBqc1NpbXBsZUdyaWRJbml0KCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGpzU2ltcGxlR3JpZFJXRCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG59KCBqUXVlcnkgKSk7Il0sImZpbGUiOiJqcy1ncmlkLXN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
