import React from 'react';
import { useForm } from '../../hooks/useForm';
const SearchBar: React.FC = () => {
	const [{ searchInput }, setSearchInput] = useForm({ searchInput: '' });
	console.log(searchInput);
	return (
		<input
			style={{ marginLeft: '10px' }}
			className="navbar__search-field"
			type="text"
			placeholder="Search:"
			onChange={setSearchInput}
			value={searchInput}
			name="searchInput"
		/>
	);
};

export default SearchBar;
