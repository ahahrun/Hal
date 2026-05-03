import type { FlashCard } from "../types/flashcard";

export const flashcards: FlashCard[] = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer:
      "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified.",
  },
  {
    id: 2,
    question: "What is a closure in JavaScript?",
    answer:
      'A closure is a function that retains access to its outer scope even after the outer function has returned. It "closes over" variables from its enclosing scope.',
  },
  {
    id: 3,
    question: "What is the difference between == and === in JavaScript?",
    answer:
      "== checks for value equality with type coercion, while === checks for strict equality — both value and type must match. Always prefer === to avoid unexpected bugs.",
  },
  {
    id: 4,
    question: "What is the event loop in JavaScript?",
    answer:
      "The event loop is a mechanism that allows JavaScript to perform non-blocking operations. It continuously checks the call stack and processes tasks from the callback queue when the stack is empty.",
  },
  {
    id: 5,
    question: "What are React hooks?",
    answer:
      "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, useRef, and useMemo.",
  },
  {
    id: 6,
    question: "What is the virtual DOM?",
    answer:
      "The virtual DOM is a lightweight in-memory representation of the real DOM. React uses it to batch and optimize updates — it diffs the new virtual DOM against the previous one and only updates what changed in the real DOM.",
  },
  {
    id: 7,
    question: "What is TypeScript?",
    answer:
      "TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional type annotations, interfaces, and generics to help catch errors at compile time.",
  },
  {
    id: 8,
    question: "What is the difference between an interface and a type in TypeScript?",
    answer:
      "Both describe object shapes. Interfaces are open and can be merged via declaration merging, while type aliases can represent any type (unions, primitives, tuples) and cannot be merged.",
  },
  {
    id: 9,
    question: "What is async/await in JavaScript?",
    answer:
      "async/await is syntactic sugar over Promises that lets you write asynchronous code in a synchronous style. An async function always returns a Promise; await pauses execution until the Promise resolves.",
  },
  {
    id: 10,
    question: "What is CSS specificity?",
    answer:
      "Specificity determines which CSS rule wins when multiple rules target the same element. It is calculated based on the types of selectors used: inline styles > IDs > classes/attributes/pseudo-classes > elements.",
  },
  {
    id: 11,
    question: "What is the box model in CSS?",
    answer:
      "Every HTML element is a rectangular box made up of content, padding, border, and margin. The box-sizing property controls whether padding and border are included in the element's total width/height.",
  },
  {
    id: 12,
    question: "What is Flexbox?",
    answer:
      "Flexbox (Flexible Box) is a CSS layout model that arranges elements in a row or column. It provides powerful alignment and distribution controls via properties like justify-content, align-items, and flex-grow.",
  },
  {
    id: 13,
    question: "What is the difference between null and undefined?",
    answer:
      'undefined means a variable has been declared but not assigned a value. null is an explicit assignment indicating "no value." typeof undefined is "undefined"; typeof null is "object" (a historical JS bug).',
  },
  {
    id: 14,
    question: "What is a Promise in JavaScript?",
    answer:
      "A Promise represents the eventual completion (or failure) of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. You chain .then() and .catch() to handle the result.",
  },
  {
    id: 15,
    question: "What is REST?",
    answer:
      "REST (Representational State Transfer) is an architectural style for APIs. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs.",
  },
  {
    id: 16,
    question: "What is the difference between GET and POST?",
    answer:
      "GET retrieves data and sends parameters in the URL; it is idempotent and cacheable. POST sends data in the request body to create/submit data; it is not idempotent and not cached by default.",
  },
  {
    id: 17,
    question: "What is CORS?",
    answer:
      "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the page. Servers opt in by sending appropriate Access-Control headers.",
  },
  {
    id: 18,
    question: "What is a higher-order function?",
    answer:
      "A higher-order function is a function that takes another function as an argument, returns a function, or both. Examples include map, filter, and reduce — they accept a callback and apply it to a collection.",
  },
  {
    id: 19,
    question: "What is the prototype chain in JavaScript?",
    answer:
      "Every JavaScript object has an internal [[Prototype]] link to another object. When you access a property, JavaScript traverses this chain until it finds the property or reaches null at the end.",
  },
  {
    id: 20,
    question: "What is Git and why is it used?",
    answer:
      "Git is a distributed version control system that tracks changes to files over time. It allows multiple developers to collaborate, revert to previous states, branch for features, and merge work safely.",
  },
];
