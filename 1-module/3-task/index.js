'use strict';

/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {

    if (!isString(str)) return;

    let value = parseFloat(str);
    let max;
    let min;

    while (str.length > 0)
    {
        if (!isNaN(value))
        {
            max = tryToAssignMax(max, value);
            min = tryToAssignMin(min, value);
            str = str.slice(value.toString().length);
        }
        else
        {
            str = str.slice(1);
        }

        value = parseFloat(str);
    }

    return { min:min, max:max };
}

function tryToAssignMax(value, newValue)
{
    return (value === undefined || value < newValue) ? newValue : value;
}

function tryToAssignMin(value, newValue)
{
    return (value === undefined || value > newValue) ? newValue : value;
}

function isString(value) {
    
    return typeof value === "string";
}

