"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Material extends Model {
  stock() {
    return this.hasOne("App/Models/Stock");
  }
}

module.exports = Material;
