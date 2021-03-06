import React, {createClass} from 'react'
import classnames from 'classnames'
import {connectRefinementList} from 'react-instantsearch/connectors'
import './style.scss'

const RefinementList = createClass({
  getInitialState () {
    return { extended: false }
  },

  renderItem (item, key) {
    return (
      <section className='ais-RefinementList__root' key={key}>
        <div className='mb2'>
          <label
            className={classnames('pointer', {
              'ais-RefinementList__itemSelected': item.isRefined
            })}
            >
            <input
              type='checkbox'
              className={classnames('ais-RefinementList__itemCheckbox', {
                'ais-RefinementList__itemCheckboxSelected': item.isRefined
              })}
              checked={item.isRefined}
              onChange={() => this.props.refine(item.value)
              }
            />
            <span
              className={classnames('ais-RefinementList__span ph2 ttc lh-title f5 fw5 hover-blue', {
                'silver': !item.isRefined,
                'blue fw8': item.isRefined
              })}>
              {item.label}
            </span>
            {' '}
            <span className={classnames('fr fw4 hover-blue', {
              'light-gray': !item.isRefined,
              'blue fw8': item.isRefined
            })}>
              {item.count}
            </span>
          </label>
        </div>
      </section>
    )
  },

  getLimit () {
    const {limitMin, limitMax} = this.props
    const {extended} = this.state
    return extended ? limitMax : limitMin
  },

  onClick () {
    const {extended} = this.state
    this.setState({extended: !extended})
  },

  renderShowMore () {
    const {showMore, limitMin, items} = this.props
    const {extended} = this.state
    const {onClick} = this
    const disabled = limitMin >= items.length

    if (!showMore || items.length < limitMin) return

    return (
      <a disabled={disabled}
        onClick={onClick}
        className='pointer link dib blue pt2'
      >
        {extended ? 'Show less' : 'Show more'}
      </a>
    )
  },

  render () {
    const {renderItem, renderShowMore, getLimit, props} = this
    const {title, items} = props

    if (!items.length) return null
    const slicedItems = items.slice(0, getLimit())

    return (
      <article data-app='facet' data-facet={title} className='ph3 ph4-ns pb4'>
        <header className='f6 fw6 ttu tracked pb3 gray'>{title}</header>
        {slicedItems.map(renderItem)}
        {renderShowMore()}
      </article>
    )
  }
})

export default connectRefinementList(RefinementList)
