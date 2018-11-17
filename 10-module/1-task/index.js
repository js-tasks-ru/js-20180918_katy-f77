(function () {
    'use strict';

    /**
     * Компонент, который реализует таблицу
     * с возможностью удаления строк
     *
     * Пример одного элемента, описывающего строку таблицы
     *
     *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
     *
     * @constructor
     */
    class ClearedTable {

        constructor(data) {
            this.el = document.createElement('table');
            this.data = data;

            this.el.className = "pure-table";
            let head = document.createElement("thead");
            let trHead = document.createElement("tr");
            trHead.appendChild(document.createElement("td")).textContent = "Name";
            trHead.appendChild(document.createElement("td")).textContent = "Age";
            trHead.appendChild(document.createElement("td")).textContent = "Salary";
            trHead.appendChild(document.createElement("td")).textContent = "City";
            trHead.appendChild(document.createElement("td"));
            head.appendChild(trHead);
            this.el.appendChild(head);

            let tbody = document.createElement("tbody");
            this.el.appendChild(tbody);

            for (let i = 0; i < this.data.length; i++)
            {
                let dataRow = this.data[i];
                let tr = document.createElement("tr");
                tr.setAttribute("data-id", dataRow.id);
                tr.appendChild(document.createElement("td")).textContent = dataRow.name;
                tr.appendChild(document.createElement("td")).textContent = dataRow.age;
                tr.appendChild(document.createElement("td")).textContent = dataRow.salary;
                tr.appendChild(document.createElement("td")).textContent = dataRow.city;
                let deleteCell = tr.appendChild(document.createElement("td")).appendChild(document.createElement("a"));
                deleteCell.href = "#delete";
                deleteCell.textContent = "X";
                tbody.appendChild(tr);
            }

            this.el.addEventListener("click", e => {
                if (e.target.tagName != "A") return;
                
                let id = e.target.closest("tr").getAttribute("data-id");
                this.onRemoved.call(this, +id);
            });
        }

        /**
         * Метод который выщывается после удалении строки
         * @param {number} id - идентификатор удаляемого пользователя
         */
        onRemoved(id) {
            this.el.tBodies[0].removeChild(this.el.tBodies[0].querySelector(`[data-id="${id}"]`))
        }
    }

    window.ClearedTable = ClearedTable;
})();
