function check(str) {
  const openedBraces = ["[", "{", "("];
  const closedBraces = ["]", "}", ")"];
  const { result, braces } = str.split("").reduce(
    function (acc, el) {
      if (openedBraces.includes(el)) {
        return { ...acc, braces: [...acc.braces, el] };
      }
      if (!acc.braces.length && closedBraces.includes[el]) {
        return { ...acc, result: false };
      }
      if (closedBraces.includes(el)) {
        const lastBrace = acc.braces[acc.braces.length - 1];
        const index = openedBraces.findIndex((brace) => brace === lastBrace);
        const isValid = closedBraces[index] === el;
        return {
          braces: [...acc.braces.slice(0, -1)],
          result: acc.result && isValid,
        };
      }
      return acc;
    },
    { braces: [], result: true }
  );
  return result && braces.length === 0;
}

const samples = {
  "{}": true,
  "{([})]": false,
  "{([])}{([])}{([])}": true,
  "asdf{asdf}{f323[324]32}{324}": true,
  "4fff({f}f{[]tt})444[{}]tt": true,
  "{{{": false,
  "": true,
};

function test(samples) {
  const messages = Object.keys(samples).map(function (sample) {
    const expectedResult = samples[sample];
    const actualResult = check(sample);
    const passed = expectedResult === actualResult;
    const butMsg = passed
      ? ""
      : ` but got <code>${String(actualResult)}</code>`;
    return `
        <li class="${passed ? "pass" : "fail"}">
          <code>${sample}</code>
          should be
          <code>${String(expectedResult)}</code>
          ${butMsg}
        </li>
      `;
  });
  return `<ul>${messages.join("")}</ul>`;
}

document.getElementById("output").innerHTML = test(samples);
