import './index.html';
import './index.scss';
// import './slick.js';
// import './valid.js';
import './img/bg.jpg';
import './img/bg2.jpg';
import './img/circle-chevron-up-solid.svg';
import './img/cup.png';
import './img/facebook.png';
import './img/feed1.png';
import './img/feed2.png';
import './img/feed3.png';
import './img/hand-cart.png';
import './img/heart.png';
import './img/instagram.png';
import './img/leftArrow.png';
import './img/logo.png';
import './img/messages.png';
import './img/pinterest.png';
import './img/pulsometer.png';
import './img/rightArrow.png';
import './img/shoe.png';
import './img/slide_1.png';
import './img/slide_2.jpg';
import './img/slide_3.jpg';
import './img/timer.png';


$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 1200,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftArrow.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/rightArrow.png"></button>',
      centerMode: true,
      variableWidth: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               dots: true,
               arrows: false,
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
               arrows: false
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
               arrows: false
            }
         }
      ]
   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   //modal
   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn();

   });
   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut();
   });

   $('.button_mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn();
      })
   });

   function validateForm(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2,
            },
            phone: "required",
            email: {
               required: true,
               email: true,
            }
         },
         messages: {
            name: {
               required: 'Пожалуйста, введите своё имя',
               minlength: jQuery.validator.format('Введите как минимум {0} символа')
            },
            phone: 'Пожалуйста, введите свой номер телефона',
            email: {
               required: 'Пожалуйста, введите свою почту',
               email: 'Неправильно введён арес почты'
            }
         }
      });
   };
   validateForm('#consultation-form');
   validateForm('#consultation form');
   validateForm('#order form');

   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }
      e.ajax({
         type: 'POST',
         url: 'mailer/smart.php',
         data: $(this).serialize(),
      }).done(function () {
         $(this).find("input").val('');
         $('#consultation', '#order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');
         $('form').trigger('reset');
      });
      return false;
   });

   //smooth scroll + pageup

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }

   });

   // $('a=[href^="#"]').click(function () {
   //    const _href = $(this).attr('href');
   //    $("html, body").animate({ scrollTop: $(_href).offset().top + 'px' });
   //    return false;
   // })

   // new WOW().init();
});

// fetch('https://randomuser.me/api/', {
//    method: 'PUT',
//    headers: {
//       'Content-type': "application/json"
//    },
//    body: JSON.stringify({
//       id: 1,
//       name: 'Bod'
//    })
// })
//    .then(result => {
//       if (result.ok) {
//          return result.json();
//       } else {
//          console.log('ERROR');
//          throw Error;
//       }
//    })
//    .then(data => document.getElementById('header__official').innerHTML = JSON.stringify(data))
//    // .then(data => document.getElementById('header__official').innerHTML = data.phone);
//    .catch(error => console.log(error))


const name = document.querySelector('#header__randName');
const surname = document.querySelector('#header__randSurname');



const generateUser = async () => {
   const url = 'https://randomuser.me/api/';
   const request = await fetch(url);
   const { results } = await request.json();
   const data = results[0];

   name.textContent = data.name.first;
   surname.textContent = data.name.last;
}
document.addEventListener('DOMContentLoaded', generateUser)
setInterval(generateUser, 2000);