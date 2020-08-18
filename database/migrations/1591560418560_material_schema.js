"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MaterialSchema extends Schema {
  up() {
    this.create("materials", (table) => {
      table.increments();
      table.string("slug").notNullable().unique();
      table.string("name").notNullable();
      table.string("description");
      table.boolean("status").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("materials");
  }
}

module.exports = MaterialSchema;
