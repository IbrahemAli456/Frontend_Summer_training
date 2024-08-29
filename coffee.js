document.addEventListener("DOMContentLoaded", function() {
    const tables = [
        { id: 1, capacity: 2, reservations: [] },
        { id: 2, capacity: 4, reservations: [] },
        { id: 3, capacity: 6, reservations: [] },
        { id: 4, capacity: 4, reservations: [] },
        { id: 5, capacity: 2, reservations: [] }
    ];

    document.querySelector(".reservation-form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const numPersons = parseInt(document.getElementById("numPersons").value);
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const dateTime = new Date(`${date}T${time}`);

        const availableTable = checkAvailability(dateTime, numPersons);

        
        const result = availableTable ? `Table ${availableTable.id} is available` : 'No table available';
        document.getElementById("availabilityResult").textContent = result;

        if (availableTable) {
            availableTable.reservations.push(dateTime);
        }
    });bn     

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
});