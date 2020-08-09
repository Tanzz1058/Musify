import React from 'react';
import styles from './List.module.css';

class List extends React.Component{
 //time =  Math.floor(this.props.src.duration()/60)+':'+(Math.floor(this.props.src.duration())%60).toFixed(0)
 getduration = (item) =>(
    Math.floor(item.duration()/60)+':'+(Math.floor(item.duration())%60).toFixed(0)
 )
    render(){
          return(
            <div className = {styles.song} onClick= {this.props.clicked}>
                <img src = {this.props.imgUrl} alt={this.props.title}/>
                <div className = {styles.songData}>
                    <h3>{this.props.title}</h3>
                    <span>{this.props.name}</span>
            </div>
        <span style={{
    'textAlign':'right'}}>{this.getduration(this.props.src)}</span>
                </div>
        )
    }
   
}

export default List;