import React, {Component} from 'react';
import styles from './search.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import _debounce from 'lodash.debounce';

class search extends Component{
search =  (event) =>{
         event.persist();
         if(!this.func)
        {this.func =  _debounce(()=>{
             let val = event.target.value;
             this.props.inputChange(val)
         },500);}
         this.func();
      }

    render(){
        return(
            <div className = {styles.search}>
                <input type = "text" placeholder = "Artists, Songs, Albums"
                onInput = {this.search}
            />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        inputChange: (value) => dispatch(actions.fetchData(value))
    }
}

export default connect(null,mapDispatchToProps)(search);