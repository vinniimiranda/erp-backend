"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BuyOrderSchema extends Schema {
  up() {
    this.create("buy_orders", (table) => {
      table.increments();
      table
        .integer("supplier_id")
        .unsigned()
        .references("id")
        .inTable("suppliers")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("material_id")
        .unsigned()
        .references("id")
        .inTable("materials")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.float("price").notNullable();
      table.float("weight").notNullable();
      table.float("quantity").notNullable();
      table.datetime("delivery").notNullable();
      table.boolean("delivery_status").defaultTo(false);
      table.boolean("status").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("buy_orders");
  }
}

module.exports = BuyOrderSchema;
