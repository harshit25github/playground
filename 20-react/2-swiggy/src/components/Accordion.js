import React, { useState } from "react";

export const AccordionItem = ({ title, content, isOpen , onToggle ,onClose}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const onToggle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="accordion-item">
      <button className="accordion-trigger" type="button" onClick={onToggle}>
        <span>{title}</span>
        {isOpen === false ? <span className="accordion-icon">+</span> : <span className="accordion-icon" onClick={onClose}>-</span>}
      </button>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

// const Accordion = ({ items = [] }) => {
//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <div className="accordion">
//       {items.map((item, index) => (
//         <AccordionItem
//           key={item.id || item.title || index}
//           title={item.title}
//           content={item.content}
//           isOpen={openIndex === index}
//           onToggle={() =>
//             setOpenIndex(openIndex === index ? null : index)
//           }
//         />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
