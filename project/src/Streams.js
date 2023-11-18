import React, { useEffect, useState } from "react";
import api from './api'


function Streams(){

    const [streams, setStreams] = useState([])

       useEffect(() => {
            const fetchData = async () => {
                try{
                const result = await api.get('https://api.twitch.tv/helix/streams')

                if (result.data && result.data.data && result.data.data[0]) {
                    console.log(result.data.data[0].thumbnail_url);
                    console.log(result.data.data[0].user_login);
                    console.log(result.data);

                    let dataArray = result.data.data;
                    let gameIDs = dataArray.map(stream => {
                        return stream.game_id;
                      });
                
                      let baseURL = "https://api.twitch.tv/helix/games?";
                      let temp = "";
                      gameIDs.map(id => {
                        return (temp = temp + `id=${id}&`);
                      });
                
                      let fixedURL = baseURL + temp;
                      let gameNames = await api.get(fixedURL);
                      let gameNameArray = gameNames.data.data;
                
                      let fixedArray = dataArray.map(stream => {
                        stream.gameName = "";
                        gameNameArray.map(name => {
                          if (stream.game_id === name.id) {
                            return (stream.gameName = name.name);
                          }
                        });
                
                        let newURL = stream.thumbnail_url
                          .replace("{width}", "364")
                          .replace("{height}", "216");
                        stream.thumbnail_url = newURL;
                        return stream;
                      });
                      setStreams(fixedArray);
                } else {
                    console.error("Unexpected API response structure:", result.data);
                }

                }catch (error) {
                    console.error("Error fetching data:", error);
                    
                }
            };
            fetchData();
       }, []);

    return (
        <div> 
            <div className="grid-container">
            {streams.map(stream => (
              
              <div class="grid-item">
              <img className="streamNail" alt="StreamBox" src={stream.thumbnail_url} />
              <div>{stream.user_name} Is Live With {stream.viewer_count} Viewers</div>
  
              <button>
                  <a href={"https://twitch.tv/" + stream.user_name}>
                    {stream.user_name}'s' Stream
                  </a>
                  </button>
             
              </div>
            ))}
            
            </div>
        </div>
    );
}

export default Streams