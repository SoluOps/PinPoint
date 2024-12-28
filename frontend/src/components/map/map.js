import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import logo from './PinPoints_logo.png';
import markerLogo from './markerLogo.png';
import axios from 'axios';
import {format} from 'timeago.js'; 

const styles = {
  container: {
    display: 'flex', // Enables flexbox
    alignItems: 'center', // Vertically centers the items
  },
  logo: {
      position: 'absolute', // Allows free positioning
      top: '1px', // Puts it near the top of the page
      left: '43%', // Centers it horizontally
      width: '213px', // Adjust size as needed
      height: 'auto',
      zIndex: 2000, // Keeps it above the map
  },
};



const Map = ({ user }) => {
    const mapContainer = useRef(null); // Reference for the map container
    const mapInstance = useRef(null); // Reference to store the map instance
    maptilersdk.config.apiKey = process.env.REACT_APP_MAP_API_KEY;

    
    // variable check
    const [points,setPoints] = useState(null);
    const [newLocation, setLocation] = useState(null);
    const [title, setTitle] = useState(null);
    const [pointDesc, setPointDesc] = useState(null);
    const [submitFlag, setSubmitFlag] = useState(false);

    // get all pins 
    useEffect(() => {
      const getPoints = async () => {
        try {
          const res = await axios.get("/points");
          setPoints(res.data);
        } catch (error) {
          console.log(error)   
        }
      }
      getPoints();
    },[]);

    


    // renders map
    useEffect (() => {
      if (mapInstance.current) return; // only one intialisation
      
      mapInstance.current = new maptilersdk.Map({
        container: mapContainer.current, // ID or ref to the container div
        style: maptilersdk.MapStyle.BASIC, // Map style
        center: [-43,71], // Longitude, Latitude
        zoom: 3,

    
    });
    }, []);

    
    // iterate prints of all pins
    points && points.forEach(p => {

        // Create the element for the marker
        const el = document.createElement('div'); 
        el.style.backgroundImage = `url(${markerLogo})`; // Set the image as a background
        el.style.backgroundSize = 'contain'; // Ensure the image fits the element
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = 'center';
        el.style.width = '50px'; // Explicit width
        el.style.height = '50px'; // Explicit height
      
        // Create a new marker
        const marker = new maptilersdk.Marker({ element: el })
          .setLngLat([p.x,p.y]); // Set marker's position


        // Create popup content
        const popupHTML = `
          <label>Title:</label>
          <div style="font-size: 16px; font-weight: bold; margin: 20px; text-align: center">${p.title}</div>
          <label>Point:</label>
          <p style="font-size: 15px; margin-bottom: 10px; margin-top: 10px">${p.point}</p>
          <div style="font-size: 13px; margin-top: 20px">Point by: <b>${p.username}</b></div>
          <div style="font-size: 11px; margin-bottom: 5px">${format(p.createdAt)}</div>
        `;


        // Create and set the popup
        const popup = new maptilersdk.Popup();
        popup.setHTML(popupHTML);
        marker.setPopup(popup); // Attach the popup to the marker
      

        // Add the marker to the map
        marker.addTo(mapInstance.current)
    });

    // handles submit to post request user data 



    // live HTML that actually allows js
    const container = document.createElement('div');
    const form = document.createElement('form');

    const titleLabel = document.createElement('label');
    titleLabel.innerText = "Title:";

    const titleInput = document.createElement('input');
    titleInput.style = "border: none; font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 20px; text-align: center";
    titleInput.placeholder = "Enter a title...";
    titleInput.onchange = (e) => setTitle(e.target.value);
    

    const pointLabel = document.createElement('label');
    pointLabel.innerHTML = "Point:";

    const pointText = document.createElement('textarea');
    pointText.style = "border: none; width: 99%; font-size: 15px; margin: 20px; margin-left: 0";
    pointText.placeholder = "Express a Point!";
    pointText.onchange = (e) => setPointDesc(e.target.value);


    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.innerHTML = "ADD POINT";
    submitButton.style = "background-color: #5e17eb; width: 100%; margin-bottom: 5px"

    form.onsubmit = (e) => {setSubmitFlag(true); e.preventDefault()}
    


    // packaging the html tag into their level of indentation
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(pointLabel);
    form.appendChild(pointText);
    form.appendChild(submitButton);

    container.appendChild(form);

    // click to add points info
    // condition && action => like if statment 
    const inputPopup = new maptilersdk.Popup().setDOMContent(container);
    const inputToMap = () => inputPopup.setLngLat(newLocation).addTo(mapInstance.current);

    // add input popup form
    useEffect(() => { // infinite dblclick event listener
      const handleDblClick = (event) => {
        setLocation(event.lngLat)
        console.log(newLocation)
        newLocation && inputToMap();
      };

      if (user) {
        mapInstance.current.on('dblclick', handleDblClick);
      }

      return () => {
        mapInstance.current.off('dblclick', handleDblClick);
        console.log("dblclick listener removed");
      };

    },[newLocation, user]);


    useEffect(() => {
      const postData = async () => {
        const xPoint = newLocation.lng;
        const yPoint = newLocation.lat;

        const newPoint = {
          username: user,
          title: title,
          point: pointDesc,
          x: xPoint,
          y: yPoint,
        };

        setPoints([...points,newPoint]);

        inputPopup.remove();

        try{
          const req = await axios.post("/points", newPoint);
          inputPopup.remove()

        }catch(error){
          console.log(error)
        }
      };

      submitFlag && postData();
    }, [submitFlag]);

    // views map in html
    return (
      <div ref={mapContainer} style={{ height: '100vh', width: '100%'}}>
          <div style={styles.container}>
              <img src={logo} alt="logo" style={styles.logo} />
          </div>
      </div>
  );
};


export default Map; 




