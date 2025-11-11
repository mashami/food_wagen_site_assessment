import React from "react";

interface ListProps {
  title: string;
  list: string[];
}
const List = ({ title, list }: ListProps) => {
  return (
    <div>
      <h1 className="text-white text-[22px] font-bold">{title}</h1>
      <ul className="pt-3 space-y-1">
        {list.map((value, i) => {
          return (
            <li key={i} className="text-[18px] text-[#F5F5F5]">
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
