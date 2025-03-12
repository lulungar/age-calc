import React, { useRef } from "react";
import InputItem from "./InputItem";
import ResultItem from "./ResultItem";
import { useState } from "react";

const MainForm = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [isActiveFullDay, setIsActiveFullDay] = useState(true);
  const [isActiveFullMonth, setIsActiveFullMonth] = useState(true);
  const [isActiveFullYear, setIsActiveFullYear] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const [isValidMonth, setIsValidMonth] = useState(true);
  const [isValidDay, setIsValidDay] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();

  function calculateAge(ageDate) {
    let today = new Date();
    let age = new Date(ageDate);

    let years = today.getFullYear() - age.getFullYear();
    let months = today.getMonth() - age.getMonth();
    let days = today.getDate() - age.getDate();

    // Корректировка месяцев и дней
    if (days < 0) {
      months--;
      let lastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += lastMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function checkIsValidDate(dateString) {
    let parts = dateString.split("-");
    if (parts.length !== 3) return false;

    let year = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1;
    let day = parseInt(parts[2], 10);

    let date = new Date(year, month, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  }

  const setValue = (e) => {
    e.preventDefault();
    const now = new Date();
    // console.log(dayInputRef.current.value);
    // console.log(monthInputRef.current.value);
    // console.log(yearInputRef.current.value);

    dayInputRef.current.value == "" ||
    monthInputRef.current.value == "" ||
    yearInputRef.current.value == ""
      ? setIsActive(true)
      : setIsActive(false);

    dayInputRef.current.value == ""
      ? setIsActiveFullDay(false)
      : setIsActiveFullDay(true);

    monthInputRef.current.value == ""
      ? setIsActiveFullMonth(false)
      : setIsActiveFullMonth(true);

    yearInputRef.current.value == ""
      ? setIsActiveFullYear(false)
      : setIsActiveFullYear(true);

    0 < dayInputRef.current.value && dayInputRef.current.value < 32
      ? setIsValidDay(true)
      : setIsValidDay(false);

    0 < monthInputRef.current.value && monthInputRef.current.value < 13
      ? setIsValidMonth(true)
      : setIsValidMonth(false);

    yearInputRef.current.value <= now.getFullYear()
      ? setIsValidYear(true)
      : setIsValidYear(false);

    const dateInput = `${yearInputRef.current.value}-${monthInputRef.current.value}-${dayInputRef.current.value}`;
    checkIsValidDate(dateInput) ? setIsValidDate(true) : setIsValidDate(false);

    if (
      isActive ||
      !isValidDay ||
      !isValidMonth ||
      !isValidYear ||
      !isValidDate
    ) {
      return;
    }

    const result = calculateAge(dateInput);
    setDay(result.days);
    setMonth(result.months);
    setYear(result.years);
  };

  return (
    <main>
      <div className="input-container">
        <InputItem
          title={"D A Y"}
          placeholder={"DD"}
          refVal={dayInputRef}
          isActive={isActive}
          isFull={isActiveFullDay}
          isValid={isValidDay}
          type={"day"}
          isDateValid={isValidDate}
        />
        <InputItem
          title={"M O N T H"}
          placeholder={"MM"}
          refVal={monthInputRef}
          isActive={isActive}
          isFull={isActiveFullMonth}
          isValid={isValidMonth}
          type={"month"}
          isDateValid={isValidDate}
        />
        <InputItem
          title={"Y E A R"}
          placeholder={"YYYY"}
          refVal={yearInputRef}
          isActive={isActive}
          isFull={isActiveFullYear}
          isValid={isValidYear}
          type={"year"}
          isDateValid={isValidDate}
        />
      </div>

      <div className="divider">
        <span className="line"></span>
        <button className="divider-btn" onClick={setValue}>
          <img src="/images/icon-arrow.svg" alt="" />
        </button>
      </div>

      <div className="output-result">
        <ResultItem type={"years"} result={year} />
        <ResultItem type={"months"} result={month} />
        <ResultItem type={"days"} result={day} />
      </div>
    </main>
  );
};

export default MainForm;
