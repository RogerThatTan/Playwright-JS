Feature: Ecommerece validations

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerece2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username                        | password     |
    | universuswebtech@gmail.com      | Iamking@000  |
    | hello@123.com                   | Iamhello@000 |


#Paramerettization,parallel,html,rerun failed tests
# Scenario Outline -> anotates different datasets