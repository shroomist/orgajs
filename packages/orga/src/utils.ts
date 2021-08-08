import { PhrasingContent, Token } from './types'

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g

export const escape = (str: string): string => {
  return str.replace(matchOperatorsRe, '\\$&')
}

export const clone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isPhrasingContent = (token: Token): token is PhrasingContent => {
  return (
    token.type.startsWith('text.') ||
    token.type === 'footnote.reference' ||
    token.type === 'link' ||
    token.type === 'newline'
  )
}
