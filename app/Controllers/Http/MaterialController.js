"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");
const Material = use("App/Models/Material");
const Stock = use("App/Models/Stock");

/**
 * Resourceful controller for interacting with materials
 */
class MaterialController {
  /**
   * Show a list of all materials.
   * GET materials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const materials = await Material.query().with("stock").fetch();
    return materials;
  }

  /**
   * Create/save a new material.
   * POST materials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction();
    const { ...data } = request.only(["slug", "name", "description"]);
    const material = await Material.create(data, trx);

    await Stock.create(
      {
        material_id: material.id,
        quantity: 0,
      },
      trx
    );

    await trx.commit();

    material.stock = await material.stock().fetch();

    return material;
  }

  /**
   * Display a single material.
   * GET materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const material = await Material.findOrFail(params.id);

    await material.load("stock");
    return material;
  }

  /**
   * Render a form to update an existing material.
   * GET materials/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update material details.
   * PUT or PATCH materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a material with id.
   * DELETE materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = MaterialController;
