/* personal JS */
var blink = document.getElementById("blink");
setInterval(function () {
    blink.style.opacity = blink.style.opacity == 0? 1:0;
}, 600);

var env = "prod";

/* function to send orders to server */
function sendOrder(){
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var amount = document.getElementById("amount").value;
    var feedback = document.getElementById("feedback");
    
    feedback.style.display = "block";
    // input validation
    if(phone.length != 12){
        feedback.innerText = "Invalid Phone Number, start with 255";
        return;
    }

    if(amount < 1){
        feedback.innerText = "Invalid Amount";
        return;
    }
    
    var url = "";
    if(env === "dev"){
        url = "http://127.0.0.1:5000/order";
    }
    else{
        url = "https://kingkidu.pythonanywhere.com/order";
    }

    var obj = new XMLHttpRequest();
    obj.onload = function(){
        var response = JSON.parse(obj.responseText)
        if(response["status"] === "success"){
            feedback.innerText = "Thank you for your order";
        }
        else{
            feedback.innerText = "Failed to send order, please try again!";
        }
    }
    
    obj.onerror = function(){
        feedback.style.display = "block";
        feedback.innerText = "Failed to send order, please try again!";
    }

    obj.open("POST", url);
    obj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    obj.send(JSON.stringify({'phone':phone,'email':email,'amount':amount}))
    feedback.innerText = "sending order...";
}


/* Description: Custom JS file */

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);