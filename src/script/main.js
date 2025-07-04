const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
]

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();
const currentDay = now.getDate();

const asideCalenderHeader = document.querySelector('.aside-calender-month-year');
asideCalenderHeader.innerHTML = `${currentMonth} ${currentYear}`


const currentDateInfo = getCalenderInfo(currentYear, currentMonth, currentDay);


const headerDate = document.querySelector('.header-date-text');
headerDate.innerHTML = `${currentDateInfo.monthName} ${currentDateInfo.year}`;


const asideCalenderInfo = setAsideCalender(
    currentDateInfo.year,
    currentDateInfo.month,
    currentDateInfo.monthName,
    currentDateInfo.daysInMonth,
    currentDateInfo.firstDayOfWeek,
    currentDateInfo.day
);

let currentMonthShowing = asideCalenderInfo.month;
let currentYearShowing = asideCalenderInfo.year;


function getCalenderInfo(year, month, day = null) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    return {
        year,
        month,
        monthName: months[month],
        daysInMonth,
        firstDayOfWeek,
        day: day || null
    };
}

function setAsideCalender(year, month, monthName, daysInMonth, firstDayOfWeek, currentDay = null) {
    const asideCalenderHeader = document.querySelector('.aside-calender-month-year');
    asideCalenderHeader.innerHTML = `${monthName} ${year}`;


    const asideCalenderDays = document.querySelector('.small-calender-grid');

    const existingDays = asideCalenderDays.querySelectorAll('.small-calender-number-container, .small-calender-current-day-container');
    existingDays.forEach(day => day.remove());

    const prevMonth = month === 0 ? 12 : month;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    for(let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayContainer = document.createElement('div');
        const dayNumber = document.createElement('div');

        dayContainer.className = 'small-calender-number-container cursor-pointer';
        dayNumber.className = 'small-calender-grid-number text-primary';
        dayNumber.style.opacity = '0.4';
        dayNumber.textContent = day;

        dayContainer.appendChild(dayNumber);
        asideCalenderDays.appendChild(dayContainer);
    }

    for(let day = 1; day <= daysInMonth; day++) {
        const dayContainer = document.createElement('div');
        const dayNumber = document.createElement('div');

        if(day === currentDay) {
            dayContainer.className = 'small-calender-current-day-container cursor-pointer'
            dayNumber.className = 'small-calender-grid-number text-black';
        } else {
            dayContainer.className = 'small-calender-number-container cursor-pointer'
            dayNumber.className = 'small-calender-grid-number text-primary';
        }

        dayNumber.textContent = day;

        dayContainer.appendChild(dayNumber);
        asideCalenderDays.appendChild(dayContainer);
    }

    const totalDaysToShow = 42;
    const daysUsed = daysInMonth + firstDayOfWeek;
    const totalDaysLeftToShow = totalDaysToShow - daysUsed;

    for(let day = 1; day <= totalDaysLeftToShow; day++) {
        const dayContainer = document.createElement('div');
        const dayNumber = document.createElement('div');

        dayContainer.className = 'small-calender-number-container cursor-pointer';
        dayNumber.className = 'small-calender-grid-number text-primary';
        dayNumber.style.opacity = '0.4';
        dayNumber.textContent = day;

        dayContainer.appendChild(dayNumber);
        asideCalenderDays.appendChild(dayContainer);
    }

    return {
        month,
        year
    };
}

const smallCalenderLeftArrow = document.querySelector('.small-calender-left-arrow');

smallCalenderLeftArrow.addEventListener('click', () => {
    const prevMonth = currentMonthShowing === 0 ? 11 : currentMonthShowing - 1;
    const prevYear = currentMonthShowing === 0 ? currentYearShowing - 1 : currentYearShowing;
    const calenderInfo = getCalenderInfo(prevYear, prevMonth);
    const asideCalenderInfo = setAsideCalender(
        calenderInfo.year,
        calenderInfo.month,
        calenderInfo.monthName,
        calenderInfo.daysInMonth,
        calenderInfo.firstDayOfWeek
    );
    currentYearShowing = asideCalenderInfo.year;
    currentMonthShowing = asideCalenderInfo.month;
    console.log(currentMonthShowing);
    console.log(currentYearShowing)
    
});


const smallCalenderRightArrow = document.querySelector('.small-calender-right-arrow');

smallCalenderRightArrow.addEventListener('click', () => {
    const upcomingMonth = currentMonthShowing === 11 ? 1 : currentMonthShowing + 1;
    const upcomingYear = currentMonthShowing === 11 ? currentYearShowing + 1 : currentYearShowing;
    const calenderInfo = getCalenderInfo(upcomingYear, upcomingMonth);
    const asideCalenderInfo = setAsideCalender(
        calenderInfo.year,
        calenderInfo.month,
        calenderInfo.monthName,
        calenderInfo.daysInMonth,
        calenderInfo.firstDayOfWeek
    );
    currentYearShowing = asideCalenderInfo.year;
    currentMonthShowing = asideCalenderInfo.month;
    
});

const bigCalender = document.querySelector('.big-calender');

function bigCalenderHeader(referenceDate = new Date()) {

    const daysOfTheWeekArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const startOfWeek = getStartOfWeek(referenceDate)

    const existingDates = document.querySelectorAll('.big-calender-date-container');
    existingDates.forEach(date => date.remove());


    for (let i = 0; i < 7; i++) {

        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);

        const bigCalenderDate = document.createElement('div');
        bigCalenderDate.className = 'big-calender-date-container'


        const numberContainer = document.createElement('div');

        if (isToday(currentDate)) {
            numberContainer.className = 'big-calender-today-container cursor-pointer';
        } else {
            numberContainer.className = 'big-calender-number-container cursor-pointer';
        }

        const dayOfTheWeek = document.createElement('p');
        dayOfTheWeek.className = 'weekday-text';
        dayOfTheWeek.textContent = daysOfTheWeekArray[i];

        const dayNumber = document.createElement('p');
        dayNumber.className = 'weekday-number'
        dayNumber.textContent = currentDate.getDate();

        numberContainer.appendChild(dayNumber);

        bigCalenderDate.appendChild(dayOfTheWeek);
        bigCalenderDate.appendChild(numberContainer);

        bigCalender.appendChild(bigCalenderDate);

    }
}

function getStartOfWeek(date) {
    const result = new Date(date);
    const dayOfWeek = result.getDay();
    result.setDate(result.getDate() - dayOfWeek);
    return result;
}

function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

let currentWeekReference = new Date();


createCalenderGrid();

function createCalenderGrid() {

    const emptyDiv = document.createElement('div');
    bigCalender.appendChild(emptyDiv);
    bigCalender.appendChild(emptyDiv.cloneNode());

    bigCalenderHeader(currentWeekReference);

    const timeZoneText = document.createElement('p');
    timeZoneText.className = 'time-zone-text';
    timeZoneText.textContent = 'GMT+03';
    bigCalender.appendChild(timeZoneText);


    for (let i = 0; i < 10; i++) {
        const emptyDiv = document.createElement('div');
        bigCalender.appendChild(emptyDiv)
    }
    
    const firstRowBorders = [
        'left-border right-border',
        'right-border',
        'right-border',
        'right-border',
        'right-border',
        'right-border',
        'right-border'
    ]

    const secondRowBorders = [
        'top-border',
        'top-border left-border right-border',
        'top-border right-border',
        'top-border right-border',
        'top-border right-border',
        'top-border right-border',
        'top-border right-border',
        'top-border right-border'
    ]

    const thirdRowBorders = [
        'top-border',
        'all-borders',
        'top-border bottom-border right-border',
        'top-border bottom-border right-border',
        'top-border bottom-border right-border',
        'top-border bottom-border right-border',
        'top-border bottom-border right-border',
        'top-border bottom-border right-border'
    ]

    const allOtherRowsBorders = [
        'top-border',
        'all-borders',
        'bottom-border right-border left-border',
        'bottom-border right-border left-border',
        'bottom-border right-border left-border',
        'bottom-border right-border left-border',
        'bottom-border right-border left-border',
        'bottom-border right-border left-border',
    ]


    firstRowBorders.forEach(borderClass => {
        const div = document.createElement('div');
        div.className = borderClass;
        bigCalender.appendChild(div);
    });

    bigCalender.appendChild(emptyDiv.cloneNode(true));


    secondRowBorders.forEach(borderClass => {
        const div = document.createElement('div');
        div.className = borderClass;
        bigCalender.appendChild(div);
    });

    for (let i = 1; i <= 23; i++) {

        if (i <= 12) {
            const timeText = document.createElement('p');
            timeText.className = 'big-calender-time-text';
            timeText.textContent = `${i} AM`
            bigCalender.appendChild(timeText);
        } else {
            const timeText = document.createElement('p');
            timeText.className = 'big-calender-time-text';
            timeText.textContent = `${i - 12} PM`
            bigCalender.appendChild(timeText);
        }


        if (i === 1) {
            thirdRowBorders.forEach(borderClass => {
                const div = document.createElement('div');
                div.className = borderClass;
                bigCalender.appendChild(div);
            });
        } else {
            allOtherRowsBorders.forEach(borderClass => {
                const div = document.createElement('div');
                div.className = borderClass;
                bigCalender.appendChild(div);
            });
        }
    }

    createOverlayGrid();

}

function createOverlayGrid() {
    bigCalender.offsetHeight;

    const existingOverlay = document.querySelector('.overlay-grid');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    bigCalender.offsetHeight;
    
    const overlayGrid = document.createElement('div');
    overlayGrid.className = 'overlay-grid';
        
    for (let row = 0; row < 96; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.className = 'overlay-grid-cells';
            
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.hour = Math.floor(row / 4);
            cell.dataset.quarter = row % 4;
            
            cell.onclick = handleOverlayCellClick;
            
            
            overlayGrid.appendChild(cell);
        }
    }

    bigCalender.appendChild(overlayGrid);
    
   
}

function handleOverlayCellClick(event) {
    console.log(event.target);

    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const hour = parseInt(cell.dataset.hour);
    const quarter = parseInt(cell.dataset.quarter);

    console.log('=== CLICK DEBUG ===');
    console.log('Raw dataset values:', {
        row: cell.dataset.row,
        col: cell.dataset.col,
        hour: cell.dataset.hour,
        quarter: cell.dataset.quarter
    });
    console.log('Parsed values:', { row, col, hour, quarter });
    console.log('Target element:', event.target);
    
    
    const minutes = quarter * 15;
    const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    console.log(`Clicked on day ${col}, time ${timeString} (${hour}:${minutes < 10 ? '0' : ''}${minutes})`);

    document.querySelectorAll('.overlay-grid-cells.selected').forEach(cell => {
        cell.classList.remove('selected')
        cell.style.gridRow = '';
        cell.textContent = '';
    });
    
    event.target.classList.add('selected');
    event.target.style.gridRow = 'span 2'; 
    event.target.textContent = 'New Event'; 

}


const headerLeftArrow = document.querySelector('.left-header-arrow');

headerLeftArrow.addEventListener('click', goToPreviousWeek);


const headerRightArrow = document.querySelector('.right-header-arrow');

headerRightArrow.addEventListener('click', goToNextWeek);

function goToPreviousWeek() {
    currentWeekReference.setDate(currentWeekReference.getDate() - 7);

    updateHeaderDate();

    bigCalender.innerHTML = '';

    createCalenderGrid();
}

function goToNextWeek() {
    currentWeekReference.setDate(currentWeekReference.getDate() + 7);

    updateHeaderDate();

    bigCalender.innerHTML = '';

    createCalenderGrid();
}

function updateHeaderDate() {
    const headerDate = document.querySelector('.header-date-text');
    const weekMonth = currentWeekReference.getMonth();
    const weekYear = currentWeekReference.getFullYear();
    const monthName = months[weekMonth];

    headerDate.innerHTML = `${monthName} ${weekYear}`
}

const createEventButton = document.querySelector('.create-button');
const modal = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close-icon-container');


createEventButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    initializeDateTimeSelects();
    
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function formatDateForDisplay(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    
    return `${dayName}, ${monthName} ${dayNumber}`;

}

function formatTimeForDisplay(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr}${ampm}`;
}


function initializeDateTimeSelects(clickedDate = null) {
    const dateSelect = document.getElementById('eventDate');
    const startTimeSelect = document.getElementById('eventStartTime');
    const endTimeSelect = document.getElementById('eventEndTime');
    
    populateDateOptions(dateSelect);
    
    populateAllTimeOptions(startTimeSelect);
    populateAllTimeOptions(endTimeSelect);

    if (clickedDate) {
        dateSelect.value = clickedDate;
    } else {
        const today = newDate();
        dateSelect.value = today.toISOString().split('T')[0];
    }
    
    startTimeSelect.value = '09:00';
    endTimeSelect.value = '10:00';
}

function populateDateOptions(dateSelect) {
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const option = document.createElement('option');
        option.value = date.toISOString().split('T')[0]; 
        option.textContent = formatDateForDisplay(date);
        
        dateSelect.appendChild(option);
    }
}

function populateAllTimeOptions(timeSelect) {
    timeSelect.innerHTML = ''; 
   
    for (let hour = 1; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const option = document.createElement('option');
            option.value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            const displayMinutes = minute.toString().padStart(2, '0');
            option.textContent = `${displayHour}:${displayMinutes} ${ampm}`;
            
            timeSelect.appendChild(option);
        }
    }
}


const saveButton = document.querySelector('.form-save-button');

saveButton.addEventListener('click', () => {


    if (validateForm()) {
        saveEvent();
        modal.style.display = 'none';

        console.log('Form saved successfully!');
    }
});


function validateForm() {

    const formTitle = document.querySelector('.title');
    const eventDate = document.getElementById('eventDate')
    const startTime = document.getElementById('eventStartTime');
    const endTime = document.getElementById('eventEndTime');

    console.log(formTitle);
    console.log(eventDate);
    console.log(startTime);
    console.log(endTime);

    if (!formTitle || !formTitle.value.trim()) {
        alert("Please fill out form title");
        return false;
    }

    if (!eventDate || !eventDate.value) {
        alert("Please fill in the date");
        return false;
    }

    if (!startTime || !startTime.value) {
        alert("Please fill in the start time");
        return false;
    }

    if (!endTime || !endTime.value) {
        alert("Please fill in the end time");
        return false;
    }

    if (startTime.value >= endTime.value) {
        alert("Start time can't be smaller than end time");
        return false;
    }

    return true
}

function saveEventsToLocalStorage(events) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
}

function loadEventsFromLocalStorage() {
    const eventsJson = localStorage.getItem('calendarEvents');
    return eventsJson ? JSON.parse(eventsJson) : [];
}

function createEventObject(title, date, startTime, endTime, description = '') {
    return {
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
        description: description
    };
}

function saveEvent() {
    const formTitle = document.querySelector('.title');
    const eventDate = document.getElementById('eventDate');
    const startTime = document.getElementById('eventStartTime');
    const endTime = document.getElementById('eventEndTime');
    const description = document.querySelector('.form-description');

    const newEvent = createEventObject(
        formTitle.value.trim(),
        eventDate.value,
        startTime.value,
        endTime.value,
        description.value.trim()
    );

    const existingEvents = loadEventsFromLocalStorage();


    existingEvents.push(newEvent);
    
    saveEventsToLocalStorage(existingEvents);
    
    clearForm();
    
    console.log('Event saved:', newEvent);
    console.log('All events:', existingEvents);
}

function clearForm() {
    document.querySelector('.title').value = '';
    document.querySelector('.form-description').value = '';
}

function getAllEvents() {
    return loadEventsFromLocalStorage();
}