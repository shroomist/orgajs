import {
  BaseNode,
  Declaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExpressionStatement,
} from 'estree'
import { JSXElement, JSXFragment, JSXOpeningElement } from 'estree-jsx'
import _ from 'lodash'

export function isExportNamedDeclaration(
  node: BaseNode
): node is ExportNamedDeclaration {
  return node.type === 'ExportNamedDeclaration'
}

export function isExportDefaultDeclaration(
  node: BaseNode
): node is ExportDefaultDeclaration {
  return node.type === 'ExportDefaultDeclaration'
}

export function isExpressionStatement(
  node: BaseNode
): node is ExpressionStatement {
  return node.type === 'ExpressionStatement'
}

export function isJSXExpression(node: BaseNode): node is ExpressionStatement {
  if (node.type !== 'ExpressionStatement') return false
  const expType = _.get(node, 'expression.type')
  return expType === 'JSXElement' || expType === 'JSXFragment'
}

export function isJSXFragment(node: BaseNode): node is JSXFragment {
  return node.type === 'JSXFragment'
}

export function isJSXElement(node: BaseNode): node is JSXElement {
  // To do: support members (`<x.y>`).
  return node.type === 'JSXElement'
  // && _.get('openingElement.name.type')(node) === 'JSXIdentifier'
}

export function isJSXIdentifier(oe: JSXOpeningElement) {
  return oe.name.type === 'JSXIdentifier'
}

export function isDeclaration(node: BaseNode): node is Declaration {
  return (
    node.type === 'VariableDeclaration' ||
    node.type === 'FunctionDeclaration' ||
    node.type === 'ClassDeclaration'
  )
}
