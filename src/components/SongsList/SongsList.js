import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import List from "../List/List";
import Spinner from "../../containers/Spinner/Spinner";
import styles from "./SongsList.module.css";
import back from "../images/bak.ico";
import next from "../images/next.ico";
import pause from "../images/pause.ico";
import play from "../images/play.ico";

let footer = null;
let progress = null;

class SongList extends Component {
  state = {
    playing: false,
    btnSrc: pause,
    clicked: false,
    song: null,
    index: null,
    width: 0
  };
  componentDidMount() {
    this.props.onFetchData();
  }

  playSong = (index) => {
    this.state.song ? this.state.song.src.stop() : console.log('null');
    if (index < 0 || index >= this.props.length) {
      this.setState((prevState) => {
        return {
          index: prevState.index,
        };
      });
    } else {
      this.setState(
        {
          playing: true,
          clicked: true,
          index: index,
          btnSrc: pause,
          song: this.props.data[index],
        },
        () => this.state.song.src.play(),
      );
      this.setState(
        {
          width: 0
        },
        () => this.update()
      )
    } 
  };

  buttonHandle = () => {
    this.setState((prevState) => {
      return {
        playing: !prevState.playing,
      };
    });
    if (this.state.playing) {
      this.setState({ btnSrc: play, playing: false });
      this.state.song.src.pause();
    } else {
      this.state.song.src.play();
      this.setState({ btnSrc: pause, playing: true });
    }
  };

  next = () => {
    this.playSong(this.state.index + 1);
    clearInterval(progress);
  };

  prev = () => {
    this.playSong(this.state.index - 1);
    clearInterval(progress)
  };

  progress =() =>{
      if (this.state.song.src.duration() === 0) 
      {
        this.setState({width: 0});
      };
      this.setState({width: 
      this.state.song.src.seek() / this.state.song.src.duration()*100});   
  };

  update = () =>{
 if(this.state.song !== null){
     progress = setInterval(() => {
        this.progress()
      }, 250);
}  
}

  render() {
    let list = (
      <div>
        <Spinner />
        <h2 style={{ color: "white" }}>Please Wait..</h2>
      </div>
    );
    if (this.props.err){
      list = (
        <p style={{ color: "white" }}>
          Sorry we couldn't process your request :(
        </p>
      );
    }
   
    if (!this.props.loading && !this.props.err) {
      list = this.props.data.map((song) => {
        return (
          <List
            clicked={() => this.playSong(this.props.data.indexOf(song))}
            key={song.id}
            title={song.title}
            imgUrl={song.imgUrl}
            name={song.name}
            src={song.src}
          />
        );
      });
    }
    if (this.state.clicked) {
      const song = this.state.song;
      footer = (
        <div className = {styles.footer}>
          <div className ={styles.progress}>
            <div className = {styles.progressBar} style={{'width': this.state.width+'%'}} >
            </div>
          </div>
          <div className={styles.player}>
            <img className={styles.image} src={song.imgUrl} alt={song.title} />
            <div className={styles.songData}>
              <h3>{song.title}</h3>
              <span>{song.name}</span>
            </div>
            <div className={styles.actions}>
              <img
                src={back}
                alt="back"
                onClick={() => this.playSong(this.state.index - 1)}
              />
              <img
                src={this.state.btnSrc}
                alt="pause"
                onClick={() => this.buttonHandle()}
              />
              <img
                src={next}
                alt="next"
                onClick={() => this.playSong(this.state.index + 1)}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.List}>{list}</div>
        {footer}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data.songs,
    loading: state.data.loading,
    err: state.data.err,
    length: state.data.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(actions.fetchData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
