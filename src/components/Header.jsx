import React from 'react'
import ProcessAborter from './ProcessAborter'
import logo from '../assets/logo.svg'

const Header = ({ process, abort }) => {
	return (
		<header className='tw-flex'>
			<div className='tw-flex-1 tw-self-end'>
				<ProcessAborter text={process} onClick={abort} />
			</div>
			<div className='tw-my-4'>
				<img src={logo} alt="logo" className='tw-w-16 tw-h-16' />
			</div>
			<div className='tw-flex-1' />
		</header>
	)
}

export default Header