'use client';
import { Button } from "./button";
import { Dropdown } from "./dropdown";
import { Logo } from "./logo";
import { BiMenu, BiX } from "react-icons/bi";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { hideModal, showModal } from "../config/redux/slices/modalSlice";

export const MobileNavigationBar = () => {
    const watchlistLength = useAppSelector( ( state ) => state.watch );
    const sideMenu = useAppSelector((state) => state.visible.modal['SIDEMENU']);
    const dispatch = useAppDispatch();

    const handleMenu = () => {
        dispatch( showModal( { id: 'MENU' } ) );
    };

    return (
        <nav className="bg-secondary absolute top-0 py-1 px-10 flex py-8 rounded flex-col gap-4 w-[300px] justify-between z-10 transition-all" style={sideMenu.isVisible?{left: '0'}:{left: '-300px'}}>
            <div className="flex justify-between mb-4">
                <Logo />
                <Button icon={ BiX } rounded={ '50%' } onClick={() => dispatch(hideModal({id: 'SIDEMENU'}))} />
            </div>
            <div className="flex flex-col gap-2">
            <Button icon={ BiMenu } text={ "Menu" } onClick={ handleMenu } />
            <Button icon={ BiSolidBookmarkPlus } text={ "Watchlist" } onClick={ () => dispatch( showModal( { id: 'WATCHLIST' } ) ) } badge={ watchlistLength.watchlistLength > 0 ? ( watchlistLength.watchlistLength ) : ( '' ) } />
            <Button image={ BiMenu } text={ "Sign in" } />
            </div>
            <Dropdown />
        </nav>
    );
};