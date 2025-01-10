import axios from 'axios'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
function App() {
	const [cartOpened, setCartOpened] = React.useState(false)
	const [Cartitems, setCartitems] = React.useState([])
	const [favorites, setFavorites] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [items, setItems] = React.useState([])
	React.useEffect(() => {
		axios.get('https://677900f8482f42b62e902661.mockapi.io/items').then(res => {
			setItems(res.data)
		})
		axios.get('https://677900f8482f42b62e902661.mockapi.io/cart').then(res => {
			setCartitems(res.data)
		})
		axios
			.get('https://677adecc671ca030683509e5.mockapi.io/favorites')
			.then(res => {
				setFavorites(res.data)
			})
	}, [])

	const onAddToCart = obj => {
		axios.post('https://677900f8482f42b62e902661.mockapi.io/cart', obj)
		setCartitems(prev => [...prev, obj])
	}

	const onRemoveItem = id => {
		axios.delete(`https://677900f8482f42b62e902661.mockapi.io/cart/${id}`)
		setCartitems(prev => prev.filter(item => item.id !== id))
	}

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => favObj.id == obj.id)) {
				axios.delete(
					`https://677adecc671ca030683509e5.mockapi.io/favorites/${obj.id}`
				)
			} else {
				const { data } = await axios.post(
					'https://677adecc671ca030683509e5.mockapi.io/favorites',
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить в избранные!')
		}
	}
	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer
					items={Cartitems}
					onClose={() => {
						setCartOpened(false)
					}}
					onRemove={onRemoveItem}
				/>
			)}
			<Header
				onClickCart={() => {
					setCartOpened(true)
				}}
			/>
			<Routes>
				<Route
					path='/'
					element={
						<Home
							items={items}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddFavorite={onAddToFavorite}
							onAddToCart={onAddToCart}
						/>
					}
				/>
				<Route
					path='/favorites'
					element={
						<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
					}
				/>
			</Routes>
		</div>
	)
}

export default App
