import * as React from 'react';
import { Localized } from '@fluent/react';

/**
 * Marks individual punctuation characters.
 *
 * Source:
 * https://github.com/translate/translate/blob/2.3.1/translate/storage/placeables/general.py#L229
 */
const punctuation = {
  rule: new RegExp(
    '(' +
      '(' +
      /[™©®]|/.source + // Marks
      /[℃℉°]|/.source + // Degree related
      /[±πθ×÷−√∞∆Σ′″]|/.source + // Maths
      /[‘’ʼ‚‛“”„‟]|/.source + // Quote characters
      /[«»]|/.source + // Guillemets
      /[£¥€]|/.source + // Currencies
      /…|/.source + // U2026 - horizontal ellipsis
      /—|/.source + // U2014 - em dash
      /–|/.source + // U2013 - en dash
      /[\u202F]/.source + // U202F - narrow no-break space
      ')+' +
      ')',
  ) as RegExp,
  matchIndex: 0,
  tag: (x: string): React.ReactElement<React.ElementType> => {
    return (
      <Localized id='placeable-parser-punctuation' attrs={{ title: true }}>
        <mark className='placeable' title='Punctuation' dir='ltr'>
          {x}
        </mark>
      </Localized>
    );
  },
};

export default punctuation;
