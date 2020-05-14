/* eslint-disable react/no-array-index-key */
import React from 'react'
import Link from 'next/link'

import { NavigationLink } from './NavigationLink'
import * as S from './Navigation.styled'

const components = ['Alert']
const theming = ['Colors']

const slugify = name => {
  return name
    .replace(/([A-Z])/g, '-$1')
    .trim()
    .toLowerCase()
    .substr(1)
}

export const Navigation = () => (
  <S.Nav>
    <S.Ul>
      <Link href="/" passHref>
        <S.Main>Introduction</S.Main>
      </Link>
    </S.Ul>
    <S.Ul>
      <NavigationLink href="/getting-started" passHref>
        <S.Main>Getting started</S.Main>
      </NavigationLink>
    </S.Ul>
    <S.Ul>
      <S.Main as="div">Theming</S.Main>
      {theming.map((item, key) => (
        <S.Li key={`component_${key}`}>
          <NavigationLink href={`/theming/${slugify(item)}`} passHref>
            <S.Item>{item}</S.Item>
          </NavigationLink>
        </S.Li>
      ))}
    </S.Ul>
    <S.Ul>
      <S.Main as="div">Components</S.Main>
      {components.map((item, key) => (
        <S.Li key={`component_${key}`}>
          <NavigationLink href={`/components/${slugify(item)}`} passHref>
            <S.Item>{item}</S.Item>
          </NavigationLink>
        </S.Li>
      ))}
    </S.Ul>
  </S.Nav>
)
