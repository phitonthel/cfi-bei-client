import React, { useState } from 'react';

export const Criteria = (assessment, handlers) => {
  return (
    <div>
      {
        assessment.options.map(option => {
          return (
            <ul className="list-group mx-4 px-4">
              <li className="list-group-item">{option.level}</li>
              <li className="list-group-item list-group-item-light text-left">
                {
                  option.criterias[0].map((criteria, index) => {
                    return (
                      <div className="text-left">
                        {index + 1} {'.  '} {criteria}
                      </div>
                    )
                  })
                }
              </li>

            </ul>
          )
        })
      }
    </div>
  )
}