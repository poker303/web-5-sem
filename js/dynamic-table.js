function setUpSubmitHandlers() {
    let tableSize = document.getElementById('table-size');
    let tableInput = document.getElementById('table-input');

    tableSize.addEventListener('submit', event => event.preventDefault());
    tableInput.addEventListener('submit', event => event.preventDefault());
}

function setUpActionHandlers() {
    let tableSizeButton = document.getElementById('table-size-button');
    let tableInputButton = document.getElementById('table-input-button');
    let clearingTable = document.getElementById('clear-table');

    tableSizeButton.addEventListener('click', () =>
        createTable(
            document.getElementById('dynamic-table'),
            document.getElementById('columns').value,
            document.getElementById('rows').value
        ));

    tableInputButton.addEventListener('click', () => {
            addValueToCell(
                document.getElementsByTagName('table')[0],
                document.getElementById('column-cell').value - 1,
                document.getElementById('row-cell').value - 1,
                document.getElementById('table-cell-value').value
            );

            saveTable();
        }
    );

    clearingTable.addEventListener('click', () => clearLocalStorage());
}

function createTable(parent, columnsNumber, rowsNumber) {
    let table = document.createElement('table');

    for (let i = 0; i < rowsNumber; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < columnsNumber; j++) {
            let td = document.createElement('td');

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    let gridTemplateColumns = `repeat(${columnsNumber}, minmax(100px, 250px))`;

    table.style.setProperty('grid-template-columns', gridTemplateColumns);

    parent.appendChild(table);

    return table;
}

function addValueToCell(table, columnNumber, rowNumber, value) {
    let cell = table.rows[rowNumber].cells[columnNumber];

    cell.innerHTML = value;
}

function saveTable() {
    let table = document.getElementsByTagName('table')[0];
    let tableData = [];

    for (let rowNumber = 0; rowNumber < table.rows.length; rowNumber++) {
        for (let columnNumber = 0; columnNumber < table.rows[rowNumber].cells.length; columnNumber++) {
            let tableCellValue = table.rows[rowNumber].cells[columnNumber].innerHTML;

            if (tableCellValue.length !== 0) {
                let cellData = {
                    column: columnNumber,
                    row: rowNumber,
                    content: tableCellValue
                };

                tableData.push(cellData);
            }
        }
    }

    localStorage.setItem('tableData', JSON.stringify(tableData));
    localStorage.setItem('tableColumnsNumber', table.rows[0].cells.length.toString());
    localStorage.setItem('tableRowsNumber', table.rows.length.toString());
}

function clearLocalStorage() {
    localStorage.clear();
}

function uploadTable(parent, columnsNumber, rowsNumber) {
    let tableInfo = JSON.parse(localStorage.getItem('tableData'));

    if (columnsNumber === 0 || rowsNumber === 0) return;

    let table = createTable(parent, columnsNumber, rowsNumber);

    tableInfo.forEach(cell => addValueToCell(table, cell.column, cell.row, cell.content));
}