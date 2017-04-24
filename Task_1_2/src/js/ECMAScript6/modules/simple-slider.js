class SimpleSlider {
    constructor() {
        const self = this;
        self.config = {
            globalIndex: 0,
        };
        self.init();
    }

    init() {
        const self = this;
        self.measureHeight();
        self.addBtnsListener();
        self.addWindowResizeListener();
        self.showHideBts();
    }

    addOne() {
        const self = this;
        self.config.globalIndex = ++self.config.globalIndex % $('.simple-slider__wrapper__item').length;
        self.translate();
        self.showHideBts();
    }

    removeOne() {
        const self = this;
        self.config.globalIndex = --self.config.globalIndex % $('.simple-slider__wrapper__item').length;
        if ( self.config.globalIndex < 0 ){
            self.config.globalIndex = --$('.simple-slider__wrapper__item').length;
        }
        self.translate();
        self.showHideBts();
    }

    translate() {
        const self = this;
        const itemWidth = $('.simple-slider__wrapper__item').outerWidth();
        const translateVal = self.config.globalIndex * -itemWidth;
        $('.simple-slider__wrapper').css({
            'transform': 'translate('+translateVal+'px, 0)'
        });
        self.measureHeight();
    }

    measureHeight() {
        const self = this;
        let itemHeight = $('.tiles__items').eq(self.config.globalIndex).outerHeight();
        itemHeight += $('.tiles__title').eq(self.config.globalIndex).outerHeight();
        $('.simple-slider').css({'min-height': itemHeight});
        console.log(itemHeight);
    }

    addWindowResizeListener() {
        const self = this;
        $(window).resize(function() {
            self.measureHeight();
            self.translate();
        });
    }

    addBtnsListener(){
        const self = this;
        $('.tiles__btn-box__btn').on('click', function () {
            const direction = $(this).attr('data-simple-slider-nav');
            if ( direction === 'next'){
                self.addOne();
            }
            else if ( direction === 'prev'){
                self.removeOne();
            }
        });
    }

    showHideBts(){
        const self = this;
        if( self.config.globalIndex > 0 ){
            $('.tiles__btn-box__btn').hide().eq(0).fadeIn(300);
        }
        else {
            $('.tiles__btn-box__btn').hide().eq(1).fadeIn(300);
        }
    }
}