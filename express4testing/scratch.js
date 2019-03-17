const axios = require('axios');

(async () => {
  const resp = await axios.put('http://localhost:3001/food/4/flavors/3');
  console.log(resp.data)
  process.exit();
})();
