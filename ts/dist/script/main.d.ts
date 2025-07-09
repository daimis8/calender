interface CalenderInfo {
    year: number;
    month: number;
    monthName: string;
    daysInMonth: number;
    firstDayOfWeek: number;
    day: number | null;
}
declare enum DayOfTheWeek {
    SUN = "SUN",
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT"
}
declare enum MonthName {
    JAN = "January",
    FEB = "February",
    MAR = "March",
    APR = "April",
    MAY = "May",
    JUN = "June",
    JUL = "July",
    AUG = "August",
    SEP = "September",
    OCT = "October",
    NOV = "November",
    DEC = "December"
}
declare enum DayName {
    SUNDAY = "Sunday",
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday"
}
declare const now: Date;
declare const currentMonth: number;
declare const currentYear: number;
declare const currentDay: number;
declare const asideCalenderHeader: Element | null;
declare const currentDateInfo: CalenderInfo;
declare const headerDate: Element | null;
declare const asideCalenderInfo: {
    month: number;
    year: number;
} | undefined;
declare let currentMonthShowing: number;
declare let currentYearShowing: number;
declare const smallCalenderLeftArrow: Element | null;
declare const smallCalenderRightArrow: Element | null;
declare let currentWeekReference: Date;
declare const headerLeftArrow: Element | null;
declare const headerRightArrow: Element | null;
declare const createEventButton: Element | null;
declare const modal: HTMLElement;
declare const closeButton: Element | null;
declare function getCalenderInfo(year: number, month: number, day?: number): CalenderInfo;
declare function setAsideCalender(year: number, month: number, monthName: string, daysInMonth: number, firstDayOfWeek: number, currentDay?: number | null): {
    month: number;
    year: number;
} | undefined;
declare function bigCalenderHeader(referenceDate?: Date): void;
declare function getStartOfWeek(date: Date): Date;
declare function isToday(date: Date): boolean;
declare function createCalenderGrid(): void;
declare function createOverlayGrid(): void;
declare function handleCalendarClick(event: MouseEvent): void;
declare function getDateFromDayColumn(dayCol: number): Date;
declare function openModalWithDateTime(date: Date, hour: number, minutes: number): void;
declare function goToPreviousWeek(): void;
declare function goToNextWeek(): void;
declare function updateHeaderDate(): void;
declare function formatDateForDisplay(date: Date): string;
declare function initializeDateTimeSelects(clickedDate?: string): void;
declare function populateDateOptions(dateSelect: HTMLSelectElement, targetDateString?: string): void;
declare function populateAllTimeOptions(timeSelect: HTMLSelectElement): void;
declare const saveButton: Element | null;
declare function validateForm(): boolean;
declare function saveEventsToLocalStorage(events: EventInfo[]): void;
declare function loadEventsFromLocalStorage(): any;
interface EventInfo {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    description?: string;
}
declare function createEventObject(title: string, date: string, startTime: string, endTime: string, description?: string): EventInfo;
declare function saveEvent(): void;
declare function clearForm(): void;
declare function getAllEvents(): any;
declare function createEventAtPosition(x: number, y: number, dayCol: number, hour: number, minutes: number): void;
declare function getWeekDateRange(referenceDate: Date): {
    start: Date;
    end: Date;
};
declare function getEventsForCurrentWeek(): any;
declare function getDayColumnFromDate(date: Date): number;
declare function timeStringToPosition(timeString: string): number;
declare function displayEventsOnCalendar(): void;
