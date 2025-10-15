import React, { useState } from 'react';

export const Criteria = ({options}) => {
  return (
    <div>
      {
        options.map(option => {
          return (
            <ul className="list-group m-2" key={option.level}>
              <li className="list-group-item">{option.level}</li>
              <div className="list-group-item">
                {
                  option.criterias.map((criteria, index) => {
                    return (
                      <div className="mx-2 text-left col" key={option.level + index}>
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