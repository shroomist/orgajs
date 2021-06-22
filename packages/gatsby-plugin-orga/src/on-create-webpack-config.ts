import toEstree from '@orgajs/rehype-estree'
import * as path from 'path'
const toJsx = require('@orgajs/estree-jsx')
const toRehype = require('@orgajs/reorg-rehype')

const renderer = `import React from 'react'
import {orga} from '@orgajs/react'
import { graphql } from 'gatsby'
`

export default (
  { stage, loaders, actions, plugins, cache, ...other },
  pluginOptions
) => {

  const { defaultLayout, components } = pluginOptions

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.org$/,
          use: [
            loaders.js(),
            {
              loader: '@orgajs/loader',
              options: {
                plugins: [
                  toRehype,
                  [toEstree, { defaultLayout }],
                  [toJsx, { renderer }],
                ]
              }
            },
          ],
        },
        {
          test: /orga-components\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-orga')),
          use: [
            loaders.js(),
            {
              loader: path.join(
                'gatsby-plugin-orga',
                'dist',
                'orga-components',
              ),
              options: {
                components,
              },
            }
          ],
        },
      ],
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
      }),
    ],
  })
}
