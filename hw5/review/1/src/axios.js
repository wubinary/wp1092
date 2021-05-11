import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
    try {
        const {
          data: { msg }
        } = await instance.post('/start')
      
        return msg
    } catch(error) {
        const msg = 'Cannot connect to the server, please check your connection or try later';
        return msg;
    }
}

const guess = async (number) => {
    // TODO: Change this to catch error
    // The error message should be: Error: "xx" is not a valid number (1 - 100)
    // console.log('inside guess', number);
    try{
        const {
            data: { msg }
        } = await instance.get('/guess', { params: { number } })
        return msg;
    } catch(error) {
        var msg;
        if(error.response && error.response.status === 400) {
            msg = `Error: "${number}" is not a valid number (1 - 100)`;
        }
        else {
            msg = 'Cannot connect to the server, please check your connection or try later';
        }
        return msg;
    }
    // console.log('finish guess', msg);
}

const restart = async () => {
    // console.log('inside restart');
    try {
        const {
            data: { msg }
        } = await instance.post('/restart')
        return msg
    } catch(error) {
        const msg = 'Cannot connect to the server, please check your connection or try later';
        return msg;
    }
}

export { startGame, guess, restart }
