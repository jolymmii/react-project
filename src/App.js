import axios from 'axios'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Drawer from './components/Drawer/Drawer'
import Header from './components/Header'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'

export const AppContext = React.createContext()

function App() {
	const [cartOpened, setCartOpened] = React.useState(false)
	const [Cartitems, setCartitems] = React.useState([])
	const [favorites, setFavorites] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [items, setItems] = React.useState([])
	const [isLoading, setisLoading] = React.useState(true)
	React.useEffect(() => {
		async function fetchData() {
			try {
				const cartResponse = await axios.get(
					'https://677900f8482f42b62e902661.mockapi.io/cart'
				)
				const favoritesResponse = await axios.get(
					'https://677adecc671ca030683509e5.mockapi.io/favorites'
				)
				const itemsResponse = await axios.get(
					'https://677900f8482f42b62e902661.mockapi.io/items'
				)
				setisLoading(false)
				setCartitems(cartResponse.data)
				setFavorites(favoritesResponse.data)
				setItems(itemsResponse.data)
			} catch (error) {
				alert('Ошибка при запросе данных ')
			}
		}
		fetchData()
	}, [])

	React.useEffect(() => {
		const savedFavorites = JSON.parse(localStorage.getItem('favorites'))
		if (savedFavorites) {
			setFavorites(savedFavorites)
		} else {
			const fetchFavorites = async () => {
				try {
					const { data } = await axios.get(
						'https://677adecc671ca030683509e5.mockapi.io/favorites'
					)
					setFavorites(data)
					localStorage.setItem('favorites', JSON.stringify(data)) // Сохраняем в localStorage
				} catch (error) {
					alert('Не удалось загрузить избранные!')
				}
			}
			fetchFavorites()
		}
	}, [])

	React.useEffect(() => {
		// Сохраняем избранные в localStorage при их изменении
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	const onAddToCart = async obj => {
		try {
			const existingItem = Cartitems.find(
				item => Number(item.itemId) === Number(obj.id)
			)
			if (existingItem) {
				await axios.delete(
					`https://677900f8482f42b62e902661.mockapi.io/cart/${existingItem.id}`
				)
				setCartitems(prev =>
					prev.filter(item => Number(item.itemId) !== Number(obj.id))
				)
			} else {
				const { data } = await axios.post(
					'https://677900f8482f42b62e902661.mockapi.io/cart',
					{
						...obj,
						itemId: obj.id, // Сохраняем оригинальный ID
					}
				)
				setCartitems(prev => [...prev, { ...obj, id: data.id, itemId: obj.id }])
			}
		} catch (error) {
			alert('Не удалось добавить в Корзину')
		}
	}

	const onRemoveItem = id => {
		try {
			axios.delete(`https://677900f8482f42b62e902661.mockapi.io/cart/${id}`)
			setCartitems(prev => prev.filter(item => item.id !== id))
		} catch (error) {
			alert('Ошибка при удалени из корзины')
			console.error(error)
		}
	}

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}

	const onAddToFavorite = async obj => {
		try {
			// Проверяем, есть ли товар уже в избранном
			const isFavorited = favorites.some(
				favObj => Number(favObj.itemId) === Number(obj.id)
			)

			if (isFavorited) {
				// Удаление из избранных
				const favItem = favorites.find(
					favObj => Number(favObj.itemId) === Number(obj.id)
				)
				await axios.delete(
					`https://677adecc671ca030683509e5.mockapi.io/favorites/${favItem.id}`
				)
				setFavorites(prev => prev.filter(item => item.id !== favItem.id))
			} else {
				// Добавление в избранные
				const { data } = await axios.post(
					'https://677adecc671ca030683509e5.mockapi.io/favorites',
					{
						...obj,
						itemId: obj.id, // Сохраняем оригинальный ID для связи
					}
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить/удалить товар из избранных!')
		}
	}

	const isItemAdded = id => {
		return Cartitems.some(obj => Number(obj.itemId) === Number(id))
	}
	const isItemFavorited = id => {
		return favorites.some(obj => Number(obj.itemId) === Number(id))
	}

	return (
		<AppContext.Provider
			value={{
				items,
				Cartitems,
				favorites,
				isItemAdded,
				isItemFavorited,
				setFavorites,
				onAddToFavorite,
				setCartOpened,
				setCartitems,
				onAddToCart,
			}}
		>
			<div className='wrapper clear'>
				<Drawer
					items={Cartitems}
					onClose={() => {
						setCartOpened(false)
					}}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>
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
								Cartitems={Cartitems}
								items={items}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/orders' element={<Orders />} />
				</Routes>
			</div>
			)
		</AppContext.Provider>
	)
}

export default App
