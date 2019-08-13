
/*c.prototype.animateLetter = function() {
    var t = (100 - 2 * this.percentLeftGrid) * a.viewport.width / 100,
        e = this.percentLeftGrid * a.viewport.width / 100,
        i = this.percentTopGrid * a.viewport.height / 100,
        r = 600 / 900 * a.viewport.height;
    this.$introductionContentWrapper[0].getBoundingClientRect(), this.model.attributes.currentProject.titleLettersOpaciy ? this.model.attributes.currentProject.titleLettersOpaciy : .2;
    this.$letters.each(function(n, s) {
        var o = s.getAttribute("data-x"),
            l = s.getAttribute("data-y"),
            u = s.getAttribute("data-skew"),
            h = s.getBoundingClientRect(),
            c = 110 / 42;
        if (a.isTouch) var c = 2;
        var d = t * o,
            p = r * l,
            f = h.left - e - (h.width * c - h.width) / 2,
            m = h.top - i - (h.height * c - h.height) / 2;
        TweenMax.to(s, .8, {
            skewX: "true" == u ? -10 : 0,
            autoAlpha: this.isDark ? .4 : .18,
            x: (-f + d) * c,
            y: (-m + p) * c,
            z: 0,
            scaleX: c,
            scaleY: c,
            force3D: "auto",
            ease: Power2.easeInOut
        })
    }.bind(this))



 */

function h() {
            this.init = function(t) {
                this.body = l.body, this.elementsContainer = t.container, this.elements = t.elements, this.elementsLength = this.elements.length, this.halfViewport = t.middle;
                var e = Array.prototype.slice.call(this.elements).reverse();
                this.elements = e, this.acceleration = Array(), this.velocity = Array(), this.inMotion = Array(), this.newTop = Array(), this.NewPositions = Array(), this.Positions = Array(), this.opacity = Array(), this.stiffness = 28, this.friction = 9, this.threshold = 2, this.animating = !1, this.frameRate = 1 / 60, this.scrollY = 0, this.lastScrollY = 0, this.handlers = {}, this.raf = null, this.timer = null, this.ticking = !1
            }, this.reflow = function() {
                o.add(this.elementsContainer, "fixed"), this.reset();
                for (var t = this.body.getBoundingClientRect(), e = 0; e < this.elementsLength; e++) {
                    var i = this.elements[e];
                    this.Positions[e] = i.getBoundingClientRect().top + this.halfViewport - t.top, this.NewPositions[e] = this.Positions[e], this.newTop[e] = this.Positions[e], this.inMotion[e] = !0, this.acceleration[e] = 0, this.velocity[e] = 0, s(i, "position", "absolute")
                }
            }, this.onScrolling = function() {
                if (this.scrollY = i.scrollY, !this.animating) {
                    clearTimeout(this.timer), this.ticking || (this.ticking = !0, this.body.classList.add("is-scrolling")), this.timer = setTimeout(function() {
                        this.ticking = !1, this.body.classList.remove("is-scrolling")
                    }.bind(this), 200);
                    for (var t = 0; t < this.elementsLength; t++) this.inMotion[t] = !0;
                    this.animating = !0, this.raf = a(this.run.bind(this))
                }
            }, this.run = function() {
                for (var t = 0; t < this.elementsLength; t++) {
                    var e = this.elements[t];
                    this.inMotion[t] ? (this.acceleration[t] = (this.stiffness + 5 * t) * (this.Positions[t] - this.scrollY - Math.round(this.NewPositions[t])) - this.friction * this.velocity[t],
                    this.velocity[t] += this.acceleration[t] * this.frameRate,
                    this.newTop[t] += this.velocity[t] * this.frameRate,
                    this.inMotion[t] = Math.abs(this.acceleration[t]) >= this.threshold || Math.abs(this.velocity[t]) >= this.threshold,
                    this.opacity[t] = 1 - Math.abs(this.halfViewport - this.newTop[t]) / this.halfViewport, s(e, {
                        transform: "translate3d(0," + this.newTop[t] + "px,0)",
                        opacity: this.opacity[t]
                    }), this.NewPositions[t] = this.newTop[t]) : this.completeScrolling()
                }
                this.animating && (this.raf = a(this.run.bind(this)))
            }, this.completeScrolling = function() {
                this.animating = !1, a.cancel(this.raf)
            }, this.reset = function() {
                this.acceleration = Array(), this.velocity = Array(), this.inMotion = Array(), this.newTop = Array(), this.NewPositions = Array(), this.Positions = Array(), this.opacity = Array();
                for (var t = 0; t < this.elementsLength; t++) s(this.elements[t], {
                    position: "relative",
                    transform: "translate3d(0,0,0)",
                    opacity: 1
                })
            }, this.addEvents = function() {
                this.handlers.onScrolling = this.onScrolling.bind(this), i.addEventListener("scroll", this.handlers.onScrolling, !1)
            }, this.removeEvents = function() {
                i.removeEventListener("scroll", this.handlers.onScrolling, !1)
            }, this.resetContainer = function() {
                o.remove(this.elementsContainer, "fixed")
            }, this.destroy = function() {
                cancelAnimationFrame(this.handlers.run), this.reset()
            }
        }