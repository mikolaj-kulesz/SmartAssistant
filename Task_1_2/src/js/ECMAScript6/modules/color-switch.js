class ColorSwitch {
    constructor() {
        const self = this;
        self.addBtnsListener();
    }

    addBtnsListener() {
        const self = this;
        $('.header__btn-box__btn').on('click', function () {

           $('body').toggleClass('switch-color');
        });
    }
}