import styled, { css } from '@xstyled/styled-components'
import { Button as ReakitButton } from 'reakit/Button'
import { createSystemComponent, th } from '@xstyled/system'

import { createElement, system } from '../../utils/'

const shapeStyles = (size, shape) => css`
  width: ${th(`buttons.sizes.${size}.height`)};
  padding: 0;
  border-radius: ${shape === 'circle' && th(`buttons.sizes.${size}.height`)};
`

export const Button = styled(createSystemComponent(createElement, ReakitButton, system))(
  ({ disabled, shape, size, variant }) => css`
    ${th(`buttons.${variant}`)};
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    ${th(`buttons.sizes.${size}`)};
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    border-width: sm;
    border-style: solid;
    appearance: none;
    overflow: hidden;
    transition: medium;
    ${shape && shapeStyles(size, shape)};
    ${system};

    & > *:not(:only-child):not(:last-child) {
      margin-right: sm;
    }

    ${!disabled &&
      css`
        &:active {
          transform: translateY(2px);
        }

        &:hover,
        &:focus {
          ${th(`buttons.focused.${variant || 'primary'}`)};
        }
      `};

    &[disabled] {
      pointer-events: none;
    }
  `
)
