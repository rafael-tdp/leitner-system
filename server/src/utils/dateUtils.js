function isSameDateOrPast(date1, date2) {
  const timestampDate1 = date1.getTime(); 
  const timestampDate2 = date2.getTime(); 

  return timestampDate1 <= timestampDate2;
}
  
  function isNextReviewToday(nextReviewDate) {
    const currentDate = new Date();
  
    const nextReviewDateWithoutTime = new Date(
      nextReviewDate.getFullYear(),
      nextReviewDate.getMonth(),
      nextReviewDate.getDate()
    );
    const currentDateWithoutTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
  
    return isSameDateOrPast(nextReviewDateWithoutTime, currentDateWithoutTime);
  }

module.exports = {isNextReviewToday}
  