What columns violate 1NF?

- member_id
- member_address
- dinner_date
- food code
- food description

What entities do you recognize that could be extracted?

- member
- address
- dinner
- venue
- food

Name all the tables and columns that would make a 3NF compliant solution.

- Table : member ---> columns : member_id, member_name, address_id
- Table : address --> columns : address_id, house_no, street
- Table : dinner ---> columns : dinner_id, venue_code, food_code
- Table : venue ---> columns : venue_code, venue_description
- Table : food ---> columns : food_code, food_description
- Table : member_dinner ---> columns : member_id, dinner_id, dinner_date
- Table : dinner_food ---> columns : dinner_id, food_code
