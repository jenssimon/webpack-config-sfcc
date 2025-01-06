/**
 * Useful constants
 */

/**
 * JavaScript file extensions
 */
export const JS_FILE_EXTENSIONS = ['.js', '.jsx']


/**
 * TypeScript file extensions
 */
export const TS_FILE_EXTENSIONS = ['.ts', '.tsx']


/**
 * All JavaScript and TypeScript file extensions combined
 */
export const FILE_EXTENSIONS = [
  ...JS_FILE_EXTENSIONS,
  ...TS_FILE_EXTENSIONS,
]


/**
 * All file extensions to resolve
 */
export const RESOLVE_FILE_EXTENSIONS = [
  ...FILE_EXTENSIONS,
  '.json',
]
