const assert = require('assert');
const { When, Then, Given } = require('@cucumber/cucumber');
const { Greeter } = require('../../src');

Given(
  'a login to Ecommerece application with {username} and {password}',
  function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  },
);

When('Add {string} to Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify {string} is displayed in the Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Enter valid details and Place the Order', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify the order is present in the OrderHistory', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
