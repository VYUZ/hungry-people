//document.querySelector(".intro__arrdown");
// console.log('Стрелочка точно вниз');
//alert( 'Текущая прокрутка сверху: ' + window.pageYOffset );

/////////////////////////////////////////////////////////////
//================= Класс fixed для header ==================
//Проверка после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    let header = document.querySelector(".header");
    let about = document.querySelector(".about");

    if (window.pageYOffset > about.scrollHeight) {
      header.classList.add("fixed");
      //console.log(about.getBoundingClientRect().height);
    } else {
      header.classList.remove("fixed");
    }
  };
});
/////////////////////////////////////////////////////////////

//======== меню "menu" (DELICIOUS MENU) ==========
//1.вариант
// var jsTriggers = document.querySelectorAll('.menu__tab-btn'),
//     jsContents = document.querySelectorAll('.menu__tab-item');

// jsTriggers.forEach(function(trigger) {
//    trigger.addEventListener('click', function() {
//       var id = this.getAttribute('data-tab'),
//           content = document.querySelector('.menu__tab-item[data-tab="'+id+'"]'),
//           activeTrigger = document.querySelector('.menu__tab-btn.active'),
//           activeContent = document.querySelector('.menu__tab-item.active');

//       activeTrigger.classList.remove('active'); // 1
//       trigger.classList.add('active'); // 2

//       activeContent.classList.remove('active'); // 3
//       content.classList.add('active'); // 4
//    });
// });
////////////////////////////////////
// //2.вариант (в этом случае нужно добавить в значение атрибуда data-tab всех кнопок button .menu__tab-btn первым символом # для правильного пути, типа #list_01)
// let menuBtn = document.querySelector(".menu__tab-btn");
// let menuBtns = document.querySelectorAll(".menu__tab-btn");
// let menuItems = document.querySelectorAll(".menu__tab-item");

// for (let menuBtn of menuBtns) {
//   menuBtn.addEventListener("click", function () {
//     let tabId = menuBtn.getAttribute("data-tab");
//     let currentTab = document.querySelector(tabId);
//     //console.log(tabId);
//     //console.log(currentTab);

//     for (let menuItem of menuItems) {
//       menuItem.classList.remove("active");
//     }

//     currentTab.classList.add("active");
//   });
// }
// //Вешается active на первый из menu__btn
// //document.querySelector(".menu__tab-btn").click();
// menuBtn.click();
// /////////////////////////////////////////////////////////////
//3.вариант
document.addEventListener("DOMContentLoaded", () => {
  // Структура страницы загружена и готова к взаимодействию

  const tabs = (
    tabsSelector,
    tabsHeadSelector,
    tabsBodySelector,
    tabsCaptionSelector,
    tabsCaptionActiveClass,
    tabsContentActiveClass
  ) => {
    // объявляем основную функцию tabs, которая будет принимать CSS классы и селекторы

    const tabs = document.querySelector(tabsSelector); // ищем на странице элемент по переданному селектору основного элемента вкладок и записываем в константу
    const head = tabs.querySelector(tabsHeadSelector); // ищем в элементе tabs элемент с кнопками по переданному селектору и записываем в константу
    const body = tabs.querySelector(tabsBodySelector); // ищем в элементе tabs элемент с контентом по переданному селектору и записываем в константу

    const getActiveTabName = () => {
      // функция для получения названия активной вкладки
      return head.querySelector(`.${tabsCaptionActiveClass}`).dataset.tab; // возвращаем значение data-tab активной кнопки
    };

    const setActiveContent = () => {
      // функция для установки активного элемента контента
      if (body.querySelector(`.${tabsContentActiveClass}`)) {
        // если уже есть активный элемент контента
        body.querySelector(`.${tabsContentActiveClass}`).classList.remove(tabsContentActiveClass); // то скрываем его
      }
      body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add(tabsContentActiveClass); // затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
    };

    // проверяем при загрузке страницы, есть ли активная вкладка
    if (!head.querySelector(`.${tabsCaptionActiveClass}`)) {
      // если активной вкладки нет
      head.querySelector(tabsCaptionSelector).classList.add(tabsCaptionActiveClass); // то делаем активной по-умолчанию первую вкладку
    }

    setActiveContent(getActiveTabName()); // устанавливаем активный элемент контента в соответствии с активной кнопкой при загрузке страницы

    head.addEventListener("click", (e) => {
      // при клике на элемент с кнопками
      const caption = e.target.closest(tabsCaptionSelector); // узнаем, был ли клик на кнопке
      if (!caption) return; // если клик был не на кнопке, то прерываем выполнение функции
      if (caption.classList.contains(tabsCaptionActiveClass)) return; // если клик был на активной кнопке, то тоже прерываем выполнение функции и ничего не делаем

      if (head.querySelector(`.${tabsCaptionActiveClass}`)) {
        // если уже есть активная кнопка
        head.querySelector(`.${tabsCaptionActiveClass}`).classList.remove(tabsCaptionActiveClass); // то удаляем ей активный класс
      }

      caption.classList.add(tabsCaptionActiveClass); // затем добавляем активный класс кнопке, на которой был клик

      setActiveContent(getActiveTabName()); // устанавливаем активный элемент контента в соответствии с активной кнопкой
    });
  };

  tabs(
    ".menu",
    ".menu__tab-btns",
    ".menu__tab-items",
    ".menu__tab-btn",
    "menu__tab-btn_js-active",
    "menu__tab-item_js-active"
  ); // вызываем основную функцию tabs для синих вкладок .section__tabs
});
/////////////////////////////////////////////////////////////////////////////////
//====== slider ===========
const swiper = new Swiper(".swiper", {
  loop: true,
  //spaceBetween: 20,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
/////////////////////////////////////////////////////////////
//====== animation t-scroll ===========
Tu.tScroll({
  "t-element": ".intro__center-main .zoomIn",
  "t-duration": 2,
  "t-delay": 0.3,
});
Tu.tScroll({
  "t-element": ".intro .slideUp",
  "t-duration": 2.5,
  "t-delay": 1,
});
Tu.tScroll({
  "t-element": ".intro .slideDown",
  "t-duration": 2.5,
  "t-delay": 1,
});
Tu.tScroll({
  "t-element": ".section-page .slideRight",
  "t-duration": 1,
  "t-delay": 0.5,
});
Tu.tScroll({
  "t-element": ".section-page .slideLeft",
  "t-duration": 1,
  "t-delay": 0.5,
});
Tu.tScroll({
  "t-element": ".section-title.slideDown",
  "t-duration": 0.5,
  "t-delay": 0.1,
  "t-position": 150,
});
Tu.tScroll({
  "t-element": ".zoomOut",
  "t-duration": 0.5,
  "t-delay": 0.5,
});
Tu.tScroll({
  "t-element": ".menu__tab-items.zoomOutUp",
  "t-duration": 0.5,
  "t-delay": 0.5,
});
Tu.tScroll({
  "t-element": ".gallery__t-scroll1.slideRight",
  "t-duration": 0.8,
  "t-delay": 0.2,
});
Tu.tScroll({
  "t-element": ".gallery__t-scroll2.slideRight",
  "t-duration": 0.8,
  "t-delay": 0.4,
});
Tu.tScroll({
  "t-element": ".gallery__t-scroll3.slideRight",
  "t-duration": 0.8,
  "t-delay": 0.6,
});
Tu.tScroll({
  "t-element": ".gallery__t-scroll4.slideRight",
  "t-duration": 0.8,
  "t-delay": 0.9,
});
