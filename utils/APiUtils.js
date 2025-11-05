class APiUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
    this.cachedToken = null;
  }
  async getToken() {
    // Return cached token if available to avoid redundant API calls
    // Note: This simple cache doesn't handle token expiration.
    // For production use, consider implementing token TTL checking.
    if (this.cachedToken) {
      return this.cachedToken;
    }
    
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayLoad,
      },
    );
    const loginResponseJson = await loginResponse.json();
    // we need to parse it to extract the token
    const token = loginResponseJson.token;
    console.log(token);
    this.cachedToken = token;
    return token;
  }

  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      },
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponse);
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { APiUtils };
