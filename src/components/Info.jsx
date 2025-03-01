import React from 'react'
import { AppContext } from '../App'

const Info = ({ title, image, description }) => {
	const { setCartOpened } = React.useContext(AppContext)
	return (
		<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
			<img
				className='mb-20'
				width='120px'
				height='120px'
				src={image}
				alt='Empty Cart'
			/>
			<h2>{title}</h2>
			<p className='opacity-6'>{description}</p>
			<button className='green__button'>
				<img src='/react-project/img/arrow.svg' alt='arrow' />
				Вернуться назад
			</button>
		</div>
	)
}
export default Info
