import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './search-input.module.scss';

type SearchInputProps = {
  label: string;
  placeholder: string;
  onSearch: (city: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ label, placeholder, onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <form className={styles['search-form']} onSubmit={handleSubmit}>
      {label && <label htmlFor='query'>{label} :</label>}
      <div>
        <input
          id='query'
          type='text'
          value={query}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
        <button type='submit'>Search</button>
      </div>
    </form>
  );
};

export default SearchInput;
