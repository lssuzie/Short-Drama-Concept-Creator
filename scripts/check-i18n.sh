#!/bin/bash
# Check for hardcoded Chinese strings in JS files that may need i18n
# Only checks strings outside of ZH_TO_EN translation map

JS_FILES=$(find src/ -name "*.js" -not -name "*.min.js" 2>/dev/null)
ISSUES=0

for f in $JS_FILES; do
  # Skip the i18n translation map itself
  if grep -q "ZH_TO_EN" "$f" 2>/dev/null; then
    # Find Chinese strings NOT inside the ZH_TO_EN object
    # Simple heuristic: look for Chinese chars in lines that don't contain ZH_TO_EN or are outside the map
    MATCHES=$(grep -n "[\x{4e00}-\x{9fff}]" "$f" 2>/dev/null | grep -v "ZH_TO_EN\|EN_TO_ZH\|var ZH\|var EN\|zh.*en\b" | head -5)
    if [ -n "$MATCHES" ]; then
      echo "⚠️  $f — potential untranslated strings:"
      echo "$MATCHES" | sed 's/^/   /'
      ISSUES=$((ISSUES + 1))
    fi
  fi
done

if [ $ISSUES -eq 0 ]; then
  echo "✅ i18n check passed"
else
  echo ""
  echo "⚠️  Found $ISSUES file(s) with potential untranslated strings"
  echo "   Run: grep -rn '[\x{4e00}-\x{9fff}]' src/ --include='*.js' | grep -v ZH_TO_EN to review"
fi
