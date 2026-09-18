import { existsSync, statSync } from "node:fs";

const required = [
  "public/brand/foodstack-logo-source.png",
  "public/showcase/take-joao-selector.png",
  "public/showcase/joao-gastrobar-menu.png",
  "public/showcase/take-burguer-menu.png",
  "public/showcase/capivara-home.png",
  "public/showcase/capivara-table-selection.png",
  "public/showcase/capivara-menu-cart.png",
  "public/showcase/capivara-my-orders.png",
  "public/showcase/capivara-checkout.png"
];

const missing = required.filter((path) => !existsSync(path) || statSync(path).size === 0);
if (missing.length) {
  console.error("Missing required media:\n" + missing.join("\n"));
  process.exit(1);
}
console.log(`Media audit passed (${required.length} assets).`);
