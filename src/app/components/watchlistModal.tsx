'use client';

import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { BiTrash, BiX } from "react-icons/bi";
import { hideModal } from "../config/redux/slices/modalSlice";
import { useCallback, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Button } from "./button";
import { removeItem, removeMultipleItems } from "../config/redux/slices/watchListSlice";

export const WatchlistModal = () => {
    const dispatch = useAppDispatch();
    const watchlistModal = useAppSelector( ( state ) => state.visible.modal[ 'WATCHLIST' ] );
    const watchlist = useAppSelector( ( state ) => state.watch );
    const info = watchlist.entities;
    const [ selectedItems, setSelectedItems ] = useState<Set<string>>( new Set() );
    if ( watchlistModal.isVisible ) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }

    const handleItemSelect = ( itemKey: string ) => {
        setSelectedItems( ( prevSelectedItems ) => {
            const newSelectedItems = new Set( prevSelectedItems );
            if ( newSelectedItems.has( itemKey ) ) {
                newSelectedItems.delete( itemKey );
            } else {
                newSelectedItems.add( itemKey );
            }
            return newSelectedItems;
        } );
    };

    const selectedItemsLength = selectedItems.size;
    const selectedItemsArray = Array.from( selectedItems );

    const handleDelete = useCallback( () => {
        dispatch( removeMultipleItems( selectedItemsArray ) );
        setSelectedItems( new Set() );
    }, [ dispatch, selectedItemsArray ] );

    function convertMinutesToHoursAndMinutes ( runtime: string ) {
        const parts = runtime.split( " " );

        if ( parts.length === 2 && parts[ 1 ] === "min" ) {
            const minutes = parseInt( parts[ 0 ] );

            const hours = Math.floor( minutes / 60 );
            const remainingMinutes = minutes % 60;

            return `${ hours }h ${ remainingMinutes }m`;
        }

        return runtime;
    }



    return (
        <div className="fixed z-10 top-0 left-0 w-full h-full flex-col bg-transparent transition-all py-20 px-80" style={ watchlistModal.isVisible ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: -1 } }>
            <div className="fixed top-0 right-0 h-full overflow-y-auto w-[80%] transition-all" style={ watchlistModal.isVisible ? { transform: 'translateX(0px)', zIndex: 20 } : { transform: 'translateX(200px)', zIndex: 0 } }>
                <div className="bg-gray-100 py-6 flex items-center justify-between px-4 border-y-[1px] border-zinc-500 text-gray-900">
                    <h1 className="text-2xl font-medium">Your Watchlist</h1>
                    <div className="cursor-pointer flex justify-end">
                        <BiX className="hover:bg-zinc-200/75 rounded-3xl transition-all w-[40px] h-[40px] py-2 text-3xl text-black" onClick={ () => dispatch( hideModal( { id: 'WATCHLIST' } ) ) } />
                    </div>
                </div>
                <div className="bg-gray-100 py-4 px-4 border-b-[1px] flex justify-between border-zinc-500 text-gray-500">
                    <p className="text-xs">{ watchlist.watchlistLength > 0 ? ( watchlist.watchlistLength ) : ( '' ) }  Titles</p>
                    <p className="text-xs flex items-center gap-2"><span className="text-[#e88c02] text-sm text-extrabold">{ selectedItemsLength > 0 ? selectedItemsLength : '' }</span> Selected</p>
                </div>
                <div className="px-4 bg-white h-[70.5vh] overflow-y-auto" id="watchlistModal">
                    {
                        info ? (
                            Object.keys( info ).map( ( item ) => {
                                const data = info[ item ];
                                return (
                                    <>
                                        { data && (
                                            <>
                                                <div className="flex gap-4 bg-white pb-6 pt-6 text-black border-b-[1px] border-slate-400">
                                                    <div className="w-[15%] mb-4">
                                                        <img src={ data.Poster } alt={ data.Title } className="max-w-[100%] w-full max-h-[100%] object-fill" />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex justify-between">
                                                            <div className="title flex gap-2 items-center cursor-pointer">
                                                                <h1 className="text-2xl font-bold">{ data.Title }</h1>
                                                                <BsChevronRight className="stroke-1 icon text-xl icon transition-all" />
                                                            </div>
                                                            <div className="flex items-center">
                                                                <div className="mr-20">
                                                                    <input type="checkbox"
                                                                        className="cursor-pointer"
                                                                        checked={ selectedItems.has( item ) }
                                                                        onChange={ () => { handleItemSelect( item ); } } />
                                                                </div>
                                                                <BiTrash className="cursor-pointer" onClick={(e:any) => {
                                                                    e.stopPropagation(); 
                                                                    dispatch(removeItem(data.imdbID));
                                                                    setSelectedItems( new Set() );
                                                                    }} />
                                                            </div>
                                                        </div>
                                                        <div className="flex text-xs items-center font-semibold text-zinc-800 gap-1">
                                                            <p>{ data.Year }</p>
                                                            <span>|</span>
                                                            <p>{ convertMinutesToHoursAndMinutes( data.Runtime ) }</p>
                                                            <span>|</span>
                                                            <p>{ data.Rated }</p>
                                                            <span>|</span>
                                                            <div className="flex text-xs items-center font-semibold text-zinc-800 gap-1">
                                                                <p>{ data.Genre }    </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex text-xs items-center font-semibold text-zinc-800 gap-1">
                                                            <p>{ data.Actors.replace( /,/g, "|" ).replace( /\./g, " | " ) }    </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <AiFillStar className="fill-yellow" />
                                                            <p className="text-zinc-600 font-semibold text-sm"><span className="text-zinc-400">{ data.imdbRating }</span> / 10</p>
                                                        </div>
                                                        <div className="text-black">
                                                            <p className="text-sm ">{ data.Plot }</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) }
                                    </>
                                );
                            } )
                        ) : (
                            <div>Data Not Found</div>
                        )
                    }
                </div>
                <div className="flex text-black bg-gray-100 border-t-[1px] border-zinc-500 py-2 justify-center">
                    <Button text="Delete" buttonBg="#c70606" textStyle="text-white text-sm font-medium" onClick={ ( e: any ) => { e.stopPropagation(); handleDelete(); } } />
                </div>
            </div>
        </div>
    );
};