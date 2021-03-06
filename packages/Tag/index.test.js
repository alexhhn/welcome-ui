import React from 'react'

import { render } from '../../src/utils/tests'

import { Tag } from './index'

const content = 'Jungle'

describe('<Tag>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Tag dataTestId="tag">{content}</Tag>)
    const tag = getByTestId('tag')

    expect(tag).toHaveTextContent(content)
    expect(tag).toHaveStyleRule('background-color', '#EDEDED')
    expect(tag).toHaveStyleRule('color', '#727272')
    expect(tag).toHaveStyleRule('padding', '0 0.375rem')
  })

  it('should have correct size', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" size="lg">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('padding', '0 0.5rem')
  })

  it('should have correct color', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" variant="1">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('background-color', '#3FD1C1')
    expect(tag).toHaveStyleRule('color', '#FFFFFF')
  })

  describe('should have correct size with only one character', () => {
    it('with string', () => {
      const { getByTestId } = render(<Tag dataTestId="tag">1</Tag>)
      const tag = getByTestId('tag')

      expect(tag).toHaveStyleRule('width', '1.3125rem')
      expect(tag).toHaveStyleRule('height', '1.3125rem')
      expect(tag).toHaveStyleRule('padding', '0')
    })

    it('with integer', () => {
      const { getByTestId } = render(<Tag dataTestId="tag">{1}</Tag>)
      const tag = getByTestId('tag')

      expect(tag).toHaveStyleRule('width', '1.3125rem')
      expect(tag).toHaveStyleRule('height', '1.3125rem')
      expect(tag).toHaveStyleRule('padding', '0')
    })

    it('with zero', () => {
      const { getByTestId } = render(<Tag dataTestId="tag">{0}</Tag>)
      const tag = getByTestId('tag')

      expect(tag).toHaveStyleRule('width', '1.3125rem')
      expect(tag).toHaveStyleRule('height', '1.3125rem')
      expect(tag).toHaveStyleRule('padding', '0')
    })
  })

  it('should have same height and width when prop `shape` set to `square`', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" shape="square">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('width', '1.3125rem')
    expect(tag).toHaveStyleRule('height', '1.3125rem')
  })

  it('should have same height and width when prop `shape` set to `square` and different width / height props', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" height={10} shape="square" width={50}>
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('width', '3.125rem')
    expect(tag).toHaveStyleRule('height', '3.125rem')
  })

  it('should have same height and width when prop `shape` set to `square` and width prop only', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" shape="square" width="4rem">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('width', '4rem')
    expect(tag).toHaveStyleRule('height', '4rem')
  })

  it('should have same height and width when prop `shape` set to `square` and height prop only', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" height={10} shape="square">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('width', '0.625rem')
    expect(tag).toHaveStyleRule('height', '0.625rem')
  })

  it('should have correct border radius when prop `shape` set to `circle`', () => {
    const { getByTestId } = render(
      <Tag dataTestId="tag" shape="circle">
        {content}
      </Tag>
    )
    const tag = getByTestId('tag')

    expect(tag).toHaveStyleRule('border-radius', '50%')
  })
})
