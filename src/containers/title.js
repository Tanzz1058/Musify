import React from 'react';
import styles from './title.module.css';

const title = () =>(
    <div className = {styles.Title}>
      <h1>Musify</h1>
      <img src="https://image.flaticon.com/icons/svg/3169/3169983.svg" 
      alt = "musifyIcon"></img>
    </div>
)

export default title;