import React, { useState } from 'react';

export const Criteria = (assessment) => {
  return (
    <div>
      {
        assessment.options.map(option => {
          return (
            <ul className="list-group mx-4 px-4">
              <li className="list-group-item">{option.level}</li>
              <div className="list-group-item">
                {
                  option.criterias.map((criteria, index) => {
                    return (
                      <div className="mx-2 text-left col" key={index}>
                        {criteria}
                      </div>
                    )
                  })
                }
              </div>

            </ul>
          )
        })
      }
    </div>
  )
}