"use strict";
const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");

const jsonDbPath = __dirname + "/../data/propositions.json";

// Default pizza menu
const defaultStatus = ["submitted","accepted","refused","done"];
const defaultpropositions = [
  {
    id: 1,
    proposal: "Puis-je vous demander une solution de la fiche 05 du cours de Javascript ?",
    status: "submitted"
  },
  {
    id: 2,
    proposal: "Puis-je vous demander de rajouter du papier dans les toilettes du 1er étage du bâtiment B ?",
    status: "accepted"
  },
  {
    id: 3,
    proposal: "Puis-je vous demander un distributeur de friandises dans le foyer des étudiants ?",
    status: "refused"
  },
  {
    id: 4,
    proposal: "Puis-je vous demander d'augmenter la puissance du Wifi dans le local 026 ?",
    status: "done"
  }
];

class Propositions {
  constructor(dbPath = jsonDbPath, defaultItems = defaultpropositions) {
    this.jsonDbPath = dbPath;
    this.defaultpropositions = defaultItems;
  }

  getNextId() {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);
    let nextId;
    if (propositions.length === 0) nextId = 1;
    else nextId = propositions[propositions.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all propositions
   * @returns {Array} Array of propositions
   */
  getAll() {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);
    return propositions;
  }

  /**
   * Returns the pizza identified by id
   * @param {number} id - id of the pizza to find
   * @returns {object} the pizza found or undefined if the id does not lead to a pizza
   */
  getOne(id) {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);
    const foundIndex = propositions.findIndex((pizza) => pizza.id == id);
    if (foundIndex < 0) return;

    return propositions[foundIndex];
  }

  /**
   * Add a pizza in the DB and returns the added pizza (containing a new id)
   * @param {object} body - it contains all required data to create a pizza
   * @returns {object} the pizza that was created (with id)
   */

  addOne(body) {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);

    // add new pizza to the menu : escape the title & content in order to protect agains XSS attacks   
    
    const newProposition = {
      
      id: this.getNextId(),
      proposal: escape(body.proposal),
      status:escape(body.status),
     
    };
    propositions.push(newProposition);
    serialize(this.jsonDbPath, propositions);
    return newProposition;
  }

  /**
   * Delete a pizza in the DB and return the deleted pizza
   * @param {number} id - id of the pizza to be deleted
   * @returns {object} the pizza that was deleted or undefined if the delete operation failed
   */
  deleteOne(id) {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);
    const foundIndex = propositions.findIndex((proposition) => proposition.id == id);
    if (foundIndex < 0) return;
    const itemRemoved = propositions.splice(foundIndex, 1);
    serialize(this.jsonDbPath, propositions);

    return itemRemoved[0];
  }

  /**
   * Update a pizza in the DB and return the updated pizza
   * @param {number} id - id of the pizza to be updated
   * @param {object} body - it contains all the data to be updated
   * @returns {object} the updated pizza or undefined if the update operation failed
   */
  updateOne(id, body) {
    const propositions = parse(this.jsonDbPath, this.defaultpropositions);
    const foundIndex = propositions.findIndex((proposition) => proposition.id == id);
    if (foundIndex < 0) return;
    // create a new object based on the existing pizza - prior to modification -
    // and the properties requested to be updated (those in the body of the request)
    // use of the spread operator to create a shallow copy and repl
    const updatedProposition = { ...propositions[foundIndex], ...body };
    // replace the pizza found at index : (or use splice)
    propositions[foundIndex] = updatedProposition;

    serialize(this.jsonDbPath, propositions);
    return updatedProposition;
  }
}

module.exports = { Propositions };
