import React from 'react'
import { Link } from 'react-router-dom'

const InfoEmpty = ({ title, image, description }) => {
	return (
		<div className='cartEmpty d-flex align-center justify-center flex-column flex infoEmpty'>
			<img
				className='mb-20'
				width='70px'
				height='70px'
				src={image}
				alt='Empty'
			/>
			<h2>{title}</h2>
			<p className='opacity-6'>{description}</p>
			<Link to='/'>
				<button className='green__button'>
					<img src='/img/arrow.svg' alt='arrow' />
					Вернуться назад
				</button>
			</Link>
		</div>
	)
}
export default InfoEmpty
