// src/lib/generate-password.ts
export function generateTempPassword(): string {
  const words = ["mango", "sweet", "rosogolla", "sandesh", "kolkata", "amber", "festive", "chomchom"];
  const word = words[Math.floor(Math.random() * words.length)];
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${word}${number}!`; // e.g. "sandesh4821!"
}