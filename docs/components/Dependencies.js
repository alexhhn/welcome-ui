/* eslint-disable react/prop-types */
import React from 'react'
import { Tag } from '@welcome-ui/Tag'
import { Link } from '@welcome-ui/Link'
import { Button } from '@welcome-ui/Button'

export const Dependencies = ({ dependencies }) => {
  if (!dependencies) {
    return 'None listed'
  }

  return (
    <ul>
      {Object.entries(dependencies).map(([dependency, version]) => {
        const baseVersion = version.replace(/[\^=~]/, '')
        return (
          <li as={Button} key={dependency}>
            <Link
              border="none"
              href={`https://npmjs.com/package/${dependency}/v/${baseVersion}`}
              rel="nofollow"
              target="_npm"
            >
              {dependency}
              <Tag ml="sm" size="md">
                {version}
              </Tag>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
