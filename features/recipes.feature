Feature: Recipes management
  Scenario: List Recipes
    When I list all "recipes"
    Then I should have response "OK"
     And following "recipes" data:
       |                                   id |                name | ingredients                                | procedure                                                               |
       | a35ce12d-d52b-4a07-90ad-68e985b779e7 | Chausson aux pommes | pommes, pate feuilletée, sucre             | faire compote, former chausson, cuire                                   |
       | dc466424-4297-481a-a8de-aa0898852da1 | Quiche thon tomate  | thon, tomate, pate feuilletée, oeuf, creme | couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire |

  Scenario: Create a recipe
    When I create the following "recipe"
       |              name | ingredients                                  | procedure                                                                    |
       | Gratin dauphinois | pomme de terre, lait, beurre, fromage, creme | couper pommes de terre, les bouillir dans lait, cuire dans plat avec fromage |
    Then I should have response "CREATED"
     And following new "recipe" item:
       |              name | ingredients                                  | procedure                                                                    |
       | Gratin dauphinois | pomme de terre, lait, beurre, fromage, creme | couper pommes de terre, les bouillir dans lait, cuire dans plat avec fromage |

  Scenario: Update a recipe
    When I update the following "recipe" with id "a35ce12d-d52b-4a07-90ad-68e985b779e7" with following item
      |                name | ingredients                                | procedure                                                               |
      | Chausson aux pommes | pommes, pate feuilletée, sucre, cannelle             | faire compote, former chausson, cuire                                   |
    Then I should have response "OK"
      And following updated "recipe" item:
        |                                   id |                name | ingredients                                | procedure                                                               |
        | a35ce12d-d52b-4a07-90ad-68e985b779e7 | Chausson aux pommes | pommes, pate feuilletée, sucre, cannelle             | faire compote, former chausson, cuire                                   |

  Scenario: Delete a recipe
    When I delete the following "recipe" with id "dc466424-4297-481a-a8de-aa0898852da1"
    Then I should have response "OK"