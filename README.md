# postgres-driver
pg-promise sugar using proper types for easy (async) crud-commands. Add custom methods.

[![Build Status](https://travis-ci.org/jakoblorz/postgres-driver.svg?branch=remove-custom-select)](https://travis-ci.org/jakoblorz/postgres-driver)

## Installation
this module is not listed on npm though it can be installed using it:
```shell
npm install git+https://github.com/jakoblorz/postgres-driver.git --save
```

## Usage
To use the methods, just create a new set class which is extending
the exported database class:
```typescript

// import the module
import { Database } from "postgres-driver";

// define a table definition (this is a
// IAccount interface where each key can be undefined)
interface IAccountTableDefinition {
    id?: string;
    name?: string;
    age?: number;
}

// actual account interface
interface IAccount extends IAccountTableDefinition {
    id: string;
    name: string;
    age: number;
}

// create a set class
class AccountSet extends Database<IAccountTableDefinition, IAccount> {
    constructor(){
        super("accounts", "postgres://user:password@host:port/database");
    }

    // define a custom method though this example
    // could be done using the createResource method
    public async createNewAccount(name: string) {

        // get the database interface - this is a pg-promise
        // database object
        const connection = await this.connect();

        // insert the dataset
        await connection.none(
            "INSERT INTO accounts (id, name, age) VALUES ($1, $2, $3)", [0, name, 18]);
    }
}

// use the class
const accounts = new AccountSet();

// invoke the read resource method
accounts.readResource({ id: 0 })
    .then((account) => console.log(account === null ? 
        "" : JSON.stringify(account))); // { id: 0, name: "name", age: 18 }

// invoke a custom method
accounts.createNewAccount("user")
    .then(() => accounts.readResource({ name: "user" }))
    .then((account) => console.log(account === null ?
        "" : JSON.stringify(account))) // { id: 0, name: "user", age: 18 }
    .catch(console.error);
```

## Documentation
| method | description |
| --- | --- |
| `async `**`readResource`**`<X, Y>()` | read a single tuple from the relation - returning null if no row was found |
| `async `**`readResourceList`**`<X, Y>()` | read multiple tuples from the relation |
| `async `**`createResource`**`<X>()`| insert a new tuple in the relation |
| `async `**`updateResource`**`<X, Y>()` | update one (multiple) tuple(s) in the relation |
| `async `**`deleteResource`**`<X>()`| remove one (multiple) tuple(s) |
| `async `**`connect()`** | obtain the pg-promise database interface with an established connection to execute custom queries |

### **readResource<X, Y>()**
- **`where`**: *`Y`* select the tuple to read

### **readResourceList<X, Y>()**
- **`where`**: *`Y`* select the tuples to read
- **`skip?`**: *`number`* specify a total of tuples that should be skipped before selection - NOTE: make use of the orderByAsc/orderByDsc arguments to give sense to the expression 'skip the first x tuples'
- **`limit?`**: *`number`* specify a maximum count of tuples in the selection
- **`orderByAsc?`**: *`(keyof X)[] | keyof X | ""`* specify columns that should be ordered in ascending order
- **`orderByDsc?`**: *`(keyof X)[] | keyof X | ""`* specify columns that should be ordered in descending order

### **createResource<X>()**
- **`tuple`**: *`X`* data to insert into the table

### **updateResource<X, Y>()**
- **`update`**: *`X`* specify the columns to manipulate
- **`where`**: *`Y`* select the tuples to update

### **deleteResource<X>()**
- **`where`**: *`Y`* select the tuples to delete