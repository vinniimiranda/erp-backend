"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Address extends Model {
  supplier() {
    return this.hasMany("App/Models/Supplier");
  }
  customer() {
    return this.hasMany("App/Models/Customer");
  }
}

module.exports = Address;
