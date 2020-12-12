"use strict";
var circularLine = getEl("#circular-line");
var straightLine = getEl(".straight-line");
var circularLinePath = getEl("#circular-line-path");
var controls = getEl(".controls");
var dots = getAll(".dot");
var nav = 1;
var my_split_text;
var w_factor = win_w * 0.3;
var scrollAnim = 1;
var slideAnim = 1;

$(function () {
    intro_anim();


    init_work_section();
    project_title_init();
    $(circularLine).css("left", $(".dot.active").position().left);

    $("#home-section, #profile-section").parallax();


    //Next slide change event
    $(".work-next-btn").on("click", function (e) {
        var curr_el = $(".work-slide.active");
        var order = curr_el.data("order");

        if (slideAnim) {
            if (order < ($(".work-slide").length - 1)) {
                slideAnim = 0;
                order = order + 1;
                var el = $(".work-slide")[order];
                nav = 0;
                $(".dot[data-order='" + order + "']").click();
                slide_change(el, order, 1);
            }    
        }




    });
    //Prev slide change event
    $(".work-prev-btn").on("click", function (e) {
        var curr_el = $(".work-slide.active");
        var order = curr_el.data("order");

        if (slideAnim) {
            if (order > 0) {
                slideAnim = 0;
                order = order - 1;
                var el = $(".work-slide")[order];
                nav = 0;
                $(".dot[data-order='" + order + "']").click();
                slide_change(el, order, -1);

            }
        }


        


    });
    // work dot hover functionalities
    $(".dot").on("mouseenter", function () {
        var el = $(this);
        var order = el.data("order");
        project_title_hoverin(order);
    });
    $(".dot").on("mouseleave", function () {
        var el = $(this);
        var order = el.data("order");
        project_title_hoverout(order);
    });




    if (!isMobile.phone) {
        $("body").css("overflow", "hidden");
        init_anim();
        $("#home-section").mousemove(function (event) {

            // Detect mouse position
            var xPos = (event.clientX / $(window).width());
            var yPos = (event.clientY / $(window).height());


            TweenMax.to(".intro-graphics ul", 0.4, {
                x: xPos * 10,
                ease: Power2.easeOut,
            });
        });
        $(".nav-item").click(function (e) {
            var el = $(this);
            var section = el.data("section");
            var current = $(".layout-home").find(".section-enabled");
            var index_section = $('.section-layout ').index($(section));
            var index_current = $('.section-layout ').index(current);
            if (index_section > index_current) {
                if (scrollAnim) {
                    scrollAnim = 0;
                    if ((index_section + 1) <= $('.section-layout ').length) {
                        scrollDown(current, $(section));
                        $(".nav-item").removeClass("selected");
                        el.addClass("selected");


                    } else {
                        scrollAnim = 1;
                        return false;
                    }
                }
            } else {
                if (scrollAnim) {
                    scrollAnim = 0;
                    if ((index_section + 1) >= 1) {
                        scrollUp(current, $(section));
                        $(".nav-item").removeClass("selected");
                        el.addClass("selected");

                    } else {
                        scrollAnim = 1;
                        return false;
                    }
                }
            }

        });
        $("body").keydown(function (e) {
            if (e.keyCode == UP) {
                if (scrollAnim) {
                    scrollAnim = 0;
                    var prev_section = upScrollElems();
                    var current_section = $(".layout-home").find(".section-enabled");
                    if (prev_section) {
                        scrollUp(current_section, prev_section);
                    } else {
                        scrollAnim = 1;
                    }

                }
            } else if (e.keyCode == DOWN) {
                if (scrollAnim) {
                    scrollAnim = 0;
                    var next_section = downScrollElems();
                    var current_section = $(".layout-home").find(".section-enabled");
                    if (next_section) {
                        scrollDown(current_section, next_section);
                    } else {
                        scrollAnim = 1;
                    }

                }
            } else if (e.keyCode == LEFT) {
                if (slideAnim) {
                    if ($(".section-enabled").hasClass("work-section")) {

                        var curr_el = $(".work-slide.active");
                        var order = curr_el.data("order");

                        if (order > 0) {
                            slideAnim = 0;
                            order = order - 1;
                            var el = $(".work-slide")[order];
                            nav = 0;
                            $(".dot[data-order='" + order + "']").click();
                            slide_change(el, order, -1);


                        }

                    }
                }

            } else if (e.keyCode == RIGHT) {

                if (slideAnim) {
                    if ($(".section-enabled").hasClass("work-section")) {

                        var curr_el = $(".work-slide.active");
                        var order = curr_el.data("order");

                        if (order < ($(".work-slide").length - 1)) {
                            slideAnim = 0;
                            order = order + 1;
                            var el = $(".work-slide")[order];
                            nav = 0;
                            $(".dot[data-order='" + order + "']").click();
                            slide_change(el, order, 1);
                        }

                    }
                }



            } else if (e.keyCode == ESC) {


            } else if (e.keyCode == ENTER) {

            }
        });

        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

        $('body').bind(mousewheelevt, function (e) {

            var evt = window.event || e //equalize event object
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
            var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

            if (delta > 0) {
                //scroll up
                if (scrollAnim) {
                    scrollAnim = 0;
                    var prev_section = upScrollElems();
                    var current_section = $(".layout-home").find(".section-enabled");
                    if (prev_section) {
                        if ($(current_section).hasClass("work-section")) {
                            var curr_el = $(".work-slide.active");
                            var order = curr_el.data("order");
                            if (order > 0) {
                                slideAnim = 0;
                                order = order - 1;
                                var el = $(".work-slide")[order];
                                nav = 0;
                                $(".dot[data-order='" + order + "']").click();
                                slide_change(el, order, -1, 1);


                            } else {
                                scrollUp(current_section, prev_section);
                            }
                        } else {
                            scrollUp(current_section, prev_section);
                        }

                    } else {
                        scrollAnim = 1;
                    }

                }
            } else {
                //scroll down
                if (scrollAnim) {
                    console.log(3);
                    scrollAnim = 0;
                    var next_section = downScrollElems();
                    var current_section = $(".layout-home").find(".section-enabled");
                    if (next_section) {
                        scrollDown(current_section, next_section);
                    } else if ($(current_section).hasClass("work-section")) {
                        if (slideAnim) {
                            var curr_el = $(".work-slide.active");
                            var order = curr_el.data("order");

                            if (order < ($(".work-slide").length - 1)) {
                                console.log(1);
                                slideAnim = 0;
                                order = order + 1;
                                var el = $(".work-slide")[order];
                                nav = 0;
                                $(".dot[data-order='" + order + "']").click();
                                slide_change(el, order, 1, 1);


                            }
                            else{
                                scrollAnim = 1;
                            }
                        }

                    } else {
                        console.log(4);
                        scrollAnim = 1;
                    }

                }


            }
        });

        /* Scroll Down functionality*/
        $(".scroll-btn").on("click", function () {
            if (scrollAnim) {
                scrollAnim = 0;
                var parent = $(this).parent();
                var next = parent.next(".section-layout");
                if (next.length != 0) {
                    scrollDown(parent, next);
                } else {
                    next = $(".home-section");
                    scrollDown(parent, next);
                }


            }
        });
    } else {

    }



});

function init_anim() {
    TweenMax.to(".skill-box", 0.6, {
        opacity: 0,
        y: 150,
        rotationY: -30,
        ease: Expo.easeOut
    })
}

function intro_anim() {
    $(".intro-graphics ul li").each(function (i) {
        var el = $(this);
        setTimeout(function () {
            el.addClass('intro-animate');
        }, i * 500);

    });
}

function intro_anim_rev() {
    $(".intro-graphics ul li").removeClass('intro-animate');

}

function card_anim(el) {
    TweenMax.to(el, 1, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        ease: Back.easeOut.config(1)
    });
}

function slide_change(el, order, direction, scroll) {
    var w = $(".work-container").width();
    var pos = -1 * w * order;
    var curr_el = $(".work-slide.active");
    var curr_order = $(".work-slide.active").data("order");
    var diff = Math.abs(curr_order - order);
    var next_all = $(el).nextAll();
    if (curr_order == 0) {
        $(".work-prev-btn").removeClass("inactive").addClass("active");
    } else if (curr_order == ($(".work-slide").length - 1)) {
        $(".work-next-btn").removeClass("inactive").addClass("active");
    }
    if (order == ($(".work-slide").length - 1)) {
        $(".work-next-btn").removeClass("active").addClass("inactive");
    } else if (order == 0) {
        $(".work-prev-btn").removeClass("active").addClass("inactive");
    }
    $(".work-slide").removeClass("active");
    $(el).addClass("active");

    work_counter(order);
    nav = 1;
    TweenMax.to(".work-scroll-content", 0.8, {
        x: pos,
        ease: Power2.easeOut,
        onStart: function () {
            if (direction == 1) {
                $(".work-slide").each(function (index, element) {
                    TweenMax.to($(element).find(".card-link"), 0.5, {
                        y: function (index, target) {
                           
                            var pos = gsap.getProperty(target, "y"); //Current y value 
                            pos = pos + (w_factor * diff);
                            if (pos >= 0) {
                                pos = 0;
                            }
                            return pos;
                        },
                        z: 0.1,
                        rotation: function (index, target) {
                            var r = gsap.getProperty(target, "rotation"); //Current y value 
                            r = r + (32 * diff);
                            if (r >= 0) {
                                r = 0;
                            }
                            return r;
                        },
                        ease: Power2.easeOut
                    });
                    TweenMax.to($(element).find(".img-avatar"), 0.5, {
                        y: function (index, target) {
                            var pos = gsap.getProperty(target, "y"); //Current y value
                            pos = pos - (w_factor * diff);
                            if (pos <= 0) {
                                pos = 0;
                            }
                            return pos;
                        },
                        z: 0.1,
                        rotation: function (index, target) {
                            var r = gsap.getProperty(target, "rotation"); //Current y value
                            r = r - (38 * diff);
                            if (r <= 0) {
                                r = 0;
                            }
                            return r;
                        },
                        ease: Power2.easeOut
                    });

                });

            } else {
                next_all.each(function (index, element) {
                    var pos1 = (index + 1) * -w_factor;
                    var pos2 = (index + 1) * w_factor;
                    var r1 = (index + 1) * -32;
                    var r2 = (index + 1) * 38;
                    TweenMax.to($(element).find(".card-link"), 0.7, {
                        delay: 0.1,
                        y: pos1,
                        z: 0.1,
                        rotation: r1,
                        ease: Power2.easeOut
                    });
                    TweenMax.to($(element).find(".img-avatar"), 0.7, {
                        delay: 0.1,
                        y: pos2,
                        z: 0.1,
                        rotation: r2,
                        ease: Power2.easeOut
                    });
                });

            }

        },
        onComplete: function () {
            slideAnim = 1;
            if (scroll) {
                scrollAnim = 1;
            }
        }
    });
}

function init_work_section() {
    var count = $(".work-slide").length;
    for (var i = 0; i < count; i++) {
        var pos1 = i * -w_factor;
        var pos2 = i * w_factor;
        var r1 = i * -32;
        var r2 = i * 38;
        TweenMax.set($($(".work-slide")[i]).find(".card-link"), {
            y: pos1,
            z: .1,
            rotation: r1
        });
        TweenMax.set($($(".work-slide")[i]).find(".img-avatar"), {
            y: pos2,
            z: .1,
            rotation: r2
        });

    }
}
/* Circular navigation */
// convert nodelist into array
dots = [].slice.call(dots);

// static animation props - immutable
var staticAnimProps = {
    duration: .3,
    circularLinePathStart: 105,
    circularLinePathEnd: 0,
    translateVal: 80
}

// dynamic animation props - mutable
var dynamicAnimProps = {
    flipcircular: true,
    direction: "right",
    imageDirection: "x",
    straightLine: {
        pos: 0,
        origin: "right",
        width: 0
    },
    translateVal: 0,
    circularLinePos: 0,
    oldLinePos: 0,
    newLinePos: 0
}

// loop dots array
dots.forEach(function (dot, index, array) {

    // store the array to variable
    var thisArray = array;

    dot.addEventListener("click", function () {

        // if the dot is active, don't do function
        if (!this.classList.contains("active")) {

            // move the circular line position to the clicked dot position
            dynamicAnimProps.circularLinePos = this.offsetLeft - 12;

            // active dot
            var activeDot = controls.querySelector(".active");

            // get the old and new position of the line
            dynamicAnimProps.oldLinePos = activeDot.offsetLeft;
            dynamicAnimProps.newLinePos = this.offsetLeft;

            // remove class active from old dot
            activeDot.classList.remove("active");
            // add active to the clicked dot
            this.classList.add("active");

            // define animation direction
            // if the selected dot has bigger index, then it's animation direction goes to the right
            var direction = 1;
            if (getIndex(this, thisArray) > getIndex(activeDot, thisArray)) {

                dynamicAnimProps.direction = "right";

                // get the width between the active dot and the clicked dot
                dynamicAnimProps.straightLine.width = dynamicAnimProps.newLinePos - dynamicAnimProps.oldLinePos + 2.5;
                dynamicAnimProps.straightLine.pos = dynamicAnimProps.oldLinePos + 5;
                dynamicAnimProps.flipcircular = false;
                dynamicAnimProps.straightLine.origin = "left";
                dynamicAnimProps.translateVal = staticAnimProps.translateVal;

            } else {
                direction = -1;
                dynamicAnimProps.direction = "left";

                dynamicAnimProps.straightLine.width = -(dynamicAnimProps.newLinePos - dynamicAnimProps.oldLinePos - 2.5);
                dynamicAnimProps.straightLine.pos = dynamicAnimProps.newLinePos + 5;
                dynamicAnimProps.flipcircular = true;
                dynamicAnimProps.straightLine.origin = "right";
                dynamicAnimProps.translateVal = -staticAnimProps.translateVal;

            }
            if (nav) {
                var order = $(this).data("order");
                var el = $(".work-slide")[order];
                slide_change(el, order, direction);
            }
            // animate the circular and line
            animateLine(staticAnimProps, dynamicAnimProps);
            // animate active image and selected image
            //animateImages(getIndex(activeDot, thisArray), getIndex(this, thisArray), dynamicAnimProps.direction, dynamicAnimProps.translateVal);

        }


    });

});

// animate the circular and line
function animateLine(staticAnimProps, dynamicAnimProps) {

    // define animation timeline
    var tl = new TimelineMax({
        onStart: function () {

            // the controls won't be available while the animation is playing
            controls.classList.add("disabled");

            // if the animation direction goes to left, the circular line is flip - so the line starts animation from right direction
            (dynamicAnimProps.flipcircular) ? circularLine.className = "flip": undefined;

            // set straight line transform origin based on the animation direction
            // if the animation direction goes to right, line animation will start from the left and vice versa
            // set straight line width based on active-dot's position and clicked-dot's position
            // set the straight line position
            straightLine.style.cssText = `
				width: ${dynamicAnimProps.straightLine.width}px;
				left: ${dynamicAnimProps.straightLine.pos}px;
				transform-origin: ${dynamicAnimProps.straightLine.origin}`;

        },
        onComplete: function () {

            // controls is available after animation is done
            controls.classList.remove("disabled");

            // circular line is not flipped anymore
            circularLine.className = "";

            // set the straight line new position
            straightLine.style.left = dynamicAnimProps.newLinePos + "px";

        }

    });

    // tl.timeScale(0.1)

    // start timeline
    tl

        .to(circularLinePath, staticAnimProps.duration, {

            css: {
                // animation css stroke-dashoffset property
                // this will yield the circular loading effect
                "stroke-dashoffset": 105
            }

        })

        .to(straightLine, staticAnimProps.duration / 2, {

            // animates the length of the line
            scaleX: 1,

            onComplete: function () {
                console.log(this);
                // straight line animation direction changes to the opposite
                this._targets[0].style.transformOrigin = dynamicAnimProps.direction;

                // move circular line position to the clicked dot position
                circularLine.style.left = dynamicAnimProps.circularLinePos + "px";

            }

        }, 0.15)

        .to(straightLine, staticAnimProps.duration, {

            // animate the straight line length to zero
            scaleX: 0

        })

        .to(circularLinePath, staticAnimProps.duration, {

            onStart: function () {

                // if the animation direction goes to left, flip the circular line
                (dynamicAnimProps.flipcircular) ? circularLine.className = "": circularLine.className = "flip";

            },

            delay: -staticAnimProps.duration,
            css: {
                // animate circular line to 0
                "stroke-dashoffset": 0
            }

        })

}

// utils
function getEl(el) {
    return document.querySelector(el);
}

function getAll(all) {
    return document.querySelectorAll(all);
}

function getIndex(el, arr) {
    return arr.indexOf(el);
}
// Work counter

function work_counter(order) {
    order = parseInt(order);
    var path1 = $(".counter-init path")[0];
    if (order > 8) {
        var path1 = $(".counter-init path")[1];
    }
    var path2 = $(".counter-path");
    TweenLite.to(".wcls-11", 0.5, {
        morphSVG: path1
    });
    TweenLite.to(".wcls-12", 0.5, {
        morphSVG: $(path2[order]).find("path")
    });
}

function project_title_init() {
    my_split_text = new SplitText($(".project-title"), {
        type: "chars"
    });
}

function project_title_hoverin(order) {
    var el = my_split_text.elements[order];
    var chars = el.children;
    $(el).show();
    for (var i = 0; i < chars.length; i++) {

        TweenLite.killTweensOf(chars[i]);
        TweenLite.set(chars[i], {
            x: 90,
            opacity: 0,
            rotation: -16,
            transformOrigin: "0 0"
        });
        TweenLite.to(chars[i], .2 + Math.random() * .5, {
            x: 0,
            rotation: 0,
            opacity: 1,
            delay: Math.random() * .15,
            ease: Cubic.easeOut
        });
    }
}

function project_title_hoverout(order) {
    var el = my_split_text.elements[order];
    var chars = el.children;
    for (var i = 0; i < chars.length; i++) {
        TweenLite.killTweensOf(chars[i]);
        TweenLite.to(chars[i], .15 + Math.random() * .5, {
            x: -90,
            rotation: -16,
            transformOrigin: "0 0",
            opacity: 0,
            delay: Math.random() * .1,
            ease: Cubic.easeIn,
            onComplete: function () {
                if (i == chars.length - 1) {
                    $(el).hide();
                }
            }
        });

    }

}
//Preloader functionalities

function preloader_subheading() {

}


// Page Scroll down

function scrollDown(a, b) {

    var r = 1.5,
        k = 400,
        i = $(window).height(),
        j = 0,
        q = new TimelineLite({
            paused: !0
        });
    a.css({
            "z-index": 3
        }),
        b.css({
            "z-index": 2
        }).removeClass("section-disabled").addClass("section-enabled");
    q.add([TweenLite.fromTo(a, r, {
        y: 0,
        z: 0,
        scale: 1
    }, {
        y: -1 * (i + k),
        z: -k,
        scale: 0.7,
        ease: Expo.easeInOut,
        force3D: !0
    }), TweenLite.fromTo(b, r, {
        y: i - j,
        z: k,
        scale: 1.3
    }, {
        y: 0,
        z: 0,
        scale: 1,
        ease: Expo.easeInOut,
        force3D: !0,
        onStart: function () {


            $(".nav-item").removeClass("selected");
            if (b.hasClass("home-section")) {
                $(".home-nav").addClass("selected");

            } else if (b.hasClass("profile-section")) {
                $(".profile-nav").addClass("selected");
            } else if (b.hasClass("work-section")) {
                $(".work-nav").addClass("selected");
            }

        },
        onComplete: function () {
            $(".section-layout").removeClass("section-disabled section-enabled");
            $(".section-layout").css({
                "z-index": 0
            }).addClass("section-disabled");
            b.css({
                "z-index": 1
            }).removeClass("section-disabled").addClass("section-enabled");
            b.find(".section-heading").addClass("is-animated");
            a.find(".section-heading").removeClass("is-animated");
            scrollAnim = 1;


            if (b.hasClass("profile-section")) {
                card_anim($(".skill-box"));
            } else if (b.hasClass("home-section")) {
                intro_anim();
            }
            if (a.hasClass("home-section")) {
                $(".intro-graphics ul li").removeClass('intro-animate');
            } else if (a.hasClass("profile-section")) {
                init_anim();
            }



        }
    })]);
    q.add([
        TweenLite.fromTo(b.find(".anim-4"), r + .5, {
            y: 100
        }, {
            y: 0,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-1"), r + 1.8, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            ease: Expo.easeInOut,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-3"), r + .8, {
            y: 250
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-2"), r + .6, {
            y: 200
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-5"), r + 1, {
            y: 200
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-6"), r + .5, {
            x: -200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-7"), r + .5, {
            x: 200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-8"), r + .8, {
            x: 200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        })
    ], "-=" + (r + .1));

    q.restart();
}

// Page scroll up

function scrollUp(a, b) {

    var r = 1.5,
        k = 400,
        i = $(window).height(),
        j = 0,
        q = new TimelineLite({
            paused: !0
        });
    a.css({
            "z-index": 2
        }),
        b.css({
            "z-index": 3
        }).removeClass("section-disabled").addClass("section-enabled");
    q.add([TweenLite.fromTo(a, r, {
        y: 0,
        z: 0,
        scale: 1
    }, {
        y: i - j,
        z: k,
        scale: 1.3,
        ease: Expo.easeInOut,
        force3D: !0
    }), TweenLite.fromTo(b, r, {
        y: -1 * (i + k),
        z: -k,
        scale: 0.7
    }, {
        y: 0,
        z: 0,
        scale: 1,
        ease: Expo.easeInOut,
        force3D: !0,
        onStart: function () {
            $(".nav-item").removeClass("selected");
            if (b.hasClass("home-section")) {
                $(".home-nav").addClass("selected");

            } else if (b.hasClass("profile-section")) {
                $(".profile-nav").addClass("selected");
            } else if (b.hasClass("work-section")) {
                $(".work-nav").addClass("selected");
            }
        },
        onComplete: function () {
            $(".section-layout").removeClass("section-disabled section-enabled");
            $(".section-layout").css({
                "z-index": 0
            }).addClass("section-disabled");
            b.css({
                "z-index": 1
            }).removeClass("section-disabled").addClass("section-enabled");
            b.find(".section-heading").addClass("is-animated");
            a.find(".section-heading").removeClass("is-animated");
            scrollAnim = 1;

            if (b.hasClass("profile-section")) {
                card_anim($(".skill-box"));
            } else if (b.hasClass("home-section")) {
                intro_anim();
            }
            if (a.hasClass("home-section")) {
                $(".intro-graphics ul li").removeClass('intro-animate');
            } else if (a.hasClass("profile-section")) {
                init_anim();
            }


        }
    })]);
    q.add([TweenLite.fromTo(b.find(".anim-4"), r + .5, {
            y: -100
        }, {
            y: 0,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-1"), r + 1.8, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            ease: Expo.easeInOut,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-3"), r + .8, {
            y: -250
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }), TweenLite.fromTo(b.find(".anim-2"), r + .6, {
            y: -200
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-5"), r + 1, {
            y: -200
        }, {
            y: 0,

            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "y,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-6"), r + .5, {
            x: -200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-7"), r + .5, {
            x: 200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-8"), r + .8, {
            x: 200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        }),
        TweenLite.fromTo(b.find(".anim-9"), r + .5, {
            x: 200,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
            force3D: !0,
            clearProps: "x,opacity,visibility"
        })
    ], "-=" + (r + .1));

    q.restart();
}


function downScrollElems() {
    var section_array = $('.section-layout '),
        index = $('.section-layout ').index($('.section-enabled'));
    if ((index + 1) >= section_array.length) {
        return false;
    } else {
        return $(section_array[index + 1]);
    }

}

function upScrollElems() {
    var section_array = $('.section-layout '),
        index = $('.section-layout ').index($('.section-enabled'));
    if ((index + 1) <= 1) {
        return false;
    } else {
        return $(section_array[index - 1]);
    }

}








function SSIntroTitle(_me) {
    var _this = this;
    if (BeoGlobal._vwOuter < BeoGlobal._mobileBreakpointW) _me.textContent = "SS 2017 COLLECTION";
    var _mySplitText = new SplitText(_me, {
        type: "chars"
    });
    var _numchars = _mySplitText.chars.length;
    var _loopTimer, _times = 0;

    _this.animIn = function () {
        for (var i = 0; i < _numchars; i++) {
            TweenLite.killTweensOf(_mySplitText.chars[i]);
            TweenLite.set(_mySplitText.chars[i], {
                x: 90,
                opacity: 0,
                rotation: -16,
                transformOrigin: "0 0"
            });
            TweenLite.to(_mySplitText.chars[i], .4 + Math.random() * .5, {
                x: 0,
                rotation: 0,
                opacity: 1,
                delay: Math.random() * .8,
                ease: Cubic.easeOut
            });
        }
        _times++;
        if (_times <= 1) _loopTimer = setTimeout(replay, 4000);
        _me.style.visibility = "visible";
    }

    function replay() {
        for (var i = 0; i < _numchars; i++) {
            TweenLite.killTweensOf(_mySplitText.chars[i]);
            TweenLite.to(_mySplitText.chars[i], .4 + Math.random() * .5, {
                x: -90,
                rotation: -16,
                transformOrigin: "0 0",
                opacity: 0,
                delay: Math.random() * .4,
                ease: Cubic.easeIn
            });
        }
        _loopTimer = setTimeout(_this.animIn, 1900);
    }
    _this.animOut = function () {
        clearTimeout(_loopTimer);
        for (var i = 0; i < _numchars; i++) {
            TweenLite.killTweensOf(_mySplitText.chars[i]);
            TweenLite.set(_mySplitText.chars[i], {
                x: 90,
                opacity: 0,
                rotation: -16,
                transformOrigin: "0 0"
            });
        }
        _times = 0;
    }
}


/*function downScrollElems() {
    var section_array = $('.section-layout '),
        index = $('.section-layout ').index($('.section-enabled'));
    if ((index + 1) >= section_array.length) {
        return false;
    } else {
        return $(section_array[index + 1]);
    }

}

function upScrollElems() {
    var section_array = $('.section-layout '),
        index = $('.section-layout ').index($('.section-enabled'));
    if ((index + 1) <= 1) {
        return false;
    } else {
        return $(section_array[index - 1]);
    }

}

function scrollUp(a, b) {

    var r = 1.5,
        k = 400,
        i = $(window).height(),
        j = 0,
        q = new TimelineLite({
            paused: !0
        });
    a.css({
            "z-index": 2
        }),
        b.css({
            "z-index": 3
        }).removeClass("section-disabled").addClass("section-enabled");
    q.add([TweenLite.fromTo(a, r, {
        y: 0,
        z: 0,
        scale: 1
    }, {
        y: i - j,
        z: k,
        scale: 1.3,
        ease: Expo.easeInOut,
        force3D: !0
    }), TweenLite.fromTo(b, r, {
        y: -1 * (i + k),
        z: -k,
        scale: 0.7
    }, {
        y: 0,
        z: 0,
        scale: 1,
        ease: Expo.easeInOut,
        force3D: !0,
        onStart: function() {
            
            $(".nav-item").removeClass("selected");
            intro_anim_rev();
			init_anim();
			TweenMax.delayedCall(1, function(){
            	if(b.hasClass("home-section")){
                intro_anim();
                $(".nav-item-home").addClass("selected");
	            }
	            else if(b.hasClass("profile-section")){
	                card_anim($(".skill-box"));
	                $(".nav-item-profile").addClass("selected");
	            }
	            else if(b.hasClass("work-section")){
	                $(".nav-item-work").addClass("selected");
	            }
            });
            
            
        },
        onComplete: function() {
            $(".section-layout").removeClass("section-disabled section-enabled");
            $(".section-layout").css({
                "z-index": 0
            }).addClass("section-disabled");
            b.css({
                "z-index": 1
            }).removeClass("section-disabled").addClass("section-enabled");



            scrollAnim = 1;

            
        }
    })]);
q.add([TweenLite.fromTo(
					b.find(".anim-1"), r + .5, {
                        y: -100
                    }, {
                        y: 0,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }), 
					TweenLite.fromTo(b.find(".anim-2"), r + .6, {
                        y: -200
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }),
					 
                    TweenLite.fromTo(b.find(".anim-3"), r + .8, {
                        y: -250
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }), 
                    
                    TweenLite.fromTo(b.find(".anim-4"), r + 1, {
                        y: -200
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-5"), r + 1.8, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        clearProps: "y,opacity,visibility"
                    }),

                    TweenLite.fromTo(b.find(".anim-6"), r + .5, {
                        x: -200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-7"), r + .5, {
                        x: 200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-8"), r + .8, {
                        x: 200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-9"), r + .5, {
                        x: 200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    })], "-=" + (r + .1));

    q.restart();
}

function scrollDown(a, b) {

    var r = 1.5,
        k = 400,
        i = $(window).height(),
        j = 0,
        q = new TimelineLite({
            paused: !0
        });
    a.css({
            "z-index": 3
        }),
        b.css({
            "z-index": 2
        }).removeClass("section-disabled").addClass("section-enabled");
    q.add([TweenLite.fromTo(a, r, {
        y: 0,
        z: 0,
        scale: 1
    }, {
        y: -1 * (i + k),
        z: -k,
        scale: 0.7,
        ease: Expo.easeInOut,
        force3D: !0
    }), TweenLite.fromTo(b, r, {
        y: i - j,
        z: k,
        scale: 1.3
    }, {
        y: 0,
        z: 0,
        scale: 1,
        ease: Expo.easeInOut,
        force3D: !0,
        onStart: function() {
            $(".nav-item").removeClass("selected");
            intro_anim_rev();
			init_anim();
            TweenMax.delayedCall(1, function(){
            	if(b.hasClass("home-section")){
                intro_anim();
                $(".nav-item-home").addClass("selected");
	            }
	            else if(b.hasClass("profile-section")){
	                card_anim($(".skill-box"));
	                $(".nav-item-profile").addClass("selected");
	            }
	            else if(b.hasClass("work-section")){
	                $(".nav-item-work").addClass("selected");
	            }
            });
        },
        onComplete: function() {
            $(".section-layout").removeClass("section-disabled section-enabled");
            $(".section-layout").css({
                "z-index": 0
            }).addClass("section-disabled");
            b.css({
                "z-index": 1
            }).removeClass("section-disabled").addClass("section-enabled");

            


            scrollAnim = 1;



        }
    })]);
    q.add([TweenLite.fromTo(
    				b.find(".anim-1"), r + .5, {
                        y: 100
                    }, {
                        y: 0,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }), 
    				TweenLite.fromTo(b.find(".anim-2"), r + .6, {
                        y: 200
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-3"), r + .8, {
                        y: 250
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }), 
                    
                    TweenLite.fromTo(b.find(".anim-4"), r + 1, {
                        y: 200
                    }, {
                        y: 0,

                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "y,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-5"), r + 1.8, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        clearProps: "y,opacity,visibility"
                    }), 

                    TweenLite.fromTo(b.find(".anim-6"), r + .5, {
                        x: -200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-7"), r + .5, {
                        x: 200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    }),
                    TweenLite.fromTo(b.find(".anim-8"), r + .8, {
                        x: 200,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                        force3D: !0,
                        clearProps: "x,opacity,visibility"
                    })], "-=" + (r + .1));

    q.restart();
}



*/
