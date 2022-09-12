import { resolve } from 'path'
import { mkdirSync, rmdirSync, writeFileSync } from 'fs'

const compName = process.argv.slice(2).join()
const compFolder = resolve('src', 'components', compName)

const files = [
  {
    name: `${compName}.module.scss`,
    value: ``
  },

  {
    name: `${compName}.tsx`,
    value: `import React, {FC} from 'react';
import classNames from 'classnames';

import s from './${compName}.module.scss';

interface ${compName}Props {
\t
}

const ${compName}: FC<${compName}Props> = ({}) => {
\treturn (
  \t<div>
    \t${compName}
  \t</div>
)
};

export default ${compName};`
  },

  {
    name: `index.ts`,
    value: `import ${compName} from './${compName}'

export default ${compName}`
  }
]

mkdirSync(compFolder)

files.forEach(({ name, value }) => {
  writeFileSync(resolve(compFolder, name), value)
})
