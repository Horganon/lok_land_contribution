import axios from 'axios'

export default axios.create({
    baseURL: 'https://api-lok-live.leagueofkingdoms.com/api/',
    headers: {'Content-type': 'application/json'}
});