# cards

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /cards | `GET` | Empty | List all cards. |
| /cards/new | `POST` | {'title':'foo', 'category':'bar', 'country':'Uzbekistan', director:"id", year: "2020", type: "Gold" } | Create a new card. |
| /cards/:card_id | `GET` | Empty | Get a card by id. |
| /cards/:card_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a card with new info. |
| /cards/:card_id | `DELETE` | Empty | Delete a card. |
| /cards/topAmount10 | `GET` | Empty | Get the top 10 cards. |
| /cards/between/:start_year/:end_year | `GET` | Empty | cards between two dates. |

# Banks

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /banks | `GET` | Empty | List all directors. |
| /banks | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new bank. |
| /banks/:banks_id | `GET` | Empty | Get a bank. |
| /banks/:banks_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a bank with new info. |
| /banks/:banks_id | `DELETE` | Empty | Delete a bank. |
| /banks/:banks_id/best10card | `GET` | Empty | The bank's top 10 cards. |

