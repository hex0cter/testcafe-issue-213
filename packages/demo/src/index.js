import React from 'react'
import { hot } from 'react-hot-loader'

const Demo = () => (
  <button id='hello'>
    Hello world!
  </button>
)

export default hot(module)(Demo)
