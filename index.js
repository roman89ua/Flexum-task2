//Added the second parameter (obj) to make check function totaly reuseble, sorry about that :)

function check(obj, str) {
  return obj[str] ?? "Something went wrong. Try again. "; // added new ability of JS (??) for not to get undefind but get some message about error
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
    const actualResult = check(samples, "sample"); // or we just can use samples[sample] at this line and not create a func out of this func
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
