Дерюгин Георгий

# Tестовое задание Modsen Books Search


## Содержание


- [Техническое задание](#Техническое-задание)
- [API](#API)
- [Используемые технологии](#Используемые-технологии)
- [Необходимый функционал](#Необходимый-функционал)
- [Дополнительный функционал](#Дополнительный-функционал)
- [Полезные ссылки](#Полезные-ссылки)


## Техническое задание


Необходимо разработать React-приложение поиска книг "Modsen Books Search".


## API 

Список API для использования:
- ***[API BOOKS](https://developers.google.com/books/docs/v1/using)*** - данные с книгами.


## Используемые технологии


- **_npm_** - менеджер пакетов.
- ***babel*** - транспайлер, преобразующий код из одного стандарта в другой.
- ***eslint*** - линтер для JavaScript кода.
- ***prettier*** - инструмент для автоформатирования кода.
- ***webpack*** -  сборщик модулей, который позволяет скомпилировать JavaScript-модули в единый JS-файл.
- ***husky*** -  инструмент для автоматического выполнения скриптов и команд Git в ответ на определенные события.
- ***lint-staged*** - инструмент для запуска линтера eslint только для измененных файлов во время коммита.


## Необходимый функционал:

Приложение должно предоставлять возможность:

- Поиск книг по введенной пользователем подстроке
- Фильтрация книг по категориям
- Сортировки книг
- Отображение найденных книг карточками
- Отображение количества найденных книг по запросу
- Пагинация 


## Дополнительный функционал

- Собрать проект с нуля(с настройками всех конфигов: webpack, eslint, prettier, husky и тд.)
- Показывать индикатор во время загрузки книг
- Настроить Webpack необходимо самостоятельно
- Обработка ошибок
- Верстка не должна ломаться при разрешениях от 320px до 1920px


### Также проект предполагает:


- Организацию файловой структуры описанной в [structure](https://github.com/mkrivel/structure)
- Оптимизацию дизайна под мобильные устройства
- Обязательно необходимо сделать deploy приложения
- Поиск книг по авторам
- Соблюдение принципов DRY, KISS, YAGNI
- Выполнение всех требований технического задания
- API key в переменной окружения для безопасности
- Следование Git Flow стратегии управления ветками в Git
- Использование [соглашения коммитов](https://www.conventionalcommits.org/ru/v1.0.0-beta.2/)


## Полезные ссылки


[React](https://reactjs.org/docs/getting-started.html)

[React hooks](https://reactjs.org/docs/hooks-intro.html)

[Eslint](https://eslint.org/docs/user-guide/configuring)
​
[Prettier](https://prettier.io/docs/en/install.html)
​
[Babel](https://babeljs.io/docs/en/configuration)

[Webpack](https://webpack.js.org/guides/getting-started/)

[Husky](https://typicode.github.io/husky/#/)
