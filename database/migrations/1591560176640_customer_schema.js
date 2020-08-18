"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CustomerSchema extends Schema {
  up() {
    this.create("customers", (table) => {
      table.increments();
      table.string("document", 11).notNullable().unique();
      table.string("slug", 40).notNullable().unique();
      table.string("social_name", 40).notNullable().unique();
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.boolean("status").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("customers");
  }
}

module.exports = CustomerSchema;
