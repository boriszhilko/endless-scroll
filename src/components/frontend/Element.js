import React from 'react';

const Element = ({data}) => {
    return (
        <div className="element">
            {`${data.id} : ${data.first_name}  ${data.last_name}`}
        </div>
    )
};

export default Element;
