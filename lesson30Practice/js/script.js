/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

// 'use strict';

// const movieDB = {
//     movies: [
//         "Логан",
//         "Лига справедливости",
//         "Ла-ла лэнд",
//         "Одержимость",
//         "Скотт Пилигрим против..."
//     ]
// };

// let promoAdv = document.querySelectorAll(".promo__adv img"),
//     promoBg = document.querySelector(".promo__bg"),
//     promoGenre = promoBg.querySelector(".promo__genre"),
//     promoList = document.querySelector(".promo__interactive-list");
    
    
// promoAdv.forEach(item => {
//     item.remove();
// });

// promoGenre.textContent = "Драмма";

// promoBg.style.backgroundImage = "url('img/bg.jpg')";

// promoList.innerHTML = "";

//  movieDB.movies.sort();

// movieDB.movies.forEach(function (film, item) {
//   promoList.innerHTML += 
//      `<li class="promo__interactive-item">${item + 1} ${film}
//         <div class="delete"></div>
//         </li>`
// });


// 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
// новый фильм добавляется в список. Страница не должна перезагружаться.
// Новый фильм должен добавляться в movieDB.movies.
// Для получения доступа к значению input - обращаемся к нему как input.value;
// P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

// 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

// 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

// 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
// "Добавляем любимый фильм"

// 5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики



'use strict';

document.addEventListener("DOMContentLoaded" , () => {
    
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

let adv = document.querySelectorAll(".promo__adv img"),
    promoBg = document.querySelector(".promo__bg"),
    promoGenre = promoBg.querySelector(".promo__genre"),
    movieList = document.querySelector(".promo__interactive-list"),
    addForm = document.querySelector("form.add"),
    addInput = addForm.querySelector(".adding__input"),
    checkbox = addForm.querySelector("[type = 'checkbox']");

    addForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm) {  //условие -если не пустая строка .т.е пользователь что-то ввел

         if (newFilm.length > 21) { //условие - название фильма не больше 21 символа ,иначе обрезаем 
             newFilm = `${newFilm.substring(0,22)}...`
         };

         if (favorite){
             console.log("Добавляем любимый фильм");
         }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMoveList(movieDB.movies, movieList);
    
            addForm.reset(); // очистили форму 
        }

    })
    
    
const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};


const makeChanges = () => {
promoGenre.textContent = "Драмма";

promoBg.style.backgroundImage = "url('img/bg.jpg')";
};


const sortArr = (arr) => {
    arr.sort();
};


function createMoveList (films, parent){
parent.innerHTML = "";
sortArr(films);

films.forEach(function (film, item) {
  parent.innerHTML += 
     `<li class="promo__interactive-item">${item + 1} ${film}
        <div class="delete"></div>
        </li>`
});

document.querySelectorAll(".delete").forEach ((btn, i) =>{ //При клике на мусорную корзину - элемент будет удаляться из списка 
   btn.addEventListener("click", () => {
       btn.parentElement.remove();
       movieDB.movies.splice(i , 1);

       createMoveList(movieDB.movies, movieList);
   })
}) 


}

deleteAdv(adv);
makeChanges();
createMoveList(movieDB.movies, movieList);
});