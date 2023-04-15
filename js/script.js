const input_year = document.querySelector("#year");
const input_month = document.querySelector("#month");
const input_day = document.querySelector("#day");

const output_years = document.querySelector("#years");
const output_months = document.querySelector("#months");
const output_days = document.querySelector("#days");

const label_year = input_year.previousElementSibling;
const label_month = input_month.previousElementSibling;
const label_day = input_day.previousElementSibling;

const error_year = input_year.nextElementSibling;
const error_month = input_month.nextElementSibling;
const error_day = input_day.nextElementSibling;

var error = {
  day: false,
  month: false,
  year: false,
};
var month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const ValidateInput = (
  today_day,
  today_month,
  today_year,
  day,
  month,
  year
) => {
  if (day === "") {
    error_day.textContent = "This field is required";
    error.day = true;
  } else {
    error_day.textContent = "";
    error.day = false;
  }

  if (month === "") {
    error_month.textContent = "This field is required";
    error.month = true;
  } else {
    error_month.textContent = "";
    error.month = false;
  }

  if (year === "") {
    error_year.textContent = "This field is required";
    error.year = true;
  } else {
    error_year.textContent = "";
    error.year = false;
  }

  if (error.day || error.month || error.year) {
    return;
  }

  if (
    day > month_days[month - 1] ||
    (month === today_month && day > today_day) ||
    (month > 12 && day)
  ) {
    error_day.textContent = "Must be a valid day";
    error.day = true;
  } else {
    error_day.textContent = "";
    error.day = false;
  }

  if (month > 12 || (year === today_year && month > today_month)) {
    error_month.textContent = "Must be a valid month";
    error.month = true;
  } else {
    error_month.textContent = "";
    error.month = false;
  }

  if (year > today_year) {
    error_year.textContent = "Must be in past";
    error.year = true;
  } else {
    error_year.textContent = "";
    error.year = false;
  }

  return;
};

const CalculateAge = () => {
  const day = input_day.value;
  const month = input_month.value;
  const year = input_year.value;

  var today = new Date();
  const today_day = today.getDate();
  const today_month = today.getMonth();
  const today_year = today.getFullYear();

  ValidateInput(today_day, today_month, today_year, day, month, year);

  if (error.day) {
    label_day.classList.add("error");
    input_day.classList.add("input-error");
  } else {
    label_day.classList.remove("error");
    input_day.classList.remove("input-error");
  }

  if (error.month) {
    label_month.classList.add("error");
    input_month.classList.add("input-error");
  } else {
    label_month.classList.remove("error");
    input_month.classList.remove("input-error");
  }

  if (error.year) {
    label_year.classList.add("error");
    input_year.classList.add("input-error");
  } else {
    label_year.classList.remove("error");
    input_year.classList.remove("input-error");
  }

  if (error.day || error.month || error.year) {
    return;
  }

  var age = {};

  var days = today_day - day,
    months = today_month - month + 1,
    years = today_year - year;

  if (days < 0) {
    days += month_days[month - 1];
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  age = { days: days, months: months, years: years };

  var startDay = 0,
    startMonth = 0,
    startYear = 0;

  output_days.textContent = "0";
  output_months.textContent = "0";
  output_years.textContent = "0";

  let counter = setInterval(() => {
    if (startDay != age.days) {
      output_days.textContent = ++startDay;
    }
    if (startMonth != age.months) {
      output_months.textContent = ++startMonth;
    }
    if (startYear != age.years) {
      output_years.textContent = ++startYear;
    }

    if (
      startDay === age.days &&
      startMonth === age.months &&
      startYear === age.years
    ) {
      clearInterval(counter);
    }
  }, 50);
};

document.querySelector(".btn").addEventListener("click", CalculateAge);
