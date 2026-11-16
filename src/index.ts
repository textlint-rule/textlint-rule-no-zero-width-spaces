import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import { TextlintRuleNoZeroWidthSpacesError } from "./TextlintRuleNoZeroWidthSpacesError";

const ZERO_WIDTH_SPACE = "\u200b";

const reporter: TextlintRuleReporter = (context) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      // Most Str nodes have no zero width space.
      // Check it first, without creating an iterator or a Promise for each node.
      if (text.indexOf(ZERO_WIDTH_SPACE) === -1) {
        return;
      }

      for (const match of text.matchAll(/\u200b/g)) {
        if (match.index === undefined) {
          throw new TextlintRuleNoZeroWidthSpacesError();
        }

        const ruleError = new RuleError("Zero width space is disallowed.", {
          index: match.index,
          fix: fixer.replaceTextRange(
            [match.index, match.index + ZERO_WIDTH_SPACE.length],
            ""
          ),
        });

        report(node, ruleError);
      }
    },
  };
};

const module: TextlintRuleModule = {
  fixer: reporter,
  linter: reporter
};

export default module;
