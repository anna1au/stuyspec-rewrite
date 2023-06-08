import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";

const CollapsibleSearch = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchBar, setSearchBar] = useState(false);
	const textInput = useRef<HTMLInputElement>(null);

	const onSearchBlur = () => {
		setSearchBar(false);
	};

	const onSearchFocus = () => {
		setSearchBar(true);
		// Set timeout for 1ms to focus text input AFTER it renders
		setTimeout(() => {
			textInput.current?.focus();
		}, 1);
	};
	function submitSearchRequest(e: FormEvent) {
		e.preventDefault();
		Router.push(String("/search?query=" + searchValue));
	}

	return (
		<>
			<div className="field">
				<form className="control" onSubmit={submitSearchRequest}>
					<div
						style={{
							display: searchBar ? "none" : "block",
							transition: "visibility 0s, opacity 0.5s linear",
						}}
						className="search"
					>
						<Image
							alt="Search"
							src="/images/search-button.svg"
							width={32}
							height={32}
							onClick={onSearchFocus}
							className="button"
						/>
					</div>
					<input
						className="search"
						style={{
							font-family: verdana,
							font-weight: bold,
							position: absolute,
							margin: auto,
							borderRadius: 50%,
							width: searchBar ? "50px" : "50px",
							outline: none,
							border; none,
							display: searchBar ? "inherit" : "none",
							transition: "all 0.8s ease-in-out",
							padding: 0 80px 0 20px,
							opacity: 0,
							z-index: 5,
							fontSize: "1rem",
							&:hover {
								cursor: pointer,
							}
							&:focus {
								width: 300px,
								opacity: 1,
								cursor: text,
							}
							&:focus ~ .search {
								right: -250px,
								z-index: 6,
							}
						}}
						placeholder="Search..."
						onChange={(e) => setSearchValue(e.target.value)}
						onBlur={onSearchBlur}
						autoFocus
						ref={textInput}
					/>
				</form>
			</div>
		</>
	);
};

export default CollapsibleSearch;
