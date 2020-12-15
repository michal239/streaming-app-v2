import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { gql, useLazyQuery } from '@apollo/client';

import SearchResultDropdown from '../SearchResultDropdown/SearchResultDropdown';

const SEARCH_USERS = gql`
  query user($key: String!, $value: String!) {
    search(key: $key, value: $value) {
      username
      stream {
        viewers
      }
    }
  }
`;

const SearchBar: React.FC = () => {
  const [{ searchInput }, setSearchInput] = useForm({ searchInput: { value: '', touched: false } });
  const [fetchUsers, { data }] = useLazyQuery(SEARCH_USERS, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    const { value } = searchInput;
    if (value.length < 3) return;

    const timer = setTimeout(() => {
      fetchUsers({
        variables: {
          key: 'username',
          value,
        },
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput.value]);

  return (
    <>
      <input
        style={{ marginLeft: '10px' }}
        className="navbar__search-field"
        type="text"
        placeholder="Search:"
        onChange={setSearchInput}
        value={searchInput.value}
        name="searchInput"
      />
      {data && <SearchResultDropdown users={data.search} />}
    </>
  );
};

export default SearchBar;
