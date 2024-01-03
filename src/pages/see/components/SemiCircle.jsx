import { useEffect } from "react"
import { useRef } from "react"

const rotateLevels = [72.5, 50, 9.6, -13.8, -34, -55.8]

const SemiCircle = ({ value }) => {
	const arcRef = useRef(null)
	const pointerRef = useRef(null)

	const setLevel = (value, ref) => {
		const arc = ref.current
		const pointer = pointerRef.current
		pointer.getElementById('needle').style.transform = `rotate(${rotateLevels[value]}deg)`

		const paths = arc.querySelectorAll('path:not(#outer)')
		paths.forEach((path, index) => {
			if (index !== value) {
				path.style.transitionDelay = '.2s'
				path.style.opacity = 0
			}
			else {
				path.style.transitionDelay = '0s'
				path.style.opacity = 1
			}
		})
	}

	useEffect(() => {
		setLevel(0, arcRef)
		const pointer = pointerRef.current
		pointer.style.transform = 'translateX(-50%)'
	}, [])

	useEffect(() => {
		setLevel(value, arcRef)
	}, [value])
	return (
		<div className="relative w-fit">
			<svg ref={arcRef} id="meter" viewBox="0 0 161 80" width="161" height="80">
				<defs>
					<linearGradient id="progressGradient" x1="155.69" x2="4.19" y1="25.13" y2="26.63" gradientTransform="matrix(1 0 0 -1 -.04 81.98)" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="#36a510" />
						<stop offset=".14" stopColor="#40b107" />
						<stop offset=".38" stopColor="#80c52a" />
						<stop offset=".65" stopColor="#dbee00" />
						<stop offset=".82" stopColor="#c3811f" />
						<stop offset=".97" stopColor="#e13226" />
					</linearGradient>
				</defs>
				<path id="high2" fill="url(#progressGradient" d="M66.94 21.52a60.68 60.68 0 0 1 46 7.91 60 60 0 0 1 25.28 33.09L157.6 57a79 79 0 0 0-3.76-10 80.3 80.3 0 0 0-18.45-25.5 81.51 81.51 0 0 0-12.48-9.5 80.53 80.53 0 0 0-22.44-9.51 81.57 81.57 0 0 0-40 0A80.53 80.53 0 0 0 38 12a80.44 80.44 0 0 0-21.18 19A79.08 79.08 0 0 0 .19 74 5.67 5.67 0 0 0 6 80h8.12a6.5 6.5 0 0 0 6.3-6 58.88 58.88 0 0 1 2.3-11.47A59.66 59.66 0 0 1 32.14 44 61.41 61.41 0 0 1 38 37.33a60.35 60.35 0 0 1 28.94-15.81z" />
				<path id="high1" fill="url(#progressGradient)" d="M67 21.52a60.68 60.68 0 0 1 46 7.91A60.7 60.7 0 0 1 128.82 44l15.33-13a80.77 80.77 0 0 0-127.3 0A79.31 79.31 0 0 0 .22 74 5.68 5.68 0 0 0 6 80h8.13a6.5 6.5 0 0 0 6.29-6 60.39 60.39 0 0 1 2.3-11.47A60.35 60.35 0 0 1 48 29.43a60.43 60.43 0 0 1 19-7.91z" />
				<path id="medium2" fill="url(#progressGradient)" d="M80.53 20A60.94 60.94 0 0 0 67 21.47 60.53 60.53 0 0 0 32.2 44a59.55 59.55 0 0 0-9.45 18.5 58.78 58.78 0 0 0-2.3 11.46 6.5 6.5 0 0 1-6.3 6H6a5.66 5.66 0 0 1-5.78-6A79.15 79.15 0 0 1 16.87 31a81 81 0 0 1 83.66-28.54l-6.47 19A60.92 60.92 0 0 0 80.53 20z" />
				<path id="medium1" fill="url(#progressGradient)" d="M60.45 2.46a80.56 80.56 0 0 0-34.93 19A82.69 82.69 0 0 0 16.79 31 79.15 79.15 0 0 0 .17 74a5.66 5.66 0 0 0 5.78 6h8.12a6.49 6.49 0 0 0 6.3-6 58.78 58.78 0 0 1 2.3-11.46A59.55 59.55 0 0 1 32.12 44 61.51 61.51 0 0 1 38 37.27a60.5 60.5 0 0 1 28.9-15.8z" />
				<path id="low2" fill="url(#progressGradient)" d="M48 29.38L38.09 12a80.72 80.72 0 0 0-21.22 19A79.15 79.15 0 0 0 .25 74a5.66 5.66 0 0 0 5.78 6h8.12a6.5 6.5 0 0 0 6.3-6 58.78 58.78 0 0 1 2.3-11.46A59.55 59.55 0 0 1 32.2 44 60.55 60.55 0 0 1 48 29.38z" />
				<path id="low1" fill="url(#progressGradient)" d="M32.23 44L16.92 31A79.21 79.21 0 0 0 .23 73.91a5.67 5.67 0 0 0 5.77 6h8.12a6.49 6.49 0 0 0 6.31-6 58.65 58.65 0 0 1 2.32-11.46A59.68 59.68 0 0 1 32.23 44z" />
				<path id="outer" fill="none" stroke="#09101d" strokeWidth="2" d="M14.13 79H6a4.67 4.67 0 0 1-4.78-5 78.89 78.89 0 0 1 25-51.8 79.78 79.78 0 0 1 108.48 0 78.33 78.33 0 0 1 25 51.8 4.67 4.67 0 0 1-4.7 5h-8.12a5.51 5.51 0 0 1-5.31-5.09 59.84 59.84 0 0 0-2.34-11.65 61 61 0 0 0-15.59-25.62 61.54 61.54 0 0 0-86.28 0 61 61 0 0 0-15.59 25.57 59.84 59.84 0 0 0-2.34 11.65 5.51 5.51 0 0 1-5.3 5.14z" />
				<line x1="47.87" x2="38.43" y1="27.7" y2="12.88" fill="none" stroke="#09101d" strokeWidth="2" />
				<line x1="112.92" x2="122.55" y1="28.3" y2="13.18" fill="none" stroke="#09101d" strokeWidth="2" />
			</svg>
			<svg ref={pointerRef} id="pointer" className="absolute bottom-0 left-1/2" width="9" height="49" viewBox="0 0 9 49" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="needle">
					<path d="M4.41492 48.7434C6.85322 48.7434 8.82985 46.9905 8.82985 44.8282C8.82985 42.6658 6.85322 40.9129 4.41492 40.9129C1.97663 40.9129 -1.277e-06 42.6658 -1.32817e-06 44.8282C-1.37934e-06 46.9905 1.97663 48.7434 4.41492 48.7434Z" fill="black" />
					<path d="M-1.32817e-06 44.8282L3.418 1.37448C3.51466 0.145699 5.31519 0.145686 5.41185 1.37446L8.82985 44.8282" fill="black" />
				</g>
			</svg>
		</div>
	)
}

export default SemiCircle