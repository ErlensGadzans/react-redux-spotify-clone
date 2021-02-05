import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron,Button,Row,Col,Container,Image} from "react-bootstrap";
import {FaPlayCircle } from 'react-icons/fa';
import {AiOutlineHeart } from 'react-icons/ai';
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
  
  const mapDispatchToProps = (dispatch) => ({
    setLocation: (location) =>
    // fetch the data
    dispatch(
      {
        type: "SET_LOCATION",
        payload: location,
      }
    ),
    setPosition: (position) =>
    // fetch the data
    dispatch(
      {
        type: "SET_POSITION",
        payload: position,
      }
    ),
    fetchTrackswithThunk: (id) =>
    dispatch(async (dispatch) => {
      
        const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
        const response = await fetch(url + id +"/top?limit=50", {
          headers: {
            "x-rapidapi-key":
              "7058b459femsh8bbc3e5e09ff45bp16ae10jsnaa8151340a4c",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        });
       
        const tracks = await response.json();
        console.log("tracks:",tracks.data);
         
      if (response.ok) {
        
        dispatch({
          type: "SET_TOP_ALBUMS",
          payload: tracks.data,
        })
      } else {
        dispatch(
          {
            type: "SET_ERROR",
            payload:  tracks.data,
          }
        )
      }
    }),

 fetchArtistwithThunk: (id) =>
      dispatch(async (dispatch) => {
        
        const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
        const response = await fetch(url + id, {
          headers: {
            "x-rapidapi-key":
              "7058b459femsh8bbc3e5e09ff45bp16ae10jsnaa8151340a4c",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        });

        const artist = await response.json();
        console.log(artist);
           
        if (response.ok) {
          
          dispatch({
            type: "SET_ARTIST",
            payload: artist,
          })
        } else {
          dispatch(
            {
              type: "SET_ERROR",
              payload: artist,
            }
          )
        }
      })
  });


class artistPage extends React.Component {
  state = {
 
    loading: true,
  };



  fetchTracks = async (id) => {
    try {
        
      const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
      const resp = await fetch(url + id +"/top?limit=50", {
        headers: {
          "x-rapidapi-key":
            "7058b459femsh8bbc3e5e09ff45bp16ae10jsnaa8151340a4c",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      console.log(resp);
      const respObj = await resp.json();
      console.log("tracks:",respObj.data);
      this.setState({
        tracks:respObj.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
      console.log("Im from artist")
    this.props.fetchArtistwithThunk(this.props.match.params.id);
    this.props.fetchTrackswithThunk(this.props.match.params.id)
  }
  render() {
      console.log(this.props.ui.tracks)
    
    const { artist,tracks} = this.props.ui;
   

    return (

      <>


<div className="mb-5" style={{ marginLeft: "20%" }}>
<div className="min-vw-100 vh-10" style={{ left:"0px", height:"10%" }}>
<img
              style={{ objectFit:"cover"}}
              src={artist.picture_medium}
              alt=""
  />
  
  
  <h1 style={{ fontSize:"75px",color: "white", marginBottom: "30px" }}> {artist.name}</h1>
  <FaPlayCircle style={{color:"green",fontSize:"40px"}} />
  <AiOutlineHeart style={{color:"white",fontSize:"40px"}}/>
 


<Row className="mt-5 mb-5">
<Col md={7}  >

<div className="tracklist pr-3 p-1 ">
<h5 style={{ color: "white", marginBottom: 30 }}>
               Popular 
              </h5>

{tracks.slice(0,10).map((track) => (


<div className="d-flex track"  >
<Image
          className="artist-song-cover"
          src={track.album.cover_small}
          alt=""
        />



<p className="ml-2">{track.title_short}</p>
<p className="subtitle ml-2">{track.rank}</p>
<div className=" ml-auto">
<p className="align-self-start fas fa-music d-inline "><AiOutlineHeart style={{color:"gray",fontSize:"16px"}} /></p>
<p className="d-inline subtitle ml-3">{track.duration}</p>
</div>
</div>
))}

</div>
</Col>
<Col md={5}>


<h5 style={{ color: "white", marginBottom: 30 }}>Artist's Selection</h5>
<div className="d-flex">

<Image
          className="artist-song-cover d-inline"
          src={artist.picture_small}
          alt=""
        />

<div className=" ml-5 d-inline">
<p className="text-white">Album</p>
<p className=" subtitle ">Playlist</p>
</div>
</div>

</Col>
</Row>

  

        </div>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(artistPage);
