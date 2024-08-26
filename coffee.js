const tables = [
    { id: 1, capacity: 2, reservations: [] },
    { id: 2, capacity: 4, reservations: [] },
    { id: 3, capacity: 6, reservations: [] },
    { id: 4, capacity: 4, reservations: [] },
    { id: 5, capacity: 2, reservations: [] }
];

document.getElementById('checkAvailabilityBtn').addEventListener('click', () => {
    const dateTimeValue = document.querySelector('input[name="dateTime"]:checked').value;
    const numPersonsValue = parseInt(document.querySelector('input[name="numPersons"]:checked').value);
    const dateTime = new Date(dateTimeValue);
    const availableTable = checkAvailability(dateTime, numPersonsValue);

    const result = availableTable ? `Table ${availableTable.id} is available` : 'No table available';
    document.getElementById('availabilityResult').textContent = result;
});

function checkAvailability(dateTime, numPersons) {
    for (let table of tables) {
        if (table.capacity >= numPersons && !isTableReserved(table, dateTime)) {
            return table;
        }
    }
    return null;
}

function isTableReserved(table, dateTime) {
    for (let reservation of table.reservations) {
        if (reservation.getTime() === dateTime.getTime()) {
            return true;
        }
    }
    return false;
}