# Задание №1

## Уровень 1
Для разделения на микрофронтенды был выбран фреймворк Module Federation, т.к. я решил, что в этом проекте не нужно использовать различные фреймворки для реализации и будет использоваться только React. Также мне нравится, что Module Federation основан на функции lazy loading, которая позволяет приложению загружать фрагменты кода по требованию. Это сокращает время первоначальной загрузки и помогает оптимизировать использование ресурсов.

Для декомпозиции решил выбрать подход DDD, т.е. выделил микрофронты по своим функционалам. Так как для технического анализа и анализа производительности нужно более глубокое погружение в проект.

## Уровень 2
Приложение разделено на 3 микрофронтенда:
1. auth - микрофронт, который отвечает за авторизацию пользователей 
    - components/Register.js - регистрация
    - components/Login.js - вход по логину
    - components/InfoTooltip.js - окно со статусом операции (успех или что-то пошло не так)
    - api/auth.js - реализация API для работы с авторизацией
2. profile - микрофронт, который отвечает за обработку профиля пользователя
    - components/EditAvatarPopup.js - форма для обновления аватарки
    - components/EditProfilePopup.js - форма для обновления описания профиля
    - components/PopupWithForm.js - неэкспортируемая форма, используется первыми двумя из списка (данную форму вынес сюда, т.к. хоть она и используется в других элемента, но она в будущем может развиваться по своим законам для профиля)
3. cards - микрофронт, который отвечает за обработку фотографий мест (карточек)
    - components/AddPlacePopup.js - форма для добавления новой фотографии мест (карточка)
    - components/Card.js - функционал карточки: открытие, удаление
    - components/ImagePopup.js - форма для отображения карточки
    - components/PopupWithForm.js - неэкспортируемая форма, используется AddPlacePopup.js (эта форма также является копией как и в profile, её я вынес по тем же соображениям, что она в будущем может развиваться по своим законам для карточек)
    - api/cards.js - реализация API для работы с карточками

В profile/EditProfilePopup и cards/Card добавил новый параметр currentUser, в который пробрасывается пользовательский контекст из главного приложения (как я понял этот контекст должне находиться в одном месте).

## Уровень 3
В докере почему-то не работает, т.к. микрофронты отдают пустой ответ почему-то

Локально всё работает. Нужно зайти в каждую из дирректорий:
- ./frontend
- ./fronted/microfrontend/auth
- ./fronted/microfrontend/profile
- ./fronted/microfrontend/cards

и в каждой директории выполнить команды
- npm i (вызывается один раз для сбора зависимостей)
- npm run start (вызывается каждый раз при запуске микрофронта)

после этого фронт будет доступен по адресу http://localhost:3000 и всё будет работать
