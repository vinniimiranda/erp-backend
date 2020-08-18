"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store");

Route.post("/auth", "AuthController.store");

Route.resource("/users", "UserController").apiOnly().except(["store"]);
// .middleware(["auth", "is:administrator"]);

Route.resource("permissions", "PermissionController")
  .apiOnly()
  .middleware("auth");

Route.resource("roles", "RoleController").apiOnly().middleware("auth");

Route.resource("materials", "MaterialController").apiOnly().middleware("auth");
Route.resource("suppliers", "SupplierController").apiOnly().middleware("auth");
Route.resource("customers", "CustomerController").apiOnly().middleware("auth");
