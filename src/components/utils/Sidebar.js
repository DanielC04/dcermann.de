import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.scss'
import { HashLink } from 'react-router-hash-link'

function Sidebar(props) {
	const [activeSection, setActiveSection] = useState('home');
	const sectionRefs = useRef([]);

	useEffect(() => {
		document.querySelectorAll("section").forEach(e => {
			sectionRefs.current.push(e);
		});


		// set observer that checks what section is active
		window.addEventListener('scroll', event => {
			let minDist = Infinity
			let currSection = 'home';
			for (const e of sectionRefs.current) {
				const dims = e.getBoundingClientRect()
				if (Math.abs(dims.top) < minDist) {
					currSection = e.attributes.id.value;
					minDist = Math.abs(dims.top);
				}
			}
			setActiveSection(currSection);
		});
	}, [])



	return (
		<div className='sidebar'>
			<HashLink to='/#home'>
				<img className='logo' src='dc-logo.svg' alt='DANIEL' />
			</HashLink>
			<div>
				{
					props.sections.map((section, id) =>
						<HashLink to={`#${section}`} key={id} className={`section-label ${section === activeSection && 'active'}`}>
							{section}
						</HashLink>
					)
				}
			</div>
		</div>
	)
}

export default Sidebar;