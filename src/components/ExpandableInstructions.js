import React, { useState } from 'react';

import { Accordion } from 'react-bootstrap';

import arrowDown from './svgs/arrowDown.svg'
import arrowRight from './svgs/arrowRight.svg'

export const ExpandableInstructions = ({instructions}) => {
  const [image, setImage] = useState(arrowRight)
  const [isExpand, setIsExpand] = useState(false)

  const handler = () => {
    if (isExpand) {
      setIsExpand((isExpand) => !isExpand)
      setImage(arrowRight)
    }

    if (!isExpand) {
      setIsExpand((isExpand) => !isExpand)
      setImage(arrowDown)
    }
  }

  return (
    <div>
      <div className="">
        <h4
          className='row'
          style={{ cursor: 'pointer' }}
          onClick={handler}
        >
          <img src={image} alt="" width={12} className='mx-2' />
          Instructions
        </h4>
        {isExpand &&
          <div className="">
            <ol className="">
              {instructions.map(instruction =>
                <li className="m-1" key={instruction}>
                  {instruction}
                </li>)
              }
            </ol>
          </div>
        }
      </div>
    </div>
  );
}