import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment";
import { getGermanHolidays } from "../../doctorDashboard/uberblick/HolidayService.js";
import "../../../doctor/ReactCalendar.css";
import KommendeTermine from "./KommendeTermine.jsx";
import TerminInfo from "./TerminInfo.jsx";
import { useNavigate } from "react-router-dom";

const Uberblick = () => {
  const [holidayArray, setHolidayArray] = useState([]);
  let dayData = [];

  const [holidays, setHolidays] = useState([]);

  const dateToday = moment().format("YYYY-MM-DD");

  const { appointments, doctors } = useSelector((state) => state.data);

  const [termin, setTermin] = useState([]);
  const [isOldAppointmentsShown, setIsOldAppointmentsShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const holidayData = await getGermanHolidays();
        setHolidays(holidayData);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    //fetchHolidays();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateSelect = async (value) => {
    //console.log("Hello")
    const dateArray = value
      .toLocaleString()
      .split(",")
      .slice(0, 1)[0]
      .split("/");
    const datum = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    dayData = await holidays.filter((item) => item.date.iso === datum);

    setHolidayArray(dayData);
  };

  function getAppointmentsForCurrentMonth(appointments) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Note: JavaScript months are 0-indexed

    return appointments?.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const appointmentYear = appointmentDate.getFullYear();
      const appointmentMonth = appointmentDate.getMonth() + 1;

      return (
        appointmentYear === currentYear && appointmentMonth === currentMonth
      );
    });
  }

  const appointmentsForCurrentMonth =
    getAppointmentsForCurrentMonth(appointments);

  return (
    <div className="h-[100vh] w-[87vw]">
      <div className="flex rounded-3xl">
        <div className="flex flex-col w-[23vw] min-w-[23vw] bg-white dark:bg-secondary-panel-backgrounds max-h-[86vh] min-h-[86vh] overflow-scroll rounded-l-3xl border-r-[1.9rem] border-main-light-blue dark:border-main-panel-backgrounds">
          <div className=" min-h-[10vh] text-4xl font-bold flex justify-center items-center border-b-8 border-main-dark-blue dark:border-main-light-blue">
            <h1 className="text-main-dark-blue dark:text-main-light-blue">
              Überblick
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 ml-5 text-main-dark-blue dark:text-main-light-blue"
            >
              <path
                fillRule="evenodd"
                d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center border-b-4 border-main-dark-blue dark:border-main-light-blue mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-main-dark-blue dark:text-main-light-blue mt-4"
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            {isOldAppointmentsShown ? (
              <h2 className="text-3xl text-main-dark-blue my-4 dark:text-main-light-blue">
                Alte Termine
              </h2>
            ) : (
              <h2 className="text-3xl text-main-dark-blue dark:text-main-light-blue my-4">
                Kommende Termine
              </h2>
            )}
          </div>
          <div className="mt-8 min-h-[36vh] max-h-[36vh] overflow-scroll shadow-md">
            <KommendeTermine
              appointmentsOfThisPatient={appointments}
              dateToday={dateToday}
              setTermin={setTermin}
              isOldAppointmentsShown={isOldAppointmentsShown}
            />
          </div>
          {isOldAppointmentsShown ? (
            <button
              className="mt-7 mb-5 text-main-dark-blue dark:text-main-light-blue text-lg hover:underline"
              onClick={() => setIsOldAppointmentsShown(false)}
            >
              ...meine eingehenden Termine anzeigen
            </button>
          ) : (
            <button
              className="mt-5 mb-5 text-main-dark-blue dark:text-main-light-blue text-lg hover:underline"
              onClick={() => setIsOldAppointmentsShown(true)}
            >
              ...meine alten Termine anzeigen
            </button>
          )}
          <button
            onClick={() => navigate("/search")}
            className="mx-auto rounded-full bg-sky-700 dark:bg-sky-600 text-lg text-white min-w-[8rem] w-[8rem] min-h-[8rem] h-[8rem] hover:bg-sky-600 dark:hover:bg-sky-500 duration-150 mt-2"
          >
            neuen Termin vereinbaren
          </button>
        </div>
        <div className="flex flex-row w-[73%]">
          <div className="flex flex-col max-w-[35rem] min-w-[35rem]">
            <div className="flex flex-row gap-8 border-b-[1.9rem] border-main-light-blue dark:border-main-panel-backgrounds max-w-[35rem] min-w-[35rem]">
              <div className="flex text-center flex-col justify-between bg-white dark:bg-secondary-panel-backgrounds p-3 max-h-[13rem] min-h-[13rem] max-w-[15rem] w-[16rem]">
                <h1 className="text-3xl wrap text-main-dark-blue dark:text-main-light-blue">
                  Gesamtzahl der Arzten
                </h1>
                <div className="flex justify-center items-center bg-main-light-blue rounded-lg mx-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-20 h-20 border-r-4 border-main-light-blue2 text-main-light-blue2 pr-3"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                  </svg>
                  <p className="text-3xl text-main-dark-blue font-bold pl-3">
                    {doctors?.number}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between  text-center bg-white dark:bg-secondary-panel-backgrounds p-3 max-h-[13rem] min-h-[13rem] max-w-[16rem] w-[16rem]">
                <h1 className="text-3xl wrap text-main-dark-blue dark:text-main-light-blue">
                  Gesamtzahl der Termine
                </h1>
                <div className="flex justify-center items-center bg-main-light-blue rounded-lg mx-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-20 h-20 border-r-4 border-main-light-blue2 text-main-light-blue2 pr-3"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                  </svg>
                  <p className="text-3xl text-main-dark-blue font-bold pl-3">
                    {appointments?.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white dark:bg-secondary-panel-backgrounds min-h-[62vh] max-w-[33rem]  min-w-[33rem]">
              <div className="text-3xl w-[16rem] mt-3 text-main-dark-blue dark:text-main-light-blue border-b-2 border-main-dark-blue dark:border-main-light-blue mx-auto text-center">
                <h1>Termin Info</h1>
              </div>
              <TerminInfo
                termin={termin}
                isOldAppointmentsShown={isOldAppointmentsShown}
              />
            </div>
          </div>

          <div className="flex flex-col max-w-[36rem]  min-w-[36rem]">
            <div className="flex flex-row gap-8 border-b-[1.9rem] border-main-light-blue dark:border-main-panel-backgrounds">
              <div className="col-span-1 row-span-2 bg-white dark:bg-secondary-panel-backgrounds flex flex-col justify-evenly text-center p-3 max-h-[13rem] min-h-[13rem] max-w-[15rem] min-w-[15rem]">
                <h1 className="text-3xl wrap text-main-dark-blue dark:text-main-light-blue">
                  Termine in diesem Monat
                </h1>
                <div className="flex justify-center items-center bg-main-light-blue rounded-lg mx-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-20 h-20 border-r-4 border-main-light-blue2 text-main-light-blue2 pr-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-3xl text-main-dark-blue font-bold pl-3">
                    {appointmentsForCurrentMonth?.length}
                  </p>
                </div>
              </div>
              <div className="col-span-1 rounded-tr-3xl row-span-2 bg-white dark:bg-secondary-panel-backgrounds flex flex-col justify-evenly text-center p-3 max-h-[13rem] min-h-[13rem] max-w-[15rem] min-w-[15rem]">
                <h1 className="text-3xl wrap text-main-dark-blue dark:text-main-light-blue">
                  Letzte Bewertung
                </h1>
                <div className="flex justify-center items-center bg-main-light-blue rounded-lg mx-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-20 h-20 border-r-4 border-main-light-blue2 text-main-light-blue2 pr-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-3xl text-main-dark-blue font-bold pl-3">
                    4.7
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white dark:bg-secondary-panel-backgrounds rounded-br-3xl min-h-[62vh] max-w-[33rem]  min-w-[33rem]">
              <div className="text-3xl w-[18rem] ml-[6rem] mt-3 text-main-dark-blue dark:text-main-light-blue border-b-2 border-main-dark-blue dark:border-main-light-blue mx-auto text-center">
                <h1>Kalender</h1>
              </div>
              <Calendar
                className="react-calendar mx-auto mt-5 ml-[3rem]"
                defaultView="month"
                locale="de-DE"
                onChange={handleDateSelect}
                tileClassName={({ date, view }) => {
                  //holidays.map((item) => console.log(item.date.iso))
                  if (
                    holidays.find(
                      (dat) =>
                        dat.date.iso === moment(date).format("YYYY-MM-DD")
                    )
                  ) {
                    return "highlight";
                  }
                  // if(holidays.find(x=>x===moment(date).format("YYYY-MM-DD"))){
                  //  return  'highlight'
                  // }
                }}
              />
              <table className="mt-5 text-start text-main-dark-blue dark:text-main-light-blue min-w-[27rem] max-w-[27rem] wrap ml-8">
                {holidayArray.map((item) => {
                  return (
                    <>
                      <tr>
                        <th className="text-main-panel-backgrounds dark:text-white">
                          {item.date.iso}
                        </th>
                      </tr>
                      <tr className="flex justify-center items-center border-2">
                        <td className="py-1 px-2">{item.name}</td>
                        <td className="border-l-2 pl-2">
                          {item.states !== "All"
                            ? item.states?.map((stat) => {
                                return <>{stat.name},</>;
                              })
                            : "Alle Länder"}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uberblick;
