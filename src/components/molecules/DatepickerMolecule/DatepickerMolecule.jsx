import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepickerMolecule.scss';
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";


function DatepickerMolecule({idDatefrom,titlefrom,placeholderfrom,idDateto,titleto,placeholderto,isOnlyFrom}){

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndtDateChange = (date) => {
        setEndDate(date);
    };
    const cleardates = () => {
      setStartDate(null);
      setEndDate(null);
    }
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return(
      <div className="date-container">
        <div className={`startDate ${isOnlyFrom ? 'onlyFrom' : ''}`}>
            <label htmlFor={idDatefrom}>{titlefrom}</label>
            <DatePicker
                showIcon
                isClearable
                id={idDatefrom}
                name={idDatefrom}
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd-MM-yyyy" 
                placeholderText={placeholderfrom}
                className="custom-date-picker-input"
                autoComplete="off"
                selectsStart
                startDate={startDate}
                endDate={endDate}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                      </button>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
            
                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
            
                      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                      </button>
                    </div>
                  )}
             />

        </div>

        {!isOnlyFrom &&
              <div className="duetDate">
                  <label htmlFor={idDatefrom}>{titleto}</label>
                  <DatePicker
                      showIcon
                      isClearable
                      id={idDateto}
                      name={idDateto}
                      selected={endDate}
                      onChange={handleEndtDateChange}
                      dateFormat="dd-MM-yyyy" 
                      placeholderText={placeholderto}
                      className="custom-date-picker-input"
                      autoComplete="off"
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                  
                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                  
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              {">"}
                            </button>
                          </div>
                        )}
                  />

              </div>
                  
                }

      </div>
    );

}

export{DatepickerMolecule};