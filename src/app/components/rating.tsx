'use client';
import { useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { hideModal } from "../config/redux/slices/modalSlice";
import { comment } from 'postcss';

export const Rating = ( props: any ) => {
    const [ comment, setComment ] = useState( ' ' );
    const ratingModal = useAppSelector( ( state ) => state.visible.modal[ 'RATING' ] );
    const dispatch = useAppDispatch();
    const numberOfStars: any = 10;
    const [ hoveredStars, setHoveredStars ] = useState( 0 );

    const handleStarClick = ( stars: number ) => {
        setHoveredStars( stars );
    };

    useEffect(() => {
        const ratingSession = sessionStorage.getItem('rating');
        if(ratingSession) {
            const rating = JSON.parse(ratingSession);
            rating.map((item:any) => {
                if(item.id === ratingModal.imdbId) {
                    setHoveredStars(item.rating);
                setComment(item.comment);
                }
            })
        }
    }, [])
    const handleSubmit = useCallback(() => {
        if(hoveredStars != 0 || comment !== '') {
            const response = { 'rating': hoveredStars, 'comments': comment, id: ratingModal.imdbId };
            dispatch(hideModal({id:'RATING', response: response}));   
        }
    },[dispatch, comment, hoveredStars, ratingModal])

    const handleClose = useCallback( ( rate: number ) => {
        setHoveredStars(0);
        setComment('');
        const response = { 'rating': hoveredStars, 'comments': comment, id: ratingModal.imdbId };
        dispatch( hideModal( { id: 'RATING', response: response } ) );
    }, [ dispatch, hoveredStars, comment, ratingModal ] );
    

    if ( props.imdb !== ratingModal.imdbId ) {
        return null;
    }

    return (
        <div
            className="bg-white absolute left-[25%] flex-col py-2 border-[1px] border-gray-200 px-4 rounded-xl gap-2 text-gray-400"
            style={ ratingModal.isVisible ? { display: 'flex' } : { display: 'none' } }>
            <div className="flex items-center text-gray-400 cursor-pointer">
                {
                    Array.from( { length: numberOfStars } ).map( ( _: any, index: any ) => {
                        return <span
                            key={ index }
                            onMouseEnter={ () => setHoveredStars( index + 1 ) }
                            onClick={ ( e: any ) => { e.stopPropagation(); handleStarClick( index + 1 ); } }
                        >
                            { hoveredStars >= index + 1 ? (
                                <AiFillStar className="text-yellow" />
                            ) : (
                                <AiOutlineStar />
                            ) }
                        </span>;
                    } )
                }
                <span className="text-xs text-black ml-4 w-[10px]">{ hoveredStars }</span>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="comments" className="text-xs text-black">Comments</label>
                <textarea id="comments" rows={ 4 } cols={ 50 } value={ comment } className="text-black text-xs" onChange={ ( e ) => setComment( e.target.value ) } />
                <div className="flex items center text-black gap-4 text-xs">
                    <button type="submit" onClick={() => handleSubmit()}>Submit</button>
                    <button type="reset" className="text-gray-500" onClick={ ( e: any ) => handleClose( 0 ) }>Cancel</button>
                </div>
            </div>
        </div>
    );
};