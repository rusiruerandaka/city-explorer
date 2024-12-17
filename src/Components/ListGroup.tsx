import React from 'react'

interface ListGroupProps {
    items: {name: string, description:string}[];
    heading: string;
    onItemClick: (index: number) => void;
    selectedItem: number | null; 
}

const ListGroup: React.FC<ListGroupProps> = ({
    items,
    heading,
    onItemClick,
    

}) => {
  return (
    <div>
        <h3>
            {heading}
        </h3>
        <ul className="list-group">
            {items.map((item, index) => (
                <li 
                key={index} 
                className={'list-group-item ${selectedIndex === index ? "active" : ""}'} 
                onClick={() => onItemClick(index)}>
                    {item.name}
                </li>
            ))}
        </ul>
      
    </div>
  )
}

export default ListGroup
