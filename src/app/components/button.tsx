'use client'

export const Button = (props:any) => {


    return(
        <div className={`${props.class}`}>
            <button onClick={props.onClick} className="flex text-xs font-semibold items-center gap-1 hover:bg-zinc-800 transition-all rounded p-2 " style={{backgroundColor: props.buttonBg, borderRadius:props.rounded, width: props.width, justifyContent: props.content}} id={props.id}> {
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