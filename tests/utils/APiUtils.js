class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayLoad,
      },
    );
    const loginResponseJson = await loginResponse.json();
    // we need to parse it to extract the token
    token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json',
        },
      },
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponse);
    const orderId = orderResponseJson.orders[0];
    return orderId;
  }
}

module.exports = { APIUtils };
