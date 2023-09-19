'use client'

import { useCallback } from "react";
import { useAppDispatch } from "../config/redux/hooks";
import { showModal } from "../config/redux/slices/modalSlice";

export const Button = (props:any) => {
    const dispatch = useAppDispatch();
    const handleClick = useCallback(() => {
        if (props.text === "Menu") {
          dispatch(showModal());
        }
      }, [dispatch, props.text]);

    console.log(props)
    return(
        <div className="h-full">
            <button onClick={handleClick} className="flex text-xs font-semibold items-center gap-1 hover:bg-zinc-800 transition-all rounded p-2 " style={{backgroundColor: props.buttonBg, width: props.width, justifyContent: props.content}}> {
                props.icon && (
                    <props.icon className="text-xl" style={{color: props.iconStyle}} />
                )
            } {props.text && (
                <span className={props.textStyle}>{props.text}</span>
            )} 
                {
                    props.badge && (
                        <span className="text-[10px] font-normal px-2 bg-yellow text-black rounded-xl"> 
                        {props.badge}
                   </span>
                    )
                }
            </button>

        </div>
    )
}