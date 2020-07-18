<h3 align="center">
  Challenge 06: Database and upload files with NodeJS
</h3>

## :rocket: Sobre o desafio

This challenge will be applied to the Transaction Management API.

**Techs:**
- Back-end (NodeJS, Express)
- Database (Docker, PostgreSQL, TypeORM)
- Sending files (Multer)

> OBS: you need to run the command `yarn` to install all dependecies and you need to create a database with name "gostack_desafio06"

This application must store incoming and outgoing financial transactions and allow to register and list these transactions,

### Application routes

- **`GET /transactions`**: This route must return a list with all transactions that you registred so far, along with the sum of the entries, withdrawls and total credit. This route must return a object with the following format:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salary",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Payment",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Gamer Chair",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`POST /transactions`**: The route must receive `title`, `value`, `type`, and `category` within the request body, being the `type` the type of transaction, that must be `income` for entries (deposits) and `outcome` for exits (withdrawls). When registering a new transaction, it must be stored inside your database, owining the fields `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

**Dica**: For a category, your must create a new table, that will have the fields `id`, `title`, `created_at`, `updated_at`.

**Dica 2**: Before creating a new category, always check if there is a category with the same title. If it exists, you must use the existing `id` in the database.

```json
{
  "id": "uuid",
  "title": "Salary",
  "value": 3000,
  "type": "income",
  "category": "Food"
}
```

**OBS**: Inside balance, the income filed is the sum of the all transaction values with `type` income. The outcome is the sum of all transaction values with `type` outcome, and the total is the value of `income - outcome`.

- **`DELETE /transactions/:id`**: The route must delete a transaction with the `id` present in the route parameters;

* **`POST /transactions/import`**: The route must allow the import importação of a file with formt `.csv` containing the same informations needed to create of a transaction `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, where each row of CSV file must be a new record for the database, and finally return all `transactions` that have been imported into your database. The CSV file, must follow the following [model](./assets/file.csv)

### Test especification

For this challenge, we have the following tests:

<h4 align="center">
  ⚠️ Before running the tests, create a database with the name "gostack_desafio06_tests" so that all tests can run correctly ⚠️
</h4>

- **`should be able to create a new transaction`**: For this test to pass, your application must allow a transaction to be created, and return a json with the created transaction.

* **`should create tags when inserting new transactions`**: For this test to pass, your application must be allow that when creating a new transaction with a category that does not exist, let this be created and inserted in the category_id field of the transaction with the `id` that was just created.

- **`should not create tags when they already exists`**: For this test to pass, your application must be allow that when created a new transaction with a category that already exists, be assigned to the category_id field of hte transaction with the `id` that existing category, not allowing creation of categories with the same `title`.

* **`should be able to list the transactions`**: For this test to pass, your application must be allow an array of objects to be returned containing all transactions together the balance of income, outcome and total transactions that were created so far.

- **`should not be able to create outcome transaction without a valid balance`**: For this test pass, your application must be allow an `outcome` type transaction to extrapolate the total the user has in cash (total income), returned a answer with HTTP 400 code and an error message in the following format: `{ error: string }`.

* **`should be able to delete a transaction`**: For this test to pass, you must allow your DELETE route to delete a transaction, and when doing the exclusion, it return a empty answer with 204 status.

- **`should be able to import transactions`**: For this test to pass, your application must allow a CSV file to be imported, containing the following [model](./assets/file.csv). With the imported file, you must allow to create in the database all records and categories that were present in this file, and to return all transactions that have been imported.

---

Done by Neylanio :wave:
