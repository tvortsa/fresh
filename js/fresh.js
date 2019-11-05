$(document).ready(function() {

    //Предзагрузчик
    $(window).on('load', function() { // гарантирует, что весь сайт загружен
        $('#status').fadeOut(); // будет сначала исчезать анимация загрузки
        $('#preloader').delay(350).fadeOut('slow'); // исчезнет белый DIV, который покрывает веб-сайт.
        $('body').delay(350).css({ 'overflow': 'visible' });
    })

    //Переключатель мобильного меню
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function() {

            var menu_id = $(this).attr('data-target');
            $(this).toggleClass('is-active');
            $("#" + menu_id).toggleClass('is-active');
            $('.navbar.is-light').toggleClass('is-dark-mobile')
        });
    }

    //Анимировать значок левого гамбургера и открыть боковую панель
    $('.menu-icon-trigger').click(function(e) {
        e.preventDefault();
        $('.menu-icon-wrapper').toggleClass('open');
        $('.sidebar').toggleClass('is-active');
    });

    //Закрыть боковую панель
    $('.sidebar-close').click(function() {
        $('.sidebar').removeClass('is-active');
        $('.menu-icon-wrapper').removeClass('open');
    })

    //Sidebar menu
    if ($('.sidebar').length) {
        $(".sidebar-menu > li.have-children > a").on("click", function(i) {
            i.preventDefault();
            if (!$(this).parent().hasClass("active")) {
                $(".sidebar-menu li ul").slideUp();
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
                $(this).parent().addClass("active");
            } else {
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
            }
        });
    }

    //Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).scroll(function() { // это будет работать, когда ваше окно прокручивается.
            var height = $(window).scrollTop(); //получить высоту прокрутки окна
            if (height > 50) {
                $("#navbar-clone").addClass('is-active');
            } else {
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    //Init feather icons
    feather.replace();

    //показать элементы на свитке, чтобы анимация запускала правильный путь
    var $window = $(window),
        win_height_padded = $window.height() * 1.1,
        isTouch = Modernizr.touch;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop();
        $(".revealOnScroll:not(.animated)").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }

    // Вернуться к началу поведения кнопки
    var pxShow = 600;
    var scrollSpeed = 500;
    $(window).scroll(function() {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass('visible');
        } else {
            $("#backtotop").removeClass('visible');
        }
    });
    $('#backtotop a').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, scrollSpeed);
        return false;
    });

    //modals
    $('.modal-trigger').on('click', function() {
        var modalID = $(this).attr('data-modal');
        $('#' + modalID).addClass('is-active');
    })
    $('.modal-close, .close-modal').on('click', function() {
        $(this).closest('.modal').removeClass('is-active');
    })

    // Выбрать все ссылки с хешами
    $('a[href*="#"]')
        // Удалить ссылки, которые на самом деле ни на что не ссылаются
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Определить элемент для прокрутки
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Существует ли цель прокрутки?
                if (target.length) {
                    // Предотвратить только дефолт, если анимация действительно произойдет
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 550, function() {
                        // Обратный звонок после анимации
                        // Должен изменить фокус!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Проверка, была ли цель сфокусирована
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Добавление tabindex для элементов без фокуса
                            $target.focus(); // Установите фокус снова
                        };
                    });
                }
            }
        });
})