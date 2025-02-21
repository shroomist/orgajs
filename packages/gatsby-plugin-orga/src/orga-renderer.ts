import { orga } from '@orgajs/react'
import React, { useMemo } from 'react'

function OrgaRenderer({ scope = {}, children, ...props }) {
  const End = useMemo(() => {
    if (!children) return null

    const fullScope = {
      React,
      orga,
      ...scope,
    }

    const keys = Object.keys(fullScope)
    const values = keys.map((key) => fullScope[key])

    const fn = new Function('_fn', ...keys, `${children}`)
    return fn({}, ...values)
  }, [scope, children])

  return React.createElement(End, { ...props })
}

export default OrgaRenderer
