/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import { Content, Title, Description, PrimaryButton } from '../../../components'

// Utils
import locale from '../fakeLocale'

// Images
import { WelcomeRewardsImage } from '../../../components/images'

interface Props {
  index: number
  currentScreen: number
  onClick: () => void
}

export default class PaymentsBox extends React.PureComponent<Props, {}> {
  renderText () {
    const [
      before,
      during,
      after
    ] = locale.setupBraveRewards.split(/\$\d+/g)
    return <>{before}<strong>{during}</strong>{after}</>
  }

  renderTerms () {
    const [
      beforeLink1,
      link1,
      afterLink1,
      link2,
      afterLink2
    ] = locale.rewardsTerms.split(/\$\d+/g)

    return (
      <div className='terms-of-service'>
        <div>
          {beforeLink1}
          <a
            href='https://basicattentiontoken.org/user-terms-of-service'
            target='_blank'
            rel='noopener noreferrer'
          >
            {link1}
          </a>
          {afterLink1}
          <a
            href='https://brave.com/privacy/#rewards'
            target='_blank'
            rel='noopener noreferrer'
          >
            {link2}
          </a>
          {afterLink2}
        </div>
        <div>
          {locale.rewardsSettingsNote}
        </div>
      </div>
    )
  }

  render () {
    const { index, currentScreen, onClick } = this.props
    return (
      <Content
        zIndex={index}
        active={index === currentScreen}
        screenPosition={'1' + (index + 1) + '0%'}
        isPrevious={index <= currentScreen}
      >
        <WelcomeRewardsImage />
        <Title>{locale.enableBraveRewards}</Title>
        <Description>
          {this.renderText()}
          {this.renderTerms()}
        </Description>
        <PrimaryButton
          level='primary'
          type='accent'
          size='large'
          text={locale.getStarted}
          onClick={onClick}
        />
      </Content>
    )
  }
}
