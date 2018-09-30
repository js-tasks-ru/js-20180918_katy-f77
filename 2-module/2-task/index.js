/**
 * Ищем значение в объекте
 * @param {Object} obj - объект в котором ищем
 * @param {*} value - значение, которе ищем
 * @returns {Object}
 */
function find (obj, value) 
{
    let result = function findArray(obj, value)
    {
        let result = [];

        for (let key in obj)
        {
            let current = obj[key];

            if (current === value)
            {
                result.push(key);
            }
            else if (isObject(current))
            {
                let paths = findArray(current, value);
                for (let i = 0; i < paths.length; i++)
                {
                    result.push(key + "." + paths[i]);
                }
            }        
        }

        return result;
    }(obj, value);

    return result.length > 1 ? result : result.length == 1 ? result[0] : null;
}

function isObject(value)
{
    return value != null && typeof value === "object";
}