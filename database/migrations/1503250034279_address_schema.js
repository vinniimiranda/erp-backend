"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table.string("cep", 8).notNullable();
      table.string("state", 2).notNullable();
      table.string("city", 50).notNullable();
      table.string("street", 50).notNullable();
      table.string("number", 10).notNullable();
      table.string("neighborhood", 50).notNullable();
      table.string("complement", 50);
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
