/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
var chalk = require('chalk')
const DEFAULT_NS = 'namespace-undefined'

module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    '!src/**/*.spec.{js,jsx}',
    '!src/api/**',
    '!src/utils/**',
    '!src/libs/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: false,
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx'],
    },
    trans: false,
    //lngs: ['en', 'es', 'fr', 'pt'],
    lngs: ['en'],
    defaultLng: 'en',
    ns: [
      '404page',
      'accountMenu',
      'addKeyContact',
      'addNewSection',
      'addNewSectionItem',
      'analytics',
      'assistedResearch',
      'auth',
      'avatar',
      'billingHistory',
      'channels',
      'common',
      'companyMenu',
      'companyPage',
      'companyPageId',
      'companyProfile',
      'companySetup',
      'createCompany',
      'footer',
      'languages',
      'lists',
      'marketsMap',
      'portalPages',
      'profileSectionItem',
      'relationships',
      'resources',
      'searchResults',
      'sidebar',
      'sidebarConstants',
      'subscription',
      'tags',
      'teamMembers',
      'textEditor',
      'unauthenticatedSearch',
      'userProfile',
      'userProfileMenu',
    ],
    defaultValue: (lng, ns, key) => {
      if (lng === 'en') {
        return key
      }
      return ''
    },
    nsSeparator: false,
    keySeparator: false,
    plural: true,
    resource: {
      loadPath: 'public/static/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/static/locales/{{lng}}/{{ns}}.json',
    },
  },
  transform: function customTransform(file, enc, done) {
    'use strict'
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)
    let ns
    const match = content.match(/useTranslation\(.+\)/)
    if (match) ns = match[0].split(/(\'|\")/)[2]
    let count = 0
    parser.parseFuncFromString(content, { list: ['t'] }, function (key, options) {
      parser.set(
        key,
        Object.assign({}, options, {
          ns: ns ? ns : DEFAULT_NS,
          nsSeparator: false,
          keySeparator: false,
        })
      )
      ++count
    })
    parser.parseTransFromString(content, { component: 'Trans', i18nKey: 'i18nKey' }, function (key, options) {
      parser.set(
        key.split(':')[1],
        Object.assign({}, options, {
          ns: key.split(':')[0],
          nsSeparator: false,
          keySeparator: false,
        })
      )
      ++count
    })
    if (count > 0) {
      console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`)
    }

    done()
  },
}
