"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");
const Supplier = use("App/Models/Supplier");
const Address = use("App/Models/Address");

/**
 * Resourceful controller for interacting with suppliers
 */
class SupplierController {
  /**
   * Show a list of all suppliers.
   * GET suppliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const suppliers = await Supplier.query().with("address").fetch();
    return suppliers;
  }

  /**
   * Create/save a new supplier.
   * POST suppliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction();
    const { address, ...data } = request.only([
      "slug",
      "social_name",
      "document",
      "address",
    ]);

    if (!address) {
      return response.status(400).send({ message: "Address is required" });
    }

    const addressCreated = await Address.create(address, trx);
    const supplier = await Supplier.create(
      { ...data, address_id: addressCreated.id },
      trx
    );

    await trx.commit();

    supplier.address = await supplier.address().fetch();
    return supplier;
  }

  /**
   * Display a single supplier.
   * GET suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing supplier.
   * GET suppliers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update supplier details.
   * PUT or PATCH suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a supplier with id.
   * DELETE suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SupplierController;
