import axios from 'axios'

const options = {}

// The server-side needs a full url to work
options.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333/api'
    : 'http://vlhgislab.hevs.ch:8082/api'

export default axios.create(options)
