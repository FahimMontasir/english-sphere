class ProductDataSource {
  constructor(options) {
    // this.dbConnection = this.initializeDBConnection();
    this.token = options.token;
  }

  async initializeDBConnection() {
    // set up our database details, instantiate our connection,
    // and return that database connection
    // return dbConnection;
  }

  async getUser() {
    if (!this.user) {
      // store the user, lookup by token
      this.user = await this.dbConnection.User.findByToken(this.token);
    }
    return this.user;
  }

  async getReservation(reservationId) {
    const user = await this.getUser();
    if (user) {
      // return await this.dbConnection.Reservation.findByPk(reservationId);
    } else {
      // handle invalid user
    }
  }
}

module.exports = ProductDataSource;
