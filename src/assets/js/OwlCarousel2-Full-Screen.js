$(document).ready(function () {
     $(".owl-carousel").owlCarousel({
                    dots: true,
                    items: 1,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    //autoplayHoverPause: true,
                    nav: false,
                    navText: ["<button type='button' class='btn btn-info btn-sm'>Previos</button>", "<button type='button' class='btn btn-info btn-sm'>Next</button>"],
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                });
});