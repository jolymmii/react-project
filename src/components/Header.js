import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
function Header(props) {
	const { Cartitems } = React.useContext(AppContext)
	const totalPrice = Cartitems.reduce((sum, obj) => obj.price + sum, 0)
	return (
		<header className='d-flex justify-between align-center p-40'>
			<Link to='/'>
				<div className='d-flex align-center'>
					<img width={40} height={40} src='/react-project/img/logo.png' />
					<div>
						<h3 className='text-uppercase'>React Sneakers</h3>
						<p className='opacity-5'>Магазин лучших кросовок</p>
					</div>
				</div>
			</Link>
			<ul className='d-flex'>
				<li onClick={props.onClickCart} className='mr-30 cu-p'>
					<img
						width={18}
						height={18}
						src='/react-project/img/cart.svg'
						alt='drawer'
					/>
					<span>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
						<img
							className='cu-p mr-30'
							width={18}
							height={18}
							src='/react-project/img/heart.svg'
							alt='fav'
						/>
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img
							width={18}
							height={18}
							src='/react-project/img/user.svg'
							alt='user'
						/>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
