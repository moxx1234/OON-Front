import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import data from '../../assets/icons/data.svg'
import hear from '../../assets/icons/hear.svg'
import eye from '../../assets/icons/see.svg'
import logo from '../../assets/logo.svg'
import MenuItem from "./MenuItem"
import { useNavigate } from 'react-router-dom'

const menuItems = [
	{
		id: 'see',
		title: "'see'",
		description: 'invisible/visible health data from your face',
		icon: {
			path: eye,
			alt: 'eye icon'
		},
	},
	{
		id: 'hear',
		title: "'hear/feel'",
		description: 'inaudible/audible health data from your body',
		icon: {
			path: hear,
			alt: 'human body icon'
		}
	},
	{
		id: 'data',
		title: "data",
		description: 'Review your health data summaries',
		icon: {
			path: data,
			alt: 'folder icon'
		}
	},
]

const Menu = () => {
	const [renderedItems, setRenderedItems] = useState(menuItems)
	const [chosenItem, setChosenItem] = useState()
	const controls = useAnimationControls()
	const navigate = useNavigate()

	const transitionDuration = .8

	useEffect(() => {
		if (chosenItem) {
			controls.start({
				x: 100,
				opacity: 0,
				transition: {
					duration: transitionDuration,
					delay: transitionDuration + .2
				}
			})
		}
	}, [chosenItem, controls])

	const handleClick = (e) => {
		e.preventDefault()
		const clickedElement = e.currentTarget
		clickedElement.closest('nav').style.pointerEvents = 'none'
		setRenderedItems(prevItems => prevItems.filter(item => item.id === clickedElement.id))
		setChosenItem(clickedElement.id)
	}
	const handleAnimationComplete = () => {
		navigate(`/${chosenItem}`)
	}

	return (
		<div className='tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center'>
			<div className="tw-flex tw-flex-col tw-items-center tw-gap-14 tw-w-1/3">
				<div><img src={logo} alt="logo" /></div>
				<motion.nav
					className="tw-flex tw-flex-col tw-justify-center tw-gap-6 tw-min-h-[432px] tw-w-full"
					animate={controls}
					onAnimationComplete={handleAnimationComplete}
				>
					<AnimatePresence mode='popLayout'>
						{
							renderedItems.map(item => (
								<motion.div
									key={item.id}
									custom={item.ids}
									exit={{ opacity: 0 }}
									transition={{ duration: transitionDuration }}
									layout
								>
									<MenuItem
										id={item.id}
										icon={item.icon}
										title={item.title}
										description={item.description}
										onClick={handleClick}
									/>
								</motion.div>
							))
						}
					</AnimatePresence>
				</motion.nav>
			</div>
		</div>
	)
}

export default Menu