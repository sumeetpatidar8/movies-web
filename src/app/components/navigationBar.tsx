'use client'
import { createPortal } from "react-dom";
import { Button } from "./button";
import { Dropdown } from "./dropdown";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { BiMenu } from "react-icons/bi";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { MenuModal } from "./menuModal";

export const NavigationBar = () => {
    return(
        <nav className="bg-secondary items-center py-1 px-10 flex justify-between gap-10 relative">
            <Logo />
            <Button icon={BiMenu} text={"Menu"} />
            <SearchBar />
            <Button icon={BiSolidBookmarkPlus} text={"Watchlist"} badge={"1"} />
            <Button image={BiMenu} text={"Sign in"} />
            <Dropdown />
            {createPortal(
                <MenuModal/>,
                document.body
            )}
        </nav>
    )
};