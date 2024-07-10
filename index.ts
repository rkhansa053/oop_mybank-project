#! /usr/bin/env node


import inquirer from "inquirer"

// Bank Account Interface

interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account class

class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber
        this.balance = balance
    }

// Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $ ${amount} successful. Remaining balance: $ ${this.balance}`);
    }else {
        console.log("Insufficient Balance");
    }
}    

// Credit Money

deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // 1$ fee charged if more than 100$ is deposited
    }this.balance += amount;
    console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance} `);
}

// Check Balance

checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}

// Customer class

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age:number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}


// Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),
]

// Create customers

const customers: Customer[] = [
    new Customer ("Khansa", "Rahman", "Female", 24, 3162223334, accounts[0]),
    new Customer ("Sameer", "Khan", "Male", 27, 3332223334, accounts[1]),
    new Customer ("Laiba", "Khan", "Female", 28, 3412223334, accounts[2])
]

// Function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "name",
            type: "number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.name)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: [
                {value: "Deposit"},
                {value: "Withdraw"},
                {value: "Check Balance"},
                {value: "Exit"}
                ]
                           
            }]);

            switch(ans.select){
                case "Deposit":
                    const depositAmmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit"
                    })
                    customer.account.deposit(depositAmmount.amount)
                    break;
                case "Withdraw":
                    const withdrawAmmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit"
                    })
                    customer.account.withdraw(withdrawAmmount.amount)
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program....");
                    console.log("\nThank you for using our services. Have a great day!");
                    return; 
            }
        }else {
            console.log("Invalid account number");
        }
    } while(true)

}
service();

 