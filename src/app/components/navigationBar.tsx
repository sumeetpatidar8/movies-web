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
        <nav className="bg-secondary items-center py-1 px-10 flex justify-between max-lg:gap-20 max-sm:gap-2 max-sm:px-4 relative">
            <Button icon={BiMenu} id="menu" onClick={() => {dispatch(showModal({id: 'SIDEMENU'}))}} />
            <Logo />
            <Button icon={BiMenu} text={"Menu"} onClick={handleMenu} class="max-lg:hidden" />
            <SearchBar />
            <Button icon={BiSolidBookmarkPlus} text={"Watchlist"} class="max-lg:hidden" onClick={() => dispatch(showModal({id: 'WATCHLIST'}))} badge={watchlistLength.watchlistLength>0?(watchlistLength.watchlistLength):('')} />
            <Button image={BiMenu} text={"Sign in"} class="max-lg:hidden" />
            <Dropdown />
            {createPortal(
                <MenuModal/>,
                document.body
            )}
        </nav>
    )
};