import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("no-zero-width-spaces", rule, {
  valid: ["Zero width space is not included."],
  invalid: [
    {
      text: "Zero width space is included here->\u200b.",
      errors: [
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 36,
        },
      ],
    },
  ],
});
