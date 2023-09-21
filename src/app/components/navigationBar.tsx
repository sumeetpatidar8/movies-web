'use client'
import { createPortal } from "react-dom";
import { Button } from "./button";
import { Dropdown } from "./dropdown";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { BiMenu } from "react-icons/bi";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { MenuModal } from "./menuModal";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { showModal } from "../config/redux/slices/modalSlice";

export const NavigationBar = () => {
    const watchlistLength = useAppSelector((state) => state.watch)
    const dispatch = useAppDispatch();

    const handleMenu = () => {
        dispatch(showModal({id: 'MENU'}));
    }

    return(
        <nav className="bg-secondary items-center py-1 px-10 flex justify-between gap-10 relative">
            <Logo />
            <Button icon={BiMenu} text={"Menu"} onClick={handleMenu} />
            <SearchBar />
            <Button icon={BiSolidBookmarkPlus} text={"Watchlist"} onClick={() => dispatch(showModal({id: 'WATCHLIST'}))} badge={watchlistLength.watchlistLength>0?(watchlistLength.watchlistLength):('')} />
            <Button image={BiMenu} text={"Sign in"} />
            <Dropdown />
            {createPortal(
                <MenuModal/>,
                document.body
            )}
        </nav>
    )
};