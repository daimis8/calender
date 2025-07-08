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


let currentWeekReference = new Date();


createCalenderGrid();


const headerLeftArrow = document.querySelector('.left-header-arrow');

headerLeftArrow.addEventListener('click', goToPreviousWeek);


const headerRightArrow = document.querySelector('.right-header-arrow');

headerRightArrow.addEventListener('click', goToNextWeek);



const createEventButton = document.querySelector('.create-button');
const modal = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close-icon-container');


createEventButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    initializeDateTimeSelects();
    
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';

    document.querySelectorAll('.selected').forEach(event => {
        event.remove();
    });
});


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
    
    const existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const overlayGrid = document.createElement('div');
    overlayGrid.className = 'overlay';
        
    overlayGrid.addEventListener('click', handleCalendarClick);
    
    bigCalender.appendChild(overlayGrid);

    displayEventsOnCalendar();

    
}

function handleCalendarClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const dayWidth = rect.width / 7;
    const dayCol = Math.floor(x / dayWidth);

    const hourHeight = rect.height / 24;
    const hour = Math.floor(y / hourHeight);
    const quarterHeight = hourHeight / 4;
    const quarter = Math.floor((y % hourHeight) / quarterHeight);
    const minutes = quarter * 15;
    
    console.log(`Clicked: Day ${dayCol}, Time ${hour}:${minutes.toString().padStart(2, '0')}`);

    createEventAtPosition(x, y, dayCol, hour, minutes);

    const clickedDate = getDateFromDayColumn(dayCol);

    openModalWithDateTime(clickedDate, hour, minutes);

    
}

function getDateFromDayColumn(dayCol) {
    const startOfWeek = getStartOfWeek(currentWeekReference);
    const targetDate = new Date(startOfWeek);
    targetDate.setDate(startOfWeek.getDate() + dayCol);
    return targetDate;
}

function openModalWithDateTime(date, hour, minutes) {
    modal.style.display = 'flex';
    
    const dateString = date.toISOString().split('T')[0];

    initializeDateTimeSelects(dateString);
    
    const dateSelect = document.getElementById('eventDate');
    dateSelect.value = dateString;
    
    const startTimeSelect = document.getElementById('eventStartTime');
    const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    startTimeSelect.value = timeString;
    
    const endMinutes = minutes + 30;
    const endHour = endMinutes >= 60 ? hour + 1 : hour;
    const finalEndMinutes = endMinutes >= 60 ? endMinutes - 60 : endMinutes;
    const endTimeString = `${endHour.toString().padStart(2, '0')}:${finalEndMinutes.toString().padStart(2, '0')}`;
    const endTimeSelect = document.getElementById('eventEndTime');
    endTimeSelect.value = endTimeString;
    
    console.log(`Modal opened with date: ${dateString}, start time: ${timeString}, end time: ${endTimeString}`);
}

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

function formatDateForDisplay(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    
    return `${dayName}, ${monthName} ${dayNumber}`;

}


function initializeDateTimeSelects(clickedDate = null) {
    const dateSelect = document.getElementById('eventDate');
    const startTimeSelect = document.getElementById('eventStartTime');
    const endTimeSelect = document.getElementById('eventEndTime');
    
    populateDateOptions(dateSelect, clickedDate);
    
    populateAllTimeOptions(startTimeSelect);
    populateAllTimeOptions(endTimeSelect);

    if (clickedDate) {
        dateSelect.value = clickedDate;
    } else {
        const today = new Date();
        dateSelect.value = today.toISOString().split('T')[0];
    }
    
    startTimeSelect.value = '09:00';
    endTimeSelect.value = '10:00';
}

function populateDateOptions(dateSelect, targetDateString = null) {
    dateSelect.innerHTML = '';

    const today = new Date();
    let startDate = new Date(today);

    if (targetDateString) {
        const targetDate = new Date(targetDateString);
        if (targetDate < today) {
            startDate = new Date(targetDate);
            startDate.setDate(targetDate.getDate() - 7);
        }
    }
    
    for (let i = 0; i < 60; i++) {
        const date = new Date(startDate);
        date.setDate(today.getDate() + i);
        
        const option = document.createElement('option');
        option.value = date.toISOString().split('T')[0]; 
        option.textContent = formatDateForDisplay(date);
        
        dateSelect.appendChild(option);
    }
}

function populateAllTimeOptions(timeSelect) {
    timeSelect.innerHTML = ''; 
   
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const option = document.createElement('option');
            option.value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            
            
            let displayHour;
            let ampm;
            
            if (hour === 0) {
                displayHour = 12;
                ampm = 'AM';
            } else if (hour < 12) {
                displayHour = hour;
                ampm = 'AM';
            } else if (hour === 12) {
                displayHour = 12;
                ampm = 'PM';
            } else {
                displayHour = hour - 12;
                ampm = 'PM';
            }
            
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

        document.querySelectorAll('.selected').forEach(event => {
            event.remove();
        });
    }
});


function validateForm() {

    const formTitle = document.querySelector('.title');
    const eventDate = document.getElementById('eventDate')
    const startTime = document.getElementById('eventStartTime');
    const endTime = document.getElementById('eventEndTime');

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

    displayEventsOnCalendar();
    
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

function createEventAtPosition(x, y, dayCol, hour, minutes) {

    document.querySelectorAll('.selected').forEach(event => {
        event.remove();
    });
    
    const event = document.createElement('div');
    event.className = 'selected';
    event.textContent = 'New Event';
    
    const rect = document.querySelector('.overlay').getBoundingClientRect();
    const dayWidth = rect.width / 7;
    const hourHeight = rect.height / 24;
    
    event.style.position = 'absolute';
    event.style.left = `${dayCol * dayWidth}px`;
    event.style.top = `${(hour + minutes/60) * hourHeight}px`;
    event.style.width = `${dayWidth - 30}px`;
    event.style.height = `${hourHeight / 2}px`;
    
    document.querySelector('.overlay').appendChild(event);
}

function getWeekDateRange(referenceDate) {
    const startOfWeek = getStartOfWeek(referenceDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return {
        start: startOfWeek,
        end: endOfWeek
    };
}

function getEventsForCurrentWeek() {
    const allEvents = loadEventsFromLocalStorage();
    const weekRange = getWeekDateRange(currentWeekReference);
    
    return allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= weekRange.start && eventDate <= weekRange.end;
    });
}

function getDayColumnFromDate(date) {
    const startOfWeek = getStartOfWeek(currentWeekReference);
    const normalizedEventDate = new Date(date);
    normalizedEventDate.setHours(0, 0, 0, 0);
    
    const normalizedStartOfWeek = new Date(startOfWeek);
    normalizedStartOfWeek.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((normalizedEventDate - normalizedStartOfWeek) / (1000 * 60 * 60 * 24));
    return daysDiff;
}

function timeStringToPosition(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + (minutes / 60);
}

function displayEventsOnCalendar() {
    
    document.querySelectorAll('.calendar-event').forEach(event => {
        event.remove();
    });
    
    const weekEvents = getEventsForCurrentWeek();
    const overlay = document.querySelector('.overlay');
    
    if (!overlay) return;
    
    const rect = overlay.getBoundingClientRect();
    const dayWidth = rect.width / 7;
    const hourHeight = rect.height / 24;
    
    weekEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const dayCol = getDayColumnFromDate(eventDate);
        
        if (dayCol < 0 || dayCol > 6) return;
        
        const startPosition = timeStringToPosition(event.startTime);
        const endPosition = timeStringToPosition(event.endTime);
        const duration = endPosition - startPosition;
        
        const eventElement = document.createElement('div');
        eventElement.className = 'calendar-event';
        eventElement.textContent = event.title;
        
        eventElement.style.left = `${dayCol * dayWidth + 5}px`;
        eventElement.style.top = `${startPosition * hourHeight}px`;
        eventElement.style.width = `${dayWidth - 10}px`;
        eventElement.style.height = `${duration * hourHeight - 2}px`;
        
        eventElement.addEventListener('click', (e) => {
            e.stopPropagation();
           //TO-DO : Event details later
        });
        
        overlay.appendChild(eventElement);
    });
}