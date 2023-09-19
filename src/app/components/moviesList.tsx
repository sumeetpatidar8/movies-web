'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { Button } from './button';
import { BiPlus, BiInfoCircle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
export const MoviesList = () => {
    // const pagination = {
    //     clickable: true,
    //     renderBullet: function ( index: any, className: any ) {
    //         return '<span class="' + className + '">' + ( index + 1 ) + '</span>';
    //     },
    // };
    return (
        <>
            <div className="flex flex-col items-start gap-4 mb-10">
                <h1 className="text-yellow text-2xl font-semibold">What to Watch</h1>
                <div className="flex items-center font-semibold title relative gap-2 pl-4 cursor-pointer">
                    <h2>Top Picks</h2>
                    <BsChevronRight className="stroke-2 icon transition-all" />
                </div>
                <p className="text-gray-400 text-sm font-semibold">Tv Shows and Movies just for you</p>
            </div>
            <Swiper
                slidesPerView={ 3 }
                spaceBetween={ 30 }
                pagination={ {clickable: true,} }
                modules={ [ Pagination ] }
                className="mySwiper w-full h-full"
            >
                <SwiperSlide className="flex items-center justify-center">
                    <div className="block w-full h-full bg-secondary rounded">
                        <Image src="/blog-post-4.jpg" width={ 400 } height={ 400 } alt="" />
                        <div className="py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AiFillStar className="fill-yellow" />
                                <p className="text-zinc-400 text-sm">6.0</p>
                            </div>
                            <h2 className="text-semibold">The Boogeyman</h2>
                            <div className="mt-6">
                                <Button text="Watchlist" buttonBg='#FFFFFF14' content="center" width='100%' icon={ BiPlus } textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                            <div className="flex items-center w-full justify-between mt-4">
                                <Button text="Trailer" icon={BsFillPlayFill} textStyle="text-sm" />
                                <div className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer">
                                    <BiInfoCircle className="text-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col bg-secondary rounded">
                        <Image src="/blog-post-4.jpg" width={ 400 } height={ 400 } alt="" />
                        <div className="py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AiFillStar className="fill-yellow" />
                                <p className="text-zinc-400 text-sm">6.0</p>
                            </div>
                            <h2 className="text-semibold">The Boogeyman</h2>
                            <div className="mt-6">
                                <Button text="Watchlist" buttonBg='#FFFFFF14' content="center" width='100%' icon={ BiPlus } textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                            <div className="flex items-center w-full justify-between mt-4">
                                <Button text="Trailer" icon={BsFillPlayFill} textStyle="text-sm" />
                                <div className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer">
                                    <BiInfoCircle className="text-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col bg-secondary rounded">
                        <Image src="/blog-post-4.jpg" width={ 400 } height={ 400 } alt="" />
                        <div className="py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AiFillStar className="fill-yellow" />
                                <p className="text-zinc-400 text-sm">6.0</p>
                            </div>
                            <h2 className="text-semibold">The Boogeyman</h2>
                            <div className="mt-6">
                                <Button text="Watchlist" buttonBg='#FFFFFF14' content="center" width='100%' icon={ BiPlus } textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                            <div className="flex items-center w-full justify-between mt-4">
                                <Button text="Trailer" icon={BsFillPlayFill} textStyle="text-sm" />
                                <div className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer">
                                    <BiInfoCircle className="text-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col bg-secondary rounded">
                        <Image src="/blog-post-4.jpg" width={ 400 } height={ 400 } alt="" />
                        <div className="py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AiFillStar className="fill-yellow" />
                                <p className="text-zinc-400 text-sm">6.0</p>
                            </div>
                            <h2 className="text-semibold">The Boogeyman</h2>
                            <div className="mt-6">
                                <Button text="Watchlist" buttonBg='#FFFFFF14' content="center" width='100%' icon={ BiPlus } textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                            <div className="flex items-center w-full justify-between mt-4">
                                <Button text="Trailer" icon={BsFillPlayFill} textStyle="text-sm" />
                                <div className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer">
                                    <BiInfoCircle className="text-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col bg-secondary rounded">
                        <Image src="/blog-post-4.jpg" width={ 400 } height={ 400 } alt="" />
                        <div className="py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AiFillStar className="fill-yellow" />
                                <p className="text-zinc-400 text-sm">6.0</p>
                            </div>
                            <h2 className="text-semibold">The Boogeyman</h2>
                            <div className="mt-6">
                                <Button text="Watchlist" buttonBg='#FFFFFF14' content="center" width='100%' icon={ BiPlus } textStyle="text-sm text-tertiary font-medium" iconStyle='#5799ef' />
                            </div>
                            <div className="flex items-center w-full justify-between mt-4">
                                <Button text="Trailer" icon={BsFillPlayFill} textStyle="text-sm" />
                                <div className="rounded-3xl transition-all hover:bg-zinc-800 p-3 cursor-pointer">
                                    <BiInfoCircle className="text-xl" />
                                </div>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};