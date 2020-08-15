<<<<<<< HEAD
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

# holders

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /holders | `GET` | Empty | List all holders. |
| /holders | `POST` | { name: 'foo', filial:'bar', bio:'lorem ipsum' } | Create a new holder. |
| /holders/:holders_id | `GET` | Empty | Get a holder. |
| /holders/:holders_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a holder with new info. |
| /holders/:holders_id | `DELETE` | Empty | Delete a bank. |
| /holders/:holders_id/best10card | `GET` | Empty | The holder's top 10 cards. |

=======
# cardAPI
Bu bizning Birinchi Projectimiz
