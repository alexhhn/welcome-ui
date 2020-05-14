/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { LivePreview, LiveProvider } from 'react-live'
import theme from 'prism-react-renderer/themes/nightOwl'
import { Button } from '@welcome-ui/button'
import { Icon } from '@welcome-ui/icon'
import { Card } from '@welcome-ui/card'
import { Alert } from '@welcome-ui/alert'
import { Stack } from '@welcome-ui/stack'

import * as S from './Code.styled'

const liveEditorStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: 14,
  margin: 0
}

const transformCode = code => {
  if (code.startsWith('()') || code.startsWith('class')) return code
  return `<Stack spacing="md">${code}</Stack>`
}

export const Code = ({ children, className, live = true }) => {
  const [editorOpen, setEditorOpen] = useState(false)
  const language = className && className.replace(/language-/, '')

  const [editorCode, setEditorCode] = useState(children.trim())

  function toggleEditor() {
    setEditorOpen(!editorOpen)
  }

  function handleChange(code) {
    setEditorCode(code.trim())
  }

  const liveProviderProps = {
    code: editorCode,
    theme,
    language,
    transformCode,
    scope: {
      Alert,
      Card,
      Button,
      Icon,
      Stack
    }
  }

  if (live === true && language === 'jsx') {
    return (
      <LiveProvider {...liveProviderProps}>
        <S.LivePreview className="codeEditor">
          <Card.Body padding="xl" paddingBottom="lg">
            <LivePreview />
            <S.ShowEditor>
              <Button onClick={toggleEditor} size="sm" variant="secondary">
                <Icon name="chevron" />
                <span>{editorOpen ? 'Hide' : 'Show'} editor</span>
              </Button>
            </S.ShowEditor>
          </Card.Body>
        </S.LivePreview>
        {editorOpen && (
          <S.LiveEditor onChange={handleChange} padding={20} style={liveEditorStyle} />
        )}
        <S.LiveError />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <S.LiveEditor padding={20} style={liveEditorStyle} />
    </LiveProvider>
  )
}
