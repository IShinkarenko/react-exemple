module.exports = {
  createOldCatalogs: true,
  indentation: 2,
  lexers: {
    js: ['JsxLexer'],
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },
  locales: ['en'],
  output: 'public/static/locales/$LOCALE/$NAMESPACE.newKeys.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  verbose: true,
}
