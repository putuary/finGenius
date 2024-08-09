package com.spring.starter.utils.constant;

public enum EType {
    INCOME("Income"),
    EXPENSE("Expense");

    private final String value;

    EType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.value;
    }
}

