'use client'

import { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../config/redux/hooks';
import { toggleDropdown } from '../config/redux/slices/dropdownSlice';

export const SearchBar = (props:any) => {
    const dispatch = useAppDispatch();
    
    const [search, setSearch] = useState('');

    const dropdown = useAppSelector((state) => state.dropdown);
    return (
        <div className="flex rounded bg-white transition-all justify-between duration-100 w-[50%] searchBar">
            <div className="flex items-center gap-2 text-black border-r-[1px] rounded-l border-neutral-500 bg-white px-2 cursor-pointer transition-all hover:bg-slate-100" onClick={(e) => {e.stopPropagation(); dispatch(toggleDropdown())}}>
                <button className="text-xs font-semibold">{dropdown.selectedOption}</button>
                <BsFillCaretDownFill className="text-xs" />
            </div>
            <div className="flex w-[70%] px-2">
                <input type="text" className='text-black' placeholder="Search IMdb" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex px-2 py-1">
                <AiOutlineSearch className="text-xl text-slate-500" />
            </div>
        </div>
    );
};