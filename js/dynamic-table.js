function setUpSubmitHandlers() {
    let tableSize = document.getElementById('table-size');
    let tableInput = document.getElementById('table-input');
    let tableChangeRows = document.getElementById('table-change-rows')

    tableSize.addEventListener('submit', event => event.preventDefault());
    tableInput.addEventListener('submit', event => event.preventDefault());
    tableChangeRows.addEventListener('submit', event => event.preventDefault());
}

function setUpActionHandlers() {
    let tableSizeButton = document.getElementById('table-size-button');
    let tableInputButton = document.getElementById('table-input-button');
    let tableHighlightButton = document.getElementById('table-highlight-button');
    let tableNoticeButton = document.getElementById('table-notice-button');

    let addRowButton = document.getElementById('add-row-button');
    let deleteRowButton = document.getElementById('delete-row-button');

    let clearTableButton = document.getElementById('clear-table-button');

    tableSizeButton.addEventListener('click', () =>
        createTable(
            document.getElementById('dynamic-table'),
            document.getElementById('rows').value
        ));

    tableInputButton.addEventListener('click', () => {
            addValueToCell(
                document.getElementsByTagName('table')[0],
                document.getElementById('column-cell').value,
                document.getElementById('row-cell').value,
                document.getElementById('table-cell-value').value
            );

            saveTable();
        }
    );

    tableHighlightButton.addEventListener('click', () => {
            highlightCell(
                document.getElementsByTagName('table')[0],
                document.getElementById('column-cell').value,
                document.getElementById('row-cell').value
            );

            saveTable();
        }
    );

    tableNoticeButton.addEventListener('click', () => {
            noticeCell(
                document.getElementsByTagName('table')[0],
                document.getElementById('row-cell').value,
                document.getElementById('table-cell-status').value
            );

            saveTable();
        }
    );

    addRowButton.addEventListener('click', () => {
            addRow(
                document.getElementsByTagName('table')[0],
                document.getElementById('row-place').value
            );

            saveTable();
        }
    );

    deleteRowButton.addEventListener('click', () => {
            deleteRow(
                document.getElementsByTagName('table')[0],
                document.getElementById('row-place').value
            );

            saveTable();
        }
    );

    clearTableButton.addEventListener('click', () => clearLocalStorage());
}

function reNumber(table, rowsCount) {
    for (let row = 1; row <= rowsCount; row++) {
        let cell = table.rows[row].cells[0];

        cell.innerHTML = row.toString();
    }
}

function createTable(parent, rowsNumber) {

    if (Number.isInteger(parseFloat(rowsNumber))) {

        let table = document.createElement('table');
        let thead = document.createElement('thead');

        table.appendChild(thead);

        let row_1 = document.createElement('tr');

        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Номер";

        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Название предмета";

        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Сложность";

        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Стадия выполнения";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

        for (let i = 0; i < rowsNumber; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < 4; j++) {
                let td = document.createElement('td');

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        reNumber(table, rowsNumber);

        let gridTemplateColumns = `repeat(${4}, minmax(100px, 250px))`;

        table.style.setProperty('grid-template-columns', gridTemplateColumns);

        parent.appendChild(table);

        document.getElementById('table-size').style.display = 'none'

        return table;
    }
}

function addValueToCell(table, columnNumber, rowNumber, value) {
    if (columnNumber >= 1 && rowNumber >= 1) {
        let cell = table.rows[rowNumber].cells[columnNumber];

        cell.innerHTML = value;
    }
}

function highlightCell(table, columnNumber, rowNumber) {
    if (columnNumber >= 1 && rowNumber >= 1) {
        let cell = table.rows[rowNumber].cells[columnNumber];

        cell.style.backgroundColor = '#f3207b';
        // cell.setAttribute("style", "background:red");
    }
}

function noticeCell(table, rowNumber, status) {
    let cell = table.rows[rowNumber].cells[3];

    switch (status) {
        case '0':
            cell.innerHTML = '<span style="color: red">Не начато.</span>'
            break;

        case '1':
            cell.innerHTML = '<span style="color: #22a87f">В процессе...</span>'
            break;

        case '2':
            cell.innerHTML = '<span style="color: #078c07">Сделано !</span>'
            break;

        default:
            cell.innerHTML = '<span style="color: red">Не начато.</span>'
            break;
    }
}

function addRow(table, rowPlace) {
    if (rowPlace >= 1) {
        let newRow = table.insertRow(rowPlace)

        for (let j = 0; j < 4; j++) {
            newRow.insertCell()
        }

        reNumber(table, table.rows.length);
    }
}

function deleteRow(table, rowPlace) {
    if (rowPlace >= 1) {
        table.deleteRow(rowPlace)

        reNumber(table, table.rows.length);
    }
}

function saveTable() {
    let table = document.getElementsByTagName('table')[0];
    let tableData = [];

    for (let rowNumber = 0; rowNumber < table.rows.length; rowNumber++) {
        for (let columnNumber = 0; columnNumber < 4; columnNumber++) {
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
    localStorage.setItem('tableColumnsNumber', '4');
    localStorage.setItem('tableRowsNumber', (table.rows.length - 1).toString());
}

function clearLocalStorage() {
    document.getElementById('dynamic-table').innerHTML = ''
    localStorage.clear()

    document.getElementById('table-size').style.display = ''
}

function uploadTable(parent, rowsNumber) {
    let tableInfo = JSON.parse(localStorage.getItem('tableData'));

    if (rowsNumber === 0) return;

    let table = createTable(parent, rowsNumber);

    tableInfo.forEach(cell => addValueToCell(table, cell.column, cell.row, cell.content));
}