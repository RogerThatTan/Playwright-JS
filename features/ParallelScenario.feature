Feature: Ecommerece validations

  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerece application with "universuswebtech@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify the order is present in the OrderHistory

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerece2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username                        | password     |
    | universuswebtech@gmail.com      | Iamking@000  |
    | hello@123.com                   | Iamhello@000 |


#npx cucumber-js features/ParallelScenario.feature --parallel 2 --exit 
#npx cucumber-js features/ParallelScenario.feature --parallel 2 --exit --format html:cucumber-report.html
#npx cucumber-js features/ParallelScenario.feature --parallel 2 --exit --format html:cucumber-report.html 