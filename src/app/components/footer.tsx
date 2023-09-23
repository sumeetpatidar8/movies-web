import React from "react";
import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const icons = [
    AiFillFacebook,
    AiOutlineInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
]

const options = [
    'Get the Imdb App',
    'Help',
    'Site Index',
    'Imdb Pro',
    'Box Office Mojo',
    'Imdb Developer'
]

const moreOptions = [
    'Press Room',
    'Advertising',
    'Jobs',
    'Conditions of Use',
    'Privacy Policy',
]
export const Footer = () => {
    return (
        <footer className="flex flex-col w-full items-center gap-10 py-8">
            <div className="flex justify-center gap-10 w-full">
                {icons.map((Icon:any, index:any)=> (
                    <React.Fragment key={index}>
                        <Icon className="text-xl" />
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center max-xs:flex-col max-xs:items-center max-md:flex-col max-md:items-center max-sm:flex-col max-sm:items-center gap-10 w-full">
                {options.map((option:any, index:any)=> (
                    <div key={index} className="flex items-center gap-2">
                        <h2 className="font-medium max-xl/1:text-[12px]">{option}</h2>
                        <FaArrowUpRightFromSquare className="max-xl/1:text-[12px]" />
                    </div>
                ))}
            </div>
            <div className="flex justify-center max-xs:flex-col max-xs:items-center max-md:flex-col max-md:items-center max-sm:flex-col max-sm:items-center gap-10 w-full">
                {moreOptions.map((option:any, index:any)=> (
                    <div key={index}>
                        <h2 className="font-medium max-xl/1:text-[12px]">{option}</h2>
                    </div>
                ))}
            </div>
            <p className="text-xs">© 1990-2023 by IMDb.com, Inc.</p>
        </footer>
    );
};