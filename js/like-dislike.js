/**
 * like-dislike.js v1.0.1
 * @link https://github.com/uagrace/like-dislike
 * @copyright 2016 Maxim Tkachuk <mxtkachuk@gmail.com>
 * Licensed under the MIT license
 */
(function ($) {

    var likeBtn = 'like',
        dislikeBtn = 'dislike';

    var defaults = {
        click: null,
        beforeClick: null,
        initialValue: 0,
        reverseMode: true,
        readOnly: false,
        likeBtnClass: 'like',
        dislikeBtnClass: 'dislike',
        activeClass: 'active',
        disabledClass: 'disabled'
    };

    function LikeDislike(element, options) {
        this.element = element;
        this.opts = $.extend({}, defaults, options);
        this.init();
    }

    LikeDislike.prototype = {
        init: function () {
            this.btns = $(this.element).find('.' + this.opts.likeBtnClass + ', .' + this.opts.dislikeBtnClass);
            this.readOnly(this.opts.readOnly);
            if (this.opts.initialValue !== 0) {
                var activeBtn = this.opts.initialValue === 1 ? likeBtn : dislikeBtn;
                this.btnDown(activeBtn);
            }
            return this;
        },
        readOnly: function (state) {
            var btns = this.btns;
            if (!state) {
                if (!this.opts.reverseMode) {
                    var notActiveBtns = btns.not('.' + this.opts.activeClass);
                    if (notActiveBtns.length) {
                        btns = notActiveBtns;
                    }
                }
                this.enable(btns);
            } else {
                this.disable(btns);
            }
        },
        getBtn: function (btnType) {
            if (btnType === likeBtn) {
                return $(this.element).find('.' + this.opts.likeBtnClass);
            } else if (btnType === dislikeBtn) {
                return $(this.element).find('.' + this.opts.dislikeBtnClass);
            } else {
                $.error('Wrong btnType: ' + btnType);
            }
        },
        btnDown: function (btnType) {
            var btn = this.getBtn(btnType);
            btn.addClass(this.opts.activeClass);
            if (!this.opts.reverseMode) {
                this.disable(btn);
            }
        },
        btnUp: function (btnType) {
            var btn = this.getBtn(btnType);
            btn.removeClass(this.opts.activeClass);
            if (!this.opts.reverseMode) {
                this.enable(btn);
            }
        },
        enable: function (btn) {
            var self = this;
            var opts = self.opts;

            btn.removeClass(opts.disabledClass);

            if (opts.beforeClick) {
                btn.on('beforeClick', function (event) {
                    return opts.beforeClick.call(self, event);
                });
            }

            btn.on('click', function (event) {
                var btn = $(this);

                if (opts.beforeClick && !btn.triggerHandler('beforeClick')) {
                    return false;
                }

                var btnType = btn.hasClass(opts.likeBtnClass) ? likeBtn : dislikeBtn;
                var hasActive = self.btns.hasClass(opts.activeClass);
                var isActive = btn.hasClass(opts.activeClass);

                var value = 0, l = 0, d = 0;

                if (btnType === likeBtn) {
                    if (isActive) {
                        self.btnUp(likeBtn);
                        l = -1;
                    } else {
                        if (hasActive) {
                            self.btnUp(dislikeBtn);
                            d = -1;
                        }
                        self.btnDown(likeBtn);
                        l = 1;
                        value = 1;
                    }
                } else {
                    if (isActive) {
                        self.btnUp(dislikeBtn);
                        d = -1;
                    } else {
                        if (hasActive) {
                            self.btnUp(likeBtn);
                            l = -1;
                        }
                        self.btnDown(dislikeBtn);
                        d = 1;
                        value = -1;
                    }
                }

                opts.click.call(self, value, l, d, event);
            });
        },
        disable: function (btn) {
            btn.addClass(this.opts.disabledClass);
            btn.off();
        }
    };

    $.fn.likeDislike = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_LikeDislike")) {
                $.data(this, "plugin_LikeDislike",
                    new LikeDislike(this, options));
            }
        });
    };

})(jQuery);