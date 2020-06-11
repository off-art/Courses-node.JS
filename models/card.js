const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  constructor() {}

  static async add(course) {
    const { id } = course;

    const card = await Card.fetch();
    const idx = card.courses.findIndex((c) => c.id === id);
    const candidate = card.courses[idx];

    if (candidate) {
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((res, req) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          req(err);
        } else {
          res();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((res, rej) => {
      fs.readFile(p, "utf-8", (err, connect) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(connect));
        }
      });
    });
  }
  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex((c) => c.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      card.courses = card.courses.filter((с) => c.id !== id);
    } else {
      card.courses[idx].count--;
    }
    card.price -= +course.price;

    return new Promise((res, req) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          req(err);
        } else {
          res(card);
        }
      });
    });
  }
}

module.exports = Card;
