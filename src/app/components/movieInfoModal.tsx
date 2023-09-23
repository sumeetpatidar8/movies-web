'use client';

import { BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineCheck } from "react-icons/ai";
import { BiPlus, BiX } from "react-icons/bi";
import { Button } from "./button";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { hideModal, showModal } from "../config/redux/slices/modalSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addItem } from "../config/redux/slices/watchListSlice";

export const MovieInfoModal = () => {
    const movieModal = useAppSelector( ( state ) => state.visible.modal[ 'MOVIE' ] );
    // const data = useAppSelector( ( state ) => state.data.singleMovie );
    const dispatch = useAppDispatch();
    const [ data, setData ]: any = useState( null );
    const session = typeof window !== 'undefined' && localStorage.getItem( 'movieData' );
    const initialWatchlistStatus = useMemo(() => {
        const storedStatus = typeof window !== 'undefined' && localStorage.getItem('watchlistStatus');
        return storedStatus ? JSON.parse(storedStatus) : {};
      }, []);
      
      const [watchlistStatus, setWatchlistStatus] = useState(initialWatchlistStatus);

    const isLoading = !data;
    useEffect( () => {
        if ( session ) {
            const info = JSON.parse( session );
            info.map( ( item: any ) => {
                if ( item.imdbID === movieModal.imdbId ) {
                    setData( item );
                }
            } );
        }
    }, [ session, movieModal ] );

    const handleWatchlist = useCallback( () => {
        dispatch( addItem( data ) );
        const updatedStatus = {
            ...watchlistStatus,
            [data.imdbId]: true,
        };
        setWatchlistStatus(updatedStatus);

        typeof window !== 'undefined' && localStorage.setItem('watchlistStatus', JSON.stringify(updatedStatus));
    }, [ dispatch, data, watchlistStatus ] );

    useEffect(() => {
        if (movieModal.isVisible) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }, [movieModal]);
    

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
        <div className="fixed z-10 top-0 left-0 w-full h-full flex-col bg-transparent transition-all py-20 max-xs:px-2 max-2xl:px-40 max-xl/1:px-20 max-lg:px-10 max-xs:py-4 max-sm:px-2 px-80" style={ movieModal.isVisible ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: -1 } }>
            <div className="cursor-pointer flex justify-end">
                <BiX className="hover:bg-zinc-800/75 rounded-3xl transition-all w-[40px] h-[40px] py-2 text-xl text-white" onClick={ ( e: any ) => {
                    e.stopPropagation();
                    dispatch( hideModal( { id: 'MOVIE' } ) );
                } } />
            </div>
            <div className="flex flex-col gap-4 p-10 bg-secondary rounded transition-all" style={ movieModal.isVisible ? { transform: 'scale(1)' } : { transform: 'scale(0)' } }>
                { isLoading ? (
                    <div>Loading ....</div>
                ) : (
                    data ? (
                        <>
                            <div className="flex max-xs:flex-col max-xs:items-center gap-4">
                                <div className="w-[18%] max-xs:w-[30%] max-sm:w-[25%] mb-2">
                                    <img src={ data.Poster } alt={ data.Title } className="max-w-[100%] w-full max-h-[100%] object-fill" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="title flex gap-2 items-center cursor-pointer">
                                        <h1 className="text-2xl font-bold">{ data.Title }</h1>
                                        <BsChevronRight className="stroke-1 icon text-xl icon transition-all" />
                                    </div>
                                    <div className="flex text-xs items-center font-semibold text-zinc-400 gap-1">
                                        <p>{ data.Year }</p>
                                        <span>.</span>
                                        <p>{ convertMinutesToHoursAndMinutes( data.Runtime ) }</p>
                                        <span>.</span>
                                        <p>{ data.Rated }</p>
                                    </div>
                                    <div className="flex text-xs items-center font-semibold text-zinc-400 gap-1">
                                        <p>{ data.Genre.replace( /,/g, "." ).replace( /\./g, " . " ) }    </p>
                                    </div>
                                    <div className="flex text-xs items-center font-semibold text-zinc-400 gap-1">
                                        <p>{ data.Actors.replace( /,/g, "." ).replace( /\./g, " . " ) }    </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AiFillStar className="fill-yellow" />
                                        <p className="text-zinc-600 font-semibold text-sm"><span className="text-zinc-400">{ data.imdbRating }</span> / 10</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm">{ data.Plot }</p>
                            </div>
                            <div className="mt-6">
                                <Button text="Watchlist" id="watchlist" buttonBg='#FFFFFF14' onClick={ ( e: any ) => {
                                    e.stopPropagation();
                                    handleWatchlist();
                                } } content="center" width='100%' icon={watchlistStatus[data.imdbID] ? AiOutlineCheck: BiPlus } 
                                textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                        </>
                    ) : (
                        <div>Data Not Found!</div>
                    )
                ) }
            </div>
        </div>
    );
};