import { Project as ProjectData } from "../loaded_data_types";

function Project(props: ProjectData) {
	return (
		<div className="col-sm-12 col-md-6">
		<div className="project reveal h-100 p-4">
			<div className="project-header">
				<span className="fancy-title">{props.title}</span>
				<span className="project-year">{props.startDate}</span>
			</div>
			<div>
				<a
					className="image-container"
					href={props.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={props.images[0]}
						alt={props.title}
						className="screen"
					/>
					<img
						src="/images/projects/laptop_blank_bottom.svg"
						alt=""
						className="laptop"
					/>
				</a>
				<p className="description">{props.description}</p>
				{props.technologies && props.technologies.length > 0 && (
					<div className="tech-badges">
						{props.technologies.map((tech, i) => (
							<span key={i} className="tech-badge" title={tech.name}>
								<i className={tech.class}></i>
							</span>
						))}
					</div>
				)}
				<a
					href={props.url}
					target="_blank"
					rel="noopener noreferrer"
					className="project-link"
				>
					View Project →
				</a>
			</div>
		</div>
		</div>
	);
}

export default Project;
