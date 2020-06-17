import Mali from 'mali'

class App {
  constructor(protoPath, serviceName, config) {
    this.DB_URI = config.DB_URI;
    this.PORT = config.server.PORT;
    this.API_KEY = config.server.API_KEY;
    this.server = new Mali(protoPath, serviceName);
  }

  initServices(services) {
    this.server.use(services);
  }

  initMiddleware(middleware) {
    this.server.use(middleware);
  }

  async start(credentials) {
    if (!credentials) {
      this.server.start(`0.0.0.0:${this.PORT}`)
    } else {
      this.server.start(`0.0.0.0:${this.PORT}`, credentials)
    }
    console.log(`Server listening on port: ${this.PORT}`)
  }

}

export default App;