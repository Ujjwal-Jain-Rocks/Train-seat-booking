const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
date.valueAsDate = new Date();

ticketPrice = 10;
populateUI();

function populateUI() {


    occupied = JSON.parse(localStorage.getItem(from.value + "-" + to.value + "-" + date.value + "-" + BerthClass.value));

    if (occupied === null || occupied.length == 0) {

        seatsIndex = [];
        for (i = 0; i < 10 + Math.floor(Math.random() * 50); i++) {
            seatsIndex[i] = Math.floor(Math.random() * 72);
        }
        occupied = seatsIndex;
        localStorage.setItem(from.value + "-" + to.value + "-" + date.value + "-" + BerthClass.value, JSON.stringify(seatsIndex));
    }

    seats.forEach((seat, index) => {
        if (occupied.indexOf(index) > -1) {
            seat.classList.add('occupied');
        } else {
            seat.classList.remove('occupied');
        }
    });

    localStorage.setItem('selectedSeats', "{}");
    seats.forEach((seat) => {
        seat.classList.remove('selected');
    });
    count.innerText = 0;
    total.innerText = 0;

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedcoachIndex = localStorage.getItem('selectedcoachIndex');

    if (selectedcoachIndex !== null) {
        coachSelect.selectedIndex = selectedcoachIndex;
    }
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    if (BerthClass.value.includes("AC")) {
        ticketPrice = 220;
    } else {
        ticketPrice = 100;
    }

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

updateSelectedCount();

reset.addEventListener('click', () => {

    localStorage.setItem('selectedSeats', "{}");
    seats.forEach((seat) => {
        seat.classList.remove('selected');
    });
    count.innerText = 0;
    total.innerText = 0;
    updateSelectedCount();
});

submit.addEventListener('click', () => {
    populateUI();
});