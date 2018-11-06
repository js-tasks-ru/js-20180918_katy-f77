'use strict';

/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
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
function SortableTable(items) {

    /**
     * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
     */
    this.el = document.createElement('table');
    const _dataTypeAttributeName = "data-type";

    _renderHeader.call(this, [ { value : "Name" }, { value: "Age", dataType: "numeric" }, { value: "Salary", dataType: "numeric" }, { value: "City" } ]);
    _renderItems.call(this, items);

    /**
     * Метод выполняет сортировку таблицы
     * @param {number} column - номер колонки, по которой нужно выполнить сортировку (отсчет начинается от 0)
     * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
     */
    this.sort = function (column, desc = false) { 

        let tbody = this.el.querySelector('tbody');
        let itemRows = tbody.querySelectorAll('tr');

        if (itemRows.length == 0) return;
        
        let sortableRows = [];      
        for (let i = 0; i < itemRows.length; i++ )
        {
            let row = itemRows[i];
            sortableRows.push(
                { 
                    element: row,
                    columnValue: row.querySelector(`td:nth-of-type(${column + 1})`).textContent
                });
        } 
        
        let valueGetter = _getValueGetter.call(this, column);       
        let comparer = desc 
                        ? (a, b) => valueGetter(a.columnValue) < valueGetter(b.columnValue) ? 1 : -1 
                        : (a, b) => valueGetter(a.columnValue) > valueGetter(b.columnValue) ? 1 : -1;

        sortableRows.sort(comparer);

        sortableRows.forEach(row => tbody.appendChild(row.element));

        let allCellsInHead = this.el.querySelectorAll('thead td');
        for (let i = 0 ; i < allCellsInHead.length; i++ )
        {
            let cellOfHead = allCellsInHead[i];
            cellOfHead.classList.toggle("desc", column === i && desc);
            cellOfHead.classList.toggle("sorted", column === i);
        }
    };

    function _getValueGetter(column) {

        let headingCell = this.el.querySelector(`thead td:nth-of-type(${column + 1})`);
        let dataType = headingCell.hasAttribute(_dataTypeAttributeName) ? headingCell.getAttribute(_dataTypeAttributeName) : "string";

        switch (dataType)
        {
            case "numeric":
                return value => +value;
            case "string":
            default: 
                return value => value;
        }
    }

    function _renderHeader(columnsData) {

        let headerRow = this.el.appendChild(document.createElement('thead')).appendChild(document.createElement('tr'));

        for (let columnId = 0; columnId < columnsData.length; columnId++ )
        {
            let cell = _createCell(columnsData[columnId]);
            headerRow.appendChild(cell);
            cell.addEventListener("click", event => {
                this.sort.call(this, columnId, cell.classList.contains("sorted") && !cell.classList.contains("desc"));
            });
        }
    }

    function _renderItems(items) {
       
        let tbody = this.el.appendChild(document.createElement('tbody'));

        for (let item of items)
        {
            let row = tbody.appendChild(document.createElement('tr'));
            for (let field in item)
            {
                row.appendChild(_createCell({ value : item[field] }));
            }
        } 
    }

    function _createCell (cellData) {

        let cell = document.createElement('td');
        if ("dataType" in cellData)
        {
            cell.setAttribute(_dataTypeAttributeName, cellData.dataType);
        }
    
        cell.textContent = cellData.value;
        return cell;
    }
}

