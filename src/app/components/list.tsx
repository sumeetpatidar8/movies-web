interface ListProps {
    data: {
      [section: string]: {
        icon: React.ElementType; // Define the type for the icon
        category: string[];
      };
    };
  }

export const List = (props:ListProps) => {
    const data = props.data;
    console.log(data)
    return(
        <div className="flex flex-wrap justify-between mt-14">
            {Object.entries(data).map(([section, {icon: Icon, category}]) => (
                    <div key={section} className="text-white flex flex-col gap-2 mb-10">
                        <div className="flex items-center text-xl font-semibold gap-2">
                        <Icon className="text-yellow" />
                        <h2>{section}</h2>
                        </div>
                        <ul className="flex flex-col gap-4 text-sm pl-6">
                            {category.map((item:any, index:any) => (
                                <li key={index} className="cursor-pointer hover:underline">
                                    <a>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    )
}