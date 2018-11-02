import React, { Component } from 'react'

export default class NotFound extends Component {
  componentWillMount() {
    alert('404 NOT FOUND')
    this.context.router.replace('/')
  }

  render () {
    // 非实体组件需显式返回 null
    return null
  }
}
