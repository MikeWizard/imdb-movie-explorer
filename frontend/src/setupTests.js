// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toBeInTheDocument();
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress the act() warning
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*ReactDOMTestUtils.act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
}; 