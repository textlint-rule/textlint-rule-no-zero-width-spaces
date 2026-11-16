import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("no-zero-width-spaces", rule, {
  valid: [
    "Zero width space is not included.",
    "Other spaces are allowed: \u00a0\u2009\u3000.",
    "Zero width space in code is allowed: `\u200b`",
  ],
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
    {
      text: "\u200bStart, middle\u200b\u200b, and end.\u200b",
      output: "Start, middle, and end.",
      errors: [
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 1,
        },
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 15,
        },
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 16,
        },
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 27,
        },
      ],
    },
    {
      text: "First\u200b paragraph.\n\n- Second\u200b **in\u200bline**",
      output: "First paragraph.\n\n- Second **inline**",
      errors: [
        {
          message: "Zero width space is disallowed.",
          line: 1,
          column: 6,
        },
        {
          message: "Zero width space is disallowed.",
          line: 3,
          column: 9,
        },
        {
          message: "Zero width space is disallowed.",
          line: 3,
          column: 15,
        },
      ],
    },
  ],
});
