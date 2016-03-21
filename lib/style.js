import React from 'react'

export default function (s) {
    return React.createElement('style', {
        scoped: true,
        dangerouslySetInnerHTML: { __html: s }
    })
}
