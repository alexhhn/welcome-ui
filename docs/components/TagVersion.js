/* eslint-disable react/prop-types */
import React from 'react'
import { Tag } from '@welcome-ui/Tag'

export const TagVersion = ({ href, name, version, ...rest }) => (
  <div>
    <a
      alt="npm package"
      href={href || `https://www.npmjs.com/package/${name}`}
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
      target="_blank"
    >
      <Tag size="md" {...rest}>
        {`v${version}`}
      </Tag>
    </a>
  </div>
)
