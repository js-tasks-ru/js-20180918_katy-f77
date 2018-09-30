/**
 * Клонируем объект
 * @param {Object} obj - клонируем объект
 * @returns {Object}
 */
function clone (obj) 
{
    if (!isObject(obj))
    {
        return obj;
    }
    
    let cloneObj = {};

    for (let key in obj)
    {
        cloneObj[key] = clone(obj[key]);
    }

    return cloneObj;
}

function isObject(value)
{
    return value !== null && typeof value === "object";
}