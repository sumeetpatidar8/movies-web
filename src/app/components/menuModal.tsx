'use client'

import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { BiX } from "react-icons/bi";
import { hideModal } from "../config/redux/slices/modalSlice";
import { Logo } from "./logo";
import { FaTv } from "react-icons/fa";
import { BiSolidFilm } from "react-icons/bi";
import { BsBookmarkStarFill } from "react-icons/bs";
import { List } from "./list";

interface List {
      [section: string]: {
        icon: React.ElementType; // Define the type for the icon
        category: string[];
      };
  }

const list:List = {
    'Movies': { icon: BiSolidFilm, category: [
        'Release Calendar',
        'Top 250 Movies',
        'Most Popular Movies',
        'Browse Movies By Genre',
        'Top Box Office',
        'ShowTime & Tickets',
        'Movie News',
        'Indian Movie Spotlight'
    ] },
    'TV Shows': { icon: FaTv, category: [
        "What's on Tv & Straming",
        'Top 250 Tv Shows',
        'Most Popular Tv Shows',
        'Browse Tv Show By Genre',
        'Tv News'
    ] },
    'Awards & Events': { icon: BsBookmarkStarFill, category: [
        "Oscars",
        'Emmys',
        "Toronto Int'l Film Festival",
        'Hispanic Heritage Month',
        'STARmeter Awards',
        'Awards central',
        'Festival Central',
        'All Events'
    ] },
}

export const MenuModal = () => {
    const modal = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    return(
        <section className=" bg-secondary absolute z-10 top-0 px-44 py-24 w-screen transition-all duration-200" style={modal.isVisible? {transform: 'translateY(0rem)'} : {transform: 'translateY(-100rem)'}}>
            <div className="flex justify-between">
                <Logo />
                <div className="cursor-pointer bg-yellow text-black rounded-3xl py-2 px-2 transition-all hover:bg-hover">
                <BiX className="text-xl" onClick={() => dispatch(hideModal())} />
                </div>
            </div>
            <div>
                <List data={list}></List>
            </div>
        </section>
    )
}