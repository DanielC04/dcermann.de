import React from 'react'
import './Sidebar.scss'
import { HashLink } from 'react-router-hash-link'

function Sidebar(props) {
	return (
		<div className='sidebar'>
			<HashLink to='/#home'>
				<img className='logo' src='dc-logo.svg' alt='DANIEL'/>
			</HashLink>
			<div>
				{
					props.sections.map((section, id) =>
						<HashLink to={`#${section}`} key={id} className={`section-label ${section === props.activeSection && 'active'}`}>
							{section}
						</HashLink>
					)
				}
			</div>
		</div>
	)
}

export default Sidebar