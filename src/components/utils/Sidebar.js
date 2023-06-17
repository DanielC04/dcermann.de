import React from 'react'
import './Sidebar.scss'
import { HashLink } from 'react-router-hash-link'

function Sidebar(props) {
	return (
		<div className='sidebar'>
			<span className='logo'>DANIEL</span>
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