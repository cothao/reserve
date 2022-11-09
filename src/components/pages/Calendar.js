import { Checkbox, Cascader, SelectPicker } from 'rsuite';
import './style.css'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import DatePicker from "react-datepicker";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, doc, getDoc, setDoc, serverTimestamp} from "./firebase";
import { snapshot, onSnapshot, collection, query } from "firebase/firestore";
import img5 from '../../assets/floor_plan_1A.png';
import img6 from '../../assets/floor_plan_1B.png';
import img7 from '../../assets/Hotel_Waukesha.png';
import "./Calendar.css";
import userObject from "./Login";
  
function Cascade() {
  
  // Sample Options
  const options = [
    {"label": "Waukesha Campus","value": 2},
    {"label": "Research Park","value": 3,"children":
    [{"label": "Wing 1A","value": 4},
    {"label": "Wing 1B","value": 5},]},
  ]
  return (
    <div style={{display: 'block', width: 600, paddingLeft: 30}}>
      <Cascader
        style={{ width: 300,display:'block' }}
        placeholder="Select your Nearest Office"
        data={options}
      />
    </div>
  );
}
  
function Desks() {
  
  // Sample data 
  const Waukesha = [{
    "label": "Cubicle 1",
    "value": "1",
    "role": "Master",
  },
  {
    "label": "Cubicle ",
    "value": "2",
    "role": "Master"
  },
  {
    "label": "Cubicle 3",
    "value": "3",
    "role": "Master"
  },
  {
    "label": "Cubicle 4",
    "value": "4",
    "role": "Master"
  },
  {
    "label": "Cubicle 5",
    "value": "5",
    "role": "Master"
  },
  {
    "label": "Cubicle 6",
    "value": "6",
    "role": "Master"
  },
  {
    "label": "Cubicle 7",
    "value": "7",
    "role": "Master"
  }]
  const Research1a = [{
    "label": "Cubicle 1",
    "value": "1",
    "role": "Master",
  },
  {
    "label": "Cubicle ",
    "value": "2",
    "role": "Master"
  },
  {
    "label": "Cubicle 3",
    "value": "3",
    "role": "Master"
  },
  {
    "label": "Cubicle 4",
    "value": "4",
    "role": "Master"
  },
  {
    "label": "Cubicle 5",
    "value": "5",
    "role": "Master"
  },
  {
    "label": "Cubicle 6",
    "value": "6",
    "role": "Master"
  },
  {
    "label": "Cubicle 7",
    "value": "7",
    "role": "Master"
  }]
  const Research1b = [{
    "label": "Cubicle 1",
    "value": "1",
    "role": "Master",
  },
  {
    "label": "Cubicle ",
    "value": "2",
    "role": "Master"
  },
  {
    "label": "Cubicle 3",
    "value": "3",
    "role": "Master"
  },
  {
    "label": "Cubicle 4",
    "value": "4",
    "role": "Master"
  },
  {
    "label": "Cubicle 5",
    "value": "5",
    "role": "Master"
  },
  {
    "label": "Cubicle 6",
    "value": "6",
    "role": "Master"
  },
  {
    "label": "Cubicle 7",
    "value": "7",
    "role": "Master"
  }]
  return (
    <div style={{
      display: 'block', width: 600, paddingLeft: 30
    }}>
      <h4>Select Cubicle:</h4>
      <SelectPicker placeholder="Please Select Cubicle" data={Waukesha} />
    </div>
  );
}

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const events = [
  {
    email: 'gborden@icstars.org',
    password: '************',
    timestamp: '22-11-10',
    title: 'Crunch Time!',
    location: 'Waukesha',
    session: 'Morning',
    start: '2022-11-15',
    end: '2022-11-17',
    confirmed: true
  },{
    userObject
  }
];

function Cal() {
  const [user] = useAuthState(auth);
  const [newEvent, setNewEvent] = useState({userObject});
  const [allEvents, setAllEvents] = useState(events);
  
  const [imageClicked, setImageClicked] = useState({
    first: false,
    second: false,
    ground: false,
  });
  const onClickHandler = (order) => {
      const resetImages = {
        first: false,
        second: false,
        ground: false
      }
      setImageClicked({
        ...resetImages,
        [order]: true
      });
    };

  function handleAddEvent() {
      
    for (let i=0; i<allEvents.length; i++){
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if (
      ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
        (d4 <= d3) )
      )
      {   
        alert("OVERLAP CLASH"); 
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
    //Please be careful setting events as they cannot be deleted in app yet.
    setDoc(doc(db, "users", `${user.email}`), {
      timeStamp: serverTimestamp(),
      name: `${newEvent.title}`,
      start: `${newEvent.start}`,
      end: `${newEvent.end}`,
      time: `${newEvent.time}`,
      location: "Null",
      //is there a way to use the current userObject and update?
    });
    //[0,1,2,3,4] for 5 events?
    events[0] = newEvent;
  }

  return(
    <section className="Calendar">
      <div id="text-left">
        <h1>Calendar</h1>
        <h2>Add New Event:</h2>
        {/* These Lines Below are where the content gets placed and created on the page. */}
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
          <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
          <Checkbox value="6:00AM-12:00PM" onChange={(time) => setNewEvent({...newEvent, time})}>Morning</Checkbox>
          <Checkbox value="12:00PM-6:00PM" onChange={(time) => setNewEvent({...newEvent, time})}>Afternoon</Checkbox>
          <div>
            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
          {/* I think this controls the content getting displayed to the calendar after all values entered. */}
      <Calendar localizer={localizer} events={this.userObject} startAccessor="start" endAccessor="end" style={{ height: "700px", width: "700px", color: "Black", backgroundColor: "white" }} />
      </div>
      <div id="text-right">
        <h2>Cubicle Locations</h2>
        <div className="Container">
          <h3>Please Select A Location:</h3>  
          <button onClick={() => onClickHandler("first")} className="ground">
            Research Park Floor 1A
          </button>
          <button onClick={() => onClickHandler("second")} className="ground">
            Research Park Floor 1B
          </button>
          <button onClick={() => onClickHandler("third")} className="ground">
            Waukesha
          </button>
          <h3>Locations:</h3>
          <div className='selector'>
            
      <Cascade className='tree'></Cascade>
      <Desks className='tree'></Desks>
    </div>
          <div className="image">
            {imageClicked.first && <img src={img5} alt="first" />}
            {imageClicked.second && <img src={img6} alt="second" />}
            {imageClicked.third && <img src={img7} alt="third" />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cal;