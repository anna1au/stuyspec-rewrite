import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/CollapsibleSearch.module.css";

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
		<div id={styles.collapsible_search_parent}>
			<form onSubmit={submitSearchRequest}>
				<div
					style={{
						display: !searchBar ? "block" : "none", // Icon is always the opposite visibility of the textbox
						transition: "visibility 0s, opacity 0.2s linear",
					}}
					id={styles.search_button}
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
					id={styles.search_textbox}
					style={{
						marginRight: searchBar ? "0" : "-250px", // To animate coming from the right side
						opacity: searchBar ? "1" : "0",
					}}
					placeholder="Search"
					onFocus={onSearchFocus}
					onChange={(e) => setSearchValue(e.target.value)}
					onBlur={onSearchBlur}
					autoFocus
					ref={textInput}
				/>
			</form>
		</div>
	);
};

export default CollapsibleSearch;
