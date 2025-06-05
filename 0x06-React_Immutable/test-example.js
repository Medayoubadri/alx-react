import { getListObject, addElementToList } from "./3-list.js";

// Test List functions
const list = getListObject(["a", "b"]);
const newList = addElementToList(list, "c");

console.log("Testing List functions:");
console.log("Original:", list.toArray());
console.log("With new element:", newList.toArray());

// Test that it's immutable
console.log("Original list unchanged:", list.toArray());
