import React from 'react'

function Logo ({toggle, get}) {
  let image
  let style

  if (get('isDesktop')) {
    image = 'logo'
    style = { width: '12rem' }
  } else {
    image = 'logo-tiny'
    style = {width: '2rem'}
  }

  return (
    <a href='/' style={style}>
      <img alt='windtoday' src={`/assets/img/${image}.png`} />
    </a>
  )
}

export default Logo
