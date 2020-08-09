import { Howl } from "howler";

export const fetchStart = () => {
  return {
    type: "FETCH_START",
  };
};

export const fetchSuccess = (res, length) => {
  return {
    type: "FETCH_SUCCESS",
    res: res,
    len: length,
  };
};

export const fetchFail = () => {
  return {
    type: "FETCH_FAIL",
  };
};

export const fetchData = (value) => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
    })
      .then(res => {
        if(!res.ok){
          dispatch(fetchFail(res.statusText))
        }
        else return res.json();
      })
      .then(resData => {
        const songs = [];
        for (let key in resData.data) {
          var song = new Howl({
            src: [resData.data[key].preview]
          });
          songs.push({
            id: resData.data[key].id,
            title: resData.data[key].title_short,
            imgUrl: resData.data[key].album.cover_small,
            name: resData.data[key].artist.name,
            src: song,
          });
        }
        dispatch(fetchSuccess(songs, resData.data.length));
      })
      .catch(
        err =>  {
          dispatch(fetchFail())
        }
        );
  };
};
