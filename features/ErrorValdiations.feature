Feature: Ecommerece validations

  @Validation
  Scenario: Placing the Order
    Given a login to Ecommerece2 application with "universuswebtech@gmail.com" and "Iamking@000"
    Then Verify Error message is displayed
