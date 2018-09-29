'use strict';

/**
 * Эту функцию трогать не нужно
 */
function print (text) {
    alert(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid (name) {

    return isString(name) && name.length >= 4 && !hasForbiddenCharacters(name);
}

function isString(value) {
    
    return typeof value == "string";
}

function hasForbiddenCharacters(value) {

    return ~value.indexOf(" ");
}

function sayHello () {
    let userName = prompt('Введите ваше имя');

    if (isValid(userName)) {
        print('Welcome back, ' + userName + '!');
    } else {
        print('Некорректное имя');
    }
}

sayHello();

