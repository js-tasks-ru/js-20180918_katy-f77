'use strict';

/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

    let rows = table.querySelectorAll("tbody tr");

    for (let i = 0; i < rows.length; i++ )
    {
        let row = rows[i];
        let status = row.lastElementChild;
        let gender = status.previousElementSibling;
        let age = gender.previousElementSibling;
        
        const dataAvailableAttributeName = "data-available";

        if (status.hasAttribute(dataAvailableAttributeName))
        {
            let dataAvailable = status.getAttribute(dataAvailableAttributeName).toLowerCase() == "true";
            row.classList.toggle("available", dataAvailable);
            row.classList.toggle("unavailable", !dataAvailable);
        }
        else
        {
            row.setAttribute("hidden", true);
        }

        row.classList.toggle("male", gender.textContent == "m");
        row.classList.toggle("female", gender.textContent == "f");

        if (parseInt(age.textContent) < 18)
        {
            row.style.textDecoration = "line-through";
        }
    }
}