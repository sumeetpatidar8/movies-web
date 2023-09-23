'use client';

import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { BiTrash, BiX } from "react-icons/bi";
import { hideModal, showModal } from "../config/redux/slices/modalSlice";
import React, { useCallback, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button } from "./button";
import { removeItem, removeMultipleItems } from "../config/redux/slices/watchListSlice";
import { Rating } from './rating';

export const WatchlistModal = () => {
    const dispatch = useAppDispatch();
    const watchlistModal = useAppSelector( ( state ) => state.visible.modal[ 'WATCHLIST' ] );
    const ratingModal = useAppSelector((state) => state.visible.modal['RATING']);
    const watchlist = useAppSelector( ( state ) => state.watch );
    const info = watchlist.entities;
    const [ selectedItems, setSelectedItems ] = useState<Set<string>>( new Set() );
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const ratingSession = typeof window !== 'undefined' && localStorage.getItem('rating');
    const [ratingData, setRatingData]:any = useState([]);

    useEffect(() => {
        if(ratingSession) {
            const result = JSON.parse(ratingSession);
            setRatingData(result);
        }

    },[ratingModal, ratingSession])

    useEffect(() => {
        if ( watchlistModal.isVisible ) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    },[watchlistModal])

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
        setSelectAllChecked(false);
        const session = typeof window !== 'undefined' && localStorage.getItem('watchlistStatus');
        if(session) {
            const status = JSON.parse(session);
            const updatedStatus = {...status};
            selectedItemsArray.forEach((item:any) => {
                updatedStatus[item] = false;
            })
            typeof window !== 'undefined' && localStorage.setItem('watchlistStatus', JSON.stringify(updatedStatus));
        }
    }, [ dispatch, selectedItemsArray ] );


    const handleSingleDelete = useCallback((imdbID:string) => {
        dispatch( removeItem( imdbID ) );
        setSelectedItems( new Set() );
        const session = typeof window !== 'undefined' && localStorage.getItem('watchlistStatus');
        if(session) {
            const status = JSON.parse(session);
            const updatedStatus = {
                ...status,
                [imdbID]: false,
            }
            typeof window !== 'undefined' && localStorage.setItem('watchlistStatus', JSON.stringify(updatedStatus));
        }
    },[dispatch])
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

    const handleSelectAll = () => {
        if (selectAllChecked) {
            setSelectedItems(new Set());
        } else {
            const allItemKeys = Object.keys(info || {});
            setSelectedItems(new Set(allItemKeys));
        }
        setSelectAllChecked(!selectAllChecked);
    };

  
    const handleRating = useCallback((id: string) => {
        dispatch(showModal({id: 'RATING', imdbId: id}));
    },[dispatch])
    

    return (
        <div className="fixed z-10 top-0 left-0 w-full h-full flex-col bg-transparent transition-all py-20 px-80" style={ watchlistModal.isVisible ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: -1 } }>
            <div className="fixed top-0 right-0 h-full overflow-y-auto w-full transition-all" style={ watchlistModal.isVisible ? { transform: 'translateX(0px)', zIndex: 20 } : { transform: 'translateX(200px)', zIndex: 0 } }>
                <div className="bg-gray-100 py-6 flex items-center justify-between px-4 border-y-[1px] border-zinc-500 text-gray-900">
                    <h1 className="text-2xl font-medium">Your Watchlist</h1>
                    <div className="cursor-pointer flex justify-end">
                        <BiX className="hover:bg-zinc-200/75 rounded-3xl transition-all w-[40px] h-[40px] py-2 text-3xl text-black" onClick={ () => dispatch( hideModal( { id: 'WATCHLIST' } ) ) } />
                    </div>
                </div>
                <div className="bg-gray-100 py-4 px-4 border-b-[1px] flex justify-between border-zinc-500 text-gray-500">
                    <p className="text-xs">{ watchlist.watchlistLength > 0 ? ( watchlist.watchlistLength ) : ( '' ) }  Titles</p>
                    <div className="flex gap-10 items-center">
                        <p className="text-xs flex items-center gap-2"><span className="text-[#e88c02] text-bold">{ selectedItemsLength > 0 ? selectedItemsLength : '' }</span> Selected</p>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleSelectAll}>
                            <input type="checkbox"
                                className="cursor-pointer"
                                checked={selectAllChecked}
                                onChange={handleSelectAll}
                            />
                            <p className="text-xs">Select All</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-[70.5vh] overflow-y-auto" id="watchlistModal">
                    {
                        info ? (
                            Object.keys( info ).map( ( item ) => {
                                const data = info[ item ];
                                return (
                                    <React.Fragment key={data.imdbID}>
                                        { data && (
                                            <>
                                                <div className="flex max-xs:flex-col max-xs:items-center gap-4 bg-white px-4 pb-6 pt-6 text-black hover:bg-slate-100 border-b-[1px] transition-all border-slate-400">
                                                    <div className="w-[10rem] max-sm:w-[20rem] max-xs:w-[10rem] mb-4">
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
                                                                        onChange={() => handleItemSelect(item)}
                                                                    />
                                                                </div>
                                                                <BiTrash className="cursor-pointer" onClick={ ( e: any ) => {
                                                                    handleSingleDelete(data.imdbID)
                                                                } } />
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
                                                            <p>{ data.Actors.replace( /,/g, " | " ) }</p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <AiFillStar className="fill-yellow" />
                                                            <p className="text-zinc-400 font-semibold text-sm"><span className="text-zinc-600">{ data.imdbRating }</span> / 10</p>
                                                        </div>
                                                        <div 
                                                        onClick={(e:any) => {e.stopPropagation(); handleRating(data.imdbID)}}
                                                        className="flex items-center gap-1 cursor-pointer transition-all ease-{cubic-bezier(0.230, 1.000, 0.320, 1.000)} hover:scale-105 hover:text-modalColor">
                                                            <AiOutlineStar className="stroke-slate-500" />
                                                        <p className="font-medium text-xs">
                                                             {
                                                                ratingData.some((item: any) => (
                                                                  item && item.id === data.imdbID && item.rating !== 0 && item.comment !== ''
                                                                )) ? (
                                                                  ratingData.find((item: any) => (
                                                                    item.id === data.imdbID && item.rating !== 0 && item.comment !== ''
                                                                  )).rating
                                                                ) : (
                                                                  'Rating'
                                                                )
                                                              }
                                                        </p>
                                                        </div>
                                                        <Rating imdb={data.imdbID} />
                                                        </div>
                                                        <div className="text-black">
                                                            <p className="text-sm max-sm:text-[10px] ">{ data.Plot }</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) }
                                    </React.Fragment>
                                );
                            } )
                        ) : (
                            <div>Data Not Found</div>
                        )
                    }
                </div>
                <div className="flex text-black bg-gray-100 border-t-[1px] border-zinc-500 py-2 justify-center">
                    <Button text="Delete All" buttonBg="#c70606" textStyle="text-white text-sm font-medium" onClick={ ( e: any ) => { e.stopPropagation(); handleDelete(); } } />
                </div>
            </div>
        </div>
    );
};