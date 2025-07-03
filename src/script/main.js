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
    bigCalender.appendChild(emptyDiv.cloneNode(true));

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
    
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none'
});

function isMobileScreen() {
    return window.innerWidth < 768;
}



