'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineCheck, AiOutlineStar } from "react-icons/ai";
import { Button } from './button';
import { BiPlus, BiInfoCircle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { Navigation } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { showModal } from "../config/redux/slices/modalSlice";
import { fetchMultipleSingleData } from "../config/redux/slices/movieListSlice";
import { addItem } from "../config/redux/slices/watchListSlice";

export const MoviesList = () => {
    const pagination = {
        clickable: true,
        renderBullet: function ( index: any, className: any ) {
            return '<span class="' + className + '">' + ( index + 1 ) + '</span>';
        }
    };
    const data = useAppSelector( ( state ) => state.data.movieList );
    const dispatch = useAppDispatch();
    const ratingModal = useAppSelector( ( state ) => state.visible.modal[ 'RATING' ] );
    const session = useMemo( () => {
        const storedData = sessionStorage.getItem( 'movieData' );
        return storedData ? JSON.parse( storedData ) : [];
    }, [] );
    const [ info, setInfo ]: any = useState( session );
    const [ reload, setReload ] = useState( false );
    const initialWatchlistStatus = useMemo( () => {
        const storedStatus = sessionStorage.getItem( 'watchlistStatus' );
        return storedStatus ? JSON.parse( storedStatus ) : {};
    }, [] );

    const [ watchlistStatus, setWatchlistStatus ] = useState( initialWatchlistStatus );

    const ratingSession = sessionStorage.getItem( 'rating' );
    const ratedId = sessionStorage.getItem( 'ratedId' );
    const [ ratingData, setRatingData ]: any = useState( [] );

    useEffect( () => {
        if ( data.ids ) {
            dispatch( fetchMultipleSingleData( data.ids ) );
        }

        if ( session ) {
            setInfo( session );
            setReload( false );
        } else {
            setReload( true );
        }

        if ( ratingSession ) {
            const result = JSON.parse( ratingSession );
            setRatingData( result );
        }

    }, [ dispatch, data, session, ratingModal, ratingSession ] );

    const handleModal = useCallback( ( e: any, imdbId: string ) => {
        e.stopPropagation();
        dispatch( showModal( { id: 'MOVIE', imdbId: imdbId } ) );
    }, [ dispatch ] );

    const handleWatchlist = useCallback( ( e: any, imdbId: string ) => {
        e.stopPropagation();
        info.map( ( item: any ) => {
            if ( item.imdbID === imdbId ) {
                dispatch( addItem( item ) );
                const updatedStatus = {
                    ...watchlistStatus,
                    [ imdbId ]: true,
                };
                setWatchlistStatus( updatedStatus );

                sessionStorage.setItem( 'watchlistStatus', JSON.stringify( updatedStatus ) );
            }
        } );
    }, [ dispatch, info, watchlistStatus ] );


    return (
        <>
            <div className="flex flex-col items-start gap-4 mb-10">
                <h1 className="text-yellow text-2xl font-semibold">What to Watch</h1>
                <div className="flex items-center font-semibold title required relative gap-2 pl-4 cursor-pointer">
                    <h2>Top Picks</h2>
                    <BsChevronRight className="stroke-2 icon transition-all" />
                </div>
                <p className="text-gray-400 text-sm font-semibold">Tv Shows and Movies just for you</p>
            </div>

            {
                Object.keys( data.entities ).length > 0 ? (
                    <Swiper
                        slidesPerView={ 5 }
                        spaceBetween={ 30 }
                        pagination={ pagination }
                        navigation={ true }
                        modules={ [ Pagination, Navigation ] }
                        breakpoints={{
                            0: {
                                slidesPerView:1,
                                spaceBetween: 30,
                            },
                            450: {
                                slidesPerView:2,
                                spaceBetween: 30,
                            },
                            650: {
                              slidesPerView: 3,
                              spaceBetween: 30,
                            },
                            950: {
                              slidesPerView: 4,
                              spaceBetween: 30,
                            },
                            1115: {
                              slidesPerView: 5,
                              spaceBetween: 30,
                            },
                          }}
                        className="mySwiper w-full h-full"
                    >
                        { Object.keys( data.entities ).map( ( movieID ) => {
                            const item = data.entities[ movieID ];
                            return (
                                <SwiperSlide key={ movieID } className="flex items-center justify-center">
                                    <div className="block w-full h-full bg-secondary rounded">
                                        <div className="w-full h-[100%] mb-4">
                                            { item ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={ item.Poster }
                                                    alt={ item.Title }
                                                    className="max-w-[100%] w-full max-h-[100%] object-fill"
                                                />
                                            ) : (
                                                <div>Image not available</div>
                                            ) }
                                        </div>
                                        <div className="py-4 px-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <AiFillStar className="fill-yellow" />
                                                    { item && (
                                                        info && (
                                                            info.map( ( value: any ) => {
                                                                if ( value.imdbID === item.imdbID ) {
                                                                    return (
                                                                        value.imdbRating ? (
                                                                            <p className="text-zinc-400 text-sm" key={ value.imdbID }>
                                                                                { value.imdbRating }
                                                                            </p>
                                                                        ) : (
                                                                            <div>Ratings Not Available</div>
                                                                        )
                                                                    );
                                                                }
                                                                return null;
                                                            } )
                                                        )
                                                    ) }
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <AiOutlineStar className="text-modalColor" />
                                                    {
                                                        item && (
                                                            ratingData.some( ( data: any ) => (
                                                                data && data.id === item.imdbID && data.rating !== 0 && data.comment !== ''
                                                            ) ) ? (
                                                                ratingData.map( ( data: any ) => (
                                                                    data.id === item.imdbID && data.rating !== 0 && data.comment !== '' && (
                                                                        <p key={ data.id } className="text-sm text-modalColor">{ data.rating }<span className="text-zinc-400">/10</span></p>
                                                                    )
                                                                ) )
                                                            ) : (
                                                                ''
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            { item ? (
                                                <h2 className="text-semibold">{ item.Title }</h2>
                                            ) : (
                                                <h2 className="text-semibold">No Title</h2>
                                            ) }
                                            <div className="mt-6">
                                                { item && (
                                                    <Button
                                                        text="Watchlist"
                                                        buttonBg="#FFFFFF14"
                                                        content="center"
                                                        width="100%"
                                                        id="watchlist"
                                                        icon={ watchlistStatus[ item.imdbID ] ? AiOutlineCheck : BiPlus }
                                                        textStyle="text-sm text-tertiary font-medium"
                                                        iconStyle="#5799ef"
                                                        onClick={ ( e: any ) => handleWatchlist( e, item.imdbID ) }
                                                    />
                                                ) }
                                            </div>
                                            {
                                                item ? (
                                                    <div className="flex items-center w-full justify-between mt-4">
                                                        <Button text="Trailer" icon={ BsFillPlayFill } textStyle="text-sm" />
                                                        <div
                                                            className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer"
                                                            onClick={ ( e: any ) => handleModal( e, item.imdbID ) }
                                                        >
                                                            <BiInfoCircle className="text-xl" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>No Data</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        } ) }
                    </Swiper>
                ) : (
                    <div className="w-full text-xl flex justify-center items-center h-full text-yellow">
                        Data Not Found!
                    </div>
                )
            }


        </>
    );
};