"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockSchema extends Schema {
  up() {
    this.create("stocks", (table) => {
      table.increments();
      table
        .integer("material_id")
        .unsigned()
        .references("id")
        .inTable("materials")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .unique();

      table.float("quantity").notNullable();
      table.boolean("status").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("stocks");
  }
}

module.exports = StockSchema;
