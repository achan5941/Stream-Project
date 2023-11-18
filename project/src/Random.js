import React, { useEffect } from 'react'
import axios from 'axios'

function Random() {
    let token = "hu";
  useEffect(() => {
    const fetchData = async () => {
      await axios.post('https://id.twitch.tv/oauth2/token?client_id=698phvkaifacd4qpxn386yhtsqcn51&client_secret=mzke1uigdnks6797x9t2och3si69f6&grant_type=client_credentials')
      .then(response => console.log(response.data))
    }
    console.log(token)
    fetchData()
  })
}

export default Random