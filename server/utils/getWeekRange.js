export function getWeekRange(date) {
    // JS Date constructor - used to create a Date object
    // Creates a Date object, which represents that specific day (inputDate)
    const inputDate = new Date(date);

    // A new Date object (weekStart) is created, initialised to the same day as (inputDate)
    // inputDate.getDate returns the day of the week as a number (0 = Sunday, 1 = Monday)
    // Subtracting inputDate.getDay() from the current date aligns the weekStart date to the Sunday of that week
    const weekStart = new Date(inputDate);
    weekStart.setDate(inputDate.getDate() - inputDate.getDay()); // Sunday

    // A new Date object (weekEnd) is created based on weekStart
    // Adding 6 to the day of the week moves it to the Saturday of the same week
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Saturday

    return {
        // The toISOString() method converts the Date object into a string in the ISO 8601 format:
        // "YYYY--MM-DDTHH:mm:ss.sssZ"
        // Splitting by 'T' and taking the first part gives just the date (YYYY-MM-DD)
        weekStartDate: weekStart.toISOString().split('T')[0], // Sunday
        weekEndDate: weekEnd.toISOString().split('T')[0], // Saturday
    };
}