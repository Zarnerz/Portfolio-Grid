"use strict";

// Close and open nav menu

document.getElementById("menu-close").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("sidebar-wrapper").classList.toggle("active");
});

document.getElementById("menu-toggle").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("sidebar-wrapper").classList.toggle("active");
});

// Close nav when link clicked

var scrollTrigger = document.querySelectorAll(".scroll-trigger");

scrollTrigger.forEach(item => {
  item.addEventListener("click", function() {
    document.getElementById("sidebar-wrapper").classList.toggle("active");
  });
});

// Smooth Scrolling

(function() {
  var speed = 500;
  var moving_frequency = 15; // Affects performance !
  var links = document.getElementsByTagName("a");
  var href;
  for (var i = 0; i < links.length; i++) {
    href =
      links[i].attributes.href === undefined
        ? null
        : links[i].attributes.href.nodeValue.toString();
    if (href !== null && href.length > 1 && href.substr(0, 1) == "#") {
      links[i].onclick = function() {
        var element;
        var href = this.attributes.href.nodeValue.toString();
        if ((element = document.getElementById(href.substr(1)))) {
          var hop_count = speed / moving_frequency;
          var getScrollTopDocumentAtBegin = getScrollTopDocument();
          var gap =
            (getScrollTopElement(element) - getScrollTopDocumentAtBegin) /
            hop_count;

          for (var i = 1; i <= hop_count; i++) {
            (function() {
              var hop_top_position = gap * i;
              setTimeout(function() {
                window.scrollTo(
                  0,
                  hop_top_position + getScrollTopDocumentAtBegin
                );
              }, moving_frequency * i);
            })();
          }
        }

        return false;
      };
    }
  }

  var getScrollTopElement = function(e) {
    var top = 0;

    while (e.offsetParent != undefined && e.offsetParent != null) {
      top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
      e = e.offsetParent;
    }

    return top;
  };

  var getScrollTopDocument = function() {
    return document.documentElement.scrollTop + document.body.scrollTop;
  };
})();
