const checkToken = async (token) => {
    const response = await axios({
      method: 'get',
      url: 'https://hosnet.io/api/',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
  
    if (response.status === 200) {

      return true;

    } else if (response.status !== 200) {

      return false;

    }

  }