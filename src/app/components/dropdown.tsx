'use client'

import React, { useCallback, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { BiSolidFilm } from "react-icons/bi";
import { FaTv } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { hideDropdown, setSelectedOption } from "../config/redux/slices/dropdownSlice";

const options = [
    {icon: BiSolidFilm, text: 'Movie'},
    {icon: FaTv, text: 'Episode'},
    {icon: FiUsers, text: 'Series'},
]
export const Dropdown = () => {
    const dropdown = useAppSelector((state) => state.dropdown)
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const handleOption = useCallback((option:string) => {
        
        dispatch(setSelectedOption(option));
        dispatch(hideDropdown());
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (dropdown.isVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            dispatch(hideDropdown());
          }
        };
    
        window.addEventListener("click", handleClickOutside);
    
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, [dispatch, dropdown.isVisible]);
    
    return(
        <ul ref={dropdownRef} className="absolute top-[90%] left-[26%] flex flex-col bg-zinc-900 rounded py-4" style={dropdown.isVisible?{opacity:1, zIndex:10, transform:'scale(1)'}:{opacity:0, zIndex:-1, transform:'scale(0)'}}>
            {options.map((item: any) => (
                <React.Fragment key={item.text}>
                    <li value={item.text} onClick={(e) => {e.preventDefault(); handleOption(item.text)}} className="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-zinc-800 transition-all text-md pr-12" style={dropdown.selectedOption === item.text ? {color: '#F5C518'}: {color: 'white'}} ><item.icon/> {item.text}</li>
                </React.Fragment>
            ))}
        </ul>
    )
}