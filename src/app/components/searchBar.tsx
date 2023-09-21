'use client'

import { useCallback, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../config/redux/hooks';
import { toggleDropdown } from '../config/redux/slices/dropdownSlice';
import { fetchData } from '../config/redux/slices/movieListSlice';

export const SearchBar = () => {
    const dispatch = useAppDispatch();
    
    const [search, setSearch] = useState('');

    const dropdown = useAppSelector((state) => state.dropdown);

    const handleSearch = useCallback(() => {
        setSearch('');
        const formattedSearch = search.toLowerCase();
        const formattedSelectedOption = dropdown.selectedOption.toLowerCase().trim();
    
        dispatch(fetchData({ type: formattedSelectedOption, title: formattedSearch }));
    }, [dispatch, search, dropdown.selectedOption]);

    
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className="flex rounded bg-white transition-all justify-between duration-100 w-[50%] searchBar" onKeyDown={handleKeyDown}>
            <div className="flex items-center gap-2 text-black border-r-[1px] rounded-l border-neutral-500 bg-white px-2 cursor-pointer transition-all hover:bg-slate-100" onClick={(e) => {e.stopPropagation(); dispatch(toggleDropdown())}}>
                <button className="text-xs font-semibold">{dropdown.selectedOption}</button>
                <BsFillCaretDownFill className="text-xs" />
            </div>
            <div className="flex w-[80%] px-2">
                <input type="text" className='text-black' placeholder="Search IMdb" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex px-2 py-1 cursor-pointer" onClick={e => {handleSearch()}}>
                <AiOutlineSearch className="text-xl text-slate-500" />
            </div>
        </div>
    );
};