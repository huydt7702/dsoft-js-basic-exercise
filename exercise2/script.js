function initApp() {
  const SUNDAY = 0;
  const SATURDAY = 6;

  const submitBtn = document.querySelector('.button');
  const result = document.querySelector('.result');
  const inputElement = document.querySelector('.input');

  function getNextWorkingDay(e) {
    e.preventDefault();

    const inputValue = parseInt(inputElement.value);
    if (isNaN(inputValue) || inputValue < 0) {
      result.innerText = 'Hãy nhập số ngày hợp lệ!!!';
      return;
    }

    const currentDate = new Date();
    const targetDate = new Date(currentDate);

    for (let i = 0; i < inputValue; i++) {
      targetDate.setDate(targetDate.getDate() + 1);
      while (targetDate.getDay() === SATURDAY || targetDate.getDay() === SUNDAY) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
    }

    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const nextDayIndex = targetDate.getDay();
    const nextDayName = daysOfWeek[nextDayIndex];

    result.innerText = `Ngày đi làm tiếp theo là: ${nextDayName}`;
  }

  submitBtn.addEventListener('click', getNextWorkingDay);
}

initApp();
