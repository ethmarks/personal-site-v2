export default function getDaysAlive() {
  // Create the start date: September 13, 2010 at 6:00 AM
  const startDate = new Date(2010, 8, 13, 6, 0, 0); // Month is 0-indexed, so 8 = September

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - startDate;

  // Convert milliseconds to days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysAlive = Math.floor(timeDifference / millisecondsPerDay);

  return daysAlive.toLocaleString();
}
