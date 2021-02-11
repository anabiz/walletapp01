export type userType = {
    name: string,
    email: string,
    password: string,
    user_type: string,
    main_currency: string
}

export type accountTypeEntity = {
    currency_id: string,
    amount: number,
    user_id: string,
    is_main: boolean
}

export type fundAccountTypeDto = {
    currency: string,
    amount: number,
    transaction_type: string,
}

export type adminFundAccountTypeDto = {
    currency: string,
    amount: number,
}

export type fundAccountTypeEntity = {
    main_currency: string,
    input_currency: string,
    amount: number,
    user_id: string,
}

export type transactionType = {
    transaction_type: string,
    currency_id: string,
    amount: number,
    user_id: string,
}
