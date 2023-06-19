import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Switch from "react-switch";
import MatrixRain from "../../Backgrounds/MatrixRain/MatrixRain";
import './Home.scss';

function Home(props) {
	let titles = [];
	let [pageHeight, setPageHeight] = useState(window.innerHeight);
	let [checked, setChecked] = useState(false);


	if (props.sharedData) {
		titles = props.sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat();
	}

	useEffect(() => {
		setPageHeight(window.innerHeight);

		window.addEventListener('resize', (e) => setPageHeight(window.innerHeight))
	}, []);

	const HeaderTitleTypeAnimation = React.memo(() => {
		return <TypeAnimation className="title-styles" sequence={titles} repeat={500} />
	}, (props, prevProp) => true);



	return (
		<section id="home" style={{ minHeight: pageHeight }}>
      		<MatrixRain/>
			<div className="row aligner">
				<div className="col-md-12">
					<div>
						<span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
						<br />
						<h1 className="mb-0">
							{/* <Typical steps={[name]} wrapper="p" /> */}
							<TypeAnimation sequence={['Daniel Cermann']} wrapper="span" />
						</h1>
						<div className="title-container">
							<HeaderTitleTypeAnimation />
						</div>
						<Switch
							checked={checked}
							onChange={() => {
								setChecked(!checked);
								setTheme();
							}}
							offColor=""
							onColor=""
							className="react-switch mx-auto"
							width={90}
							height={40}
							uncheckedIcon={
								<span
									className="iconify unchecked-icon"
									data-icon="twemoji:owl"
									data-inline="false"
								></span>
							}
							checkedIcon={
								<span
									className="iconify checked-icon"
									data-icon="noto-v1:sun-with-face"
									data-inline="false"
								></span>
							}
							id="icon-switch"
						/>
						<div className="language-container">
							<div className="language">
								<div onClick={props.switchToPrimaryLang} style={{ display: "inline" }} >
									<span
										className="iconify language-icon mr-5"
										data-icon="twemoji-flag-for-flag-united-kingdom"
										data-inline="false"
										id={window.$primaryLanguageIconId}
									></span>
								</div>
								<div
									onClick={props.switchToSecondaryLang}
									style={{ display: "inline" }}
								>
									<span
										className="iconify language-icon"
										data-icon="twemoji-flag-for-flag-germany"
										data-inline="false"
										id={window.$secondaryLanguageIconId}
									></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function setTheme() {
	const dataThemeAttribute = "data-theme";
	const body = document.body;
	const newTheme = body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
	body.setAttribute(dataThemeAttribute, newTheme);
}

export default Home