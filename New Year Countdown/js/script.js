const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');


const currentYear = new Date().getFullYear()
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);


function updateCoutdown() {
    const currrentTime = new Date();

    const difference = newYearTime - currrentTime;

    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hoursDifference = Math.floor(difference / 1000 / 60 / 60) % 24;
    const minutesDifference = Math.floor(difference / 1000 / 60) % 60;
    const secondsDifference = Math.floor(difference / 1000) % 60;
    

    days.innerHTML = daysDifference;
    hours.innerHTML = hoursDifference < 10 ? '0' + hoursDifference : hoursDifference;
    minutes.innerHTML = minutesDifference < 10 ? '0' + minutesDifference : minutesDifference;
    seconds.innerHTML = secondsDifference < 10 ? '0' + secondsDifference : secondsDifference;
    

}

setInterval(updateCoutdown, 1000)